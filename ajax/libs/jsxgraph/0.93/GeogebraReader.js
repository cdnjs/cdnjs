	JXG.GeogebraReader = new function() {
/**
 * @param {String} type the type of expression
 * @param {String} m first input value
 * @param {String} n second input value
 * @return {String} return the object, string or calculated value
 */
this.ggbAct = function(type, m, n) {
  var v1 = m, v2 = n, s1, s2, a;
  switch(type.toLowerCase()) {
    case 'end':
      // JXG.debug("<b>end: </b>"+ v1);
      return v1;
    break;
    case 'coord':
      s1 = (JXG.GeogebraReader.board.ggbElements[v1]) ? 'JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'")' : v1;
      s2 = (JXG.GeogebraReader.board.ggbElements[v2]) ? 'JXG.getRef(JXG.GeogebraReader.board, "'+ v2 +'")' : v2;
      return [s1, s2];
    break;
    case 'le': // smaller then
      return '( ('+ v1 +') <= ('+ v2 +') )';
    break;
    case 'ge': // greater then
      return '( ('+ v1 +') >= ('+ v2 +') )';
    break;
    case 'eq': // equal
      return '( ('+ v1 +') == ('+ v2 +') )';
    break;
    case 'neq': // not equal
      return '( ('+ v1 +') != ('+ v2 +') )';
    break;
    case 'lt': // smaller
      return '( ('+ v1 +') < ('+ v2 +') )';
    break;
    case 'gt': // greater
      return '( ('+ v1 +') > ('+ v2 +') )';
    break;
    case 'add':
    	if (JXG.GeogebraReader.isGGBVector(v1) && JXG.GeogebraReader.isGGBVector(v2)){ //Add: Vector + Vector
    		return [1, v1[1] + '+' + v2[1], v1[2] + '+' + v2[2]];
    	}
      if( JXG.isString(v1) && !v1.match(/JXG\.getRef\(JXG\.GeogebraReader\.board, "(.+?)"\)\./) && v1.match(/JXG\.getRef/) ) {
        s1 = [v1+'.X()', v1+'.Y()'];
      } else {
        s1 = v1;
      }

      if( JXG.isString(v2) && !v2.match(/JXG\.getRef\(JXG\.GeogebraReader\.board, "(.+?)"\)\./) && v2.match(/JXG\.getRef/) ) {
        s2 = [v2+'.X()', v2+'.Y()'];
      } else {
        s2 = v2;
      }

      if (JXG.GeogebraReader.isGGBVector(s1) && JXG.isArray(s2)){ //Add: Vector + Point
    	  return [s1[1] + '+' + s2[0], s1[2] + '+' + s2[1]];
  		}

      if (JXG.GeogebraReader.isGGBVector(s2) && JXG.isArray(s1)){ //Add: Vector + Point
    	  return [s2[1] + '+' + s1[0], s2[2] + '+' + s1[1]];
  		}

      if( JXG.isArray(s1) && JXG.isArray(s2) ) {
        return [ s1[0] +' + '+ s2[0], s1[1] +' + '+ s2[1] ];
      }
      else if( (JXG.isNumber(s1) || JXG.isString(s1)) && (JXG.isNumber(s2) || JXG.isString(s2)) ) {
        return s1 +' + '+ s2;
      }
      else if( (JXG.isNumber(s1) || JXG.isString(s1)) && JXG.isArray(s2) ) {
        return [ s1 +' + '+ s2[0], s1 +' + '+ s2[1] ];
      }
      else if( JXG.isArray(s1) && (JXG.isNumber(s2) || JXG.isString(s2)) ) {
        return [ s1[0] +' + '+ s2, s1[1] +' + '+ s2 ];
      }
      else {
        return s1 +' + '+ s2;
      }
    break;
    case 'sub':
    	if (JXG.GeogebraReader.isGGBVector(v1) && JXG.GeogebraReader.isGGBVector(v2)){ //Sub: Vector - Vector
    		return [1, v1[1] + '-' + v2[1], v1[2] + '-' + v2[2]];
    	}

      if( JXG.isString(v1) && !v1.match(/JXG\.getRef\(JXG\.GeogebraReader\.board, "(.+?)"\)\./) && v1.match(/JXG\.getRef/) ) {
        s1 = [v1+'.X()', v1+'.Y()'];
      } else {
        s1 = v1;
      }

      if( JXG.isString(v2) && !v2.match(/JXG\.getRef\(JXG\.GeogebraReader\.board, "(.+?)"\)\./) && v2.match(/JXG\.getRef/) ) {
        s2 = [v2+'.X()', v2+'.Y()'];
      } else {
        s2 = v2;
      }

      if (JXG.GeogebraReader.isGGBVector(s1) && JXG.isArray(s2)){ //Add: Vector - Point
    	  return [s1[1] + '-' + s2[0], s1[2] + '-' + s2[1]];
  		}

      if (JXG.isArray(s1) && JXG.GeogebraReader.isGGBVector(s2)){ //Add: Punkt - Vector
    	  return [s1[0] + '-(' + s2[1] + ')', s1[1] + '-(' + s2[2] +')'];
  		}

      if( JXG.isArray(s1) && JXG.isArray(s2) ) {
        return [ s1[0] +' - '+ s2[0], s1[1] +' - '+ s2[1] ];
      }
      else if( (JXG.isNumber(s1) || JXG.isString(s1)) && (JXG.isNumber(s2) || JXG.isString(s2)) ) {
        return s1 +' - '+ s2;
      }
      else if( (JXG.isNumber(s1) || JXG.isString(s1)) && JXG.isArray(s2) ) {
        return [ s1 +' - '+ s2[0], s1 +' - '+ s2[1] ];
      }
      else if( JXG.isArray(s1) && (JXG.isNumber(s2) || JXG.isString(s2)) ) {
        return [ s1[0] +' - '+ s2, s1[1] +' - '+ s2 ];
      }
      else {
        return s1 +' - '+ s2;
      }
    break;
    case 'neg':
      return '!('+ v1 +')';
    break;
    case 'pow':
      return 'Math.pow('+ v1 +', '+ v2 +')';
    break;
    case 'or':
      return '('+ v1 +'||'+ v2 +')';
    break;
    case 'and':
      return '('+ v1 +'&&'+ v2 +')';
    break;
    case 'mul':
    	if (JXG.GeogebraReader.isGGBVector(v1) && !JXG.isArray(v2)){ // Mult: Vector * Skalar
    		return [1,'(' + v1[1] + ')*'+v2,'(' + v1[2] + ')*'+v2];
    	} else if (!JXG.isArray(v1) && JXG.GeogebraReader.isGGBVector(v2)){ // Mult: Skalar * Vector
    		return new Array(1,'(' + v2[1] + ')*'+v1,'(' + v2[2] + ')*'+v1);
    	} else if (JXG.GeogebraReader.isGGBVector(v1) && JXG.GeogebraReader.isGGBVector(v2)){ //Mult: Vector * Vector
    		return '((' + v1[1] + ')*('+v2[1]+')+('+ v1[2] + ')*('+v2[2]+'))';
    	} else { // Rest
      if( JXG.isString(v1) && !v1.match(/JXG\.getRef\(JXG\.GeogebraReader\.board, "(.+?)"\)\./) && v1.match(/JXG\.getRef/) ) {
		        s1 = [v1+'.X()', v1+'.Y()'];
		      } else {
		    	s1 = v1;
		      }

      		if( JXG.isString(v2) && !v2.match(/JXG\.getRef\(JXG\.GeogebraReader\.board, "(.+?)"\)\./) && v2.match(/JXG\.getRef/) ) {
		        s2 = [v2+'.X()', v2+'.Y()'];
		      } else {
		        s2 = v2;
		      }

		      if( JXG.isArray(s1) && JXG.isArray(s2) ) {
		        return [ s1[0] +' * '+ s2[0], s1[1] +' * '+ s2[1] ];
		      }
		      else if( (JXG.isNumber(s1) || JXG.isString(s1)) && (JXG.isNumber(s2) || JXG.isString(s2)) ) {
		        return s1 +' * '+ s2;
		      }
		      else if( (JXG.isNumber(s1) || JXG.isString(s1)) && JXG.isArray(s2) ) {
		        return [ s1 +' * '+ s2[0], s1 +' * '+ s2[1] ];
		      }
		      else if( JXG.isArray(s1) && (JXG.isNumber(s2) || JXG.isString(s2)) ) {
		        return [ s1[0] +' * '+ s2, s1[1] +' * '+ s2 ];
		      }
		      else {
		        return s1 +' * '+ s2;
		      }
    	}
    break;
    case 'div':
      if( JXG.isString(v1) && !v1.match(/JXG\.getRef\(JXG\.GeogebraReader\.board, "(.+?)"\)\./) && v1.match(/JXG\.getRef/) ) {
        s1 = [v1+'.X()', v1+'.Y()'];
      } else {
        s1 = v1;
      }

      if( JXG.isString(v2) && !v2.match(/JXG\.getRef\(JXG\.GeogebraReader\.board, "(.+?)"\)\./) && v2.match(/JXG\.getRef/) ) {
        s2 = [v2+'.X()', v2+'.Y()'];
      } else {
        s2 = v2;
      }

      if( JXG.isArray(s1) && JXG.isArray(s2) ) {
        return [ s1[0] +' / '+ s2[0], s1[1] +' / '+ s2[1] ];
      }
      else if( (JXG.isNumber(s1) || JXG.isString(s1)) && (JXG.isNumber(s2) || JXG.isString(s2)) ) {
        return s1 +' / '+ s2;
      }
      else if( (JXG.isNumber(s1) || JXG.isString(s1)) && JXG.isArray(s2) ) {
        return [ s1 +' / '+ s2[0], s1 +' / '+ s2[1] ];
      }
      else if( JXG.isArray(s1) && (JXG.isNumber(s2) || JXG.isString(s2)) ) {
        return [ s1[0] +' / '+ s2, s1[1] +' / '+ s2 ];
      }
      else {
        return s1 +' / '+ s2;
      }
    break;
    case 'negmult':
    	if (JXG.GeogebraReader.isGGBVector(v1))
    		return new Array(1, -1 + '*' + v1[1],-1 + '*' + v1[2]);
      return -1 +'*'+ v1;
    break;
    case 'bra':
    	if (JXG.GeogebraReader.isGGBVector(v1))
    		return new Array(1,'(' + v1[1] + ')','(' + v1[2] + ')');
      return '('+ v1 +')';
    break;
    case 'int':
      return parseInt(v1);
    break;
    case 'float':
      return parseFloat(v1);
    break;
    case 'param':
      return v1;
    break;
    case 'html':
      return v1;
    break;
    case 'string':
      if(v2) return [v1, v2];
      else   return v1;
    break;
    case 'command':
      v2 = v1.split('[');
      s1 = v2[0];
      s2 = (v2[1].split(']'))[0];
      switch(s1.toLowerCase()) {
        case 'name':
          return 'JXG.getRef(JXG.GeogebraReader.board, "'+ s2 +'").getName()'; //TODO korrigiere getName()
        break;
      }
    break;
    case 'var':
      if(v2) {
        switch(v1.toLowerCase()) {
            case 'x':
                return v2 +'.X()';
            break;
            case 'y':
                return v2 +'.Y()';
            break;
            case 'abs':
			case 'acos':
			case 'asin':
			case 'atan':
			case 'ceil':
			case 'cos':
			case 'exp':
			case 'floor':
			case 'log':
			case 'max':
			case 'min':
			case 'pow':
			case 'random':
			case 'round':
			case 'sin':
			case 'sqrt':
			case 'tan':
              return 'Math.'+v1.toLowerCase()+'('+ v2 +')';
            break;
            default:
                return v1.toLowerCase()+'*('+ v2 +')';
            break;
        }
      } else {

        if(v1 == 'PI') {
          return 'Math.PI';
        } else {
          a = JXG.GeogebraReader.checkElement(v1);
          if(typeof JXG.GeogebraReader.board.ggb[v1] != 'undefined') {
            return 'JXG.GeogebraReader.board.ggb["'+ v1 +'"]()';
          } else if(typeof a.Value != 'undefined') {
            return 'JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'").Value()';
          } else if(typeof a.Area != 'undefined') {
            return 'JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'").Area()';
          } else if(typeof a.plaintextStr != 'undefined') {
            return '1.0*JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'").plaintextStr';
          } else if (a.type == JXG.OBJECT_TYPE_VECTOR){
            return new Array(1, 'JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'").point2.X()-JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'").point1.X()','JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'").point2.Y()-JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'").point1.Y()');
          }else if(a.elementClass == JXG.OBJECT_CLASS_LINE) {
            return 'JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'").point1.Dist(JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'").point2)';
          } else {
            return 'JXG.getRef(JXG.GeogebraReader.board, "'+ v1 +'")';
          }
        }
      }
    break;
  }
};

/**
 * JS/CC parser to convert the input expression to a working javascript function.
 * @param {Object} board object
 * @param {Object} element Element that needs to be updated
 * @param {String} exp String which contains the function, expression or information
 */
this.ggbParse = function(exp, element) {
  var element = (element) ? JXG.getRef(JXG.GeogebraReader.board, JXG.GeogebraReader.board.ggbElements[element].id) : false;
  if(element) JXG.debug("Zu aktualisierendes Element: "+ element.name + "("+ element.id +")");

/*
    This parser was generated with: The LALR(1) parser and lexical analyzer generator for JavaScript, written in JavaScript
    In the version 0.30 on http://jscc.jmksf.com/

    It is based on the default template driver for JS/CC generated parsers running as
    browser-based JavaScript/ECMAScript applications and was strongly modified.

    The parser was written 2007, 2008 by Jan Max Meyer, J.M.K S.F. Software Technologies
    This is in the public domain.
*/

/***** begin replace *****/
	var _dbg_withtrace		= false;
	var _dbg_string			= new String();

	function __dbg_print( text ) {
		_dbg_string += text + "\n";
	}

	function __lex( info ) {
		var state		= 0;
		var match		= -1;
		var match_pos	= 0;
		var start		= 0;
		var pos			= info.offset + 1;

		do
		{
			pos--;
			state = 0;
			match = -2;
			start = pos;

			if( info.src.length <= start )
				return 28;

			do
			{

	switch( state )
	{
		case 0:
			if( info.src.charCodeAt( pos ) == 9 || info.src.charCodeAt( pos ) == 32 ) state = 1;
			else if( info.src.charCodeAt( pos ) == 33 ) state = 2;
			else if( info.src.charCodeAt( pos ) == 40 ) state = 3;
			else if( info.src.charCodeAt( pos ) == 41 ) state = 4;
			else if( info.src.charCodeAt( pos ) == 42 ) state = 5;
			else if( info.src.charCodeAt( pos ) == 43 ) state = 6;
			else if( info.src.charCodeAt( pos ) == 44 ) state = 7;
			else if( info.src.charCodeAt( pos ) == 45 ) state = 8;
			else if( info.src.charCodeAt( pos ) == 47 ) state = 9;
			else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 10;
			else if( info.src.charCodeAt( pos ) == 60 ) state = 11;
			else if( info.src.charCodeAt( pos ) == 62 ) state = 12;
			else if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 13;
			else if( info.src.charCodeAt( pos ) == 94 ) state = 14;
			else if( info.src.charCodeAt( pos ) == 34 ) state = 26;
			else if( info.src.charCodeAt( pos ) == 38 ) state = 28;
			else if( info.src.charCodeAt( pos ) == 46 ) state = 29;
			else if( info.src.charCodeAt( pos ) == 61 ) state = 30;
			else if( info.src.charCodeAt( pos ) == 95 ) state = 31;
			else if( info.src.charCodeAt( pos ) == 124 ) state = 32;
			else state = -1;
			break;

		case 1:
			state = -1;
			match = 1;
			match_pos = pos;
			break;

		case 2:
			if( info.src.charCodeAt( pos ) == 61 ) state = 15;
			else state = -1;
			match = 23;
			match_pos = pos;
			break;

		case 3:
			state = -1;
			match = 2;
			match_pos = pos;
			break;

		case 4:
			state = -1;
			match = 3;
			match_pos = pos;
			break;

		case 5:
			state = -1;
			match = 13;
			match_pos = pos;
			break;

		case 6:
			state = -1;
			match = 11;
			match_pos = pos;
			break;

		case 7:
			state = -1;
			match = 16;
			match_pos = pos;
			break;

		case 8:
			state = -1;
			match = 12;
			match_pos = pos;
			break;

		case 9:
			state = -1;
			match = 14;
			match_pos = pos;
			break;

		case 10:
			if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 10;
			else if( info.src.charCodeAt( pos ) == 46 ) state = 18;
			else state = -1;
			match = 4;
			match_pos = pos;
			break;

		case 11:
			if( info.src.charCodeAt( pos ) == 61 ) state = 19;
			else state = -1;
			match = 21;
			match_pos = pos;
			break;

		case 12:
			if( info.src.charCodeAt( pos ) == 61 ) state = 21;
			else state = -1;
			match = 22;
			match_pos = pos;
			break;

		case 13:
			if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 13;
			else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 27;
			else if( info.src.charCodeAt( pos ) == 91 ) state = 34;
			else if( info.src.charCodeAt( pos ) == 95 ) state = 35;
			else state = -1;
			match = 7;
			match_pos = pos;
			break;

		case 14:
			state = -1;
			match = 15;
			match_pos = pos;
			break;

		case 15:
			state = -1;
			match = 20;
			match_pos = pos;
			break;

		case 16:
			state = -1;
			match = 9;
			match_pos = pos;
			break;

		case 17:
			state = -1;
			match = 25;
			match_pos = pos;
			break;

		case 18:
			if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 18;
			else state = -1;
			match = 5;
			match_pos = pos;
			break;

		case 19:
			state = -1;
			match = 17;
			match_pos = pos;
			break;

		case 20:
			state = -1;
			match = 19;
			match_pos = pos;
			break;

		case 21:
			state = -1;
			match = 18;
			match_pos = pos;
			break;

		case 22:
			state = -1;
			match = 24;
			match_pos = pos;
			break;

		case 23:
			state = -1;
			match = 8;
			match_pos = pos;
			break;

		case 24:
			if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 24;
			else state = -1;
			match = 6;
			match_pos = pos;
			break;

		case 25:
			state = -1;
			match = 10;
			match_pos = pos;
			break;

		case 26:
			if( info.src.charCodeAt( pos ) == 34 ) state = 16;
			else if( info.src.charCodeAt( pos ) == 32 || info.src.charCodeAt( pos ) == 46 || ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || info.src.charCodeAt( pos ) == 61 || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) || info.src.charCodeAt( pos ) == 223 || info.src.charCodeAt( pos ) == 228 || info.src.charCodeAt( pos ) == 246 || info.src.charCodeAt( pos ) == 252 ) state = 26;
			else state = -1;
			break;

		case 27:
			if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 27;
			else if( info.src.charCodeAt( pos ) == 95 ) state = 35;
			else state = -1;
			match = 7;
			match_pos = pos;
			break;

		case 28:
			if( info.src.charCodeAt( pos ) == 38 ) state = 17;
			else if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 33;
			else state = -1;
			break;

		case 29:
			if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 18;
			else state = -1;
			break;

		case 30:
			if( info.src.charCodeAt( pos ) == 61 ) state = 20;
			else state = -1;
			break;

		case 31:
			if( info.src.charCodeAt( pos ) == 95 ) state = 36;
			else state = -1;
			break;

		case 32:
			if( info.src.charCodeAt( pos ) == 124 ) state = 22;
			else state = -1;
			break;

		case 33:
			if( info.src.charCodeAt( pos ) == 59 ) state = 23;
			else if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 33;
			else state = -1;
			break;

		case 34:
			if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 37;
			else state = -1;
			break;

		case 35:
			if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 27;
			else if( info.src.charCodeAt( pos ) == 95 ) state = 35;
			else state = -1;
			break;

		case 36:
			if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 24;
			else state = -1;
			break;

		case 37:
			if( info.src.charCodeAt( pos ) == 93 ) state = 25;
			else if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 37;
			else state = -1;
			break;

	}


				pos++;

			}
			while( state > -1 );

		}
		while( 1 > -1 && match == 1 );

		if( match > -1 )
		{
			info.att = info.src.substr( start, match_pos - start );
			info.offset = match_pos;


		}
		else
		{
			info.att = new String();
			match = -1;
		}

		return match;
	}


	function __parse( src, err_off, err_la ) {
		var		sstack			= new Array();
		var		vstack			= new Array();
		var 	err_cnt			= 0;
		var		act;
		var		go;
		var		la;
		var		rval;
		var 	parseinfo		= new Function( "", "var offset; var src; var att;" );
		var		info			= new parseinfo();

	/* Pop-Table */
	var pop_tab = new Array(
		new Array( 0/* p' */, 1 ),
		new Array( 27/* p */, 1 ),
		new Array( 26/* e */, 5 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 2 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 2 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 3 ),
		new Array( 26/* e */, 1 ),
		new Array( 26/* e */, 1 ),
		new Array( 26/* e */, 1 ),
		new Array( 26/* e */, 1 ),
		new Array( 26/* e */, 1 ),
		new Array( 26/* e */, 1 ),
		new Array( 26/* e */, 4 ),
		new Array( 26/* e */, 1 )
	);

	/* Action-Table */
	var act_tab = new Array(
		/* State 0 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 1 */ new Array( 28/* "$" */,0 ),
		/* State 2 */ new Array( 14/* "/" */,13 , 13/* "*" */,14 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,18 , 11/* "+" */,19 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 28/* "$" */,-1 ),
		/* State 3 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 4 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 5 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 6 */ new Array( 11/* "+" */,29 , 28/* "$" */,-24 , 17/* "<=" */,-24 , 18/* ">=" */,-24 , 19/* "==" */,-24 , 20/* "!=" */,-24 , 21/* "<" */,-24 , 22/* ">" */,-24 , 12/* "-" */,-24 , 15/* "^" */,-24 , 24/* "||" */,-24 , 25/* "&&" */,-24 , 13/* "*" */,-24 , 14/* "/" */,-24 , 16/* "," */,-24 , 3/* ")" */,-24 ),
		/* State 7 */ new Array( 28/* "$" */,-20 , 17/* "<=" */,-20 , 18/* ">=" */,-20 , 19/* "==" */,-20 , 20/* "!=" */,-20 , 21/* "<" */,-20 , 22/* ">" */,-20 , 11/* "+" */,-20 , 12/* "-" */,-20 , 15/* "^" */,-20 , 24/* "||" */,-20 , 25/* "&&" */,-20 , 13/* "*" */,-20 , 14/* "/" */,-20 , 16/* "," */,-20 , 3/* ")" */,-20 ),
		/* State 8 */ new Array( 28/* "$" */,-21 , 17/* "<=" */,-21 , 18/* ">=" */,-21 , 19/* "==" */,-21 , 20/* "!=" */,-21 , 21/* "<" */,-21 , 22/* ">" */,-21 , 11/* "+" */,-21 , 12/* "-" */,-21 , 15/* "^" */,-21 , 24/* "||" */,-21 , 25/* "&&" */,-21 , 13/* "*" */,-21 , 14/* "/" */,-21 , 16/* "," */,-21 , 3/* ")" */,-21 ),
		/* State 9 */ new Array( 28/* "$" */,-22 , 17/* "<=" */,-22 , 18/* ">=" */,-22 , 19/* "==" */,-22 , 20/* "!=" */,-22 , 21/* "<" */,-22 , 22/* ">" */,-22 , 11/* "+" */,-22 , 12/* "-" */,-22 , 15/* "^" */,-22 , 24/* "||" */,-22 , 25/* "&&" */,-22 , 13/* "*" */,-22 , 14/* "/" */,-22 , 16/* "," */,-22 , 3/* ")" */,-22 ),
		/* State 10 */ new Array( 28/* "$" */,-23 , 17/* "<=" */,-23 , 18/* ">=" */,-23 , 19/* "==" */,-23 , 20/* "!=" */,-23 , 21/* "<" */,-23 , 22/* ">" */,-23 , 11/* "+" */,-23 , 12/* "-" */,-23 , 15/* "^" */,-23 , 24/* "||" */,-23 , 25/* "&&" */,-23 , 13/* "*" */,-23 , 14/* "/" */,-23 , 16/* "," */,-23 , 3/* ")" */,-23 ),
		/* State 11 */ new Array( 28/* "$" */,-25 , 17/* "<=" */,-25 , 18/* ">=" */,-25 , 19/* "==" */,-25 , 20/* "!=" */,-25 , 21/* "<" */,-25 , 22/* ">" */,-25 , 11/* "+" */,-25 , 12/* "-" */,-25 , 15/* "^" */,-25 , 24/* "||" */,-25 , 25/* "&&" */,-25 , 13/* "*" */,-25 , 14/* "/" */,-25 , 16/* "," */,-25 , 3/* ")" */,-25 ),
		/* State 12 */ new Array( 2/* "(" */,30 , 28/* "$" */,-27 , 17/* "<=" */,-27 , 18/* ">=" */,-27 , 19/* "==" */,-27 , 20/* "!=" */,-27 , 21/* "<" */,-27 , 22/* ">" */,-27 , 11/* "+" */,-27 , 12/* "-" */,-27 , 15/* "^" */,-27 , 24/* "||" */,-27 , 25/* "&&" */,-27 , 13/* "*" */,-27 , 14/* "/" */,-27 , 16/* "," */,-27 , 3/* ")" */,-27 ),
		/* State 13 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 14 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 15 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 16 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 17 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 18 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 19 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 20 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 21 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 22 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 23 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 24 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 25 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 26 */ new Array( 14/* "/" */,13 , 13/* "*" */,14 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,18 , 11/* "+" */,19 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 16/* "," */,44 , 3/* ")" */,45 ),
		/* State 27 */ new Array( 14/* "/" */,-11 , 13/* "*" */,-11 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,-11 , 12/* "-" */,-11 , 11/* "+" */,-11 , 22/* ">" */,-11 , 21/* "<" */,-11 , 20/* "!=" */,-11 , 19/* "==" */,-11 , 18/* ">=" */,-11 , 17/* "<=" */,-11 , 28/* "$" */,-11 , 16/* "," */,-11 , 3/* ")" */,-11 ),
		/* State 28 */ new Array( 14/* "/" */,-17 , 13/* "*" */,-17 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,-17 , 11/* "+" */,-17 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 28/* "$" */,-17 , 16/* "," */,-17 , 3/* ")" */,-17 ),
		/* State 29 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 30 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 31 */ new Array( 14/* "/" */,-16 , 13/* "*" */,-16 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,-16 , 11/* "+" */,-16 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 28/* "$" */,-16 , 16/* "," */,-16 , 3/* ")" */,-16 ),
		/* State 32 */ new Array( 14/* "/" */,-15 , 13/* "*" */,-15 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,-15 , 11/* "+" */,-15 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 28/* "$" */,-15 , 16/* "," */,-15 , 3/* ")" */,-15 ),
		/* State 33 */ new Array( 14/* "/" */,-14 , 13/* "*" */,-14 , 25/* "&&" */,-14 , 24/* "||" */,-14 , 15/* "^" */,-14 , 12/* "-" */,-14 , 11/* "+" */,-14 , 22/* ">" */,-14 , 21/* "<" */,-14 , 20/* "!=" */,-14 , 19/* "==" */,-14 , 18/* ">=" */,-14 , 17/* "<=" */,-14 , 28/* "$" */,-14 , 16/* "," */,-14 , 3/* ")" */,-14 ),
		/* State 34 */ new Array( 14/* "/" */,-13 , 13/* "*" */,-13 , 25/* "&&" */,-13 , 24/* "||" */,-13 , 15/* "^" */,-13 , 12/* "-" */,-13 , 11/* "+" */,-13 , 22/* ">" */,-13 , 21/* "<" */,-13 , 20/* "!=" */,-13 , 19/* "==" */,-13 , 18/* ">=" */,-13 , 17/* "<=" */,-13 , 28/* "$" */,-13 , 16/* "," */,-13 , 3/* ")" */,-13 ),
		/* State 35 */ new Array( 14/* "/" */,-12 , 13/* "*" */,-12 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,-12 , 12/* "-" */,-12 , 11/* "+" */,-12 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 28/* "$" */,-12 , 16/* "," */,-12 , 3/* ")" */,-12 ),
		/* State 36 */ new Array( 14/* "/" */,13 , 13/* "*" */,14 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,-10 , 11/* "+" */,-10 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 28/* "$" */,-10 , 16/* "," */,-10 , 3/* ")" */,-10 ),
		/* State 37 */ new Array( 14/* "/" */,13 , 13/* "*" */,14 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,-9 , 11/* "+" */,-9 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 28/* "$" */,-9 , 16/* "," */,-9 , 3/* ")" */,-9 ),
		/* State 38 */ new Array( 14/* "/" */,-8 , 13/* "*" */,-8 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,-8 , 12/* "-" */,-8 , 11/* "+" */,-8 , 22/* ">" */,-8 , 21/* "<" */,-8 , 20/* "!=" */,-8 , 19/* "==" */,-8 , 18/* ">=" */,-8 , 17/* "<=" */,-8 , 28/* "$" */,-8 , 16/* "," */,-8 , 3/* ")" */,-8 ),
		/* State 39 */ new Array( 14/* "/" */,-7 , 13/* "*" */,-7 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,-7 , 12/* "-" */,-7 , 11/* "+" */,-7 , 22/* ">" */,-7 , 21/* "<" */,-7 , 20/* "!=" */,-7 , 19/* "==" */,-7 , 18/* ">=" */,-7 , 17/* "<=" */,-7 , 28/* "$" */,-7 , 16/* "," */,-7 , 3/* ")" */,-7 ),
		/* State 40 */ new Array( 14/* "/" */,-6 , 13/* "*" */,-6 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,-6 , 12/* "-" */,-6 , 11/* "+" */,-6 , 22/* ">" */,-6 , 21/* "<" */,-6 , 20/* "!=" */,-6 , 19/* "==" */,-6 , 18/* ">=" */,-6 , 17/* "<=" */,-6 , 28/* "$" */,-6 , 16/* "," */,-6 , 3/* ")" */,-6 ),
		/* State 41 */ new Array( 14/* "/" */,-5 , 13/* "*" */,-5 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,-5 , 12/* "-" */,-5 , 11/* "+" */,-5 , 22/* ">" */,-5 , 21/* "<" */,-5 , 20/* "!=" */,-5 , 19/* "==" */,-5 , 18/* ">=" */,-5 , 17/* "<=" */,-5 , 28/* "$" */,-5 , 16/* "," */,-5 , 3/* ")" */,-5 ),
		/* State 42 */ new Array( 14/* "/" */,-4 , 13/* "*" */,-4 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,-4 , 12/* "-" */,-4 , 11/* "+" */,-4 , 22/* ">" */,-4 , 21/* "<" */,-4 , 20/* "!=" */,-4 , 19/* "==" */,-4 , 18/* ">=" */,-4 , 17/* "<=" */,-4 , 28/* "$" */,-4 , 16/* "," */,-4 , 3/* ")" */,-4 ),
		/* State 43 */ new Array( 14/* "/" */,-3 , 13/* "*" */,-3 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,-3 , 12/* "-" */,-3 , 11/* "+" */,-3 , 22/* ">" */,-3 , 21/* "<" */,-3 , 20/* "!=" */,-3 , 19/* "==" */,-3 , 18/* ">=" */,-3 , 17/* "<=" */,-3 , 28/* "$" */,-3 , 16/* "," */,-3 , 3/* ")" */,-3 ),
		/* State 44 */ new Array( 2/* "(" */,3 , 23/* "!" */,4 , 12/* "-" */,5 , 9/* "STRING" */,6 , 4/* "INT" */,7 , 5/* "FLOAT" */,8 , 6/* "PARAM" */,9 , 8/* "HTML" */,10 , 10/* "COMMAND" */,11 , 7/* "VAR" */,12 ),
		/* State 45 */ new Array( 28/* "$" */,-18 , 17/* "<=" */,-18 , 18/* ">=" */,-18 , 19/* "==" */,-18 , 20/* "!=" */,-18 , 21/* "<" */,-18 , 22/* ">" */,-18 , 11/* "+" */,-18 , 12/* "-" */,-18 , 15/* "^" */,-18 , 24/* "||" */,-18 , 25/* "&&" */,-18 , 13/* "*" */,-18 , 14/* "/" */,-18 , 16/* "," */,-18 , 3/* ")" */,-18 ),
		/* State 46 */ new Array( 14/* "/" */,13 , 13/* "*" */,14 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,-19 , 11/* "+" */,-19 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 28/* "$" */,-19 , 16/* "," */,-19 , 3/* ")" */,-19 ),
		/* State 47 */ new Array( 14/* "/" */,13 , 13/* "*" */,14 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,18 , 11/* "+" */,19 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 3/* ")" */,49 ),
		/* State 48 */ new Array( 14/* "/" */,13 , 13/* "*" */,14 , 25/* "&&" */,15 , 24/* "||" */,16 , 15/* "^" */,17 , 12/* "-" */,18 , 11/* "+" */,19 , 22/* ">" */,20 , 21/* "<" */,21 , 20/* "!=" */,22 , 19/* "==" */,23 , 18/* ">=" */,24 , 17/* "<=" */,25 , 3/* ")" */,50 ),
		/* State 49 */ new Array( 28/* "$" */,-26 , 17/* "<=" */,-26 , 18/* ">=" */,-26 , 19/* "==" */,-26 , 20/* "!=" */,-26 , 21/* "<" */,-26 , 22/* ">" */,-26 , 11/* "+" */,-26 , 12/* "-" */,-26 , 15/* "^" */,-26 , 24/* "||" */,-26 , 25/* "&&" */,-26 , 13/* "*" */,-26 , 14/* "/" */,-26 , 16/* "," */,-26 , 3/* ")" */,-26 ),
		/* State 50 */ new Array( 28/* "$" */,-2 , 17/* "<=" */,-2 , 18/* ">=" */,-2 , 19/* "==" */,-2 , 20/* "!=" */,-2 , 21/* "<" */,-2 , 22/* ">" */,-2 , 11/* "+" */,-2 , 12/* "-" */,-2 , 15/* "^" */,-2 , 24/* "||" */,-2 , 25/* "&&" */,-2 , 13/* "*" */,-2 , 14/* "/" */,-2 , 16/* "," */,-2 , 3/* ")" */,-2 )
	);

	/* Goto-Table */
	var goto_tab = new Array(
		/* State 0 */ new Array( 27/* p */,1 , 26/* e */,2 ),
		/* State 1 */ new Array(  ),
		/* State 2 */ new Array(  ),
		/* State 3 */ new Array( 26/* e */,26 ),
		/* State 4 */ new Array( 26/* e */,27 ),
		/* State 5 */ new Array( 26/* e */,28 ),
		/* State 6 */ new Array(  ),
		/* State 7 */ new Array(  ),
		/* State 8 */ new Array(  ),
		/* State 9 */ new Array(  ),
		/* State 10 */ new Array(  ),
		/* State 11 */ new Array(  ),
		/* State 12 */ new Array(  ),
		/* State 13 */ new Array( 26/* e */,31 ),
		/* State 14 */ new Array( 26/* e */,32 ),
		/* State 15 */ new Array( 26/* e */,33 ),
		/* State 16 */ new Array( 26/* e */,34 ),
		/* State 17 */ new Array( 26/* e */,35 ),
		/* State 18 */ new Array( 26/* e */,36 ),
		/* State 19 */ new Array( 26/* e */,37 ),
		/* State 20 */ new Array( 26/* e */,38 ),
		/* State 21 */ new Array( 26/* e */,39 ),
		/* State 22 */ new Array( 26/* e */,40 ),
		/* State 23 */ new Array( 26/* e */,41 ),
		/* State 24 */ new Array( 26/* e */,42 ),
		/* State 25 */ new Array( 26/* e */,43 ),
		/* State 26 */ new Array(  ),
		/* State 27 */ new Array(  ),
		/* State 28 */ new Array(  ),
		/* State 29 */ new Array( 26/* e */,46 ),
		/* State 30 */ new Array( 26/* e */,47 ),
		/* State 31 */ new Array(  ),
		/* State 32 */ new Array(  ),
		/* State 33 */ new Array(  ),
		/* State 34 */ new Array(  ),
		/* State 35 */ new Array(  ),
		/* State 36 */ new Array(  ),
		/* State 37 */ new Array(  ),
		/* State 38 */ new Array(  ),
		/* State 39 */ new Array(  ),
		/* State 40 */ new Array(  ),
		/* State 41 */ new Array(  ),
		/* State 42 */ new Array(  ),
		/* State 43 */ new Array(  ),
		/* State 44 */ new Array( 26/* e */,48 ),
		/* State 45 */ new Array(  ),
		/* State 46 */ new Array(  ),
		/* State 47 */ new Array(  ),
		/* State 48 */ new Array(  ),
		/* State 49 */ new Array(  ),
		/* State 50 */ new Array(  )
	);



	/* Symbol labels */
	var labels = new Array(
		"p'" /* Non-terminal symbol */,
		"WHITESPACE" /* Terminal symbol */,
		"(" /* Terminal symbol */,
		")" /* Terminal symbol */,
		"INT" /* Terminal symbol */,
		"FLOAT" /* Terminal symbol */,
		"PARAM" /* Terminal symbol */,
		"VAR" /* Terminal symbol */,
		"HTML" /* Terminal symbol */,
		"STRING" /* Terminal symbol */,
		"COMMAND" /* Terminal symbol */,
		"+" /* Terminal symbol */,
		"-" /* Terminal symbol */,
		"*" /* Terminal symbol */,
		"/" /* Terminal symbol */,
		"^" /* Terminal symbol */,
		"," /* Terminal symbol */,
		"<=" /* Terminal symbol */,
		">=" /* Terminal symbol */,
		"==" /* Terminal symbol */,
		"!=" /* Terminal symbol */,
		"<" /* Terminal symbol */,
		">" /* Terminal symbol */,
		"!" /* Terminal symbol */,
		"||" /* Terminal symbol */,
		"&&" /* Terminal symbol */,
		"e" /* Non-terminal symbol */,
		"p" /* Non-terminal symbol */,
		"$" /* Terminal symbol */
	);



		info.offset = 0;
		info.src = src;
		info.att = new String();

		if( !err_off )
			err_off	= new Array();
		if( !err_la )
		err_la = new Array();

		sstack.push( 0 );
		vstack.push( 0 );

		la = __lex( info );

		while( true )
		{
			act = 52;
			for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
			{
				if( act_tab[sstack[sstack.length-1]][i] == la )
				{
					act = act_tab[sstack[sstack.length-1]][i+1];
					break;
				}
			}

			if( _dbg_withtrace && sstack.length > 0 )
			{
				__dbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
								"\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
								"\tAction: " + act + "\n" + 
								"\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
										"..." : "" ) + "\"\n" +
								"\tStack: " + sstack.join() + "\n" +
								"\tValue stack: " + vstack.join() + "\n" );
			}


			//Panic-mode: Try recovery when parse-error occurs!
			if( act == 52 )
			{
				if( _dbg_withtrace )
					__dbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );

				err_cnt++;
				err_off.push( info.offset - info.att.length );			
				err_la.push( new Array() );
				for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
					err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );

				//Remember the original stack!
				var rsstack = new Array();
				var rvstack = new Array();
				for( var i = 0; i < sstack.length; i++ )
				{
					rsstack[i] = sstack[i];
					rvstack[i] = vstack[i];
				}

				while( act == 52 && la != 28 )
				{
					if( _dbg_withtrace )
						__dbg_print( "\tError recovery\n" +
										"Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
										"Action: " + act + "\n\n" );
					if( la == -1 )
						info.offset++;

					while( act == 52 && sstack.length > 0 )
					{
						sstack.pop();
						vstack.pop();

						if( sstack.length == 0 )
							break;

						act = 52;
						for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
						{
							if( act_tab[sstack[sstack.length-1]][i] == la )
							{
								act = act_tab[sstack[sstack.length-1]][i+1];
								break;
							}
						}
					}

					if( act != 52 )
						break;

					for( var i = 0; i < rsstack.length; i++ )
					{
						sstack.push( rsstack[i] );
						vstack.push( rvstack[i] );
					}

					la = __lex( info );
				}

				if( act == 52 )
				{
					if( _dbg_withtrace )
						__dbg_print( "\tError recovery failed, terminating parse process..." );
					break;
				}


				if( _dbg_withtrace )
					__dbg_print( "\tError recovery succeeded, continuing" );
			}

			/*
			if( act == 52 )
				break;
			*/


			//Shift
			if( act > 0 )
			{			
				if( _dbg_withtrace )
					__dbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );

				sstack.push( act );
				vstack.push( info.att );

				la = __lex( info );

				if( _dbg_withtrace )
					__dbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
			}
			//Reduce
			else
			{		
				act *= -1;

				if( _dbg_withtrace )
					__dbg_print( "Reducing by producution: " + act );

				rval = void(0);

				if( _dbg_withtrace )
					__dbg_print( "\tPerforming semantic action..." );

	switch( act )
	{
		case 0:
		{
			rval = vstack[ vstack.length - 1 ];
		}
		break;
		case 1:
		{
			 rval = JXG.GeogebraReader.ggbAct('end', vstack[ vstack.length - 1 ]); 
		}
		break;
		case 2:
		{
			 rval = JXG.GeogebraReader.ggbAct('coord', vstack[ vstack.length - 4 ], vstack[ vstack.length - 2 ], element); 
		}
		break;
		case 3:
		{
			 rval = JXG.GeogebraReader.ggbAct('le', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 4:
		{
			 rval = JXG.GeogebraReader.ggbAct('ge', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 5:
		{
			 rval = JXG.GeogebraReader.ggbAct('eq', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 6:
		{
			 rval = JXG.GeogebraReader.ggbAct('neq', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 7:
		{
			 rval = JXG.GeogebraReader.ggbAct('lt', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 8:
		{
			 rval = JXG.GeogebraReader.ggbAct('gt', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 9:
		{
			 rval = JXG.GeogebraReader.ggbAct('add', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 10:
		{
			 rval = JXG.GeogebraReader.ggbAct('sub', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 11:
		{
			 rval = JXG.GeogebraReader.ggbAct('neg', vstack[ vstack.length - 1 ]); 
		}
		break;
		case 12:
		{
			 rval = JXG.GeogebraReader.ggbAct('pow', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 13:
		{
			 rval = JXG.GeogebraReader.ggbAct('or', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 14:
		{
			 rval = JXG.GeogebraReader.ggbAct('and', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 15:
		{
			 rval = JXG.GeogebraReader.ggbAct('mul', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 16:
		{
			 rval = JXG.GeogebraReader.ggbAct('div', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 17:
		{
			 rval = JXG.GeogebraReader.ggbAct('negmult', vstack[ vstack.length - 1 ]); 
		}
		break;
		case 18:
		{
			 rval = JXG.GeogebraReader.ggbAct('bra', vstack[ vstack.length - 2 ]); 
		}
		break;
		case 19:
		{
			 rval = JXG.GeogebraReader.ggbAct('string', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
		}
		break;
		case 20:
		{
			 rval = JXG.GeogebraReader.ggbAct('int', vstack[ vstack.length - 1 ]); 
		}
		break;
		case 21:
		{
			 rval = JXG.GeogebraReader.ggbAct('float', vstack[ vstack.length - 1 ]); 
		}
		break;
		case 22:
		{
			 rval = JXG.GeogebraReader.ggbAct('param', vstack[ vstack.length - 1 ]); 
		}
		break;
		case 23:
		{
			 rval = JXG.GeogebraReader.ggbAct('html', vstack[ vstack.length - 1 ]); 
		}
		break;
		case 24:
		{
			 rval = JXG.GeogebraReader.ggbAct('string', vstack[ vstack.length - 1 ]); 
		}
		break;
		case 25:
		{
			 rval = JXG.GeogebraReader.ggbAct('command', vstack[ vstack.length - 1 ]); 
		}
		break;
		case 26:
		{
			 rval = JXG.GeogebraReader.ggbAct('var', vstack[ vstack.length - 4 ], vstack[ vstack.length - 2 ]); 
		}
		break;
		case 27:
		{
			 rval = JXG.GeogebraReader.ggbAct('var', vstack[ vstack.length - 1 ]); 
		}
		break;
	}



				if( _dbg_withtrace )
					__dbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );

				for( var i = 0; i < pop_tab[act][1]; i++ )
				{
					sstack.pop();
					str = vstack.pop();
				}

				go = -1;
				for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
				{
					if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
					{
						go = goto_tab[sstack[sstack.length-1]][i+1];
						break;
					}
				}

				if( act == 0 )
					break;

				if( _dbg_withtrace )
					__dbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );

				sstack.push( go );
				vstack.push( rval );			
			}

			if( _dbg_withtrace )
			{		
				JXG.debug( _dbg_string );
				_dbg_string = new String();
			}
		}

		if( _dbg_withtrace )
		{
			__dbg_print( "\nParse complete." );
			JXG.debug( _dbg_string );
		}

		return err_cnt;
	}
/***** end replace *****/

  var error_offsets = new Array();
  var error_lookaheads = new Array();
  var error_count = 0;
  var str = exp;
  if( ( error_count = __parse( str, error_offsets, error_lookaheads ) ) > 0 ) {
    var errstr = new String();
    for( var i = 0; i < error_count; i++ )
      errstr += "Parse error in line " + ( str.substr( 0, error_offsets[i] ).match( /\n/g ) ?
                  str.substr( 0, error_offsets[i] ).match( /\n/g ).length : 1 )
                + " near \"" + str.substr( error_offsets[i] ) + "\", expecting \"" + error_lookaheads[i].join() + "\"\n" ;
    JXG.debug( errstr );
  }

  return str;
}; //end: ggbParse()


/**
 * Override JSxGraph defaults with Geogebra settings
 * @param {Object} board object
 * @return {Object} board oject
 */
this.setDefaultOptions = function(board){
  board.options.elements.strokeWidth = '1px'; // TODO: board.options.line.strokeWidth
  board.options.elements.withLabel = true;

  board.options.point.face = 'circle';
  board.options.point.size = 3;
  board.options.point.fillColor = 'blue';
  board.options.point.fillOpacity = 1;
  board.options.point.highlightFillOpacity = 1;
  board.options.point.strokeColor = 'black';
  board.options.point.highlightStrokeColor = 'black';
  board.options.point.strokeWidth = '2px';

  board.options.line.strokeWidth = '1px';
  board.options.line.highlightStrokeColor = '#000000';
  board.options.line.strokeColor = '#000000';

  board.options.polygon.fillColor = JXG.rgb2hex(153, 51, 0);
  board.options.polygon.fillOpacity = 0.1;
  board.options.polygon.highlightFillColor = board.options.polygon.fillColor;
  board.options.polygon.highlightFillOpacity = 0.1;

  board.options.sector.fillColor = JXG.rgb2hex(153, 51, 0);
  board.options.sector.fillOpacity = 0.1;
  board.options.sector.highlightFillColor = board.options.sector.fillColor;
  board.options.sector.highlightFillOpacity = 0.1;

  board.options.angle.fillColor = JXG.rgb2hex(0, 100, 0);
  board.options.angle.fillOpacity = 0.1;
  //board.options.angle.highlightFillColor = board.options.angle.fillColor;
  board.options.angle.highlightFillOpacity = 0.1;

  return board;
};

/**
 * Set color properties of a geogebra element.
 * Set stroke, fill, lighting, label and draft color attributes.
 * @param {Object} gxtEl element of which attributes are to set
 * @param {Object} attr object carrying all necessary attribute values
 * @return {Object} returning the updated attr-attributes object
 */
this.colorProperties = function(Data, attr) {
  var a,r,g,b;
  a = (Data.getElementsByTagName("objColor").length > 0 && Data.getElementsByTagName("objColor")[0].getAttribute("alpha")) ? parseFloat(Data.getElementsByTagName("objColor")[0].getAttribute("alpha")) : 0;
  r = (Data.getElementsByTagName("objColor").length > 0 && Data.getElementsByTagName("objColor")[0].getAttribute("r")) ? parseInt(Data.getElementsByTagName("objColor")[0].getAttribute("r")).toString(16) : 0;
  g = (Data.getElementsByTagName("objColor").length > 0 && Data.getElementsByTagName("objColor")[0].getAttribute("g")) ? parseInt(Data.getElementsByTagName("objColor")[0].getAttribute("g")).toString(16) : 0;
  b = (Data.getElementsByTagName("objColor").length > 0 && Data.getElementsByTagName("objColor")[0].getAttribute("b")) ? parseInt(Data.getElementsByTagName("objColor")[0].getAttribute("b")).toString(16) : 0;
  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  attr.fillColor = '#'+ r + g + b;
  attr.strokeColor = attr.fillColor;
  attr.highlightFillColor = attr.fillColor;
  attr.highlightStrokeColor = attr.strokeColor;
  attr.fillOpacity = a;
  attr.highlightFillOpacity = a;
  attr.labelColor = attr.fillColor;

  return attr;
};

/**
 * Set the board properties.
 * Set active, area, dash, draft and showinfo attributes.
 * @param {Object} gxtEl element of which attributes are to set
 * @param {Object} Data element of which attributes are to set
 * @param {Object} attr object containing the necessary attribute values
 */
this.boardProperties = function(gxtEl, Data, attr) {
  return attr;
};

/**
 * @param {Object} gxtEl element of which attributes are to set
 * @param {Object} Data element of which attributes are to set
 * @return {Object} updated element
 */
this.coordinates = function(gxtEl, Data) {
  var labelOffset = {}, tmp;
  labelOffset.x = 0; labelOffset.y = 0; labelOffset.z = 0;

  if(Data.getElementsByTagName('labelOffset')[0]) {
    // tmp = new JXG.Coords(JXG.COORDS_BY_SCREEN, [,
    //                                             parseFloat(Data.getElementsByTagName("labelOffset")[0].attributes["y"].value)], JXG.GeogebraReader.board);
    labelOffset.x = parseFloat(Data.getElementsByTagName("labelOffset")[0].getAttribute("x"))/JXG.GeogebraReader.board.unitX;
    labelOffset.y = parseFloat(Data.getElementsByTagName("labelOffset")[0].getAttribute("y"))/JXG.GeogebraReader.board.unitY;
  }

  if(Data.getElementsByTagName("coords")[0]) {
    gxtEl.x = parseFloat(Data.getElementsByTagName("coords")[0].getAttribute("x"));
    gxtEl.y = parseFloat(Data.getElementsByTagName("coords")[0].getAttribute("y"));
    gxtEl.z = parseFloat(Data.getElementsByTagName("coords")[0].getAttribute("z"));
  } else if(Data.getElementsByTagName("startPoint")[0]) {
    if(Data.getElementsByTagName("startPoint")[0].getAttribute('exp')) {
      var a = JXG.getRef(JXG.GeogebraReader.board, Data.getElementsByTagName("startPoint")[0].getAttribute('exp'));
      gxtEl.x = function() {return a.X()+labelOffset.x;};
      gxtEl.y = function() {return a.Y()-labelOffset.y;}; // minus because geogebra starts on the other side
      gxtEl.z = false;
    } else {
      gxtEl.x = parseFloat(Data.getElementsByTagName("startPoint")[0].getAttribute("x"));
      gxtEl.y = parseFloat(Data.getElementsByTagName("startPoint")[0].getAttribute("y"));
      gxtEl.z = parseFloat(Data.getElementsByTagName("startPoint")[0].getAttribute("z"));
    }
  } else if(Data.getElementsByTagName("absoluteScreenLocation")[0]) {
    var tmp = new JXG.Coords(JXG.COORDS_BY_SCREEN, [parseFloat(Data.getElementsByTagName("absoluteScreenLocation")[0].getAttribute("x")),
                                                    parseFloat(Data.getElementsByTagName("absoluteScreenLocation")[0].getAttribute("y"))], JXG.GeogebraReader.board);
    gxtEl.x = tmp.usrCoords[1]+labelOffset.x;
    gxtEl.y = tmp.usrCoords[2]+labelOffset.y;
    gxtEl.z = false;
  } else {
    return false;
  }

  return gxtEl;
};

/**
 * Writing element attributes to the given object
 * @param {XMLNode} Data expects the content of the current element
 * @return {Object} object with according attributes
 */
this.visualProperties = function(Data, attr) {
  (Data.getElementsByTagName("show").length != 0 && Data.getElementsByTagName("show")[0].getAttribute("object")) ? attr.visible = Data.getElementsByTagName("show")[0].getAttribute("object") : false;
  (Data.getElementsByTagName("show").length != 0 && Data.getElementsByTagName("show")[0].getAttribute("label")) ? attr.withLabel = Data.getElementsByTagName("show")[0].getAttribute("label") : true;
  if(attr.withLabel == 'true') {
     attr.withLabel = true;
  }
  else if(attr.withLabel == 'false') {
     attr.withLabel = false;
  }
  (Data.getElementsByTagName('pointSize')[0]) ? attr.size = Data.getElementsByTagName('pointSize')[0].getAttribute("val") : false;
  (Data.getElementsByTagName('pointStyle')[0]) ? attr.styleGGB = Data.getElementsByTagName('pointStyle')[0].getAttribute("val") : false;
   if(attr.styleGGB == 0 || attr.styleGGB == 2) {
      attr.face = 'circle';
      if(attr.styleGGB == 0) {
        attr.fillColor = attr.strokeColor;
        attr.fillOpacity = 1;
        attr.highlightFillColor = attr.strokeColor;
        attr.highlightFillOpacity = 1;
        attr.strokeColor = 'black';
        attr.strokeWidth = '1px';
      }
      else if(attr.styleGGB == 2) {
        attr.fillColor = 'none';
      }
   }
   else if(attr.styleGGB == 1) {
      attr.face = 'x';
   }
   else if(attr.styleGGB == 3) {
      attr.face = '+';
      attr.strokeOpacity = 1;
   }
   else if(attr.styleGGB == 4 || attr.styleGGB == 5) {
      attr.face = 'diamond';
      if(attr.styleGGB == 4) {
         attr.fillColor = attr.strokeColor;
         attr.fillOpacity = 1;
      }
      else if(attr.styleGGB == 5) {
        attr.fillColor = 'none';
      }
   }
   else if(attr.styleGGB == 6) {
      attr.face = 'triangleUp';
      attr.fillColor = attr.strokeColor;
      attr.fillOpacity = 1;
   }
   else if(attr.styleGGB == 7) {
      attr.face = 'triangleDown';
      attr.fillColor = attr.strokeColor;
      attr.fillOpacity = 1;
   }
   else if(attr.styleGGB == 8) {
      attr.face = 'triangleRight';
      attr.fillColor = attr.strokeColor;
      attr.fillOpacity = 1;
   }
   else if(attr.styleGGB == 9) {
      attr.face = 'triangleLeft';
      attr.fillColor = attr.strokeColor;
      attr.fillOpacity = 1;
   }
  (Data.getElementsByTagName('slopeTriangleSize')[0]) ? attr.slopeWidth = Data.getElementsByTagName('slopeTriangleSize')[0].getAttribute("val") : false;
  (Data.getElementsByTagName('lineStyle')[0]) ? attr.strokeWidth = (Data.getElementsByTagName('lineStyle')[0].getAttribute("thickness")/2.0)+'px' : false;
  if(attr.strokeWidth) {
    attr.highlightStrokeWidth = (1*attr.strokeWidth.substr(0,attr.strokeWidth.length-2)+1)+'px';
  }
  (Data.getElementsByTagName('lineStyle')[0]) ? attr.dashGGB = Data.getElementsByTagName('lineStyle')[0].getAttribute("type") : false;

   if(attr.dashGGB == 0) {
      attr.dash = 0;
   }
   else if(attr.dashGGB == 10) {
      attr.dash = 2;
   }
   else if(attr.dashGGB == 15) {
      attr.dash = 3;
   }
   else if(attr.dashGGB == 20) {
      attr.dash = 1;
   }
   else if(attr.dashGGB == 30) {
      attr.dash = 6;
   }
  (Data.getElementsByTagName("labelOffset")[0]) ? attr.labelX = 1*Data.getElementsByTagName("labelOffset")[0].getAttribute("x") : false;
  (Data.getElementsByTagName("labelOffset")[0]) ? attr.labelY = 1*Data.getElementsByTagName("labelOffset")[0].getAttribute("y") : false;
  (Data.getElementsByTagName("trace")[0]) ? attr.trace = Data.getElementsByTagName("trace")[0].getAttribute("val") : false;
  (Data.getElementsByTagName('fix')[0]) ? attr.fixed = Data.getElementsByTagName('fix')[0].getAttribute("val") : false;
  return attr;
};

/**
 * Searching for an element in the geogebra tree
 * @param {String} the name of the element to search for
 * @param {Boolean} whether it is search for an expression or not
 * @return {Object} object with according label
 */
this.getElement = function(name, expr) {
  var Data, i, j;
  expr = expr || false;
  for(i=0; i<JXG.GeogebraReader.tree.getElementsByTagName("construction").length; i++)
    if(expr == false) {
      for(j=0; j<JXG.GeogebraReader.tree.getElementsByTagName("construction")[i].getElementsByTagName("element").length; j++) {
        Data = JXG.GeogebraReader.tree.getElementsByTagName("construction")[i].getElementsByTagName("element")[j];
        if(name == Data.getAttribute("label")) {
          return Data;
        }
      };
    } else {
      for(j=0; j<JXG.GeogebraReader.tree.getElementsByTagName("construction")[i].getElementsByTagName("expression").length; j++) {
        Data = JXG.GeogebraReader.tree.getElementsByTagName("construction")[i].getElementsByTagName("expression")[j];
        if(name == Data.getAttribute("label")) {
          return Data;
        }
      };
    }
  return false;
};

/**
 * Check if an element is already registered in the temporary ggbElements register. If not, create and register the element.
 * @param {String} the name of the element to check
 * @return {Object} newly created element
 */
this.checkElement = function(name) {
// Segment[A, B] nur bis Version 2.4 ? In 2.5 schon (x(A), x(B)) und durch Parser loesbar
  // if(name.match(/[a-zA-Z]+\[[a-zA-Z0-9]+[a-zA-Z0-9,\ ]*\]/)) {
  //   var tmp, type, input, output, i;
  //   tmp = name.split('[');
  //   type = tmp[0];
  //   input = tmp[1].split(']');
  //   input = input[0].split(', ');
  //   for(i=0; i<input.length; i++) {
  //     input[i] = JXG.GeogebraReader.checkElement(input[i]);
  //   }
  //   output = {
  //     'attributes' : []
  //   };
  //   output.attributes['type'] = {value: type };
  //   output.attributes['label'] = {value: name};
  //
  //   JXG.GeogebraReader.board.ggbElements[name] = JXG.GeogebraReader.writeElement(JXG.GeogebraReader.board, name, input, type);
  // } else
  if(typeof JXG.GeogebraReader.board.ggbElements[name] == 'undefined' || JXG.GeogebraReader.board.ggbElements[name] == '') {
    var input = JXG.GeogebraReader.getElement(name);
    JXG.GeogebraReader.board.ggbElements[name] = JXG.GeogebraReader.writeElement(JXG.GeogebraReader.board, input);
  }
  return JXG.GeogebraReader.board.ggbElements[name];
};

/**
 * Prepare expression for this.ggbParse with solving multiplications and replacing mathematical functions.
 * @param {String} exp Expression to parse and correct
 * @return {String} correct expression with fixed function and multiplication
 */
this.functionParse = function(type, exp) {
 var input, vars, expr, output, i, s, o;
 switch(type) {
  case 'c':
    // search for function params
    if(exp.match(/[a-zA-Z0-9\']+\([a-zA-Z0-9]+[a-zA-Z0-9,\ ]*\)[\ ]*[=][\ ]*[a-zA-Z0-9\+\-\*\/ \( \) \u005E]+/)) {
      input = exp.split('(')[1].split(')')[0];
      vars = input.split(', ');

      output = [];
      for(i=0; i<vars.length; i++)
        output.push("__"+vars[i]);

      expr = exp.split('=')[1];

      // separate and replace function parameters
      for(i=0; i<vars.length; i++) {
        if(vars[i] == 'x') {
          expr = expr.replace(/(?![e])x(?!\()(?![p])/g, '__'+vars[i]);
        } else if(vars[i] == 'y') {
          expr = expr.replace(/(?![e])y(?!\()(?![p])/g, '__'+vars[i]);
        } else {
          expr = expr.replace( eval('/'+vars[i]+'/g'), '__'+vars[i] );
        }
      }

      // replace -__x to -1*__x
      expr = expr.replace(/-__/g, '-1*__');

	  if(JXG.GeogebraReader.format <= 3.01) {
	    // prepare string: "solve" multiplications 'a b' to 'a*b'
	    s = expr.split(' ');
	    o = '';
	    for(var i=0; i<s.length; i++) {
	      if(s.length != i+1)
	        if(s[i].search(/\)$/) > -1 || s[i].search(/[0-9]+$/) > -1 || s[i].search(/[a-zA-Z]+(\_*[a-zA-Z0-9]+)*$/) > -1)
	          if(s[i+1].search(/^\(/) > -1 ||
                 s[i+1].search(/^[0-9]+/) > -1 ||
                 s[i+1].search(/^[a-zA-Z]+(\_*[a-zA-Z0-9]+)*/) > -1 ||
                 s[i+1].search(/\_\_[a-zA-Z0-9]+/) > -1) {
	               s[i] = s[i] + "*";
                 }
	      o += s[i];
	    };
	    expr = o;
	  }

      output.push(expr);
      return output;
    } else {
      return exp;
    }
  break;
  case 's':
    exp = exp.replace(/(?![e])x(?!\()(?![p])/g, '__x');
    return ['__x', exp];
  break;
  default:
    if(JXG.GeogebraReader.format <= 3.01) {
	  // prepare string: "solve" multiplications 'a b' to 'a*b'
	  s = exp.split(' ');
	  o = '';
      for(i=0; i<s.length; i++) {
        if(s.length != i+1)
          if(s[i].search(/\)$/) > -1 || s[i].search(/[0-9]+$/) > -1 || s[i].search(/[a-zA-Z]+(\_*[a-zA-Z0-9]+)*$/) > -1)
            if(s[i+1].search(/^\(/) > -1 ||
              s[i+1].search(/^[0-9]+/) > -1 ||
              s[i+1].search(/^[a-zA-Z]+(\_*[a-zA-Z0-9]+)*/) > -1 ||
              s[i+1].search(/\_\_[a-zA-Z0-9]+/) > -1) {
                s[i] = s[i] + "*";
            }
	    o += s[i];
	  };
	  exp = o;
	}
    return exp;
  break;
 }
};

/**
 * Searching for an element in the geogebra tree
 * @param {Object} board object
 */
this.writeBoard = function(board) {
  var boardData = JXG.GeogebraReader.tree.getElementsByTagName("euclidianView")[0];

  board.origin = {};
  board.origin.usrCoords = [1, 0, 0];
  board.origin.scrCoords = [1, 1*boardData.getElementsByTagName("coordSystem")[0].getAttribute("xZero"), 1*boardData.getElementsByTagName("coordSystem")[0].getAttribute("yZero")];
  board.unitX = (boardData.getElementsByTagName("coordSystem")[0].getAttribute("scale")) ? 1*boardData.getElementsByTagName("coordSystem")[0].getAttribute("scale") : 1;
  board.unitY = (boardData.getElementsByTagName("coordSystem")[0].getAttribute("yscale")) ? 1*boardData.getElementsByTagName("coordSystem")[0].getAttribute("yscale") : board.unitX;

  board.fontSize = (JXG.GeogebraReader.tree.getElementsByTagName("gui")[0] && JXG.GeogebraReader.tree.getElementsByTagName("gui")[0].getElementsByTagName("font")[0]) ? 1*JXG.GeogebraReader.tree.getElementsByTagName("gui")[0].getElementsByTagName("font")[0].getAttribute("size") : '12px';

  JXG.JSXGraph.boards[board.id] = board;

  // Update of properties during update() is not necessary in GEONExT files
  board.renderer.enhancedRendering = true;

  // snap to point
  var snapToPoint = (boardData.getElementsByTagName('evSettings')[0].getAttribute("pointCapturing") == "true");

  var grid = (boardData.getElementsByTagName('evSettings')[0].getAttribute("grid") == "true") ? board.create('grid') : null;

  if(boardData.getElementsByTagName('evSettings')[0].getAttribute("axes") && boardData.getElementsByTagName('evSettings')[0].getAttribute("axes") == "true") {
      board.ggbElements["xAxis"] = board.create('axis', [[0, 0], [1, 0]], {strokeColor:'black', minorTicks: 0});
      board.ggbElements["yAxis"] = board.create('axis', [[0, 0], [0, 1]], {strokeColor:'black', minorTicks: 0});
  }
};

/**
 * Searching for an element in the geogebra tree
 * @param {Object} board object
 * @param {Object} ggb element whose attributes are to parse
 * @param {Array} input list of all input elements
 * @param {String} typeName output construction method
 * @return {Object} return newly created element or false
 */
this.writeElement = function(board, output, input, cmd) {
  var element, gxtEl, attr, p, exp, coord, type, points, border, length, m, s, e, sx, sy, ex, ey, func, range;
  element = (JXG.isArray(output)) ? output[0] : output;

  gxtEl = {}; // geometric element
  attr = {}; // Attributes of geometric elements

  JXG.debug(element);

  gxtEl.type = (element && element.attributes && typeof cmd === 'undefined') ? element.getAttribute('type').toLowerCase() : cmd;
  gxtEl.label = element.getAttribute('label');
  attr.name  = gxtEl.label;

  JXG.debug("<br><b>Konstruiere</b> "+ attr.name +"("+ gxtEl.type +"):");

  switch(gxtEl.type) {
    case 'point':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      if(JXG.GeogebraReader.getElement(attr.name, true)) {
        exp = JXG.GeogebraReader.getElement(attr.name, true).getAttribute('exp');
        coord = JXG.GeogebraReader.ggbParse(exp);
        gxtEl.x = new Function('return '+ coord[0] +';');
        gxtEl.y = new Function('return '+ coord[1] +';');
      } else {
        gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      }
      if(!JXG.exists(attr.styleGGB)) {
         attr.face = 'circle';
         attr.fillColor = attr.strokeColor;
         attr.fillOpacity = 1;
         attr.highlightFillColor = attr.strokeColor;
         attr.highlightFillOpacity = 1;
         attr.strokeColor = 'black';
         attr.strokeWidth = '1px';
      }

      JXG.debug(gxtEl);
      JXG.debug(input);

      try {
        var ma = /Circle\[\s*(\w+)\s*,\s*([\d\.]+)\s*\]/.exec(input);
        if(typeof input != 'undefined') {
          if (ma!=null && ma.length==3) {
            // from Circle[A, 5] take "A" and "5", stored in ma[1] and ma[2]
            var q = JXG.GeogebraReader.checkElement(ma[1]);
            var c = board.create('circle', [q, parseFloat(ma[2])], {fillColor:'none',visible:false,name:''});
            p = board.create('glider', [gxtEl.x, gxtEl.y, c], attr);
          } else if(JXG.isArray(input)) {
            p = board.create('glider', [gxtEl.x, gxtEl.y, input[0]], attr);
          } else {
            p = board.create('glider', [gxtEl.x, gxtEl.y, input], attr);
          }
        } else {
          p = board.create('point', [gxtEl.x, gxtEl.y], attr);
        }
        return p;
      } catch(e) {
          JXG.debug("* <b>Err:</b> Point " + attr.name +"<br>\n");
          return false;
      }
    break;
    case 'segment':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Segment:</b> ("+ attr.name +") First: " + input[0].name + ", Last: " + input[1].name + "<br>\n");
        attr.straightFirst = false;
        attr.straightLast =  false;
        p = board.create('line', input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Segment " + attr.name +" First: " + input[0].name + ", Last: " + input[1].name + "<br>\n");
        return false;
      }
    break;
    case 'line':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      type = 'line';
      if(!input) {
        input = [ parseFloat(element.getElementsByTagName('coords')[0].getAttribute('z')),
                      parseFloat(element.getElementsByTagName('coords')[0].getAttribute('x')),
                      parseFloat(element.getElementsByTagName('coords')[0].getAttribute('y'))
                    ];
      } else if (JXG.getRef(board, input[1].id).elementClass == JXG.OBJECT_CLASS_LINE) {
         type = 'parallel'; // Parallele durch Punkt
      }

      try {
        p = board.create(type, input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Line " + attr.label +"<br>\n");
        return false;
      }
    break;
    case "orthogonalline":
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Orthogonalline:</b> First: " + input[0].id + ", Last: " + input[1].id + "<br>\n");
        p = board.create('normal', input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Orthogonalline " + attr.label +"<br>\n");
        return false;
      }
    break;
    case "polygon":
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      // test if polygon is regular
      if(input.length == 3 && output.length != 4) {
        input[2] = parseInt(input[2]);
        type = 'regular';
      }

      try {
        JXG.debug("* <b>Polygon:</b> First: " + input[0].name + ", Second: " + input[1].name + ", Third: " + input[2] + "<br>\n");

        var borders = [];
        var borderatts = [];
        length = (type == 'regular') ? output.length-input[2]+2 : output.length;

        for(var i=1; i<length; i++) {
          borders[i-1] = {};
          borderatts[i-1] = {};
          borders[i-1].id = '';
          borders[i-1].name = output[i].getAttribute('label');
          borderatts[i-1] = JXG.GeogebraReader.colorProperties(output[i], borderatts[i-1]);
          borderatts[i-1] = JXG.GeogebraReader.visualProperties(output[i], borderatts[i-1]);
          // JXG.debug("border["+ typeof borders[i-1] +"]: "+ borders[i-1].name);
        }
        attr.borders = borders;

        points = [];
        if(type == 'regular') {
          points.push(input[0]);
          points.push(input[1]);

          for(i=input[2]+1; i<output.length; i++){
            if(output[i].attributes)
              points.push(JXG.GeogebraReader.checkElement(output[i].getAttribute('label')));
            else
              points.push(output[i]);
          }
        } else {
          for(i=0; i<input.length; i++) {
            if(typeof input[i] === 'object') {
              points.push(input[i]);
              // JXG.debug("input-queue: added "+ input[i].name);
            }
          }
        }

        if(type == 'regular') {
          p = board.create('regularpolygon', points, attr);
        }
        else {
          p = board.create('polygon', points, attr);
        }
        for(i=0; i<p.borders.length; i++) {
            if(borderatts[i].withLabel) {
                p.borders[i].createLabel();
            }
            p.borders[i].setProperty(borderatts[i]);
        }
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Polygon " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'intersect':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Intersection:</b> First: " + input[0].name + ", Second: " + input[1].name + "<br>\n");
        if(!JXG.exists(attr.styleGGB)) {
           attr.face = 'circle';
           attr.fillColor = attr.strokeColor;
           attr.fillOpacity = 1;
           attr.highlightFillColor = attr.strokeColor;
           attr.highlightFillOpacity = 1;
           attr.strokeColor = 'black';
           attr.strokeWidth = '1px';
        }
        if(output.length == 1) {
           p = board.create('intersection', [input[0], input[1], 0], attr);
        }
        else {
           p = board.create('intersection', [input[0], input[1], 1], attr);
           var attr2 = {};
           attr2 = JXG.GeogebraReader.colorProperties(output[1], attr2);
           attr2 = JXG.GeogebraReader.visualProperties(output[1], attr2);
           attr2.name = output[1].getAttribute('label');
           var p2 = board.create('otherintersection', [input[0], input[1], p], attr2);
           board.ggbElements[attr2.name] = p2;
        }

        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Intersection " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'distance':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);


      try {
        JXG.debug("* <b>Distance:</b> First: " + input[0].name + ", Second: " + input[1].name + "<br>\n");

        if(false && output[0].getAtribute('type') && output[0].getAttribute('type') == 'numeric') {
          input[1].Value = function(){ return this.X(); };
          p = input[1];
          board.elementsByName[attr.name] = p;
        } else {
          m = board.create('midpoint', input, {visible: 'false'});
          attr.visible = 'true';
          p = board.create('text', [function(){return m.X();}, function(){return m.Y();}, function(){
              return "<span style='text-decoration: overline'>"+ input[0].name + input[1].name +"</span> = "
                     + JXG.trimNumber(JXG.getRef(board, input[0].id).Dist(JXG.getRef(board, input[1].id)).toFixed(JXG.GeogebraReader.decimals));
                }], attr);
          p.Value = function () {
            return (JXG.getRef(board, input[0].id).Dist(JXG.getRef(board, input[1].id)));
          }
        }
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Distance " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'vector':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      if(element.getElementsByTagName("startPoint")[0]) {

        if(input && input.length == 2) {
            e = JXG.GeogebraReader.checkElement(input[1].name);
        } else {
            e = [parseFloat(element.getElementsByTagName("coords")[0].getAttribute("x")), parseFloat(element.getElementsByTagName("coords")[0].getAttribute("y"))];
        }
        if(element.getElementsByTagName("startPoint")[0].getAttribute("x") && element.getElementsByTagName("startPoint")[0].getAttribute("y")) {
            s = [parseFloat(element.getElementsByTagName("startPoint")[0].getAttribute("x")), parseFloat(element.getElementsByTagName("startPoint")[0].getAttribute("y"))];
        } else if(element.getElementsByTagName("startPoint")[0].getAttribute("exp")) {
            var startpoint = element.getElementsByTagName("startPoint")[0].getAttribute("exp");
            s = JXG.GeogebraReader.checkElement(startpoint);
        }
      } else if(input && input.length != 0) {
        s = input[0];
        e = input[1];
      } else {
        exp = JXG.GeogebraReader.getElement(element.getAttribute('label'), true);
        if(exp) {// experimental
            exp = exp.getAttribute('exp');
            // exp = JXG.GeogebraReader.functionParse('', exp);
            exp = JXG.GeogebraReader.ggbParse(exp);
            if (JXG.isArray(exp))
            	exp = new Array(new Function('return '+ exp[1] +';'), new Function('return '+ exp[2] +';'));
            else
            	exp = new Function('return '+ exp +';');
            JXG.debug('exp: '+ exp);
            p = board.create('arrow', [[0,0], [exp[0], exp[1]]], attr);
            return p;
            //t = JXG.getRef(board, 'a');
            //s = t.point1;
            // var e = [-1*vector.point2.X(), -1*vector.point2.Y()];
            // attr.type = 'rotate';
            // var angle;
            // if(exp < 0) {
            //   angle = Math.PI;
            // } else if(exp == 0) {
            //   angle = 0;
            // } else {
            //   angle = Math.PI/exp;
            // }
            // needed: a clean rotating based on factor 'exp'

            // priorization of expression like 't*a' --> a := startPoint
        }
      }

      try {
        JXG.debug("* <b>Vector:</b> First: " + attr.name);
        p = board.create('arrow', [s, e], attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Vector " + attr.name + e +"<br>\n");
        return false;
      }
    break;
    case 'rotate':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Rotate:</b> First: " + input[0].name + ", Second: " + input[1] + "<br>\n");
        attr.type = 'rotate';

        if(!JXG.exists(attr.styleGGB)) {
           attr.face = 'circle';
           attr.fillColor = attr.strokeColor;
           attr.fillOpacity = 1;
           attr.highlightFillColor = attr.strokeColor;
           attr.highlightFillOpacity = 1;
           attr.strokeColor = 'black';
           attr.strokeWidth = '1px';
        }

        t = board.create('transform', [parseInt(input[1])*Math.PI/180, input[2]], {type:'rotate'});
        p = board.create('point', [input[0], t], attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Rotate " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'dilate':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Dilate:</b> First: " + input[0].name + ", Second: " + input[1] + "<br>\n");
        attr.type = 'rotate';
        var d = parseInt(input[1]);
        var d1 = board.create('transform', [d, d], {type:'scale'});
        var d2 = board.create('transform', [function() { return (1-d) * input[2].X(); },
                                               function() { return (1-d) * input[2].Y(); }], {type:'translate'});

        if(!JXG.exists(attr.styleGGB)) {
           attr.face = 'circle';
           attr.fillColor = attr.strokeColor;
           attr.fillOpacity = 1;
           attr.highlightFillColor = attr.strokeColor;
           attr.highlightFillOpacity = 1;
           attr.strokeColor = 'black';
           attr.strokeWidth = '1px';
        }
        p = board.create('point', [input[0], [d1, d2]], attr);

        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Dilate " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'translate':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
          t = board.create('transform', [function() { return input[1].point2.X()-input[1].point1.X(); },
                                         function() { return input[1].point2.Y()-input[1].point1.Y(); }], {type:'translate'});
          if(!JXG.exists(attr.styleGGB)) {
             attr.face = 'circle';
             attr.fillColor = attr.strokeColor;
             attr.fillOpacity = 1;
             attr.highlightFillColor = attr.strokeColor;
             attr.highlightFillOpacity = 1;
             attr.strokeColor = 'black';
             attr.strokeWidth = '1px';
          }
          p = board.create('point', [input[0], t], attr);
          return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Translate " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'mirror':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      if (JXG.isPoint(JXG.getRef(board, input[1].id))) var type = 'mirrorpoint'; // Punktspiegelung
      else if(JXG.getRef(board, input[1].id).elementClass == JXG.OBJECT_CLASS_LINE) var type = 'reflection'; // Geradenspiegelung

      try {
        JXG.debug("* <b>Mirror:</b> First: " + input[0].name + ", Second: " + input[1].name + "<br>\n");
        p = board.create(type, [input[1], input[0]], attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Mirror " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'circle':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Circle:</b> First: " + input[0].name + ", Second: " + input[1] + "<br>\n");
        p = board.create('circle', input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Circle " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'circlearc':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>CircleArc:</b> First: " + input[0].name + ", Second: " + input[1].name + "<br>\n");
        p = board.create('arc', input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> CircleArc " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'ellipse':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Ellipse:</b> First: " + input[0].name + ", Second: " + input[1].name + ", Third: "+ input[2] +"<br>\n");
        // if third parameters is the major axis, else the third parameter is a point
        if(parseInt(input[2]) == input[2])
          input[2] = parseInt(input[2]*2); // Geogebra delivers the half major axis

        p = board.create('ellipse', input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Ellipse " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'conic':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

//      try {
	/*
        // is there an expression named like the conic?
        var exp = JXG.GeogebraReader.getElement(attr.name, true);

        // then get the function parameteres
        if(exp.attributes['exp']){
          // exp = JXG.GeogebraReader.functionParse(exp.attributes['exp'].value);
          // exp = JXG.GeogebraReader.ggbParse(exp.attributes['exp'].value);



          // (exp.getElementsByTagName('value')) ? exp = parseFloat(exp.getElementsByTagName('value')[0].attributes['val'].value) : false;

        } else */ if(input && input.length == 5) {
          p = board.create('conic', input, attr);
        } else if(element.getElementsByTagName('matrix')) {
          m = [];
          for(var i=0; i<element.getElementsByTagName('matrix')[0].attributes.length; i++) {
            m[i] = parseFloat(element.getElementsByTagName('matrix')[0].attributes[i].value);
          }
          p = board.create('conic', m, attr);
        }

        return p;
//      } catch(e) {
//        JXG.debug("* <b>Err:</b> Conic " + attr.name +"<br>\n");
//        return false;
//      }
    break;
    case 'circlesector':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);
      //attr.names = [attr.name,'','',''];
      //attr2 = {};
      //attr2.names = attr.names;
      try {
        JXG.debug("* <b>CircleSector:</b> First: " + input[0].name + ", Second: " + input[1].name + ", Third: " + input[2].name + "<br>\n");
        p = board.create('sector', [input[0],input[1],input[2]], attr);
        /*
        p.point4.hideElement();
        p.arc.setProperty(attr);
        p.arc.visProp.highlightstrokewidth = (1*p.arc.visProp.strokewidth.substr(0,p.arc.visProp.strokewidth.length-2)+1)+'px';
        p.lines[0].setProperty(attr);
        p.lines[1].setProperty(attr);
        p.lines[0].visProp.highlightstrokewidth = (1*p.lines[0].visProp.strokerwWidth.substr(0,p.lines[0].visProp.strokewidth.length-2)+1)+'px';
        p.lines[1].visProp.highlightstrokewidth = (1*p.lines[1].visProp.strokerwWidth.substr(0,p.lines[1].visProp.strokewidth.length-2)+1)+'px';
        p.arc.hasPoint = p.arc.hasPointSector;
        p.arc.highlight = (function(el){ return function() {
            this.board.renderer.highlight(this);
            this.board.renderer.highlight(el.lines[0]);
            this.board.renderer.highlight(el.lines[1]);
        };})(p);
        p.arc.noHighlight = (function(el){ return function() {
            this.board.renderer.noHighlight(this);
            this.board.renderer.noHighlight(el.lines[0]);
            this.board.renderer.noHighlight(el.lines[1]);
        };})(p);
        p.lines[0].highlight = (function(el){ return function() {
            this.board.renderer.highlight(this);
            this.board.renderer.highlight(el.arc);
            this.board.renderer.highlight(el.lines[1]);
        };})(p);
        p.lines[1].highlight = (function(el){ return function() {
            this.board.renderer.highlight(this);
            this.board.renderer.highlight(el.arc);
            this.board.renderer.highlight(el.lines[0]);
        };})(p);
        p.lines[0].noHighlight = (function(el){ return function() {
            this.board.renderer.noHighlight(this);
            this.board.renderer.noHighlight(el.arc);
            this.board.renderer.noHighlight(el.lines[1]);
        };})(p);
        p.lines[1].noHighlight = (function(el){ return function() {
            this.board.renderer.noHighlight(this);
            this.board.renderer.noHighlight(el.arc);
            this.board.renderer.noHighlight(el.lines[0]);
        };})(p);
        */
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> CircleSector " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'linebisector':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>LineBiSector (Mittelsenkrechte):</b> First: " + input[0].name + "<br>\n");
        m = board.create('midpoint', input, {visible: false});
        if(JXG.isPoint(JXG.getRef(board, input[0].id)) && 
           JXG.isPoint(JXG.getRef(board, input[1].id))) {
          t = board.create('line', input, {visible: 'false'});
          p = board.create('perpendicular', [m, t], attr);
          // p.point.setProperty('visible:false');
        } else {
          p = board.create('perpendicular', [m, input[0]], attr);
          // p.point.setProperty('visible:false');
        }
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> LineBiSector (Mittelsenkrechte) " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'ray':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Ray:</b> First: " + input[0].name + "<br>\n");
        attr.straightFirst = true;
        attr.straightLast =  false;
        p = board.create('line', [input[1], input[0]], attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Ray " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'tangent':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Tangent:</b> First: " + input[0].name + ", Sec.: "+ input[1].name +"("+ input[1].type +")<br>\n");
        switch(input[1].type) {
          case 1330923344: // graph
            input[0].makeGlider(input[1]);
            p = board.create('tangent', [input[0]], attr);
            return p;
          break;
          case 1330922316: // circle 0x4F54434C
          case 1330922319: // conic 0x4F54434F
            var pol = board.create('polar',[input[1],input[0]],{visible:false});
	        var i1 = board.create('intersection', [input[1], pol, 0], {visible: false});
	        var i2 = board.create('intersection', [input[1], pol, 1], {visible: false});
	        var t1 = board.create('line', [input[0], i1], attr);
            var attr2 = {};
            attr2 = JXG.GeogebraReader.colorProperties(output[1], attr2);
            attr2 = JXG.GeogebraReader.visualProperties(output[1], attr2);
            attr2.name = output[1].getAttribute('label');
            var t2 = board.create('line', [input[0], i2], attr2);
            board.ggbElements[attr2.name] = t2;
            return [t1, t2];
          break;
        }
      } catch(e) {
        JXG.debug("* <b>Err:</b> Tangent " + attr.name +" "+ attr2.name + "<br>\n");
        return false;
      }
    break;
    case 'circumcirclearc':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>CircumcircleArc:</b> First: " + input[0].name + "<br>\n");
        p = board.create('circumcirclearc', input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> CircumcircleArc " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'circumcirclesector':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>CircumcircleSector:</b> First: " + input[0].name + "<br>\n");
        p = board.create('circumcirclesector', [input[0], input[1], input[2]], attr); //{name:attr['name']});
        /*
        p.arc.setProperty(attr);
        p.lines[0].setProperty(attr);
        p.lines[1].setProperty(attr);
        p.arc.visProp.highlightstrokewidth = (1*p.arc.visProp.strokewidth.substr(0,p.arc.visProp.strokewidth.length-2)+1)+'px';
        p.lines[0].visProp.highlightstrokewidth = (1*p.lines[0].visProp.strokewidth.substr(0,p.lines[0].visProp.strokewidth.length-2)+1)+'px';
        p.lines[1].visProp.highlightstrokewidth = (1*p.lines[1].visProp.strokewidth.substr(0,p.lines[1].visProp.strokewidth.length-2)+1)+'px';
        p.arc.hasPoint = p.arc.hasPointSector;
        p.arc.highlight = (function(el){ return function() {
            this.board.renderer.highlight(this);
            this.board.renderer.highlight(el.lines[0]);
            this.board.renderer.highlight(el.lines[1]);
        };})(p);
        p.arc.noHighlight = (function(el){ return function() {
            this.board.renderer.noHighlight(this);
            this.board.renderer.noHighlight(el.lines[0]);
            this.board.renderer.noHighlight(el.lines[1]);
        };})(p);
        p.lines[0].highlight = (function(el){ return function() {
            this.board.renderer.highlight(this);
            this.board.renderer.highlight(el.arc);
            this.board.renderer.highlight(el.lines[1]);
        };})(p);
        p.lines[1].highlight = (function(el){ return function() {
            this.board.renderer.highlight(this);
            this.board.renderer.highlight(el.arc);
            this.board.renderer.highlight(el.lines[0]);
        };})(p);
        p.lines[0].noHighlight = (function(el){ return function() {
            this.board.renderer.noHighlight(this);
            this.board.renderer.noHighlight(el.arc);
            this.board.renderer.noHighlight(el.lines[1]);
        };})(p);
        p.lines[1].noHighlight = (function(el){ return function() {
            this.board.renderer.noHighlight(this);
            this.board.renderer.noHighlight(el.arc);
            this.board.renderer.noHighlight(el.lines[0]);
        };})(p);
        */
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> CircumcircleSector " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'semicircle':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Semicircle:</b> First: " + input[0].name + "<br>\n");
        p = board.create('semicircle', [input[0], input[1]], attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Semicircle " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'angle':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Angle:</b> First: " + input[0].name + "<br>\n");
        p = board.create('angle', input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Angle " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'angularbisector':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);
      attr.straightFirst = true;
      attr.straightLast = true;

      try {
        JXG.debug("* <b>Angularbisector:</b> First: " + input[0].name + "<br>\n");
        p = board.create('bisector', input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Angularbisector " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'numeric':
    if(element.getElementsByTagName('slider').length == 0) {
      // auxiliary doesn't exist in every numeric
      //element.getElementsByTagName('auxiliary').length != 0 && element.getElementsByTagName('auxiliary')[0].attributes['val'].value == 'true') {
      exp = JXG.GeogebraReader.getElement(element.getAttribute('label'), true);
      if(exp) {
    	  exp = exp.getAttribute('exp');
    	  exp = JXG.GeogebraReader.functionParse('', exp);
    	  exp = JXG.GeogebraReader.ggbParse(exp);
      }
      board.ggb[attr.name] = new Function('return '+ exp +';');
      JXG.debug('value: '+ board.ggb[attr.name]());
      return board.ggb[attr.name];
	} else {
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      // gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);
      if(element.getElementsByTagName('slider').length == 1) { // it's a slider
        sx = parseFloat(element.getElementsByTagName('slider')[0].getAttribute('x'));
        sy = parseFloat(element.getElementsByTagName('slider')[0].getAttribute('y'));
        length = parseFloat(element.getElementsByTagName('slider')[0].getAttribute('width'));
        // are coordinates absolut?
        if(element.getElementsByTagName('slider')[0].getAttribute('absoluteScreenLocation') && element.getElementsByTagName('slider')[0].getAttribute('absoluteScreenLocation') == 'true') {
          var tmp = new JXG.Coords(JXG.COORDS_BY_SCREEN, [sx, sy], board);
          sx = tmp.usrCoords[1];
          sy = tmp.usrCoords[2];
        }

        if(element.getElementsByTagName('slider')[0].getAttribute('horizontal') == 'true') {
          if(element.getElementsByTagName('slider')[0].getAttribute('absoluteScreenLocation') && element.getElementsByTagName('slider')[0].getAttribute('absoluteScreenLocation') == 'true')
          length /= (board.unitX); //*board.zoomX);
          ex = sx + length;
          ey = sy;
        } else {
          if(element.getElementsByTagName('slider')[0].getAttribute('absoluteScreenLocation') && element.getElementsByTagName('slider')[0].getAttribute('absoluteScreenLocation') == 'true')
          length /= (board.unitY); //*board.zoomY);
          ex = sx;
          ey = sy + length;
        }

        (element.getElementsByTagName('animation')[0]) ? attr.snapWidth = parseFloat(element.getElementsByTagName('animation')[0].getAttribute('step')) : false;

        try {
          JXG.debug("* <b>Numeric:</b> First: " + attr.name + "<br>\n");
          attr['withTicks'] = false;
          p = board.create('slider', [[sx,sy], [ex,ey], [parseFloat(element.getElementsByTagName('slider')[0].getAttribute('min')),
                                                         parseFloat(element.getElementsByTagName('value')[0].getAttribute('val')),
                                                         parseFloat(element.getElementsByTagName('slider')[0].getAttribute('max'))]], attr);
          p.setProperty({withLabel:false});
          return p;
        } catch(e) {
          JXG.debug("* <b>Err:</b> Numeric " + attr.name +"<br>\n");
          return false;
        }
      }
    }
    break;
    case 'midpoint':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
          if(!JXG.exists(attr.styleGGB)) {
             attr.face = 'circle';
             attr.fillColor = attr.strokeColor;
             attr.fillOpacity = 1;
             attr.highlightFillColor = attr.strokeColor;
             attr.highlightFillOpacity = 1;
             attr.strokeColor = 'black';
             attr.strokeWidth = '1px';
          }
          p = board.create('midpoint', input, attr);
          JXG.debug("* <b>Midpoint ("+ p.id +"):</b> "+ attr.name + "("+ gxtEl.x +", "+ gxtEl.y +")<br>\n");
          return p;
      } catch(e) {
          JXG.debug("* <b>Err:</b> Midpoint " + attr.name +"<br>\n");
          return false;
      }
    break;
    case 'center':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);
      try {
          if(!JXG.exists(attr.styleGGB)) {
             attr.face = 'circle';
             attr.fillColor = attr.strokeColor;
             attr.fillOpacity = 1;
             attr.highlightFillColor = attr.strokeColor;
             attr.highlightFillOpacity = 1;
             attr.strokeColor = 'black';
             attr.strokeWidth = '1px';
          }
          p = board.create('point', [function() { return JXG.getRef(board, input[0].id).center.X(); },
                                     function() { return JXG.getRef(board, input[0].id).center.Y(); }], attr);
          JXG.debug("* <b>Center ("+ p.id +"):</b> "+ attr.name + "("+ gxtEl.x +", "+ gxtEl.y +")<br>\n");
          return p;
      } catch(e) {
          JXG.debug("* <b>Err:</b> Center " + attr.name +"<br>\n");
          return false;
      }
    break;
    case 'function':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      if(JXG.GeogebraReader.getElement(attr.name, true)) {
        func = JXG.GeogebraReader.getElement(attr.name, true).getAttribute('exp');
        func = JXG.GeogebraReader.functionParse('c', func);
      } else {
        func = input[0];
        func = JXG.GeogebraReader.functionParse('s', func);
      }

      JXG.debug(func);

      length = func.length;
      func[func.length-1] = 'return '+ JXG.GeogebraReader.ggbParse(func[func.length-1]) +';';

      JXG.debug(func);

      range = [(input && input[1]) ? input[1] : null, (input && input[2]) ? input[2] : null];

      try {
        if(length == 1)
          p = board.create('functiongraph', [new Function(func[0]), range[0], range[1]], attr);
        else if(length==2)
          p = board.create('functiongraph', [new Function(func[0], func[1]), range[0], range[1]], attr);
        else if(length==3)
          p = board.create('functiongraph', [new Function(func[0], func[1], func[2]), range[0], range[1]], attr);
        else if(length==4)
          p = board.create('functiongraph', [new Function(func[0], func[1], func[2], func[3]), range[0], range[1]], attr);
        else if(length==5)
          p = board.create('functiongraph', [new Function(func[0], func[1], func[2], func[3], func[4]), range[0], range[1]], attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Functiongraph " + attr.name +"<br>\n");
        return false;
      }

     break;
     case 'polar':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Polar:</b> First: " + input[0].name + ", Sec.: "+ input[1].name +"<br>\n");
        p = board.create('polar', input, attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Polar " + attr.name +"<br>\n");
        return false;
      }
    break;
    case 'slope':
     attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
     attr = JXG.GeogebraReader.colorProperties(element, attr);
     gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
     attr = JXG.GeogebraReader.visualProperties(element, attr);

     try {
       JXG.debug("* <b>Slope ("+ attr.name +"):</b> First: " + input[0].name +"<br>\n");
       var slopeWidth = parseInt(attr.slopeWidth) || 1.0;
       var p1 = input[0].glider || input[0].point1;
       var p2 = board.create('point',[function(){return (slopeWidth+p1.X());}, function(){return p1.Y();}], {visible: false});
       var l1 = board.create('segment', [p1, p2], {visible: false}); // visible: attr.visible
       var l2 = board.create('normal', [l1, l1.point2], {visible: false}); // visible attr.visible
       var i  = board.create('intersection', [input[0], l2, 0], {visible: false});
       var m  = board.create('midpoint', [l1.point2, i], {visible: false});

       var t = board.create('text', [function(){return m.X();}, function(){return m.Y();},
                      function(){ return "&nbsp;&nbsp;" + (slopeWidth > 1 ? slopeWidth.toString() : "") + " " + this.name + " = " + JXG.trimNumber((slopeWidth * input[0].getSlope()).toFixed(JXG.GeogebraReader.decimals)); }], attr);
       attr.name = "";
       var t2 = board.create('text', [function(){return (p1.X() + p2.X())/2.;}, function(){return p1.Y();},
                                     function(){ return "<br/>" + slopeWidth; }], attr);
       t.Value = (function() { return function(){ return input[0].getSlope(); }; })();
       var poly = board.create('polygon',[p1,p2,i], attr);

       poly.borders[2].setProperty({visible: false});
       poly.borders[0].setProperty({strokeColor: attr.fillColor, strokeWidth: attr.strokeWidth, highlightStrokeColor: attr.fillColor, dash:attr.dash});
       poly.borders[1].setProperty({strokeColor: attr.fillColor, strokeWidth: attr.strokeWidth, highlightStrokeColor: attr.fillColor, dash:attr.dash});       
       return t;
     } catch(e) {
       JXG.debug("* <b>Err:</b> Slope " + attr.name +"<br>\n");
       return false;
     }
    break;
    case 'text':
     attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
     attr = JXG.GeogebraReader.colorProperties(element, attr);
     gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
     attr = JXG.GeogebraReader.visualProperties(element, attr);
     var rx, res = '';

     try {
       if(element.getElementsByTagName('isLaTeX')[0] && element.getElementsByTagName('isLaTeX')[0].getAttribute('val') == 'true') {
         JXG.GeogebraReader.board.options.text.useASCIIMathML = true;
         t = JXG.GeogebraReader.getElement(attr.name, true).getAttribute('exp');

         // here we're searching for patterns like
         //    " + ... + "
         // ... will be sent to the ggbParser and a calculated text element is built from this.
         while(rx = t.match(/(.*?)" \+ (.+) \+ "(.*)/)) {
             var re2 = JXG.GeogebraReader.ggbParse(RegExp.$2);
             if (typeof re2 == 'string') {
               res = res + RegExp.$1 + re2;
             } else {
               res = res + RegExp.$1 + '" + JXG.trimNumber((' + re2 + ').toFixed(JXG.GeogebraReader.decimals)) + "';
             }
             t = RegExp.$3;
         }
         // we have to look, if the string's ending with a string-part or a formula part:
         if(rx = t.match(/(.*?)" \+ (.+)/)) {
             res = res + RegExp.$1 + '" + JXG.trimNumber((' + JXG.GeogebraReader.ggbParse(RegExp.$2) + ').toFixed(JXG.GeogebraReader.decimals))';
         } else
             res = res + t;

         JXG.debug("Text: "+res);

         p = board.create('text', [gxtEl.x, gxtEl.y, new Function('return ' + res + ';')], attr);
       } else {
         JXG.debug(JXG.GeogebraReader.getElement(attr.name, true).getAttribute('exp'));
         t = JXG.GeogebraReader.ggbParse(JXG.GeogebraReader.functionParse(false, JXG.GeogebraReader.getElement(attr.name, true).getAttribute('exp')));
         JXG.debug(t[1]);
         p = board.create('text', [gxtEl.x, gxtEl.y, new Function('return '+t[0]+' + " " + JXG.trimNumber(parseFloat(' + t[1] +').toFixed(JXG.GeogebraReader.decimals));') ], attr);
       }
       JXG.debug("* <b>Text:</b> " + t  +"<br>\n");
       return p;
     } catch(e) {
      JXG.debug("* <b>Err:</b> Text: " + t +"<br>\n");
      return false;
     }
    break;
    case 'root':
        attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
        attr = JXG.GeogebraReader.colorProperties(element, attr);
        gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
        attr = JXG.GeogebraReader.visualProperties(element, attr);
        //JXG.debug(JXG.getRef(board, gxtEl.id));

        for(var i=0; i<output.length; i++) {
          output[i] = JXG.GeogebraReader.checkElement(output[i].getAttribute('label'));
        }
        
        var inp;
        if(JXG.isArray(input)) {
            inp = input[0];
        } else {
            inp = input;
        }

        // At this point, the output points already exist. 
        // Bind the root function to all output elements.
        // The start values for all output elements are the x-coordinates as given
        // in the ggb file.
        for(i=0; i<output.length; i++) {
            output[i].addConstraint([
                    (function(x){ return function(){ return board.root(inp.Y,x,inp);}; })(output[i].X()), 
                    function(){ return 0;}
                ]);
        }
        //var p = board.create('point', [function(){ return board.root(output);}, function(){ return 1;}], attr);
        return output; // What to return here????
    break;
  case 'integral':
      attr = JXG.GeogebraReader.boardProperties(gxtEl, element, attr);
      attr = JXG.GeogebraReader.colorProperties(element, attr);
      gxtEl = JXG.GeogebraReader.coordinates(gxtEl, element);
      attr = JXG.GeogebraReader.visualProperties(element, attr);

      try {
        JXG.debug("* <b>Integral:</b> First: " + input[0].name + ", Sec.: "+ input[1].name +", Thir.: "+ input[2].name +"<br>\n");
        JXG.debug([input[1](), input[2]()]);
        var p = board.create('integral', [JXG.getRef(board, input[0]), [input[1], input[2]]], attr);
        return p;
      } catch(e) {
        JXG.debug("* <b>Err:</b> Integral " + attr.name + e + "<br>\n");
        return false;
      }
    break;

// case 'transform':
// break;
//    case 'radius':
//    break;
//    case 'derivative':
//    break;
//    case 'root':
//    break;
//    case 'corner':
//    break;
//    case 'unitvector':
//    break;
//    case 'extremum':
//    break;
//    case 'turningpoint':
//    break;
//    case 'arc':
//    break;
//    case 'circlepart':
//    break;
//    case 'uppersum':
//    break;
//    case 'lowersum':
//    break;
//    case 'image':
//    break;
    default:
      return false;
    break;
  }
};

/**
 * Reading the elements of a geogebra file
 * @param {Object} board board object
 */
this.readGeogebra = function(tree, board) {
  var el, Data, i, els = [], expr;

  board.ggbElements = [];
  board.ggb = {};
  JXG.GeogebraReader.tree = tree;
  JXG.GeogebraReader.board = board;
  JXG.GeogebraReader.format = parseFloat(JXG.GeogebraReader.tree.getElementsByTagName('geogebra')[0].getAttribute('format'));
  JXG.GeogebraReader.decimals = parseInt(JXG.GeogebraReader.tree.getElementsByTagName('geogebra')[0].getElementsByTagName('kernel')[0].getElementsByTagName('decimals')[0].getAttribute('val'));
  JXG.GeogebraReader.writeBoard(board);
  board = JXG.GeogebraReader.setDefaultOptions(board);

  // speeding up the drawing process
  //board.suspendUpdate();

  var constructions = JXG.GeogebraReader.tree.getElementsByTagName("construction");
  for (var t=0; t<constructions.length; t++) {

    var cmds = constructions[t].getElementsByTagName("command");
    for (var s=0; s<cmds.length; s++) {
      Data = cmds[s];

      // JXG.debug('now i\'ll parse the command:');
      // JXG.debug(Data);

      var input = [];
      for (i=0; i<Data.getElementsByTagName("input")[0].attributes.length; i++) {
        el = Data.getElementsByTagName("input")[0].attributes[i].value;
        if(el.match(/\u00B0/) || !el.match(/\D/) || el.match(/Circle/) || Data.getAttribute('name') == 'Function' || el == parseFloat(el) ) {
          input[i] = el;
        // } else if(el.match(/[a-zA-Z]+\[[a-zA-Z0-9]+[a-zA-Z0-9,\ ]*\]/)) {
        //   input[i] = JXG.GeogebraReader.writeElement(board, )
        } else if(el == 'xAxis' || el == 'yAxis') {
          input[i] = board.ggbElements[el];
        } else {
          input[i] = JXG.GeogebraReader.checkElement(el);
        }
      };

      var output = [], elname = Data.getElementsByTagName("output")[0].attributes[0].value;
      for (i=0; i<Data.getElementsByTagName("output")[0].attributes.length; i++) {
        el = Data.getElementsByTagName("output")[0].attributes[i].value;
        output[i] = JXG.GeogebraReader.getElement(el);
      };
      if(typeof board.ggbElements[elname] == 'undefined' || board.ggbElements[elname] == '') {
        board.ggbElements[elname] = JXG.GeogebraReader.writeElement(board, output, input, Data.getAttribute('name').toLowerCase());
        // JXG.debug("regged: "+board.ggbElements[elname].id+"<br/>");

        /* register borders to according "parent" */
        if(board.ggbElements[elname].borders)
          for(var i=0; i<board.ggbElements[elname].borders.length; i++) {
            board.ggbElements[board.ggbElements[elname].borders[i].name] = board.ggbElements[elname].borders[i];
            // JXG.debug(i+") regged: "+board.ggbElements[elname].borders[i].name+"("+ board.ggbElements[board.ggbElements[elname].borders[i].name].id +")<br/>");
          };
      }
    };

    JXG.debug('Restesammler: ');
    // create "single" elements which do not depend on any other
    var elements = constructions[t].getElementsByTagName("element");
    for (var s=0; s<elements.length; s++) {
      var Data = elements[s];
      var el = Data.getAttribute('label');

      if(typeof board.ggbElements[el] == 'undefined' || board.ggbElements[el] == '') {
        board.ggbElements[el] = JXG.GeogebraReader.writeElement(board, Data);

        if(expr = JXG.GeogebraReader.getElement(el, true)) {
          var type = Data.getAttribute('type');
          switch(type) {
            case 'text':
            case 'function':
              // board.ggbElements[el] = JXG.GeogebraReader.writeElement(board.ggbElements, board, expr, false, type);
            break;
            default:
              JXG.GeogebraReader.ggbParse(expr.getAttribute('exp'), el);
            break;
          }
        }

      }
    };

  }; // end: for construction

  // speeding up the drawing process
  board.unsuspendUpdate();

  board.fullUpdate();
 // delete(board.ggbElements);
};

/**
 * Clean the utf8-symbols in a Geogebra expression in JavaScript syntax
 * @param {String} string to clean
 * @return {String} replaced string
 */
this.utf8replace = function(exp) {
  exp = (exp.match(/\u03C0/)) ? exp.replace(/\u03C0/g, 'PI') : exp;
  exp = (exp.match(/\u00B2/)) ? exp.replace(/\u00B2/g, '^2') : exp;
  exp = (exp.match(/\u00B3/)) ? exp.replace(/\u00B3/g, '^3') : exp;
  exp = (exp.match(/\u225F/)) ? exp.replace(/\u225F/g, '==') : exp;
  exp = (exp.match(/\u2260/)) ? exp.replace(/\u2260/g, '!=') : exp;
  exp = (exp.match(/\u2264/)) ? exp.replace(/\u2264/g, '<=') : exp;
  exp = (exp.match(/\u2265/)) ? exp.replace(/\u2265/g, '>=') : exp;
  exp = (exp.match(/\u2227/)) ? exp.replace(/\u2227/g, '&&') : exp;
  exp = (exp.match(/\u2228/)) ? exp.replace(/\u2228/g, '//') : exp;
  return exp;
};

/**
 * Extracting the packed geogebra file in order to return the "blank" xml-tree for further parsing.
 * @param {String} archive containing geogebra.xml-file or raw input string (eg. xml-tree)
 * @return {String} content of geogebra.xml-file if archive was passed in
 */
this.prepareString = function(fileStr, isString) {
    var i, bA, len, fstr;

    // here we have to deal with two different base64 encoded streams
    // first one: base64 encoded xml (geogebra's web export)
    // second one: base64 encoded ggb file, this is our recommendation for an IE & Opera
    // workaround, which can't deal with binary data transferred via AJAX.

    // first try to decode assuming we got a base64 encoded ggb file
    if(isString) {
        fstr = JXG.Util.Base64.decode(fileStr);
        if(fstr.slice(0,2)!=="PK") {
            // ooops, that was no ggb file. try again with utf8 parameter set.
            fstr = JXG.Util.Base64.decode(fileStr, true);
        }
        fileStr = fstr;
    }

    if (fileStr.indexOf('<') != 0) {
        bA = [];
        len = fileStr.length;
        for (i=0;i<len;i++)
            bA[i]=JXG.Util.asciiCharCodeAt(fileStr,i);
        // Unzip
        fileStr = (new JXG.Util.Unzip(bA)).unzipFile("geogebra.xml");
    }
    fileStr = JXG.Util.utf8Decode(fileStr);
    fileStr = JXG.GeogebraReader.utf8replace(fileStr);
    return fileStr;
};

/**
 * Checking if a parameter is a Geogebra vector (array with length 3)
 * @param {Object} possible Geogebra vector
 * @return {boolean}
 */
this.isGGBVector = function(v){
	return JXG.isArray(v) && v.length == 3 && v[0] == 1;	
};
}; // end: GeogebraReader()
