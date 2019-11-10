(function (global, factory) {
  (factory((global['MMTF'] = global.MMTF || {})));
}(this, function (exports) { 'use strict';

  /**
   * @file utf8-utils
   * @private
   * @author Alexander Rose <alexander.rose@weirdbyte.de>
   * mostly copied from https://github.com/creationix/msgpack-js-browser
   * by Tim Caswell <tim@creationix.com>, MIT License, Copyright (c) 2013
   */


  // Encode string as utf8 into dataview at offset
  function utf8Write(view, offset, string) {
    var byteLength = view.byteLength;
    for(var i = 0, l = string.length; i < l; i++) {
      var codePoint = string.charCodeAt(i);

      // One byte of UTF-8
      if (codePoint < 0x80) {
        view.setUint8(offset++, codePoint >>> 0 & 0x7f | 0x00);
        continue;
      }

      // Two bytes of UTF-8
      if (codePoint < 0x800) {
        view.setUint8(offset++, codePoint >>> 6 & 0x1f | 0xc0);
        view.setUint8(offset++, codePoint >>> 0 & 0x3f | 0x80);
        continue;
      }

      // Three bytes of UTF-8.
      if (codePoint < 0x10000) {
        view.setUint8(offset++, codePoint >>> 12 & 0x0f | 0xe0);
        view.setUint8(offset++, codePoint >>> 6  & 0x3f | 0x80);
        view.setUint8(offset++, codePoint >>> 0  & 0x3f | 0x80);
        continue;
      }

      // Four bytes of UTF-8
      if (codePoint < 0x110000) {
        view.setUint8(offset++, codePoint >>> 18 & 0x07 | 0xf0);
        view.setUint8(offset++, codePoint >>> 12 & 0x3f | 0x80);
        view.setUint8(offset++, codePoint >>> 6  & 0x3f | 0x80);
        view.setUint8(offset++, codePoint >>> 0  & 0x3f | 0x80);
        continue;
      }
      throw new Error("bad codepoint " + codePoint);
    }
  }

  function utf8ByteCount(string) {
    var count = 0;
    for(var i = 0, l = string.length; i < l; i++) {
      var codePoint = string.charCodeAt(i);
      if (codePoint < 0x80) {
        count += 1;
        continue;
      }
      if (codePoint < 0x800) {
        count += 2;
        continue;
      }
      if (codePoint < 0x10000) {
        count += 3;
        continue;
      }
      if (codePoint < 0x110000) {
        count += 4;
        continue;
      }
      throw new Error("bad codepoint " + codePoint);
    }
    return count;
  }

  /**
   * encode data value (recursively) into binary encoded MessagePack v5 (http://msgpack.org/)
   * @param  {Object|Array|String|Number|Boolean|null} value  [description]
   * @param  {DataView} view   [description]
   * @param  {Integer} offset [description]
   * @return {Integer} number of bytes written into view
   */
  function encode$1(value, view, offset) {
    var type = typeof value;

    // Strings Bytes
    if (type === "string") {
      var length = utf8ByteCount(value);
      // fix str
      if (length < 0x20) {
        view.setUint8(offset, length | 0xa0);
        utf8Write(view, offset + 1, value);
        return 1 + length;
      }
      // str 8
      if (length < 0x100) {
        view.setUint8(offset, 0xd9);
        view.setUint8(offset + 1, length);
        utf8Write(view, offset + 2, value);
        return 2 + length;
      }
      // str 16
      if (length < 0x10000) {
        view.setUint8(offset, 0xda);
        view.setUint16(offset + 1, length);
        utf8Write(view, offset + 3, value);
        return 3 + length;
      }
      // str 32
      if (length < 0x100000000) {
        view.setUint8(offset, 0xdb);
        view.setUint32(offset + 1, length);
        utf8Write(view, offset + 5, value);
        return 5 + length;
      }
    }

    if (value instanceof Uint8Array) {
      var length = value.byteLength;
      var bytes = new Uint8Array(view.buffer);
      // bin 8
      if (length < 0x100) {
        view.setUint8(offset, 0xc4);
        view.setUint8(offset + 1, length);
        bytes.set(value, offset + 2);
        return 2 + length;
      }
      // bin 16
      if (length < 0x10000) {
        view.setUint8(offset, 0xc5);
        view.setUint16(offset + 1, length);
        bytes.set(value, offset + 3);
        return 3 + length;
      }
      // bin 32
      if (length < 0x100000000) {
        view.setUint8(offset, 0xc6);
        view.setUint32(offset + 1, length);
        bytes.set(value, offset + 5);
        return 5 + length;
      }
    }

    if (type === "number") {
      if (!isFinite(value)) {
          throw new Error("Number not finite: " + value);
      }

      // Floating point
      if (Math.floor(value) !== value) {
        view.setUint8(offset, 0xcb);
        view.setFloat64(offset + 1, value);
        return 9;
      }

      // Integers
      if (value >=0) {
        // positive fixnum
        if (value < 0x80) {
          view.setUint8(offset, value);
          return 1;
        }
        // uint 8
        if (value < 0x100) {
          view.setUint8(offset, 0xcc);
          view.setUint8(offset + 1, value);
          return 2;
        }
        // uint 16
        if (value < 0x10000) {
          view.setUint8(offset, 0xcd);
          view.setUint16(offset + 1, value);
          return 3;
        }
        // uint 32
        if (value < 0x100000000) {
          view.setUint8(offset, 0xce);
          view.setUint32(offset + 1, value);
          return 5;
        }
        throw new Error("Number too big 0x" + value.toString(16));
      }
      // negative fixnum
      if (value >= -0x20) {
        view.setInt8(offset, value);
        return 1;
      }
      // int 8
      if (value >= -0x80) {
        view.setUint8(offset, 0xd0);
        view.setInt8(offset + 1, value);
        return 2;
      }
      // int 16
      if (value >= -0x8000) {
        view.setUint8(offset, 0xd1);
        view.setInt16(offset + 1, value);
        return 3;
      }
      // int 32
      if (value >= -0x80000000) {
        view.setUint8(offset, 0xd2);
        view.setInt32(offset + 1, value);
        return 5;
      }
      throw new Error("Number too small -0x" + (-value).toString(16).substr(1));
    }

    // null
    if (value === null) {
      view.setUint8(offset, 0xc0);
      return 1;
    }

    // Boolean
    if (type === "boolean") {
      view.setUint8(offset, value ? 0xc3 : 0xc2);
      return 1;
    }

    // Container Types
    if (type === "object") {
      var length, size = 0;
      var isArray = Array.isArray(value);

      if (isArray) {
        length = value.length;
      }
      else {
        var keys = Object.keys(value);
        length = keys.length;
      }

      var size;
      if (length < 0x10) {
        view.setUint8(offset, length | (isArray ? 0x90 : 0x80));
        size = 1;
      }
      else if (length < 0x10000) {
        view.setUint8(offset, isArray ? 0xdc : 0xde);
        view.setUint16(offset + 1, length);
        size = 3;
      }
      else if (length < 0x100000000) {
        view.setUint8(offset, isArray ? 0xdd : 0xdf);
        view.setUint32(offset + 1, length);
        size = 5;
      }

      if (isArray) {
        for (var i = 0; i < length; i++) {
          size += encode$1(value[i], view, offset + size);
        }
      }
      else {
        for (var i = 0; i < length; i++) {
          var key = keys[i];
          size += encode$1(key, view, offset + size);
          size += encode$1(value[key], view, offset + size);
        }
      }

      return size;
    }
    throw new Error("Unknown type " + type);
  }

  function encodedSize(value) {
    var type = typeof value;

    // Raw Bytes
    if (type === "string") {
      var length = utf8ByteCount(value);
      if (length < 0x20) {
        return 1 + length;
      }
      if (length < 0x100) {
        return 2 + length;
      }
      if (length < 0x10000) {
        return 3 + length;
      }
      if (length < 0x100000000) {
        return 5 + length;
      }
    }

    if (value instanceof Uint8Array) {
      var length = value.byteLength;
      if (length < 0x100) {
        return 2 + length;
      }
      if (length < 0x10000) {
        return 3 + length;
      }
      if (length < 0x100000000) {
        return 5 + length;
      }
    }

    if (type === "number") {
      // Floating Point
      // double
      if (Math.floor(value) !== value) return 9;

      // Integers
      if (value >=0) {
        // positive fixnum
        if (value < 0x80) return 1;
        // uint 8
        if (value < 0x100) return 2;
        // uint 16
        if (value < 0x10000) return 3;
        // uint 32
        if (value < 0x100000000) return 5;
        throw new Error("Number too big 0x" + value.toString(16));
      }
      // negative fixnum
      if (value >= -0x20) return 1;
      // int 8
      if (value >= -0x80) return 2;
      // int 16
      if (value >= -0x8000) return 3;
      // int 32
      if (value >= -0x80000000) return 5;
      throw new Error("Number too small -0x" + value.toString(16).substr(1));
    }

    // Boolean, null
    if (type === "boolean" || value === null) return 1;

    // Container Types
    if (type === "object") {
      var length, size = 0;
      if (Array.isArray(value)) {
        length = value.length;
        for (var i = 0; i < length; i++) {
          size += encodedSize(value[i]);
        }
      }
      else {
        var keys = Object.keys(value);
        length = keys.length;
        for (var i = 0; i < length; i++) {
          var key = keys[i];
          size += encodedSize(key) + encodedSize(value[key]);
        }
      }
      if (length < 0x10) {
        return 1 + size;
      }
      if (length < 0x10000) {
        return 3 + size;
      }
      if (length < 0x100000000) {
        return 5 + size;
      }
      throw new Error("Array or object too long 0x" + length.toString(16));
    }
    throw new Error("Unknown type " + type);
  }

  function encodeMsgpack(value) {
    var buffer = new ArrayBuffer(encodedSize(value));
    var view = new DataView(buffer);
    encode$1(value, view, 0);
    return new Uint8Array(buffer);
  }

  /**
   * @file mmtf-constants
   * @private
   * @author Alexander Rose <alexander.rose@weirdbyte.de>
   */


  var PassThroughFields = [
      "mmtfVersion", "mmtfProducer",
      "unitCell", "spaceGroup", "structureId", "title",
      "depositionDate", "releaseDate",
      "experimentalMethods", "resolution", "rFree", "rWork",
      "bioAssemblyList", "ncsOperatorList", "entityList", "groupList",
      "numBonds", "numAtoms", "numGroups", "numChains", "numModels",
      "groupsPerChain", "chainsPerModel",
  ];

  var EncodedFields = [
  	// required
      "xCoordList", "yCoordList", "zCoordList",
      "groupIdList", "groupTypeList",
      "chainIdList",
      // optional
      "bFactorList", "atomIdList", "altLocList", "occupancyList",
      "secStructList", "insCodeList", "sequenceIndexList",
      "chainNameList",
      "bondAtomList", "bondOrderList"
  ];

  var AllFields = PassThroughFields.concat( EncodedFields );

  /**
   * @file mmtf-utils
   * @private
   * @author Alexander Rose <alexander.rose@weirdbyte.de>
   */

  /**
   * mmtf utils module.
   * @module MmtfUtils
   */


  function getView( ctor, typedArray, elemSize ){
      return typedArray ? new ctor(
          typedArray.buffer,
          typedArray.byteOffset,
          typedArray.byteLength / ( elemSize || 1 )
      ) : undefined;
  }

  function getDataView( typedArray ){
      return getView( DataView, typedArray );
  }

  /**
   * get an Uint8Array view on the input array memory
   * @static
   * @param  {TypedArray} dataArray - input array
   * @return {Uint8Array} new view on the input array memory
   */
  function getUint8View( typedArray ){
      return getView( Uint8Array, typedArray );
  }

  /**
   * get an Int8Array view on the input array memory
   * @static
   * @param  {TypedArray} dataArray - input array
   * @return {Int8Array} new view on the input array memory
   */
  function getInt8View( typedArray ){
      return getView( Int8Array, typedArray );
  }

  /**
   * get an Int32Array view on the input array memory
   * @static
   * @param  {TypedArray} dataArray - input array
   * @return {Int32Array} new view on the input array memory
   */
  function getInt32View( typedArray ){
      return getView( Int32Array, typedArray, 4 );
  }

  function getFloat32View( typedArray ){
      return getView( Float32Array, typedArray, 4 );
  }


  /**
   * get an Int16Array copy of the the input array data
   * @static
   * @param  {TypedArray} view - input data in big endian format
   * @param  {Int16Array} [dataArray] - pre-allocated output array
   * @return {Int16Array} copy of the input array data
   */
  function decodeInt16( bytes, output ){
      var n = bytes.length / 2;
      if( !output ) output = new Int16Array( n );
      for( var i = 0, i2 = 0; i < n; ++i, i2 += 2 ){
          output[ i ] = bytes[ i2 ] << 8 ^ bytes[ i2 + 1 ] << 0;
      }
      return output;
  }

  /**
   * make big endian buffer of an int16 array
   * @static
   * @param  {Array|TypedArray} array - array of int16 values
   * @return {ArrayBuffer} big endian buffer
   */
  function encodeInt16( array, output ){
      var n = array.length;
      if( !output ) output = new Uint8Array( 2 * n );
      var dv = getDataView( output );
      for( var i = 0; i < n; ++i ){
          dv.setInt16( 2 * i, array[ i ] );
      }
      return getUint8View( output );
  }

  /**
   * get an Int32Array copy of the the input array data
   * @static
   * @param  {TypedArray} view - input data in big endian format
   * @param  {Int32Array} [dataArray] - pre-allocated output array
   * @return {Int32Array} copy of the input array data
   */
  function decodeInt32( bytes, output ){
      var n = bytes.length / 4;
      if( !output ) output = new Int32Array( n );
      for( var i = 0, i4 = 0; i < n; ++i, i4 += 4 ){
          output[ i ] = (
              bytes[ i4     ] << 24 ^ bytes[ i4 + 1 ] << 16 ^
              bytes[ i4 + 2 ] <<  8 ^ bytes[ i4 + 3 ] <<  0
          );
      }
      return output;
  }

  /**
   * make big endian buffer of an int32 array
   * @static
   * @param  {Array|TypedArray} array - array of int32 values
   * @return {ArrayBuffer} big endian buffer
   */
  function encodeInt32( array, output ){
      var n = array.length;
      if( !output ) output = new Uint8Array( 4 * n );
      var dv = getDataView( output );
      for( var i = 0; i < n; ++i ){
          dv.setInt32( 4 * i, array[ i ] );
      }
      return getUint8View( output );
  }

  function decodeFloat32( bytes, output ){
      var n = bytes.length;
      if( !output ) output = new Float32Array( n / 4 );
      var dvOut = getDataView( output );
      var dvIn = getDataView( bytes );
      for( var i = 0, i4 = 0, il = n / 4; i < il; ++i, i4 += 4 ){
          dvOut.setFloat32( i4, dvIn.getFloat32( i4 ), true );
      }
      return output;
  }

  /**
   * decode integers into floats using given divisor
   * example:
   *     intArray: [ 12, 34, 543, 687, 2, 0, 4689 ]
   *     divisor: 100
   *     return: [ 0.12, 0.34, 5.43, 6.87, 0.02, 0.00, 46.89 ]
   * @static
   * @param  {TypedArray|Array} intArray - input array containing integers
   * @param  {Number} divisor - number to devide the integers to obtain floats
   * @param  {Float32Array} [dataArray] - pre-allocated output array
   * @return {Float32Array} decoded array
   */
  function decodeInteger( intArray, divisor, output ){
      var n = intArray.length;
      var invDiv = 1/divisor;
      if( !output ) output = new Float32Array( n );
      for( var i = 0; i < n; ++i ){
          // multiply by inverse of the divisor which is faster then division
          output[ i ] = intArray[ i ] * invDiv;
      }
      return output;
  }

  function encodeInteger( floatArray, factor, output ){
      var n = floatArray.length;
      if( !output ) output = new Int32Array( n );
      for( var i = 0; i < n; ++i ){
          output[ i ] = Math.round( floatArray[ i ] * factor );
      }
      return output;
  }



  /**
   * perform run-length decoding of input array
   * example:
   *     array: [ 0, 2, 3, 5 ]  // pairs of values and length of a run
   *     return: [ 0, 0, 3, 3, 3, 3, 3 ]
   * @static
   * @param  {TypedArray|Array} array - run-length encoded input array
   * @param  {TypedArray|Array} [dataArray] - pre-allocated output array
   * @return {TypedArray|Array} decoded array
   */
  function decodeRun( array, output ){
      var i, il;
      if( !output ){
          // calculate the length the decoded array will have
          var fullLength = 0;
          for( i = 0, il = array.length; i < il; i+=2 ){
              fullLength += array[ i + 1 ];
          }
          // create a new array of the same type of the input array
          output = new array.constructor( fullLength );
      }
      var dataOffset = 0;
      for( i = 0, il = array.length; i < il; i+=2 ){
          var value = array[ i ];  // value to be repeated
          var length = array[ i + 1 ];  // number of repeats
          for( var j = 0; j < length; ++j ){
              output[ dataOffset ] = value;
              ++dataOffset;
          }
      }
      return output;
  }

  function encodeRun( array ){
      if( array.length === 0 ) return new Int32Array();
      var i, il;
      // calculate output size
      var fullLength = 2;
      for( i = 1, il = array.length; i < il; ++i ){
          if( array[ i - 1 ] !== array[ i ] ){
              fullLength += 2;
          }
      }
      var output = new Int32Array( fullLength );
      var offset = 0;
      var runLength = 1;
      for( i = 1, il = array.length; i < il; ++i ){
          if( array[ i - 1 ] !== array[ i ] ){
              output[ offset ] = array[ i - 1 ];
              output[ offset + 1 ] = runLength;
              runLength = 1;
              offset += 2;
          }else{
              ++runLength;
          }
      }
      output[ offset ] = array[ array.length - 1 ];
      output[ offset + 1 ] = runLength;
      return output;
  }



  /**
   * perform delta decoding of the input array
   * by iterativly adding the ith element's value to the i+1th
   * example:
   *     dataArray: [ 0, 2, 1, 2, 1, 1, -4, -2, 9 ]
   *     return: [ 0, 2, 3, 5, 6, 7, 3, 1, 10 ]
   * @static
   * @param  {TypedArray|Array} dataArray - delta encoded input array
   * @return {TypedArray|Array} decoded array
   */
  function decodeDelta( array, output ){
      var n = array.length;
      if( !output ) output = new array.constructor( n );
      if( n ) output[ 0 ] = array[ 0 ];
      for( var i = 1; i < n; ++i ){
          output[ i ] = array[ i ] + output[ i - 1 ];
      }
      return output;
  }

  function encodeDelta( array, output ){
      var n = array.length;
      if( !output ) output = new array.constructor( n );
      output[ 0 ] = array[ 0 ];
      for( var i = 1; i < n; ++i ){
          output[ i ] = array[ i ] - array[ i - 1 ];
      }
      return output;
  }



  /**
   * [decodePacking description]
   * @param  {Int16Array|Int8Array} int16or8 [description]
   * @param  {Int32Array} output   [description]
   * @return {Int32Array}          [description]
   */
  function decodePacking( int16or8, output ){
      var upperLimit = int16or8 instanceof Int8Array ? 0x7F : 0x7FFF;
      var lowerLimit = -upperLimit - 1;
      var n = int16or8.length;
      var i, j;
      if( !output ){
          var fullLength = 0;
          for( i = 0; i < n; ++i ){
              if( int16or8[ i ] < upperLimit && int16or8[ i ] > lowerLimit ){
                  ++fullLength;
              }
          }
          output = new Int32Array( fullLength );
      }
      i = 0;
      j = 0;
      while( i < n ){
          var value = 0;
          while( int16or8[ i ] === upperLimit || int16or8[ i ] === lowerLimit ){
              value += int16or8[ i ];
              ++i;
          }
          value += int16or8[ i ];
          ++i;
          output[ j ] = value;
          ++j;
      }
      return output;
  }

  /**
   * integer packing using recursive indexing
   * @param  {Array|TyepedArray} intArray [description]
   * @param  {Boolean} useInt8  [description]
   * @return {Int16Array|Int8Array}          [description]
   */
  function encodePacking( intArray, useInt8 ){
      var upperLimit = useInt8 ? 0x7F : 0x7FFF;
      var lowerLimit = -upperLimit - 1;
      var i;
      var n = intArray.length;
      var size = 0;
      for( i = 0; i < n; ++i ){
          var value = intArray[ i ];
          if( value === 0 ){
              ++size;
          }else if( value === upperLimit || value === lowerLimit ){
              size += 2;
          }else if( value > 0) {
              size += Math.ceil( value / upperLimit );
          }else {
              size += Math.ceil( value / lowerLimit );
          }
      }
      var output = useInt8 ? new Int8Array( size ) : new Int16Array( size );
      var j = 0;
      for( i = 0; i < n; ++i ){
          var value = intArray[ i ];
          if( value >= 0) {
              while( value >= upperLimit ){
                  output[ j ] = upperLimit;
                  ++j;
                  value -= upperLimit;
              }
          }else{
              while( value <= lowerLimit ){
                  output[ j ] = lowerLimit;
                  ++j;
                  value -= lowerLimit;
              }
          }
          output[ j ] = value;
          ++j;
      }
      return output;
  }



  function decodeDeltaRun( array, output ){
      return decodeDelta( decodeRun( array ), output );
  }

  function encodeDeltaRun( array ){
      return encodeRun( encodeDelta( array ) );
  }



  /**
   * perform run-length decoding followed (@see decodeRunLength)
   * by decoding integers into floats using given divisor (@see decodeIntegerToFloat)
   * example:
   *     array: [ 320, 3, 100, 2 ]
   *     divisor: 100
   *     return: [ 3.20, 3.20, 3.20, 1.00, 1.00 ]
   * @static
   * @param  {Uint8Array} array - run-length encoded int32 array as bytes in big endian format
   * @param  {Integer} divisor - number to devide the integers to obtain floats
   * @param  {Float32Array} dataArray - pre-allocated output array
   * @return {Float32Array} decoded array
   */
  function decodeIntegerRun( intArray, divisor, output ){
      return decodeInteger(
          decodeRun( intArray, getInt32View( output ) ), divisor, output
      );
  }

  function encodeIntegerRun( floatArray, factor ){
      return encodeRun( encodeInteger( floatArray, factor ) );
  }



  function decodeIntegerDelta( intArray, divisor, output ){
      return decodeInteger(
          decodeDelta( intArray, getInt32View( output ) ), divisor, output
      );
  }

  function encodeIntegerDelta( floatArray, factor, output ){
      return encodeDelta( encodeInteger( floatArray, factor ), output );
  }



  function decodeIntegerPacking( int16or8, divisor, output ){
      return decodeInteger(
          decodePacking( int16or8, getInt32View( output ) ), divisor, output
      );
  }

  function decodeIntegerDeltaPacking( int16or8, divisor, output ){
      var unpacked = decodePacking( int16or8, getInt32View( output ) );
      return decodeIntegerDelta( unpacked, divisor, getFloat32View( unpacked ) );
  }

  function encodeIntegerDeltaPacking( floatArray, factor, useInt8 ){
      return encodePacking( encodeIntegerDelta( floatArray, factor ), useInt8 );
  }



  function decodeBytes( bytes ){
      var dv = getDataView( bytes );
      var type = dv.getInt32( 0 );
      var size = dv.getInt32( 4 );
      var param = bytes.subarray( 8, 12 );
      var bytes = bytes.subarray( 12 );
      return [ type, bytes, size, param ];
  }

  function encodeBytes( type, size, param, bytes ){
      var buffer = new ArrayBuffer( 12 + bytes.byteLength );
      var out = new Uint8Array( buffer );
      var dv = new DataView( buffer );
      dv.setInt32( 0, type );
      dv.setInt32( 4, size );
      if( param ) out.set( param, 8 );
      out.set( bytes, 12 );
      return out;
  }

  function passInt8( int8 ){
      var size = int8.length;
      var bytes = getUint8View( int8 );
      return encodeBytes( 2, size, undefined, bytes );
  }

  function passInt32( int32 ){
      var size = int32.length;
      var bytes = encodeInt32( int32 );
      return encodeBytes( 4, size, undefined, bytes );
  }

  function passString( stringBytes, length ){
      var size = stringBytes.length / length;
      var param = encodeInt32([ length ]);
      var bytes = getUint8View( stringBytes );
      return encodeBytes( 5, size, param, bytes );
  }

  function runChar( charBytes ){
      var size = charBytes.length;
      var bytes = encodeInt32( encodeRun( charBytes ) );
      return encodeBytes( 6, size, undefined, bytes );
  }

  function deltaRun( int32 ){
      var size = int32.length;
      var bytes = encodeInt32( encodeDeltaRun( int32 ) );
      return encodeBytes( 8, size, undefined, bytes );
  }

  function integerRun( float32, factor ){
      var size = float32.length;
      var param = encodeInt32([ factor ]);
      var bytes = encodeInt32( encodeIntegerRun( float32, factor ) );
      return encodeBytes( 9, size, param, bytes );
  }

  function integerDeltaPacking16( float32, factor ){
      var size = float32.length;
      var param = encodeInt32([ factor ]);
      var bytes = encodeInt16( encodeIntegerDeltaPacking( float32, factor ) );
      return encodeBytes( 10, size, param, bytes );
  }

  function encodeMmtf( inputDict ){

      var outputDict = {};

      // copy some fields over from the input dict
      PassThroughFields.forEach( function( name ){
          if( inputDict[ name ] !== undefined ){
              outputDict[ name ] = inputDict[ name ];
          }
      } );

      //////////////
      // bond data

      // encode inter group bond atom indices, i.e. get bytes in big endian order
      if( inputDict.bondAtomList ){
          outputDict.bondAtomList = passInt32( inputDict.bondAtomList );
      }

      // encode inter group bond orders, i.e. get bytes
      if( inputDict.bondOrderList ){
          outputDict.bondOrderList = passInt8( inputDict.bondOrderList );
      }

      //////////////
      // atom data

      // split-list delta & integer encode x, y, z atom coords
      outputDict.xCoordList = integerDeltaPacking16( inputDict.xCoordList, 1000 );
      outputDict.yCoordList = integerDeltaPacking16( inputDict.yCoordList, 1000 );
      outputDict.zCoordList = integerDeltaPacking16( inputDict.zCoordList, 1000 );

      // split-list delta & integer encode b-factors
      if( inputDict.bFactorList ){
          outputDict.bFactorList = integerDeltaPacking16( inputDict.bFactorList, 100 );
      }

      // delta & run-length encode atom ids
      if( inputDict.atomIdList ){
          outputDict.atomIdList = deltaRun( inputDict.atomIdList );
      }

      // run-length encode alternate labels
      if( inputDict.altLocList ){
          outputDict.altLocList = runChar( inputDict.altLocList );
      }

      // run-length & integer encode occupancies
      if( inputDict.occupancyList ){
          outputDict.occupancyList = integerRun( inputDict.occupancyList, 100 );
      }

      ///////////////
      // group data

      // run-length & delta encode group numbers
      outputDict.groupIdList = deltaRun( inputDict.groupIdList );

      // encode group types, i.e. get int32 array
      outputDict.groupTypeList = passInt32( inputDict.groupTypeList );

      // encode secondary structure, i.e. get bytes
      if( inputDict.secStructList ){
          outputDict.secStructList = passInt8( inputDict.secStructList, 1 );
      }

      // run-length encode insertion codes
      if( inputDict.insCodeList ){
          outputDict.insCodeList = runChar( inputDict.insCodeList );
      }

      // run-length & delta encode sequence indices
      if( inputDict.sequenceIndexList ){
          outputDict.sequenceIndexList = deltaRun( inputDict.sequenceIndexList );
      }

      ///////////////
      // chain data

      // encode chain ids, i.e. get bytes
      outputDict.chainIdList = passString( inputDict.chainIdList, 4 );

      // encode chain names, i.e. get bytes
      if( inputDict.chainNameList ){
          outputDict.chainNameList = passString( inputDict.chainNameList, 4 );
      }

      return outputDict;

  }

  /**
   * @file msgpack-decode
   * @private
   * @author Alexander Rose <alexander.rose@weirdbyte.de>
   */

  /**
   * msgpack decode module.
   * @module MsgpackDecode
   */

  /**
   * decode binary encoded MessagePack v5 (http://msgpack.org/) data
   * @static
   * @param  {Uint8Array} buffer - binary encoded MessagePack data
   * @return {Object|Array|String|Number|Boolean|null} decoded Messagepack data
   */
  function decodeMsgpack(buffer) {
    // Loosely based on
    // The MIT License (MIT)
    // Copyright (c) 2013 Tim Caswell <tim@creationix.com>
    // https://github.com/creationix/msgpack-js
    var offset = 0;
    var dataView = new DataView(buffer.buffer);

    /**
     * decode all key-value pairs of a map into an object
     * @param  {Integer} length - number of key-value pairs
     * @return {Object} decoded map
     */
    function map(length) {
      var value = {};
      for (var i = 0; i < length; i++) {
        var key = parse();
        value[key] = parse();
      }
      return value;
    }

    /**
     * decode binary array
     * @param  {Integer} length - number of elements in the array
     * @return {Uint8Array} decoded array
     */
    function bin(length) {
      var value = buffer.subarray(offset, offset + length);
      offset += length;
      return value;
    }

    /**
     * decode string
     * @param  {Integer} length - number string characters
     * @return {String} decoded string
     */
    function str(length) {
      var array = buffer.subarray(offset, offset + length);
      offset += length;
      // limit number of arguments to String.fromCharCode to something
      // browsers can handle, see http://stackoverflow.com/a/22747272
      var chunkSize = 0xffff;
      if(length > chunkSize){
        var c = [];
        for(var i = 0; i < array.length; i += chunkSize) {
          c.push(String.fromCharCode.apply(
            null, array.subarray(i, i + chunkSize)
          ));
        }
        return c.join("");
      }else{
        return String.fromCharCode.apply(null, array);
      }
    }

    /**
     * decode array
     * @param  {Integer} length - number of array elements
     * @return {Array} decoded array
     */
    function array(length) {
      var value = new Array(length);
      for (var i = 0; i < length; i++) {
        value[i] = parse();
      }
      return value;
    }

    /**
     * recursively parse the MessagePack data
     * @return {Object|Array|String|Number|Boolean|null} decoded MessagePack data
     */
    function parse() {
      var type = buffer[offset];
      var value, length, extType;
      // Positive FixInt
      if ((type & 0x80) === 0x00) {
        offset++;
        return type;
      }
      // FixMap
      if ((type & 0xf0) === 0x80) {
        length = type & 0x0f;
        offset++;
        return map(length);
      }
      // FixArray
      if ((type & 0xf0) === 0x90) {
        length = type & 0x0f;
        offset++;
        return array(length);
      }
      // FixStr
      if ((type & 0xe0) === 0xa0) {
        length = type & 0x1f;
        offset++;
        return str(length);
      }
      // Negative FixInt
      if ((type & 0xe0) === 0xe0) {
        value = dataView.getInt8(offset);
        offset++;
        return value;
      }
      switch (type) {
      // nil
      case 0xc0:
        offset++;
        return null;
      // 0xc1: (never used, could be employed for padding)
      // false
      case 0xc2:
        offset++;
        return false;
      // true
      case 0xc3:
        offset++;
        return true;
      // bin 8
      case 0xc4:
        length = dataView.getUint8(offset + 1);
        offset += 2;
        return bin(length);
      // bin 16
      case 0xc5:
        length = dataView.getUint16(offset + 1);
        offset += 3;
        return bin(length);
      // bin 32
      case 0xc6:
        length = dataView.getUint32(offset + 1);
        offset += 5;
        return bin(length);
      // // ext 8
      // case 0xc7:
      //   length = dataView.getUint8(offset + 1);
      //   extType = dataView.getUint8(offset + 2);
      //   offset += 3;
      //   return [extType, bin(length)];
      // // ext 16
      // case 0xc8:
      //   length = dataView.getUint16(offset + 1);
      //   extType = dataView.getUint8(offset + 3);
      //   offset += 4;
      //   return [extType, bin(length)];
      // // ext 32
      // case 0xc9:
      //   length = dataView.getUint32(offset + 1);
      //   extType = dataView.getUint8(offset + 5);
      //   offset += 6;
      //   return [extType, bin(length)];
      // float 32
      case 0xca:
        value = dataView.getFloat32(offset + 1);
        offset += 5;
        return value;
      // float 64
      case 0xcb:
        value = dataView.getFloat64(offset + 1);
        offset += 9;
        return value;
      // uint8
      case 0xcc:
        value = buffer[offset + 1];
        offset += 2;
        return value;
      // uint 16
      case 0xcd:
        value = dataView.getUint16(offset + 1);
        offset += 3;
        return value;
      // uint 32
      case 0xce:
        value = dataView.getUint32(offset + 1);
        offset += 5;
        return value;
      // // uint64
      // case 0xcf:
      //   // FIXME not available/representable in JS
      //   // largest possible int in JS is 2^53
      //   // value = dataView.getUint64(offset + 1);
      //   offset += 9;
      //   return 0;
      // int 8
      case 0xd0:
        value = dataView.getInt8(offset + 1);
        offset += 2;
        return value;
      // int 16
      case 0xd1:
        value = dataView.getInt16(offset + 1);
        offset += 3;
        return value;
      // int 32
      case 0xd2:
        value = dataView.getInt32(offset + 1);
        offset += 5;
        return value;
      // // int 64
      // case 0xd3:
      //   // FIXME not available/representable in JS
      //   // largest possible int in JS is 2^53
      //   // value = dataView.getInt64(offset + 1);
      //   offset += 9;
      //   return 0;

      // // fixext 1
      // case 0xd4:
      //   extType = dataView.getUint8(offset + 1);
      //   offset += 2;
      //   return [extType, bin(1)];
      // // fixext 2
      // case 0xd5:
      //   extType = dataView.getUint8(offset + 1);
      //   offset += 2;
      //   return [extType, bin(2)];
      // // fixext 4
      // case 0xd6:
      //   extType = dataView.getUint8(offset + 1);
      //   offset += 2;
      //   return [extType, bin(4)];
      // // fixext 8
      // case 0xd7:
      //   extType = dataView.getUint8(offset + 1);
      //   offset += 2;
      //   return [extType, bin(8)];
      // // fixext 16
      // case 0xd8:
      //   extType = dataView.getUint8(offset + 1);
      //   offset += 2;
      //   return [extType, bin(16)];
      // str 8
      case 0xd9:
        length = dataView.getUint8(offset + 1);
        offset += 2;
        return str(length);
      // str 16
      case 0xda:
        length = dataView.getUint16(offset + 1);
        offset += 3;
        return str(length);
      // str 32
      case 0xdb:
        length = dataView.getUint32(offset + 1);
        offset += 5;
        return str(length);
      // array 16
      case 0xdc:
        length = dataView.getUint16(offset + 1);
        offset += 3;
        return array(length);
      // array 32
      case 0xdd:
        length = dataView.getUint32(offset + 1);
        offset += 5;
        return array(length);
      // map 16:
      case 0xde:
        length = dataView.getUint16(offset + 1);
        offset += 3;
        return map(length);
      // map 32
      case 0xdf:
        length = dataView.getUint32(offset + 1);
        offset += 5;
        return map(length);
      }

      throw new Error("Unknown type 0x" + type.toString(16));
    }

    // start the recursive parsing
    return parse();
  }

  /**
   * Fields shared in encoded and decoded mmtf data objects.
   * @typedef {Object} module:MmtfDecode.SharedMmtfData
   * @property {String} mmtfVersion - MMTF specification version
   * @property {String} mmtfProducer - Program that created the file
   * @property {Float[]} [unitCell] - Crystallographic unit cell
   * @property {Float} unitCell.0 - x length
   * @property {Float} unitCell.1 - y length
   * @property {Float} unitCell.2 - z length
   * @property {Float} unitCell.3 - alpha angle
   * @property {Float} unitCell.4 - beta angle
   * @property {Float} unitCell.5 - gamma angle
   * @property {String} [spaceGroup] - Hermann-Mauguin symbol
   * @property {String} [structureId] - Some reference, e.g. a PDB ID
   * @property {String} [title] - Short description
   * @property {String} [depositionDate] - Deposition date in YYYY-MM-DD format
   * @property {String} [releaseDate] - Release date in YYYY-MM-DD format
   * @property {String[]} [experimentalMethods] - Structure determination methods
   * @property {Float} [resolution] - Resolution in Å
   * @property {Float} [rFree] - R-free value
   * @property {Float} [rWork] - R-work value
   * @property {Integer} numBonds - Number of bonds
   * @property {Integer} numAtoms - Number of atoms
   * @property {Integer} numGroups - Number of groups (residues)
   * @property {Integer} numChains - Number of chains
   * @property {Integer} numModels - Number of models
   * @property {Integer[]} chainsPerModel - List of number of chains in each model
   * @property {Integer[]} groupsPerChain - List of number of groups in each chain
   * @property {Entity[]} [entityList] - List of entity objects
   * @property {Integer[]} entityList.chainIndexList - Pointers into chain data fields
   * @property {String} entityList.description - Description of the entity
   * @property {String} entityList.type - Name of the entity type
   * @property {String} entityList.sequence - One letter code sequence
   * @property {Assembly[]} [bioAssemblyList] - List of assembly objects
   * @property {Transform[]} bioAssemblyList.transformList - List of transform objects
   * @property {Integer[]} bioAssemblyList.transformList.chainIndexList - Pointers into chain data fields
   * @property {Float[]} bioAssemblyList.transformList.matrix - 4x4 transformation matrix
   * @property {Array[]} [ncsOperatorList] - List of ncs operator matrices
   * @property {Float[]} ncsOperatorList. - 4x4 transformation matrix
   * @property {GroupType[]} groupList - List of groupType objects
   * @property {Integer[]} groupList.formalChargeList - List of atom formal charges
   * @property {String[]} groupList.elementList - List of elements
   * @property {String[]} groupList.atomNameList - List of atom names
   * @property {Integer[]} groupList.bondAtomList - List of bonded atom indices
   * @property {Integer[]} groupList.bondOrderList - List of bond orders
   * @property {String} groupList.groupName - The name of the group
   * @property {String} groupList.singleLetterCode - The single letter code
   * @property {String} groupList.chemCompType -  The chemical component type
   */

  /**
   * Encoded mmtf data object. Also includes the fields from {@link module:MmtfDecode.SharedMmtfData}. See MMTF specification on how they are encoded.
   * @typedef {Object} module:MmtfDecode.EncodedMmtfData
   * @mixes module:MmtfDecode.SharedMmtfData
   * @property {Uint8Array} [bondAtomList] - Encoded bonded atom indices
   * @property {Uint8Array} [bondOrderList] - Encoded bond orders
   * @property {Uint8Array} xCoordBig - Encoded x coordinates in Å, part 1
   * @property {Uint8Array} xCoordSmall - Encoded x coordinates in Å, part 2
   * @property {Uint8Array} yCoordBig - Encoded y coordinates in Å, part 1
   * @property {Uint8Array} yCoordSmall - Encoded y coordinates in Å, part 2
   * @property {Uint8Array} yCoordBig - Encoded y coordinates in Å, part 1
   * @property {Uint8Array} yCoordSmall - Encoded y coordinates in Å, part 2
   * @property {Uint8Array} [bFactorBig] - Encoded B-factors in Å^2, part 1
   * @property {Uint8Array} [bFactorSmall] - Encoded B-factors in Å^2, part 2
   * @property {Uint8Array} [atomIdList] - Encoded  atom ids
   * @property {Uint8Array} [altLocList] - Encoded alternate location labels
   * @property {Uint8Array} [occupancyList] - Encoded occupancies
   * @property {Uint8Array} groupIdList - Encoded group ids
   * @property {Uint8Array} groupTypeList - Encoded group types
   * @property {Uint8Array} [secStructList] - Encoded secondary structure codes
   * @property {Uint8Array} [insCodeList] - Encoded insertion codes
   * @property {Uint8Array} [seuenceIdList] - Encoded sequence ids
   * @property {Uint8Array} chainIdList - Encoded chain ids
   * @property {Uint8Array} [chainNameList] - Encoded chain names
   */

  /**
   * Decoded mmtf data object. Also includes fields the from {@link module:MmtfDecode.SharedMmtfData}.
   * @typedef {Object} module:MmtfDecode.MmtfData
   * @mixes module:MmtfDecode.SharedMmtfData
   * @property {Int32Array} [bondAtomList] - List of bonded atom indices
   * @property {Uint8Array} [bondOrderList] - List of bond orders
   * @property {Float32Array} xCoordList - List of x coordinates in Å
   * @property {Float32Array} yCoordList - List of y coordinates in Å
   * @property {Float32Array} zCoordList - List of z coordinates in Å
   * @property {Float32Array} [bFactorList] - List of B-factors in Å^2
   * @property {Int32Array} [atomIdList] - List of atom ids
   * @property {Uint8Array} [altLocList] - List of alternate location labels
   * @property {Float32Array} [occupancyList] - List of occupancies
   * @property {Int32Array} groupIdList - List of group ids
   * @property {Int32Array} groupTypeList - List of group types
   * @property {Int8Array} [secStructList] - List of secondary structure codes, encoding
   *    0: pi helix, 1: bend, 2: alpha helix, 3: extended,
   *    4: 3-10 helix, 5: bridge, 6: turn, 7: coil, -1: undefined
   * @property {Uint8Array} [insCodeList] - List of insertion codes
   * @property {Int32Array} [seuenceIdList] - List of sequence ids
   * @property {Uint8Array} chainIdList - List of chain ids
   * @property {Uint8Array} [chainNameList] - List of chain names
   */


  /**
   * [performDecoding description]
   * @param  {Integer} bytes [description]
   * @param  {Integer} size  [description]
   * @param  {Uint8Array} param [description]
   * @return {TypedArray}       [description]
   */
  function performDecoding( type, bytes, size, param ){

      switch( type ){
          case 1:
              return decodeFloat32( bytes );
          case 2:
              return getInt8View( bytes );
          case 3:
              return decodeInt16( bytes );
          case 4:
              return decodeInt32( bytes );
          case 5:
              // var length = decodeInt32( param )[ 0 ];
              return getUint8View( bytes );  // interpret as string array
          case 6:
              // interpret as char array
              return decodeRun( decodeInt32( bytes ), new Uint8Array( size ) );
          case 7:
              return decodeRun( decodeInt32( bytes ) )
          case 8:
              return decodeDeltaRun( decodeInt32( bytes ) );
          case 9:
              return decodeIntegerRun( decodeInt32( bytes ), decodeInt32( param )[ 0 ] );
          case 10:
              return decodeIntegerDeltaPacking( decodeInt16( bytes ), decodeInt32( param )[ 0 ] );
          case 11:
              return decodeInteger( decodeInt16( bytes ), decodeInt32( param )[ 0 ] );
          case 12:
              return decodeIntegerPacking( decodeInt16( bytes ), decodeInt32( param )[ 0 ] );
          case 13:
              return decodeIntegerPacking( getInt8View( bytes ), decodeInt32( param )[ 0 ] );
          case 14:
              return decodePacking( decodeInt16( bytes ) );
          case 15:
              return decodePacking( getInt8View( bytes ) );
      }

  };


  /**
   * Decode MMTF fields
   * @static
   * @param  {Object} inputDict - encoded MMTF data
   * @param  {Object} [params] - decoding parameters
   * @param  {String[]} params.ignoreFields - names of optional fields not to decode
   * @return {module:MmtfDecode.MmtfData} mmtfData
   */
  function decodeMmtf( inputDict, params ){

      params = params || {};
      var ignoreFields = params.ignoreFields;
      var outputDict = {};

      AllFields.forEach( function( name ){
          var ignore = ignoreFields ? ignoreFields.indexOf( name ) !== -1 : false;
          var data = inputDict[ name ];
          if( !ignore && data !== undefined ){
              if( data instanceof Uint8Array ){
                  outputDict[ name ] = performDecoding.apply( null, decodeBytes( data ) );
              }else{
                  outputDict[ name ] = data;
              }
          }
      } );

      return outputDict;

  }

  /**
   * @file mmtf-traverse
   * @private
   * @author Alexander Rose <alexander.rose@weirdbyte.de>
   */

  /**
   * mmtf traverse module.
   * @module MmtfTraverse
   */

  /**
   * Converts an array of ASCII codes trimming '\0' bytes
   * @private
   * @param  {Array} charCodeArray - array of ASCII char codes
   * @return {String} '\0' trimmed string
   */
  function fromCharCode( charCodeArray ){
      return String.fromCharCode.apply( null, charCodeArray ).replace(/\0/g, '');
  }


  /**
   * @callback module:MmtfTraverse.onModel
   * @param {Object} modelData
   * @param {Integer} modelData.chainCount - number of chains in the model
   * @param {Integer} modelData.modelIndex - index of the model
   */

  /**
   * @callback module:MmtfTraverse.onChain
   * @param {Object} chainData
   * @param {Integer} chainData.groupCount - number of groups in the chain
   * @param {Integer} chainData.chainIndex - index of the chain
   * @param {Integer} chainData.modelIndex - index of the parent model
   * @param {String} chainData.chainId - chain id
   * @param {?String} chainData.chainName - additional chain name
   */

  /**
   * @callback module:MmtfTraverse.onGroup
   * @param {Object} groupData
   * @param {Integer} groupData.atomCount - number of atoms in the group
   * @param {Integer} groupData.groupIndex - index of the group
   * @param {Integer} groupData.chainIndex - index of the parent chain
   * @param {Integer} groupData.modelIndex - index of the parent model
   * @param {Integer} groupData.groupId - group id (residue number)
   * @param {Integer} groupData.groupType - index to an entry in {@link module:MmtfDecode.MmtfData}#groupList
   * @param {String} groupData.groupName - name of the group, 0 to 5 characters
   * @param {Char} groupData.singleLetterCode - IUPAC single letter code, otherwise 'X', 1 character
   * @param {String} groupData.chemCompType - chemical component type from the mmCIF dictionary
   * @param {?Integer} groupData.secStruct - sencoded secondary structure |
   *    0: pi helix, 1: bend, 2: alpha helix, 3: extended,
   *    4: 3-10 helix, 5: bridge, 6: turn, 7: coil, -1: undefined
   * @param {?Char} groupData.insCode - insertion code
   * @param {?Integer} groupData.sequenceIndex - index to the `sequence` property of
   *    the corresponding entity, -1 when the entity has no sequence
   */

  /**
   * @callback module:MmtfTraverse.onAtom
   * @param {Object} atomData
   * @param {Integer} atomData.atomIndex - index of the atom
   * @param {Integer} atomData.groupIndex - index of the parent group
   * @param {Integer} atomData.chainIndex - index of the parent chain
   * @param {Integer} atomData.modelIndex - index of the parent model
   * @param {?Integer} atomData.atomId - atom id
   * @param {String} atomData.element - IUPAC element name, 0 to 3 characters
   * @param {String} atomData.atomName - name of the atom, 0 to 5 characters
   * @param {Integer} atomData.formalCharge - formal charge of the atom
   * @param {Float} atomData.xCoord - x coordinate in Å
   * @param {Float} atomData.yCoord - y coordinate in Å
   * @param {Float} atomData.zCoord - z coordinate in Å
   * @param {?Float} atomData.bFactor - B-factor in in Å^2
   * @param {?Char} atomData.altLoc - alternate location identifier
   * @param {?Float} atomData.occupancy - occupancy of the atom
   */

  /**
   * @callback module:MmtfTraverse.onBond
   * @param {Object} bondData
   * @param {Integer} bondData.atomIndex1 - index of the first atom
   * @param {Integer} bondData.atomIndex2 - index of the secound atom
   * @param {Integer} bondData.bondOrder - bond order, allowed values are 1 to 3
   */


  /**
   * Traverse the MMTF structure data.
   * @static
   * @param {module:MmtfDecode.MmtfData} mmtfData - decoded mmtf data
   * @param {Object} eventCallbacks
   * @param {module:MmtfTraverse.onModel} [eventCallbacks.onModel] - called for each model
   * @param {module:MmtfTraverse.onChain} [eventCallbacks.onChain] - called for each chain
   * @param {module:MmtfTraverse.onGroup} [eventCallbacks.onGroup] - called for each group
   * @param {module:MmtfTraverse.onAtom} [eventCallbacks.onAtom] - called for each atom
   * @param {module:MmtfTraverse.onBond} [eventCallbacks.onBond] - called for each bond
   * @param {Object} [params] - traversal parameters
   * @param {Boolean} [params.firstModelOnly] - traverse only the first model
   */
  function traverseMmtf( mmtfData, eventCallbacks, params ){

      params = params || {};

      var firstModelOnly = params.firstModelOnly;

      // setup callbacks
      var onModel = eventCallbacks.onModel;
      var onChain = eventCallbacks.onChain;
      var onGroup = eventCallbacks.onGroup;
      var onAtom = eventCallbacks.onAtom;
      var onBond = eventCallbacks.onBond;

      // setup index counters
      var modelIndex = 0;
      var chainIndex = 0;
      var groupIndex = 0;
      var atomIndex = 0;

      var modelFirstAtomIndex = 0;
      var modelLastAtomIndex = -1;

      // setup optional fields
      var chainNameList = mmtfData.chainNameList;
      var secStructList = mmtfData.secStructList;
      var insCodeList = mmtfData.insCodeList;
      var sequenceIndexList = mmtfData.sequenceIndexList;
      var atomIdList = mmtfData.atomIdList;
      var bFactorList = mmtfData.bFactorList;
      var altLocList = mmtfData.altLocList;
      var occupancyList = mmtfData.occupancyList;
      var bondAtomList = mmtfData.bondAtomList;
      var bondOrderList = mmtfData.bondOrderList;

      // hoisted loop variables
      var o, ol, i, j, k, kl;

      // loop over all models
      for( o = 0, ol = mmtfData.chainsPerModel.length; o < ol; ++o ){

          if( firstModelOnly && modelIndex > 0 ) break;

          var modelChainCount = mmtfData.chainsPerModel[ modelIndex ];

          if( onModel ){
              onModel({
                  chainCount: modelChainCount,
                  modelIndex: modelIndex
              });
          }

          for( i = 0; i < modelChainCount; ++i ){

              var chainGroupCount = mmtfData.groupsPerChain[ chainIndex ];
              if( onChain ){
                  var chainId = fromCharCode(
                      mmtfData.chainIdList.subarray( chainIndex * 4, chainIndex * 4 + 4 )
                  );
                  var chainName = null;
                  if( chainNameList ){
                      chainName = fromCharCode(
                          chainNameList.subarray( chainIndex * 4, chainIndex * 4 + 4 )
                      );
                  }
                  onChain({
                      groupCount: chainGroupCount,
                      chainIndex: chainIndex,
                      modelIndex: modelIndex,
                      chainId: chainId,
                      chainName: chainName
                  });
              }

              for( j = 0; j < chainGroupCount; ++j ){

                  var groupData = mmtfData.groupList[ mmtfData.groupTypeList[ groupIndex ] ];
                  var groupAtomCount = groupData.atomNameList.length;
                  if( onGroup ){
                      var secStruct = null;
                      if( secStructList ){
                          secStruct = secStructList[ groupIndex ];
                      }
                      var insCode = null;
                      if( mmtfData.insCodeList ){
                          insCode = String.fromCharCode( insCodeList[ groupIndex ] );
                      }
                      var sequenceIndex = null;
                      if( sequenceIndexList ){
                          sequenceIndex = sequenceIndexList[ groupIndex ];
                      }
                      onGroup({
                          atomCount: groupAtomCount,
                          groupIndex: groupIndex,
                          chainIndex: chainIndex,
                          modelIndex: modelIndex,
                          groupId: mmtfData.groupIdList[ groupIndex ],
                          groupType: mmtfData.groupTypeList[ groupIndex ],
                          groupName: groupData.groupName,
                          singleLetterCode: groupData.singleLetterCode,
                          chemCompType: groupData.chemCompType,
                          secStruct: secStruct,
                          insCode: insCode,
                          sequenceIndex: sequenceIndex
                      });
                  }

                  for( k = 0; k < groupAtomCount; ++k ){

                      if( onAtom ){
                          var atomId = null;
                          if( atomIdList ){
                              atomId = atomIdList[ atomIndex ];
                          }
                          var bFactor = null;
                          if( bFactorList ){
                              bFactor = bFactorList[ atomIndex ];
                          }
                          var altLoc = null;
                          if( altLocList ){
                              altLoc = String.fromCharCode( altLocList[ atomIndex ] );
                          }
                          var occupancy = null;
                          if( occupancyList ){
                              occupancy = occupancyList[ atomIndex ];
                          }
                          onAtom({
                              atomIndex: atomIndex,
                              groupIndex: groupIndex,
                              chainIndex: chainIndex,
                              modelIndex: modelIndex,
                              atomId: atomId,
                              element: groupData.elementList[ k ],
                              atomName: groupData.atomNameList[ k ],
                              formalCharge: groupData.formalChargeList[ k ],
                              xCoord: mmtfData.xCoordList[ atomIndex ],
                              yCoord: mmtfData.yCoordList[ atomIndex ],
                              zCoord: mmtfData.zCoordList[ atomIndex ],
                              bFactor: bFactor,
                              altLoc: altLoc,
                              occupancy: occupancy
                          });
                      }

                      atomIndex += 1;
                  }

                  if( onBond ){
                      // intra group bonds
                      var groupBondAtomList = groupData.bondAtomList;
                      for( k = 0, kl = groupData.bondOrderList.length; k < kl; ++k ){
                          onBond({
                              atomIndex1: atomIndex - groupAtomCount + groupBondAtomList[ k * 2 ],
                              atomIndex2: atomIndex - groupAtomCount + groupBondAtomList[ k * 2 + 1 ],
                              bondOrder: groupData.bondOrderList[ k ]
                          });
                      }
                  }

                  groupIndex += 1;
              }

              chainIndex += 1;
          }

          modelFirstAtomIndex = modelLastAtomIndex + 1;
          modelLastAtomIndex = atomIndex - 1;  // subtract one as it already has been incremented

          if( onBond ){
              // inter group bonds
              if( bondAtomList ){
                  for( k = 0, kl = bondAtomList.length; k < kl; k += 2 ){
                      var atomIndex1 = bondAtomList[ k ];
                      var atomIndex2 = bondAtomList[ k + 1 ];
                      if( ( atomIndex1 >= modelFirstAtomIndex && atomIndex1 <= modelLastAtomIndex ) ||
                          ( atomIndex2 >= modelFirstAtomIndex && atomIndex2 <= modelLastAtomIndex )
                      ){
                          onBond({
                              atomIndex1: atomIndex1,
                              atomIndex2: atomIndex2,
                              bondOrder: bondOrderList ? bondOrderList[ k / 2 ] : null
                          });
                      }
                  }
              }
          }

          modelIndex += 1;
      }

  }

  /**
   * Version name
   * @static
   * @type {String}
   */
  var version = "v1.0.0";

  /**
   * Version name
   * @private
   * @type {String}
   */
  var baseUrl = "http://mmtf.rcsb.org/v1.0/";

  /**
   * URL of the RCSB webservice to obtain MMTF files
   * @static
   * @type {String}
   */
  var fetchUrl = baseUrl + "full/";

  /**
   * URL of the RCSB webservice to obtain reduced MMTF files
   * @static
   * @type {String}
   */
  var fetchReducedUrl = baseUrl + "reduced/";

  /**
   * Encode MMTF fields
   * @static
   * @param  {module:MmtfDecode.MmtfData} mmtfData - mmtf data
   * @return {Uint8Array} encoded MMTF fields
   */
  function encode( mmtfData ){
      return encodeMsgpack( encodeMmtf( mmtfData ) );
  }

  /**
   * Decode MMTF fields
   * @static
   * @example
   * // bin is Uint8Array containing the mmtf msgpack
   * var mmtfData = MMTF.decode( bin );
   * console.log( mmtfData.numAtoms );
   *
   * @param  {Uint8Array|ArrayBuffer|module:MmtfDecode.EncodedMmtfData} binOrDict - binary MessagePack or encoded MMTF data
   * @param  {Object} [params] - decoding parameters
   * @param {String[]} params.ignoreFields - names of optional fields not to decode
   * @return {module:MmtfDecode.MmtfData} mmtfData
   */
  function decode( binOrDict, params ){
  	// make sure binOrDict is not a plain Arraybuffer
      if( binOrDict instanceof ArrayBuffer ){
          binOrDict = new Uint8Array( binOrDict );
      }

      var inputDict;
      if( binOrDict instanceof Uint8Array ){
          // get dict from msgpack
          inputDict = decodeMsgpack( binOrDict );
      }else{
          // already a dict
          inputDict = binOrDict;
      }

      return decodeMmtf( inputDict, params );
  }

  /**
   * @callback module:MMTF.onLoad
   * @param {module:MmtfDecode.MmtfData} mmtfData - decoded mmtf data object
   */

  /**
   * helper method to fetch binary files from an URL
   * @private
   * @param  {String} pdbid - PDB ID to fetch
   * @param  {String} baseUrl - URL to fetch from
   * @param  {module:MMTF.onLoad} onLoad - callback( mmtfData )
   * @param  {Function} onError - callback( error )
   * @return {undefined}
   */
  function _fetch( pdbid, baseUrl, onLoad, onError ){
      var xhr = new XMLHttpRequest();
      function _onLoad(){
          try{
              var mmtfData = decode( xhr.response );
              onLoad( mmtfData );
          }catch( error ){
              onError( error );
          }
      }
      xhr.addEventListener( "load", _onLoad, true );
      xhr.addEventListener( "error", onError, true );
      xhr.responseType = "arraybuffer";
      xhr.open( "GET", baseUrl + pdbid.toUpperCase() );
      xhr.send();
  }

  /**
   * Fetch MMTF file from RCSB webservice which contains
   * @static
   * @example
   * MMTF.fetch(
   *     "3PQR",
   *     // onLoad callback
   *     function( mmtfData ){ console.log( mmtfData ) },
   *     // onError callback
   *     function( error ){ console.error( error ) }
   * );
   *
   * @param  {String} pdbid - PDB ID to fetch
   * @param  {module:MMTF.onLoad} onLoad - callback( mmtfData )
   * @param  {Function} onError - callback( error )
   * @return {undefined}
   */
  function fetch( pdbid, onLoad, onError ){
      _fetch( pdbid, fetchUrl, onLoad, onError );
  }

  /**
   * Fetch reduced MMTF file from RCSB webservice which contains
   * protein C-alpha, nucleotide phosphate and ligand atoms
   * @static
   * @example
   * MMTF.fetchReduced(
   *     "3PQR",
   *     // onLoad callback
   *     function( mmtfData ){ console.log( mmtfData ) },
   *     // onError callback
   *     function( error ){ console.error( error ) }
   * );
   *
   * @param  {String} pdbid - PDB ID to fetch
   * @param  {module:MMTF.onLoad} onLoad - callback( mmtfData )
   * @param  {Function} onError - callback( error )
   * @return {undefined}
   */
  function fetchReduced( pdbid, onLoad, onError ){
      _fetch( pdbid, fetchReducedUrl, onLoad, onError );
  }

  exports.encode = encode;
  exports.decode = decode;
  exports.traverse = traverseMmtf;
  exports.fetch = fetch;
  exports.fetchReduced = fetchReduced;
  exports.version = version;
  exports.fetchUrl = fetchUrl;
  exports.fetchReducedUrl = fetchReducedUrl;
  exports.encodeMsgpack = encodeMsgpack;
  exports.encodeMmtf = encodeMmtf;
  exports.decodeMsgpack = decodeMsgpack;
  exports.decodeMmtf = decodeMmtf;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
/* pako 0.2.7 nodeca/pako */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define('pako',[],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pako = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');


exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs+len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i=0; i<len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i=0, l=chunks.length; i<l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i=0, l=chunks.length; i<l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i=0; i<len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);

},{}],2:[function(require,module,exports){
// String encode/decode helpers
'use strict';


var utils = require('./common');


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safary
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [0]); } catch(__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch(__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q=0; q<256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
      c2 = str.charCodeAt(m_pos+1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i=0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
      c2 = str.charCodeAt(m_pos+1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i=0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function(buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function(str) {
  var buf = new utils.Buf8(str.length);
  for (var i=0, len=buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len*2);

  for (out=0, i=0; i<len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function(buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max-1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means vuffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

},{"./common":1}],3:[function(require,module,exports){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;

},{}],4:[function(require,module,exports){
module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

},{}],5:[function(require,module,exports){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.


// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n =0; n < 256; n++) {
    c = n;
    for (var k =0; k < 8; k++) {
      c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc = crc ^ (-1);

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;

},{}],6:[function(require,module,exports){
'use strict';


function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;

},{}],7:[function(require,module,exports){
'use strict';

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  var window;                 /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},{}],8:[function(require,module,exports){
'use strict';


var utils = require('../utils/common');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var inflate_fast = require('./inffast');
var inflate_table = require('./inftrees');

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function ZSWAP32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, {bits: 9});

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, {bits: 5});

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window,src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window,src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window,src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
    case HEAD:
      if (state.wrap === 0) {
        state.mode = TYPEDO;
        break;
      }
      //=== NEEDBITS(16);
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//

        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = FLAGS;
        break;
      }
      state.flags = 0;           /* expect zlib header */
      if (state.head) {
        state.head.done = false;
      }
      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
        strm.msg = 'incorrect header check';
        state.mode = BAD;
        break;
      }
      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
      len = (hold & 0x0f)/*BITS(4)*/ + 8;
      if (state.wbits === 0) {
        state.wbits = len;
      }
      else if (len > state.wbits) {
        strm.msg = 'invalid window size';
        state.mode = BAD;
        break;
      }
      state.dmax = 1 << len;
      //Tracev((stderr, "inflate:   zlib header ok\n"));
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = hold & 0x200 ? DICTID : TYPE;
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      break;
    case FLAGS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.flags = hold;
      if ((state.flags & 0xff) !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      if (state.flags & 0xe000) {
        strm.msg = 'unknown header flags set';
        state.mode = BAD;
        break;
      }
      if (state.head) {
        state.head.text = ((hold >> 8) & 1);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = TIME;
      /* falls through */
    case TIME:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.time = hold;
      }
      if (state.flags & 0x0200) {
        //=== CRC4(state.check, hold)
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        hbuf[2] = (hold >>> 16) & 0xff;
        hbuf[3] = (hold >>> 24) & 0xff;
        state.check = crc32(state.check, hbuf, 4, 0);
        //===
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = OS;
      /* falls through */
    case OS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.xflags = (hold & 0xff);
        state.head.os = (hold >> 8);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = EXLEN;
      /* falls through */
    case EXLEN:
      if (state.flags & 0x0400) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length = hold;
        if (state.head) {
          state.head.extra_len = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      else if (state.head) {
        state.head.extra = null/*Z_NULL*/;
      }
      state.mode = EXTRA;
      /* falls through */
    case EXTRA:
      if (state.flags & 0x0400) {
        copy = state.length;
        if (copy > have) { copy = have; }
        if (copy) {
          if (state.head) {
            len = state.head.extra_len - state.length;
            if (!state.head.extra) {
              // Use untyped array for more conveniend processing later
              state.head.extra = new Array(state.head.extra_len);
            }
            utils.arraySet(
              state.head.extra,
              input,
              next,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len
            );
            //zmemcpy(state.head.extra + len, next,
            //        len + copy > state.head.extra_max ?
            //        state.head.extra_max - len : copy);
          }
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          state.length -= copy;
        }
        if (state.length) { break inf_leave; }
      }
      state.length = 0;
      state.mode = NAME;
      /* falls through */
    case NAME:
      if (state.flags & 0x0800) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          // TODO: 2 or 1 bytes?
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/)) {
            state.head.name += String.fromCharCode(len);
          }
        } while (len && copy < have);

        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.name = null;
      }
      state.length = 0;
      state.mode = COMMENT;
      /* falls through */
    case COMMENT:
      if (state.flags & 0x1000) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/)) {
            state.head.comment += String.fromCharCode(len);
          }
        } while (len && copy < have);
        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.comment = null;
      }
      state.mode = HCRC;
      /* falls through */
    case HCRC:
      if (state.flags & 0x0200) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.check & 0xffff)) {
          strm.msg = 'header crc mismatch';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      if (state.head) {
        state.head.hcrc = ((state.flags >> 9) & 1);
        state.head.done = true;
      }
      strm.adler = state.check = 0 /*crc32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      break;
    case DICTID:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      strm.adler = state.check = ZSWAP32(hold);
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = DICT;
      /* falls through */
    case DICT:
      if (state.havedict === 0) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        return Z_NEED_DICT;
      }
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      /* falls through */
    case TYPE:
      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case TYPEDO:
      if (state.last) {
        //--- BYTEBITS() ---//
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        state.mode = CHECK;
        break;
      }
      //=== NEEDBITS(3); */
      while (bits < 3) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.last = (hold & 0x01)/*BITS(1)*/;
      //--- DROPBITS(1) ---//
      hold >>>= 1;
      bits -= 1;
      //---//

      switch ((hold & 0x03)/*BITS(2)*/) {
      case 0:                             /* stored block */
        //Tracev((stderr, "inflate:     stored block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = STORED;
        break;
      case 1:                             /* fixed block */
        fixedtables(state);
        //Tracev((stderr, "inflate:     fixed codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = LEN_;             /* decode codes */
        if (flush === Z_TREES) {
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break inf_leave;
        }
        break;
      case 2:                             /* dynamic block */
        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = TABLE;
        break;
      case 3:
        strm.msg = 'invalid block type';
        state.mode = BAD;
      }
      //--- DROPBITS(2) ---//
      hold >>>= 2;
      bits -= 2;
      //---//
      break;
    case STORED:
      //--- BYTEBITS() ---// /* go to byte boundary */
      hold >>>= bits & 7;
      bits -= bits & 7;
      //---//
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
        strm.msg = 'invalid stored block lengths';
        state.mode = BAD;
        break;
      }
      state.length = hold & 0xffff;
      //Tracev((stderr, "inflate:       stored length %u\n",
      //        state.length));
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = COPY_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case COPY_:
      state.mode = COPY;
      /* falls through */
    case COPY:
      copy = state.length;
      if (copy) {
        if (copy > have) { copy = have; }
        if (copy > left) { copy = left; }
        if (copy === 0) { break inf_leave; }
        //--- zmemcpy(put, next, copy); ---
        utils.arraySet(output, input, next, copy, put);
        //---//
        have -= copy;
        next += copy;
        left -= copy;
        put += copy;
        state.length -= copy;
        break;
      }
      //Tracev((stderr, "inflate:       stored end\n"));
      state.mode = TYPE;
      break;
    case TABLE:
      //=== NEEDBITS(14); */
      while (bits < 14) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
//#ifndef PKZIP_BUG_WORKAROUND
      if (state.nlen > 286 || state.ndist > 30) {
        strm.msg = 'too many length or distance symbols';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracev((stderr, "inflate:       table sizes ok\n"));
      state.have = 0;
      state.mode = LENLENS;
      /* falls through */
    case LENLENS:
      while (state.have < state.ncode) {
        //=== NEEDBITS(3);
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
        //--- DROPBITS(3) ---//
        hold >>>= 3;
        bits -= 3;
        //---//
      }
      while (state.have < 19) {
        state.lens[order[state.have++]] = 0;
      }
      // We have separate tables & no pointers. 2 commented lines below not needed.
      //state.next = state.codes;
      //state.lencode = state.next;
      // Switch to use dynamic table
      state.lencode = state.lendyn;
      state.lenbits = 7;

      opts = {bits: state.lenbits};
      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
      state.lenbits = opts.bits;

      if (ret) {
        strm.msg = 'invalid code lengths set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, "inflate:       code lengths ok\n"));
      state.have = 0;
      state.mode = CODELENS;
      /* falls through */
    case CODELENS:
      while (state.have < state.nlen + state.ndist) {
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_val < 16) {
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.lens[state.have++] = here_val;
        }
        else {
          if (here_val === 16) {
            //=== NEEDBITS(here.bits + 2);
            n = here_bits + 2;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            if (state.have === 0) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            len = state.lens[state.have - 1];
            copy = 3 + (hold & 0x03);//BITS(2);
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
          }
          else if (here_val === 17) {
            //=== NEEDBITS(here.bits + 3);
            n = here_bits + 3;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 3 + (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          else {
            //=== NEEDBITS(here.bits + 7);
            n = here_bits + 7;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 11 + (hold & 0x7f);//BITS(7);
            //--- DROPBITS(7) ---//
            hold >>>= 7;
            bits -= 7;
            //---//
          }
          if (state.have + copy > state.nlen + state.ndist) {
            strm.msg = 'invalid bit length repeat';
            state.mode = BAD;
            break;
          }
          while (copy--) {
            state.lens[state.have++] = len;
          }
        }
      }

      /* handle error breaks in while */
      if (state.mode === BAD) { break; }

      /* check for end-of-block code (better have one) */
      if (state.lens[256] === 0) {
        strm.msg = 'invalid code -- missing end-of-block';
        state.mode = BAD;
        break;
      }

      /* build code tables -- note: do not change the lenbits or distbits
         values here (9 and 6) without reading the comments in inftrees.h
         concerning the ENOUGH constants, which depend on those values */
      state.lenbits = 9;

      opts = {bits: state.lenbits};
      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.lenbits = opts.bits;
      // state.lencode = state.next;

      if (ret) {
        strm.msg = 'invalid literal/lengths set';
        state.mode = BAD;
        break;
      }

      state.distbits = 6;
      //state.distcode.copy(state.codes);
      // Switch to use dynamic table
      state.distcode = state.distdyn;
      opts = {bits: state.distbits};
      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.distbits = opts.bits;
      // state.distcode = state.next;

      if (ret) {
        strm.msg = 'invalid distances set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, 'inflate:       codes ok\n'));
      state.mode = LEN_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case LEN_:
      state.mode = LEN;
      /* falls through */
    case LEN:
      if (have >= 6 && left >= 258) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        inflate_fast(strm, _out);
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        if (state.mode === TYPE) {
          state.back = -1;
        }
        break;
      }
      state.back = 0;
      for (;;) {
        here = state.lencode[hold & ((1 << state.lenbits) -1)];  /*BITS(state.lenbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if (here_bits <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if (here_op && (here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.lencode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      state.length = here_val;
      if (here_op === 0) {
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        state.mode = LIT;
        break;
      }
      if (here_op & 32) {
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.back = -1;
        state.mode = TYPE;
        break;
      }
      if (here_op & 64) {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break;
      }
      state.extra = here_op & 15;
      state.mode = LENEXT;
      /* falls through */
    case LENEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
      //Tracevv((stderr, "inflate:         length %u\n", state.length));
      state.was = state.length;
      state.mode = DIST;
      /* falls through */
    case DIST:
      for (;;) {
        here = state.distcode[hold & ((1 << state.distbits) -1)];/*BITS(state.distbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if ((here_bits) <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if ((here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.distcode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      if (here_op & 64) {
        strm.msg = 'invalid distance code';
        state.mode = BAD;
        break;
      }
      state.offset = here_val;
      state.extra = (here_op) & 15;
      state.mode = DISTEXT;
      /* falls through */
    case DISTEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.offset += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
//#ifdef INFLATE_STRICT
      if (state.offset > state.dmax) {
        strm.msg = 'invalid distance too far back';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
      state.mode = MATCH;
      /* falls through */
    case MATCH:
      if (left === 0) { break inf_leave; }
      copy = _out - left;
      if (state.offset > copy) {         /* copy from window */
        copy = state.offset - copy;
        if (copy > state.whave) {
          if (state.sane) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
        }
        if (copy > state.wnext) {
          copy -= state.wnext;
          from = state.wsize - copy;
        }
        else {
          from = state.wnext - copy;
        }
        if (copy > state.length) { copy = state.length; }
        from_source = state.window;
      }
      else {                              /* copy from output */
        from_source = output;
        from = put - state.offset;
        copy = state.length;
      }
      if (copy > left) { copy = left; }
      left -= copy;
      state.length -= copy;
      do {
        output[put++] = from_source[from++];
      } while (--copy);
      if (state.length === 0) { state.mode = LEN; }
      break;
    case LIT:
      if (left === 0) { break inf_leave; }
      output[put++] = state.length;
      left--;
      state.mode = LEN;
      break;
    case CHECK:
      if (state.wrap) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          // Use '|' insdead of '+' to make sure that result is signed
          hold |= input[next++] << bits;
          bits += 8;
        }
        //===//
        _out -= left;
        strm.total_out += _out;
        state.total += _out;
        if (_out) {
          strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

        }
        _out = left;
        // NB: crc32 stored as signed 32-bit int, ZSWAP32 returns signed too
        if ((state.flags ? hold : ZSWAP32(hold)) !== state.check) {
          strm.msg = 'incorrect data check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   check matches trailer\n"));
      }
      state.mode = LENGTH;
      /* falls through */
    case LENGTH:
      if (state.wrap && state.flags) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.total & 0xffffffff)) {
          strm.msg = 'incorrect length check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   length matches trailer\n"));
      }
      state.mode = DONE;
      /* falls through */
    case DONE:
      ret = Z_STREAM_END;
      break inf_leave;
    case BAD:
      ret = Z_DATA_ERROR;
      break inf_leave;
    case MEM:
      return Z_MEM_ERROR;
    case SYNC:
      /* falls through */
    default:
      return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}


exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

},{"../utils/common":1,"./adler32":3,"./crc32":5,"./inffast":7,"./inftrees":9}],9:[function(require,module,exports){
'use strict';


var utils = require('../utils/common');

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  var i=0;
  /* process all codes and make table entries */
  for (;;) {
    i++;
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

},{"../utils/common":1}],10:[function(require,module,exports){
'use strict';

module.exports = {
  '2':    'need dictionary',     /* Z_NEED_DICT       2  */
  '1':    'stream end',          /* Z_STREAM_END      1  */
  '0':    '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

},{}],11:[function(require,module,exports){
'use strict';


function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;

},{}],"/lib/inflate.js":[function(require,module,exports){
'use strict';


var zlib_inflate = require('./zlib/inflate.js');
var utils = require('./utils/common');
var strings = require('./utils/strings');
var c = require('./zlib/constants');
var msg = require('./zlib/messages');
var zstream = require('./zlib/zstream');
var gzheader = require('./zlib/gzheader');

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overriden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
var Inflate = function(options) {

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new zstream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new gzheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
};

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function(data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }
  } while ((strm.avail_in > 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function(status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 alligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;

},{"./utils/common":1,"./utils/strings":2,"./zlib/constants":4,"./zlib/gzheader":6,"./zlib/inflate.js":8,"./zlib/messages":10,"./zlib/zstream":11}]},{},[])("/lib/inflate.js")
});

//This defines the $3Dmol object which is used to create viewers
//and configure system-wide settings

/** 
 * All of the functionality of $3Dmol.js is contained within the
 * $3Dmol global namespace
 * @namespace */
$3Dmol = (function(window) {
    
    var my = window['$3Dmol'] || {};
    //var $ = window['jQuery'];
    
    return my;

})(window);

if ( typeof module === "object" && typeof module.exports === "object" ) { 
	//for node.js exporting
	module.exports = $3Dmol; 
}

/* The following code "phones home" to register that an ip 
   address has loaded 3Dmol.js.  Being able track this usage
   is very helpful when reporting to funding agencies.  Please
   leave this code in if you would like to increase the 
   likelihood of 3Dmol.js remaining supported.
*/
$.get("https://3dmol.csb.pitt.edu/track/report.cgi");

/* shims for IE */
/*
IE Doesn't have a .startsWith 
*/
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (str){
        return this.lastIndexOf(str, 0) === 0;
    };
}

// or endsWith
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

/**
*
* jquery.binarytransport.js
*
* @description. jQuery ajax transport for making binary data type requests.
* @version 1.0 
* @author Henry Algus <henryalgus@gmail.com>
*
*/

// use this transport for "binary" data type
$.ajaxTransport(
               "+binary",
               function(options, originalOptions, jqXHR) {
                   // check for conditions and support for blob / arraybuffer response type
                   if (window.FormData
                           && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {
                       return {
                           // create new XMLHttpRequest
                           send : function(headers, callback) {
                               // setup all variables
                               var xhr = new XMLHttpRequest(), url = options.url, type = options.type, async = options.async || true,
                               // blob or arraybuffer. Default is blob
                               dataType = options.responseType || "blob", data = options.data
                                       || null, username = options.username
                                       || null, password = options.password
                                       || null;

                               xhr.addEventListener('load', function() {
                                   var data = {};
                                   data[options.dataType] = xhr.response;
                                   // make callback and send data
                                   callback(xhr.status, xhr.statusText,
                                           data,
                                           xhr.getAllResponseHeaders());
                               });

                               xhr.open(type, url, async, username,
                                       password);

                               // setup custom headers
                               for ( var i in headers) {
                                   xhr.setRequestHeader(i, headers[i]);
                               }

                               xhr.responseType = dataType;
                               xhr.send(data);
                           },
                           abort : function() {
                               jqXHR.abort();
                           }
                       };
                   }
               });

    
/**
 * Create and initialize an appropriate viewer at supplied HTML element using specification in config
 @function $3Dmol.createViewer
 * @param {Object | string} element - Either HTML element or string identifier
 * @param {ViewerSpec} config Viewer specification
 * @return {$3Dmol.GLViewer} GLViewer, null if unable to instantiate WebGL
 * @example
   $3Dmol.download("pdb:4UAA",viewer,{},function(){
                  viewer.setBackgroundColor(0xffffffff);
                  var colorAsSnake = function(atom) {
                    return atom.resi % 2 ? 'white': 'green'
                  };

                  viewer.setStyle( {}, { cartoon: {colorfunc: colorAsSnake }});

                  viewer.render();
              });                     
 *                        
 */
$3Dmol.createViewer = function(element, config)
{
    if($.type(element) === "string")
        element = $("#"+element);
    if(!element) return;

    config = config || {}; 

    //try to create the  viewer
    try {
        return new $3Dmol.GLViewer(element, config);
    }
    catch(e) {
        throw "error creating viewer: "+e;
    }
    
    return null;
};
   
/**
 * Contains a dictionary of embedded viewers created from HTML elements
 * with a the viewer_3Dmoljs css class indexed by their id (or numerically
 * if they do not have an id).
*/
$3Dmol.viewers = {};

/**
 * Download binary data (e.g. a gzipped file) into an array buffer and provide
 * arraybuffer to callback.
 * @function $3Dmol.getbin
 * @param {string} uri - location of data
 * @param {Function} callback - Function to call with arraybuffer as argument.  

 */ 
$3Dmol.getbin = function(uri, callback) {
    $.ajax({url:uri, 
        type: "GET",
        dataType: "binary",
        responseType: "arraybuffer",
        processData: false}).done(
            function(ret, txt, response) {
                callback(ret);
            }).fail(function(e,txt) { 
                console.log(txt);
                });
};

/**
 * Load a PDB/PubChem structure into existing viewer. Automatically calls 'zoomTo' and 'render' on viewer after loading model
 * @function $3Dmol.download
 * @param {string} query - String specifying pdb or pubchem id; must be prefaced with "pdb: " or "cid: ", respectively
 * @param {$3Dmol.GLViewer} viewer - Add new model to existing viewer
 * @param {Object} options - Specify additional options
 *                           format: file format to download, if multiple are available, default format is pdb
 *                           pdbUri: URI to retrieve PDB files, default URI is http://www.rcsb.org/pdb/files/
 * @param {Function} callback - Function to call with model as argument after data is loaded.
  
 * @return {$3Dmol.GLModel} GLModel
 * @example
 viewer.setBackgroundColor(0xffffffff);
       $3Dmol.download('pdb:2nbd',viewer,{onemol: true,multimodel: true},function(m) {
        m.setStyle({'cartoon':{colorscheme:{prop:'ss',map:$3Dmol.ssColors.Jmol}}});
       viewer.zoomTo();
       viewer.render(callback);
    });
 */ 
$3Dmol.download = function(query, viewer, options, callback) {
    var baseURL = '';
    var type = "";
    var pdbUri = "";
    var mmtfUri = "";
    var m = viewer.addModel();
    
    if (query.substr(0, 5) === 'mmtf:') {
        pdbUri = options && options.pdbUri ? options.pdbUri : "https://mmtf.rcsb.org/v1.0/full/";
        query = query.substr(5).toUpperCase();
        var uri = pdbUri + query;        
        if(options && typeof options.noComputeSecondaryStructure === 'undefined') {
                //when fetch directly from pdb, trust structure annotations
                options.noComputeSecondaryStructure = true;
        }
            
        $3Dmol.getbin(uri,
                function(ret) {
                    m.addMolData(ret, 'mmtf',options);
                    viewer.zoomTo();
                    viewer.render();
                    if(callback) callback(m);
                });
    }
    else {
        if (query.substr(0, 4) === 'pdb:') {
            type = 'mmtf';
            if(options && options.format) {
                type = options.format; //can override and require pdb
            }
            
            if(options && typeof options.noComputeSecondaryStructure === 'undefined') {
                //when fetch directly from pdb, trust structure annotations
                options.noComputeSecondaryStructure = true;
            }
            query = query.substr(4).toUpperCase();
            if (!query.match(/^[1-9][A-Za-z0-9]{3}$/)) {
               alert("Wrong PDB ID"); return;
            }
            if(type == 'mmtf') {
                mmtfUri = options && options.mmtfUri ? options.mmtfUri : 'https://mmtf.rcsb.org/v1.0/full/';
                uri = mmtfUri + query.toUpperCase();
            }
            else  {
                pdbUri = options && options.pdbUri ? options.pdbUri : "https://files.rcsb.org/view/";
                uri = pdbUri + query + "." + type;
            }
    
        } else if (query.substr(0, 4) == 'cid:') {
            type = "sdf";
            query = query.substr(4);
            if (!query.match(/^[0-9]+$/)) {
               alert("Wrong Compound ID"); return;
            }
            uri = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + query + 
              "/SDF?record_type=3d";
        } else if (query.substr(0,4) == 'url:') {
            uri = query.substr(4);
            type = uri;
        }
    
        var handler = function(ret) {
          m.addMolData(ret, type, options);
          viewer.zoomTo();
          viewer.render();
          if(callback) callback(m);
        };
        
        if(type == 'mmtf') { //binary data
            $3Dmol.getbin(uri, handler);
        }
        else {        
           $.get(uri, handler).fail(function(e) {
            console.log("fetch of "+uri+" failed: "+e.statusText);
           });
        }
   }
   
   return m;
};
       

/**
 * $3Dmol surface types
 * @enum {number}
 */
$3Dmol.SurfaceType = {
    VDW : 1,
    MS : 2,
    SAS : 3,
    SES  : 4
};


//Miscellaneous functions and classes - to be incorporated into $3Dmol proper
/**
 * 
 * @param {$3Dmol.Geometry} geometry
 * @param {$3Dmol.Mesh} mesh
 * @returns {undefined}
 */
$3Dmol.mergeGeos = function(geometry, mesh) {
    
    var meshGeo = mesh.geometry;
    
    if (meshGeo === undefined) 
        return;
    
    geometry.geometryGroups.push( meshGeo.geometryGroups[0] );
    
};

$3Dmol.multiLineString = function(f) {
    return f.toString()
            .replace(/^[^\/]+\/\*!?/, '')
            .replace(/\*\/[^\/]+$/, '');
            
};

/** 
 * Render surface synchronously if true
 * @param {boolean} [$3Dmol.SyncSurface=false]
 * @type {boolean} */
$3Dmol.syncSurface = false;

// Internet Explorer refuses to allow webworkers in data blobs.  I can find
// no way of checking for this feature directly, so must do a brower check
if(window.navigator.userAgent.indexOf('MSIE ') >= 0 ||
        window.navigator.userAgent.indexOf('Trident/') >= 0) {
    $3Dmol.syncSurface = true; // can't use webworkers
}

/**
 * Parse a string that represents a style or atom selection and convert it
 * into an object.  The goal is to make it easier to write out these specifications
 * without resorting to json. Objects cannot be defined recursively.
 * ; - delineates fields of the object 
 * : - if the field has a value other than an empty object, it comes after a colon
 * , - delineates key/value pairs of a value object
 *     If the value object consists of ONLY keys (no = present) the keys are 
 *     converted to a list.  Otherwise a object of key/value pairs is created with
 *     any missing values set to null
 * = OR ~ - separates key/value pairs of a value object, if not provided value is null
 *     twiddle is supported since = has special meaning in URLs
 * @param (String) str
 * @returns {Object}
 */
$3Dmol.specStringToObject = function(str) {
    if(typeof(str) === "object") {
        return str; //not string, assume was converted already
    }
    else if(typeof(str) === "undefined" || str == null) {
        return str; 
    }
    
    str = str.replace(/%7E/,'~'); //copy/pasting urls sometimes does this
    //convert things that look like numbers into numbers
    var massage = function(val) {
        if($.isNumeric(val)) {
           //hexadecimal does not parse as float
           if(Math.floor(parseFloat(val)) == parseInt(val)) {
              return parseFloat(val);
           }
           else if(val.indexOf('.') >= 0) {
               return parseFloat(val); // ".7" for example, does not parseInt
           }
           else {
               return parseInt(val);
           }
        }
        //boolean conversions
        else if(val === 'true') {
            return true;
        }
        else if(val === 'false') {
            return false;
        }
        return val;
    }
    
    var ret = {};
    if(str === 'all') return ret;
    var fields = str.split(';');
    for(var i = 0; i < fields.length; i++) {
        var fv = fields[i].split(':');
        var f = fv[0];
        var val = {};
        var vstr = fv[1];
        if(vstr) {
            vstr = vstr.replace(/~/g,"=");
            if(vstr.indexOf('=') !== -1) {
                //has key=value pairs, must be object
                var kvs = vstr.split(',');
                for(var j = 0; j < kvs.length; j++) {
                    var kv = kvs[j].split('=',2);
                    val[kv[0]] = massage(kv[1]);
                }
            }
            else if(vstr.indexOf(',') !== -1) {
                //has multiple values, must list
                val = vstr.split(',');
            }
            else {
                val = massage(vstr); //value itself
            }
        }
        ret[f] = val;
    }

return ret;
}


/**
 * computes the bounding box around the provided atoms
 * @param {AtomSpec[]} atomlist
 * @return {Array}
 */
$3Dmol.getExtent = function(atomlist, ignoreSymmetries) {
    var xmin, ymin, zmin, xmax, ymax, zmax, xsum, ysum, zsum, cnt;
    var includeSym = !ignoreSymmetries;

    xmin = ymin = zmin = 9999;
    xmax = ymax = zmax = -9999;
    xsum = ysum = zsum = cnt = 0;
    
    if (atomlist.length === 0)
        return [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
    for (var i = 0; i < atomlist.length; i++) {
        var atom = atomlist[i];
        if (typeof atom === 'undefined' || !isFinite(atom.x) ||
                !isFinite(atom.y) || !isFinite(atom.z))
            continue;
        cnt++;
        xsum += atom.x;
        ysum += atom.y;
        zsum += atom.z;
        
        xmin = (xmin < atom.x) ? xmin : atom.x;
        ymin = (ymin < atom.y) ? ymin : atom.y;
        zmin = (zmin < atom.z) ? zmin : atom.z;
        xmax = (xmax > atom.x) ? xmax : atom.x;
        ymax = (ymax > atom.y) ? ymax : atom.y;
        zmax = (zmax > atom.z) ? zmax : atom.z;
        
        if (atom.symmetries && includeSym) {
            for (var n = 0; n < atom.symmetries.length; n++) {
                cnt++;
                xsum += atom.symmetries[n].x;
                ysum += atom.symmetries[n].y;
                zsum += atom.symmetries[n].z;
                xmin = (xmin < atom.symmetries[n].x) ? xmin : atom.symmetries[n].x;
                ymin = (ymin < atom.symmetries[n].y) ? ymin : atom.symmetries[n].y;
                zmin = (zmin < atom.symmetries[n].z) ? zmin : atom.symmetries[n].z;
                xmax = (xmax > atom.symmetries[n].x) ? xmax : atom.symmetries[n].x;
                ymax = (ymax > atom.symmetries[n].y) ? ymax : atom.symmetries[n].y;
                zmax = (zmax > atom.symmetries[n].z) ? zmax : atom.symmetries[n].z; 
            }
        }  
    }

    return [ [ xmin, ymin, zmin ], [ xmax, ymax, zmax ],
            [ xsum / cnt, ysum / cnt, zsum / cnt ] ];
};


//return the value of an atom property prop, or null if non existent
//looks first in properties, then in the atom itself
$3Dmol.getAtomProperty = function(atom, prop) {
    var val = null;
    if (atom.properties
            && typeof (atom.properties[prop]) != "undefined") {
        val = atom.properties[prop];
    } else if(typeof(atom[prop]) != 'undefined') {
        val = atom[prop];
    }
    return val;
};

/* get the min and max values of the specified property in the provided
* @function $3Dmol.getPropertyRange
* @param {AtomSpec[]} atomlist - list of atoms to evaluate
* @param {string} prop - name of property 
* @return {Array} - [min, max] values
*/
$3Dmol.getPropertyRange = function (atomlist, prop) {
    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;

    for (var i = 0, n = atomlist.length; i < n; i++) {
        var atom = atomlist[i];
        var val = $3Dmol.getAtomProperty(atom, prop);
        
        if(val != null) {
            if (val < min)
                min = val;
            if (val > max)
                max = val;                
        }
    }

    if (!isFinite(min) && !isFinite(max))
        min = max = 0;
    else if (!isFinite(min))
        min = max;
    else if (!isFinite(max))
        max = min;

    return [ min, max ];
}

//hackish way to work with requirejs - doesn't actually work yet
//since we doing use the require optimizer to combine modules
if( typeof(define) === 'function' && define.amd) {
    define('$3Dmol',$3Dmol);
}

/*
* math-like functionality
* quaternion, vector, matrix
*/

var $3Dmol = $3Dmol || {};
$3Dmol.Math = {

    clamp : function(x, min, max) {
        return Math.min( Math.max( x, min ), max );
    },

    degToRad : function() {
       var degreeToRadiansFactor = Math.PI / 180;
       
       return function(deg) {
           return deg * degreeToRadiansFactor;
       };
    
    }()
    
};


// Quaternion
/** @constructor */
$3Dmol.Quaternion = function(x, y, z, w) {

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = (w !== undefined) ? w : 1;

};

$3Dmol.Quaternion.prototype = {

    constructor : $3Dmol.Quaternion,

    set : function(x, y, z, w) {
        
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    },

    copy : function(q) {
        
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        this.w = q.w;

        return this;
    },

    conjugate : function() {
        
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;

        return this;
    },

    inverse : function() {
        
        return this.conjugate().normalize();
    },

    length : function() {
        
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    },

    normalize : function() {
        
        var l = this.length();

        if (l === 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
        } else {
            l = 1 / l;

            this.x *= l;
            this.y *= l;
            this.z *= l;
            this.w *= l;
        }

        return this;

    },

    multiply : function(q) {
        
        return this.multiplyQuaternions(this, q);
    },

    multiplyScalar : function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this;
    },
    
    multiplyQuaternions : function(a, b) {

        var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
        var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

        this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        return this;
    },
    
    sub : function(q) {
        this.x -= q.x;
        this.y -= q.y;
        this.z -= q.z;
        this.w -= q.w;
        return this;
    },
    
    clone : function() {
        return new $3Dmol.Quaternion(this.x, this.y, this.z,this.w);
    }
    
};

//A 2 Vector
/** @constructor */
$3Dmol.Vector2 = function(x, y) {
    
    this.x = x || 0.0;
    this.y = y || 0.0;
};

$3Dmol.Vector2.prototype = {
    
    constructor : $3Dmol.Vector2,
   
    set : function(x, y) {
       
        this.x = x;
        this.y = y;
       
        return this;
    },
    
    subVectors : function(a, b) {
        
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      
      return this;
    },
   
    copy : function(v) {
       
        this.x = v.x;
        this.y = v.y;
       
        return this;
    },
   
    clone : function() {
        
        return new $3Dmol.Vector2(this.x, this.y);
    }    
   
};

//A 3 Vector

$3Dmol.Vector3 = function(x, y, z) {
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;
};
/** @this {$3Dmol.Vector3} */
$3Dmol.Vector3.prototype =  {
    
    constructor : $3Dmol.Vector3,
    
    set : function(x, y, z) {
        
        this.x = x;
        this.y = y;
        this.z = z;
        
        return this;
    },
    
    copy : function(v) {
        
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        
        return this;  
    },
    
    add : function(v) {
        
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;  
        
        return this;
    },
    
    addVectors : function(a, b) {
        
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        
        return this;
    },
    
    sub : function(v) {
        
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        
        return this;
    },
    
    subVectors : function(a, b) {
        
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        
        return this;
    },
    
    multiplyScalar : function(s) {
        
        this.x *= s;
        this.y *= s;
        this.z *= s;
        
        return this;
    },
    
    divideScalar : function(s) {
        
        if (s !== 0) {
            this.x /= s;
            this.y /= s;
            this.z /= s;
        }
        
        else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        
        return this;
    },
    
    //accumulate maximum
    max : function(s) {
        
        this.x = Math.max(this.x,s.x);
        this.y = Math.max(this.y,s.y);
        this.z = Math.max(this.z,s.z);
        
        return this;
    },
    
    //accumulate min
    min : function(s) {
        
        this.x = Math.min(this.x,s.x);
        this.y = Math.min(this.y,s.y);
        this.z = Math.min(this.z,s.z);
        
        return this;
    },
    distanceTo: function(v) {
        return Math.sqrt(this.distanceToSquared(v));
    },

    distanceToSquared: function(v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        var dz = this.z - v.z;

        return dx * dx + dy * dy + dz * dz;
    },
    
    applyMatrix4 : function(m) {
    
        var x = this.x, y = this.y, z = this.z;
        
        var e = m.elements;
        
        this.x = e[0]*x + e[4]*y + e[8]*z + e[12];
        this.y = e[1]*x + e[5]*y + e[9]*z + e[13];
        this.z = e[2]*x + e[6]*y + e[10]*z + e[14];
        
        return this;
    },
    
    applyProjection : function(m) {
        
        //input: $3Dmol.Matrix4 projection matrix
        
        var x = this.x, y = this.y, z = this.z;
        
        var e = m.elements;
        var d = ( e[3]*x + e[7]*y + e[11]*z + e[15]);
        
        this.x = (e[0]*x + e[4]*y + e[8]*z + e[12]) / d;
        this.y = (e[1]*x + e[5]*y + e[9]*z + e[13]) / d;
        this.z = (e[2]*x + e[6]*y + e[10]*z + e[14]) / d;
        
        return this;
    },
    
    applyQuaternion : function(q) { 
        
        //save values
        var x = this.x;
        var y = this.y;
        var z = this.z;
        
        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;
        
        //compute this as
        //t = 2 * cross(q.xyz, v)
        //newv = v + q.w * t + cross(q.xyz, t)
        //this from molecularmusings
        //http://molecularmusings.wordpress.com/2013/05/24/a-faster-quaternion-vector-multiplication/
        var t = {};
        t.x = 2*(y * qz - z * qy);
        t.y = 2*(z * qx - x * qz);
        t.z = 2*(x * qy - y * qx);
        
        //cross t with q
        var t2 = {};
        t2.x = t.y * qz - t.z * qy;
        t2.y = t.z * qx - t.x * qz;
        t2.z = t.x * qy - t.y * qx;
        
        this.x = x + q.w*t.x + t2.x;
        this.y = y + q.w*t.y + t2.y;
        this.z = z + q.w*t.z + t2.z;
        
        return this;
    },
    
    negate : function() {
        
        return this.multiplyScalar(-1);
    },
    
    dot : function(v) {
        
        return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    
    length : function() {
        
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    },
    
    lengthSq : function() {
    
        return (this.x*this.x + this.y*this.y + this.z*this.z);
    },
    
    normalize : function() {
        
        return this.divideScalar( this.length() );
    },
    
    cross : function (v) {
        
        var x = this.x, y = this.y, z = this.z;
        
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        
        return this;
    },
    
    crossVectors : function(a, b) {
        
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        
        return this;
    },
    
    getPositionFromMatrix : function(m) {
        
        this.x = m.elements[12];
        this.y = m.elements[13];
        this.z = m.elements[14];
        
        return this;
    },

    setEulerFromRotationMatrix : function (m, order) {

        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

        var te = m.elements;
        var m11 = te[0], m12 = te[4], m13 = te[8];
        var m21 = te[1], m22 = te[5], m23 = te[9];
        var m31 = te[2], m32 = te[6], m33 = te[10];

        if ( order === undefined || order === 'XYZ' ) {

            this.y = Math.asin( $3Dmol.Math.clamp( m13, -1, 1 ) );

            if ( Math.abs( m13 ) < 0.99999 ) {

                this.x = Math.atan2( - m23, m33 );
                this.z = Math.atan2( - m12, m11 );

            } else {

                this.x = Math.atan2( m32, m22 );
                this.z = 0;

            }
        }
        
        else {
            console.error("Error with vector's setEulerFromRotationMatrix: Unknown order: " + order);
        }
        
        return this;

    },

    rotateAboutVector : function(axis, ang) {

        axis.normalize();
        var cosang = Math.cos(ang);
        var sinang = Math.sin(ang); 
        // Rodrigues' rotation formula, from wikipedia

        var term1 = this.clone().multiplyScalar(cosang);
        var term2 = (axis.clone().cross(this)).multiplyScalar(sinang)
        var term3 = axis.clone().multiplyScalar(axis.clone().dot(this)).multiplyScalar(1-cosang);

        var rot = term1.add(term2).add(term3);
    
        this.x = rot.x;
        this.y = rot.y;
        this.z = rot.z;

        return this;
    },
    
    clone : function() {
        return new $3Dmol.Vector3(this.x, this.y, this.z);
    }
    
};

//Matrices

//Matrix3
/** @constructor */
$3Dmol.Matrix3 = function(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    
    this.elements = new Float32Array(9);
    
    this.set(
        (n11 !== undefined) ? n11 : 1, n12 || 0, n13 || 0,
        n21 || 0, (n22 !== undefined) ? n22 : 1, n23 || 0,
        n31 || 0, n32 || 0, (n33 !== undefined) ? n33 : 1
    );
    
};

$3Dmol.Matrix3.prototype = {
    
    constructor : $3Dmol.Matrix3,    
   
    set : function(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        var te = this.elements;
        
        te[0] = n11; te[3] = n12; te[6] = n13;
        te[1] = n21; te[4] = n22; te[7] = n23;
        te[2] = n31; te[5] = n32; te[8] = n33;
        
        return this;
    },
    
    identity : function() {   
        this.set(
            1,0,0,
            0,1,0,
            0,0,1
        );
        
        return this;
    },
   
    copy : function(m) {
        var me = m.elements;
       
        this.set(
            me[0], me[3], me[6],
            me[1], me[4], me[7],
            me[2], me[5], me[8]
        );
    },
    
    multiplyScalar: function ( s ) {
        var te = this.elements;

        te[0] *= s; te[3] *= s; te[6] *= s;
        te[1] *= s; te[4] *= s; te[7] *= s;
        te[2] *= s; te[5] *= s; te[8] *= s;

        return this;
    },

    getInverse: function ( matrix, throwOnInvertible ) {
        // input: Matrix4

        var me = matrix.elements;
        var te = this.elements;

        te[ 0 ] =   me[10] * me[5] - me[6] * me[9];
        te[ 1 ] = - me[10] * me[1] + me[2] * me[9];
        te[ 2 ] =   me[6] * me[1] - me[2] * me[5];
        te[ 3 ] = - me[10] * me[4] + me[6] * me[8];
        te[ 4 ] =   me[10] * me[0] - me[2] * me[8];
        te[ 5 ] = - me[6] * me[0] + me[2] * me[4];
        te[ 6 ] =   me[9] * me[4] - me[5] * me[8];
        te[ 7 ] = - me[9] * me[0] + me[1] * me[8];
        te[ 8 ] =   me[5] * me[0] - me[1] * me[4];

        var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 3 ] + me[ 2 ] * te[ 6 ];

        // no inverse

        if ( det === 0 ) {

            var msg = "Matrix3.getInverse(): can't invert matrix, determinant is 0";

            if ( throwOnInvertible || false ) {

                throw new Error( msg ); 

            } else {

                console.warn( msg );

            }

            this.identity();

            return this;

        }

        this.multiplyScalar( 1.0 / det );

        return this;
    },

    //https://en.wikipedia.org/wiki/Determinant
    getDeterminant: function() {
        var m = this.elements;

        /*|a b c|
          |d e f|
          |g h i|*/

        var determinant
            = m[0] * m[4] * m[8] //+aei
            + m[1] * m[5] * m[6] //+bfg
            + m[2] * m[3] * m[7] //+cdh
            - m[2] * m[4] * m[6] //-ceg
            - m[1] * m[3] * m[8] //-bdi
            - m[0] * m[5] * m[7];//-afh
        return determinant;
    },
    
    transpose: function () {
        var tmp, m = this.elements;

        tmp = m[1]; m[1] = m[3]; m[3] = tmp;
        tmp = m[2]; m[2] = m[6]; m[6] = tmp;
        tmp = m[5]; m[5] = m[7]; m[7] = tmp;

        return this;
    },
    
    clone: function () {
        var te = this.elements;

        return new $3Dmol.Matrix3(

            te[0], te[3], te[6],
            te[1], te[4], te[7],
            te[2], te[5], te[8]

        );
    }
   
};

//Matrix 4
/** @constructor */
$3Dmol.Matrix4 = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {

    if(typeof(n12) === 'undefined' && typeof(n11) !== 'undefined') {
        //passing list like initialization
        this.elements = new Float32Array(n11);
    } else {
        var te = this.elements = new Float32Array( 16 );
        
        te[0] = ( n11 !== undefined ) ? n11 : 1; te[4] = n12 || 0; te[8] = n13 || 0; te[12] = n14 || 0;
        te[1] = n21 || 0; te[5] = ( n22 !== undefined ) ? n22 : 1; te[9] = n23 || 0; te[13] = n24 || 0;
        te[2] = n31 || 0; te[6] = n32 || 0; te[10] = ( n33 !== undefined ) ? n33 : 1; te[14] = n34 || 0;
        te[3] = n41 || 0; te[7] = n42 || 0; te[11] = n43 || 0; te[15] = ( n44 !== undefined ) ? n44 : 1;
    }
};

$3Dmol.Matrix4.prototype = {

    constructor : $3Dmol.Matrix4,

    set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {
        var te = this.elements;

        te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
        te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
        te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
        te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;

        return this;
    },

    identity: function () {
        this.set(

            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1

        );

        return this;
    },

    copy: function ( m ) {
        var me = m.elements;

        this.set(

            me[0], me[4], me[8], me[12],
            me[1], me[5], me[9], me[13],
            me[2], me[6], me[10], me[14],
            me[3], me[7], me[11], me[15]

        );

        return this;
    },

    matrix3FromTopLeft: function () {
        var te = this.elements;
        return new $3Dmol.Matrix3(te[0],te[4],te[8],te[1],te[5],te[9],te[2],te[6],te[10]);
    },

    setRotationFromEuler: function ( v, order ) {

        var te = this.elements;

        var x = v.x, y = v.y, z = v.z;
        var a = Math.cos( x ), b = Math.sin( x );
        var c = Math.cos( y ), d = Math.sin( y );
        var e = Math.cos( z ), f = Math.sin( z );

        if ( order === undefined || order === 'XYZ' ) {

            var ae = a * e, af = a * f, be = b * e, bf = b * f;

            te[0] = c * e;
            te[4] = - c * f;
            te[8] = d;

            te[1] = af + be * d;
            te[5] = ae - bf * d;
            te[9] = - b * c;

            te[2] = bf - ae * d;
            te[6] = be + af * d;
            te[10] = a * c;

        } 
        
        else
            console.error("Error with matrix4 setRotationFromEuler. Order: " + order);

        return this;

    },

    setRotationFromQuaternion: function ( q ) {
        var te = this.elements;

        var x = q.x, y = q.y, z = q.z, w = q.w;
        var x2 = x + x, y2 = y + y, z2 = z + z;
        var xx = x * x2, xy = x * y2, xz = x * z2;
        var yy = y * y2, yz = y * z2, zz = z * z2;
        var wx = w * x2, wy = w * y2, wz = w * z2;

        te[0] = 1 - ( yy + zz );
        te[4] = xy - wz;
        te[8] = xz + wy;

        te[1] = xy + wz;
        te[5] = 1 - ( xx + zz );
        te[9] = yz - wx;

        te[2] = xz - wy;
        te[6] = yz + wx;
        te[10] = 1 - ( xx + yy );

        return this;
    },

    lookAt: function() {
        var x = new $3Dmol.Vector3();
        var y = new $3Dmol.Vector3();
        var z = new $3Dmol.Vector3();

        return function ( eye, target, up ) {

            var te = this.elements;

            z.subVectors( eye, target ).normalize();

            if ( z.length() === 0 ) {

                z.z = 1;

            }

            x.crossVectors( up, z ).normalize();

            if ( x.length() === 0 ) {

                z.x += 0.0001;
                x.crossVectors( up, z ).normalize();

            }

            y.crossVectors( z, x );


            te[0] = x.x; te[4] = y.x; te[8] = z.x;
            te[1] = x.y; te[5] = y.y; te[9] = z.y;
            te[2] = x.z; te[6] = y.z; te[10] = z.z;

            return this;
        };

    }(),

    multiplyMatrices: function ( a, b ) {
        var ae = a.elements;
        var be = b.elements;
        var te = this.elements;

        var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

        var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
        var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
        var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
        var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return this;
    },
    
    multiplyScalar: function ( s ) {
        var te = this.elements;
    
        te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
        te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
        te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
        te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;
    
        return this;
    },
    
    makeTranslation: function ( x, y, z ) {

        this.set(

            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1

        );

        return this;

    },
    
    transpose: function () {
        var te = this.elements;
        var tmp;

        tmp = te[1]; te[1] = te[4]; te[4] = tmp;
        tmp = te[2]; te[2] = te[8]; te[8] = tmp;
        tmp = te[6]; te[6] = te[9]; te[9] = tmp;

        tmp = te[3]; te[3] = te[12]; te[12] = tmp;
        tmp = te[7]; te[7] = te[13]; te[13] = tmp;
        tmp = te[11]; te[11] = te[14]; te[14] = tmp;

        return this;
    },

    getPosition: function() {
        var v1 = new $3Dmol.Vector3();

        return function () {

            console.warn( 'DEPRECATED: Matrix4\'s .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.' );

            var te = this.elements;
            return v1.set( te[12], te[13], te[14] );
        };

    }(),

    setPosition: function ( v ) {
        var te = this.elements;

        te[12] = v.x;
        te[13] = v.y;
        te[14] = v.z;

        return this;
    },

    getInverse: function ( m, throwOnInvertible ) {
        // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        var te = this.elements;
        var me = m.elements;

        var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
        var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
        var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
        var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

        te[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
        te[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
        te[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
        te[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
        te[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
        te[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
        te[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
        te[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
        te[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
        te[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
        te[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
        te[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
        te[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
        te[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
        te[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
        te[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;

        var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 4 ] + me[ 2 ] * te[ 8 ] + me[ 3 ] * te[ 12 ];

        if ( det === 0 ) {

            var msg = "Matrix4.getInverse(): can't invert matrix, determinant is 0";

            if ( throwOnInvertible || false ) {

                throw new Error( msg ); 

            } else {

                console.warn( msg );

            }

            this.identity();

            return this;
        }

        this.multiplyScalar( 1 / det );

        return this;
    },

    isReflected: function() {
        return this.matrix3FromTopLeft().getDeterminant() < 0;
    },

    compose: function() {
        var mRotation = new $3Dmol.Matrix4(),
            mScale = new $3Dmol.Matrix4();
        
        return function ( translation, rotation, scale ) {

            var te = this.elements;

            mRotation.identity();
            mRotation.setRotationFromQuaternion( rotation );

            mScale.makeScale( scale.x, scale.y, scale.z );

            this.multiplyMatrices( mRotation, mScale );

            te[12] = translation.x;
            te[13] = translation.y;
            te[14] = translation.z;

            return this;

        };
    }(),

    decompose: function() {
        var x = new $3Dmol.Vector3(),
            y = new $3Dmol.Vector3(),
            z = new $3Dmol.Vector3(),
            matrix = new $3Dmol.Matrix4();

        return function ( translation, rotation, scale ) {

            var te = this.elements;

            // grab the axis vectors
            x.set( te[0], te[1], te[2] );
            y.set( te[4], te[5], te[6] );
            z.set( te[8], te[9], te[10] );

            translation = ( translation instanceof $3Dmol.Vector3 ) ? translation : new $3Dmol.Vector3();
            rotation = ( rotation instanceof $3Dmol.Quaternion ) ? rotation : new $3Dmol.Quaternion();
            scale = ( scale instanceof $3Dmol.Vector3 ) ? scale : new $3Dmol.Vector3();

            scale.x = x.length();
            scale.y = y.length();
            scale.z = z.length();

            translation.x = te[12];
            translation.y = te[13];
            translation.z = te[14];

            // scale the rotation part

            matrix.copy( this );

            matrix.elements[0] /= scale.x;
            matrix.elements[1] /= scale.x;
            matrix.elements[2] /= scale.x;

            matrix.elements[4] /= scale.y;
            matrix.elements[5] /= scale.y;
            matrix.elements[6] /= scale.y;

            matrix.elements[8] /= scale.z;
            matrix.elements[9] /= scale.z;
            matrix.elements[10] /= scale.z;

            rotation.setFromRotationMatrix( matrix );

            return [ translation, rotation, scale ];

        };
    }(),

    scale: function ( v ) {
        var te = this.elements;
        var x = v.x, y = v.y, z = v.z;

        te[0] *= x; te[4] *= y; te[8] *= z;
        te[1] *= x; te[5] *= y; te[9] *= z;
        te[2] *= x; te[6] *= y; te[10] *= z;
        te[3] *= x; te[7] *= y; te[11] *= z;

        return this;
    },
    
    getMaxScaleOnAxis : function() {
        
        var te = this.elements;
        
        var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
        
        return Math.sqrt(Math.max(scaleXSq, Math.max(scaleYSq, scaleZSq)));
        
    },

    makeFrustum: function ( left, right, bottom, top, near, far ) {
        var te = this.elements;
              
        var x = 2 * near / ( right - left );
        var y = 2 * near / ( top - bottom );

        var a = ( right + left ) / ( right - left );
        var b = ( top + bottom ) / ( top - bottom );
        var c = - ( far + near ) / ( far - near );
        var d = - 2 * far * near / ( far - near );

        te[0] = x;  te[4] = 0;  te[8] = a;  te[12] = 0;
        te[1] = 0;  te[5] = y;  te[9] = b;  te[13] = 0;
        te[2] = 0;  te[6] = 0;  te[10] = c; te[14] = d;
        te[3] = 0;  te[7] = 0;  te[11] = - 1;   te[15] = 0;

        return this;
    },

    makePerspective: function ( fov, aspect, near, far ) {
        var ymax = near * Math.tan( $3Dmol.Math.degToRad( fov * 0.5 ) );
        var ymin = - ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );
    },
    

    makeOrthographic: function ( left, right, top, bottom, near, far ) {

        var te = this.elements;
        var w = 1.0 / ( right - left );
        var h = 1.0 / ( top - bottom );
        var p = 1.0 / ( far - near );

        var x = ( right + left ) * w;
        var y = ( top + bottom ) * h;
        var z = ( far + near ) * p;

        te[ 0 ] = 2 * w;    te[ 4 ] = 0;    te[ 8 ] = 0;    te[ 12 ] = - x;
        te[ 1 ] = 0;    te[ 5 ] = 2 * h;    te[ 9 ] = 0;    te[ 13 ] = - y;
        te[ 2 ] = 0;    te[ 6 ] = 0;    te[ 10 ] = - 2 * p; te[ 14 ] = - z;
        te[ 3 ] = 0;    te[ 7 ] = 0;    te[ 11 ] = 0;   te[ 15 ] = 1;

        return this;

    },
    
    isEqual : function (m) {
        var me = m.elements;
        var te = this.elements;
        
        if (te[0] == me[0] && te[4] == me[4] && te[8] == me[8] && te[12] == me[12] &&
            te[1] == me[1] && te[5] == me[5] && te[9] == me[9] && te[13] == me[13] &&
            te[2] == me[2] && te[6] == me[6] && te[10] == me[10] && te[14] == me[14] &&
            te[3] == me[3] && te[7] == me[7] && te[11] == me[11] && te[15] == me[15]) {
            return true;
        }
        else {
            return false;
        }
    },

    clone: function () {
        var te = this.elements;

        return new $3Dmol.Matrix4(

            te[0], te[4], te[8], te[12],
            te[1], te[5], te[9], te[13],
            te[2], te[6], te[10], te[14],
            te[3], te[7], te[11], te[15]

        );
    },
    
    isIdentity: function () {
        var te = this.elements;
        
        if (te[0] == 1 && te[4] == 0 && te[8] == 0 && te[12] == 0 &&
            te[1] == 0 && te[5] == 1 && te[9] == 0 && te[13] == 0 &&
            te[2] == 0 && te[6] == 0 && te[10] == 1 && te[14] == 0 &&
            te[3] == 0 && te[7] == 0 && te[11] == 0 && te[15] == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    
};
/** @constructor */
$3Dmol.Ray = function(origin, direction) {
    
    this.origin = (origin !== undefined) ? 
        origin : new $3Dmol.Vector3();
        
    this.direction = (direction !== undefined) ?
        direction : new $3Dmol.Vector3();
      
};

//TODO: Remove methods we don't need (intersectPlane ??)
$3Dmol.Ray.prototype = {
    
    constructor : $3Dmol.Ray,
     
    set : function(origin, direction){
        
        this.origin.copy(origin);
        this.direction.copy(direction);
        
        return this;
    
    },
    
    copy : function(ray) {
        
        this.origin.copy(ray.origin);
        this.direction.copy(ray.direction);
        
        return this;
        
    },
    
    at : function(t, optionalTarget) {
        
        var result = optionalTarget || new $3Dmol.Vector3();
        
        return result.copy(this.direction).multiplyScalar(t).add(this.origin);
        
    },
    
    recast : function() {
        
        var v1 = new $3Dmol.Vector3();
        
        return function(t) {
            this.origin.copy(this.at(t, v1));
            
            return this;
        };
        
    }(),
    
    closestPointToPoint : function(point, optionalTarget) {
        
        var result = optionalTarget || new $3Dmol.Vector3();
        result.subVectors(point, this.origin);
        var directionDistance = result.dot(this.direction);
        
        //returns a point on this ray
        return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
        
    },
    
    distanceToPoint : function(point) {
        
        var v1 = new $3Dmol.Vector3();
        
        return function(point) {
            var directionDistance = v1.subVectors(point, this.origin).dot(this.direction);
            v1.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
            return v1.distanceTo(point);
        };
        
    }(),
    
    isIntersectionCylinder : function() {
        
    },
    
    isIntersectionSphere : function(sphere) {
       return (this.distanceToPoint(sphere.center) <= sphere.radius);
          
    },
    
    isIntersectionPlane : function(plane) {
        
        var denominator = plane.normal.dot(this.direction);
        
        //plane and ray are not perpendicular
        if (denominator !== 0) 
            return true;
        
        if (plane.distanceToPoint(this.origin) === 0) 
            return true;
        
        return false;
        
    },
    
    distanceToPlane : function(plane) {
       
       var denominator = plane.normal.dot(this.direction);
       if (denominator === 0) {
           
           //line is coplanar
       if (plane.distanceToPoint(this.origin) === 0)
           return 0;
       
       //ray is parallel
           return undefined;
       }
       
       var t = - (this.origin.dot(plane.normal) + plane.constant) / denominator;
       
       return t;
       
    },
    
    intersectPlane : function(plane, optionalTarget) {
       
       var t = this.distanceToPlane(plane);
       
       if (t === undefined)
           return undefined;
       
       return this.at(t, optionalTarget);
       
    },
    
    applyMatrix4 : function(matrix4) {
       
       this.direction.add(this.origin).applyMatrix4(matrix4);
       this.origin.applyMatrix4(matrix4);
       this.direction.sub(this.origin);
       
       return this;
       
    },
    
    equals : function(ray) {
       
       return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
       
    },
    
    clone : function() {
    
       return new $3Dmol.Ray().copy(this);
    
    }
 
     
};

//Intersection sphere and box shapes.  


//Intersection sphere for sphere, stick render
/** @constructor */
$3Dmol.Sphere = function(center, radius) {

    this.center = (center !== undefined) ? 
        center : new $3Dmol.Vector3();
        
    this.radius = (radius !== undefined) ?
        radius : 0;
        
};

$3Dmol.Sphere.prototype = {
    
    constructor : $3Dmol.Sphere,
    
    set : function(center, radius) {
        
        this.center.copy(center);
        this.radius = radius;
        
        return this;
        
    },
    
    copy : function(sphere) {
        
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        
        return this;
        
    },
    
    applyMatrix4 : function(matrix) {
        
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        
        return this;
        
    },
    
    translate : function(offset) {
        
        this.center.add(offset);
        
        return this;
        
    },
    
    equals : function(sphere) {
        
        return sphere.center.equals(this.center) && (sphere.radius === this.radius);
        
    },
       
    clone : function() {
        
        return new $3Dmol.Sphere().copy(this);
        
    }

};


//Bounding cylinder for stick render  
/** @constructor */
$3Dmol.Cylinder = function(c1, c2, radius) {

    this.c1 = (c1 !== undefined) ?
        c1 : new $3Dmol.Vector3();

    this.c2 = (c2 !== undefined) ?
        c2 : new $3Dmol.Vector3();
        
    this.direction = new $3Dmol.Vector3().subVectors(this.c2, this.c1).normalize();

    this.radius = (radius !== undefined) ?
        radius : 0;
    
};

$3Dmol.Cylinder.prototype = {

    constructor : $3Dmol.Cylinder,

    copy : function(cylinder) {

        this.c1.copy(cylinder.c1);
        this.c2.copy(cylinder.c2);
        this.direction.copy(cylinder.direction);
        this.radius = cylinder.radius;

        return this;

    },
    
    lengthSq : function() {
    
        var vector = new $3Dmol.Vector3();
        
        return function(){
            return vector.subVectors(this.c2, this.c1).lengthSq();
        };
        
    }(),

    applyMatrix4 : function(matrix) {
        
        this.direction.add(this.c1).applyMatrix4(matrix);
        this.c1.applyMatrix4(matrix);
        this.c2.applyMatrix4(matrix);
        this.direction.sub(this.c1).normalize();
        this.radius = this.radius * matrix.getMaxScaleOnAxis();

        return this;

    }

};


//plane specified by three points
/** @constructor */
$3Dmol.Triangle = function(a, b, c){
   
    this.a = (a !== undefined) ?
        a : new $3Dmol.Vector3();

    this.b = (b !== undefined) ?
        b : new $3Dmol.Vector3();
    
    this.c = (c !== undefined) ?
        c : new $3Dmol.Vector3();   
  
};

$3Dmol.Triangle.prototype = {

    constructor : $3Dmol.Triangle,
    
    copy : function(triangle) {
        
        this.a.copy(triangle.a);
        this.b.copy(triangle.b);
        this.c.copy(triangle.c);
        
        return this;
        
    },
    
    applyMatrix4 : function(matrix) {
        
        this.a.applyMatrix4(matrix);
        this.b.applyMatrix4(matrix);
        this.c.applyMatrix4(matrix);
        
        return this;
        
    },
    
    getNormal : function() {
        
        var v1 = new $3Dmol.Vector3();
        
        return function() {
            
            var norm = this.a.clone();
            norm.sub(this.b);
            v1.subVectors(this.c, this.b);
            
            norm.cross(v1);
            norm.normalize();
            
            return norm;
            
        };
        
    }()

};


/* core Object3D
 * Base class for Scene, Camera, Geometry
 * Geometry class
 */

//Event Handling
/** @this {$3Dmol.EventDispatcher} */
$3Dmol.EventDispatcher = function() {
  
    var listeners = {};
    
    this.addEventListener = function(type, listener) {
        if (listeners[type] === undefined)
            listeners[type] = [];
        
        if (listeners[type].indexOf(listener) === -1)
            listeners[type].push(listener);
    };  
    
    this.removeEventListener = function(type, listener) {
        
        var index = listeners[type].indexOf(listener);
        
        if (index !== -1)
            listeners[type].splice(index, 1);
              
    };
    
    this.dispatchEvent = function(event) {
        
        var listenerArray = listeners[event.type];
        
        if (listenerArray !== undefined) {
            event.target = this;
            
            for (var i = 0, l = listenerArray.length; i < l; i++)
                listenerArray[i].call(this, event);
                
        }
            
    };
    
};

$3Dmol.Color = function( color ){
    
    if ( arguments.length > 1) {
            this.r = arguments[0] || 0.0;
            this.g = arguments[1] || 0.0;
            this.b = arguments[2] || 0.0;

            return this;
    }
    
    return this.set(color);
                
};

$3Dmol.Color.prototype = {
    
    constructor: $3Dmol.Color,
    
    r: 0.0, g: 0.0, b: 0.0,
    
    set : function(val) {
        
            if (val instanceof $3Dmol.Color) 
                return val.clone();

            else if (typeof val === 'number')
                this.setHex(val);
            
            else if (typeof val === 'object' && "r" in val && "g" in val && "b" in val) {
                this.r = val.r;
                this.g = val.g;
                this.b = val.b;
            }
    },
    
    setHex: function(hex) {
        
            hex = Math.floor(hex);

            this.r = (hex >> 16 & 255) / 255;
            this.g = (hex >> 8 & 255) / 255;
            this.b = (hex & 255) / 255;                                                                                     
        
            return this;
    },
    
    getHex: function() {
        var R = Math.round(this.r*255);
        var G = Math.round(this.g*255);
        var B = Math.round(this.b*255);
        return R<<16 | G << 8 | B;
    },
    
    clone : function() {
            return new $3Dmol.Color(this.r, this.g, this.b);
    },
        
    copy : function(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        
        return this;
    },
    
    //return object that represents color components from 0 to 255
    scaled : function() {
        var ret = {};
        ret.r = Math.round(this.r*255);
        ret.g = Math.round(this.g*255);
        ret.b = Math.round(this.b*255);
        ret.a = 1.0;
        return ret;
    }
    
};

//Object3D base constructor function
/** @this {$3Dmol.Object3D} */
$3Dmol.Object3D = function() {
    
    this.id = $3Dmol.Object3DIDCount++;
    
    this.name = "";
    
    this.parent = undefined;
    this.children = [];
    
    this.position = new $3Dmol.Vector3();
    this.rotation = new $3Dmol.Vector3();
    this.matrix = new $3Dmol.Matrix4();
    this.matrixWorld = new $3Dmol.Matrix4();
    this.quaternion = new $3Dmol.Quaternion();
    this.eulerOrder = 'XYZ';
    
    this.up = new $3Dmol.Vector3(0, 1, 0);
    this.scale = new $3Dmol.Vector3(1, 1, 1);
    
    this.matrixAutoUpdate = true;
    this.matrixWorldNeedsUpdate = true;
    this.rotationAutoUpdate = true;
    this.useQuaternion = false;
    
    this.visible = true;
    
};

$3Dmol.Object3D.prototype = {
    
    constructor : $3Dmol.Object3D,
    
    lookAt : function(vector) {
        
        this.matrix.lookAt(vector, this.position, this.up);
        
        if (this.rotationAutoUpdate) {
            
            if (this.useQuaternion === true) 
                this.quaternion.copy(this.matrix.decompose()[1]);
            else
                this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder);
        }
    },
    
    //add child object
    add : function(object) {
        if (object === this){
            console.error("Can't add $3Dmol.Object3D to itself");
            return;
        }
        
        object.parent = this;
        this.children.push(object);
        
        //add to the scene (i.e. follow up this instance's parents until reach the top)
        
        var scene = this;
        
        while (scene.parent !== undefined)
            scene = scene.parent;
            
        if (scene !== undefined && scene instanceof $3Dmol.Scene) 
            scene.__addObject(object);
        
    },
    
    remove : function(object) {
        
        var index = this.children.indexOf(object);
        
        if (index !== -1) {
            
            object.parent = undefined;
            this.children.splice(index, 1);
            
            //Remove from scene
            
            var scene = this;
            
            while (scene.parent !== undefined)
                scene = scene.parent;
                
            if (scene !== undefined && scene instanceof $3Dmol.Scene)
                scene.__removeObject(object);
                
        }
    },
    
    updateMatrix : function() {
        
        this.matrix.setPosition(this.position);
        
        if (this.useQuaternion === false) 
            this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder);
        else
            this.matrix.setRotationFromQuaternion(this.quaternion);
        
        //TODO: Do I need this??
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1)
            this.matrix.scale(this.scale);
            
        this.matrixWorldNeedsUpdate = true;
        
    },
    
    updateMatrixWorld : function(force) {
        
        if (this.matrixAutoUpdate === true) 
            this.updateMatrix();
        
        if (this.matrixWorldNeedsUpdate === true || force === true) {
            
            if (this.parent === undefined)
                this.matrixWorld.copy(this.matrix);
            else
                this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
                
        }
        
        this.matrixWorldNeedsUpdate = false;
        
        //Update matrices of all children
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].updateMatrixWorld(true);
        }
    },
    
    clone : function(object) {
        
        if (object === undefined)
            object = new $3Dmol.Object3D();
            
        object.name = this.name;
        
        object.up.copy(this.up);
        object.position.copy(this.position);
        object.rotation.copy(this.rotation);
        object.eulerOrder = this.eulerOrder;
        object.scale.copy(this.scale);

        object.rotationAutoUpdate = this.rotationAutoUpdate;
        object.matrix.copy(this.matrix);
        object.matrixWorld.copy(this.matrixWorld);
        object.quaternion.copy(this.quaternion);
        object.matrixAutoUpdate = this.matrixAutoUpdate;
        object.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
        
        object.useQuaternion = this.useQuaternion;
        
        object.visible = this.visible;
        
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            object.add(child.clone());
        }
        
        return object;
        
    },
    
    setVisible: function(val) { //recursively set visibility
        this.visible = val;
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.setVisible(val);
        }
    }
};

$3Dmol.Object3DIDCount = 0;

//Geometry class
//TODO: What can I remove - how can I optimize ?
$3Dmol.Geometry = (function() {
   
    var BUFFERSIZE = 65535; //limited to 16bit indices
    
    
    /** @constructor */
    var geometryGroup = function(id) {
        this.id = id || 0;
        //for performance reasons, callers must directly modify these
        this.vertexArray = null;
        this.colorArray = null;
        this.normalArray = null;
        this.faceArray = null;
        this.radiusArray = null;
        //this.adjFaceArray=null;
        this.lineArray = null;
        this.vertices = 0;
        this.faceidx = 0;
        this.lineidx = 0;
        
    };
    
    geometryGroup.prototype.setColors = function(setcolor) {
        //apply a function that takes the vertex coordinate and returns a color
        var v = this.vertexArray;
        var c = this.colorArray;
        if(v.length != c.length) {
            console.log("Cannot re-color geometry group due to mismatched lengths.");
            return;
        }
        for(var i = 0; i < v.length; i+= 3) {
            var col = setcolor(v[i],v[i+1],v[i+2]);
            if(!(col instanceof $3Dmol.Color)) {
                col = $3Dmol.CC.color(col);
            }
            c[i] = col.r;
            c[i+1] = col.g;
            c[i+2] = col.b;
        }
    };
    geometryGroup.prototype.getNumVertices = function() {
        return this.vertices;
    };
    
    geometryGroup.prototype.getVertices = function() {
        return this.vertexArray;
    };
    
    
    geometryGroup.prototype.getCentroid = function() {
        
        var centroid = new $3Dmol.Vector3();
        var offset, x, y, z;
        
        for (var i = 0; i < this.vertices; ++i) {
            offset = i*3;
            
            x = this.vertexArray[offset]; y = this.vertexArray[offset+1]; z = this.vertexArray[offset+2];
            
            centroid.x += x; centroid.y += y; centroid.z += z;
        }
        
        //divideScalar checks for 0 denom
        centroid.divideScalar(this.vertices);
        
        return centroid;
    };
    
    //setup normals - vertex and face array must exist
    geometryGroup.prototype.setNormals = function() {        
        
        var faces = this.faceArray;
        var verts = this.vertexArray;
        var norms = this.normalArray;
        
        if (! this.vertices || ! this.faceidx) 
            return;
        
        //vertex indices
        var a, b, c, d,
        //and actual vertices
        vA, vB, vC, norm;
            
        for (var i = 0; i < faces.length / 3; ++i) {
            
            a = faces[i * 3] * 3;
            b = faces[i * 3 + 1] * 3;
            c = faces[i * 3 + 2] * 3;
            
            vA = new $3Dmol.Vector3(verts[a], verts[a+1], verts[a+2]);
            vB = new $3Dmol.Vector3(verts[b], verts[b+1], verts[b+2]);
            vC = new $3Dmol.Vector3(verts[c], verts[c+1], verts[c+2]);
            
            vA.subVectors(vA, vB);
            vC.subVectors(vC, vB);
            vC.cross(vA);
            
            //face normal
            norm = vC;
            norm.normalize();
            
            norms[a] += norm.x; norms[b] += norm.x; norms[c] += norm.x;
            norms[a + 1] += norm.y; norms[b + 1] += norm.y; norms[c + 1] += norm.y;
            norms[a + 2] += norm.z; norms[b + 2] += norm.z; norms[c + 2] += norm.z;
            
        }             
                
    };
    
    //sets line index array from face arr
    //Note - assumes all faces are triangles (i.e. there will
    //be an extra diagonal for four-sided faces - user should 
    //specify linearr for custom shape generation to show wireframe squares
    //as rectangles rather than two triangles)
    geometryGroup.prototype.setLineIndices = function() {
        
        if (! this.faceidx)
            return;
                    
        var faceArr = this.faceArray, lineArr = this.lineArray = new Uint16Array(this.faceidx*2);      
        this.lineidx = this.faceidx*2;         
            
        for (var i = 0; i < this.faceidx / 3; ++i) {
            
            var faceoffset = i*3;
            var lineoffset = faceoffset*2;
            var a = faceArr[faceoffset], b = faceArr[faceoffset+1], c = faceArr[faceoffset+2];
            
            lineArr[lineoffset] = a; lineArr[lineoffset+1] = b;
            lineArr[lineoffset+2] = a; lineArr[lineoffset+3] = c;
            lineArr[lineoffset+4] = b; lineArr[lineoffset+5] = c;
            
        }
    };
    
    geometryGroup.prototype.truncateArrayBuffers = function(mesh, reallocatemem) {
        
        mesh = (mesh === true) ? true : false;
        
        var vertexArr = this.vertexArray,
            colorArr = this.colorArray,
            normalArr = this.normalArray,
            faceArr = this.faceArray,
            lineArr = this.lineArray,
            radiusArr = this.radiusArray;

        //subarray to avoid copying and reallocating memory
        this.vertexArray = vertexArr.subarray(0,this.vertices*3);
        this.colorArray = colorArr.subarray(0,this.vertices*3);
        
        if (mesh) {
            this.normalArray = normalArr.subarray(0,this.vertices*3);
            this.faceArray = faceArr.subarray(0,this.faceidx); 
            
            if(this.lineidx > 0) //not always set so reclaim memory
                this.lineArray = lineArr.subarray(0,this.lineidx); 
            else
                this.lineArray = new Uint16Array(0);
                        
        }        
        else {
            this.normalArray = new Float32Array(0);
            this.faceArray = new Uint16Array(0);
            this.lineArray = new Uint16Array(0);
        }
        if (radiusArr) {
            this.radiusArray = radiusArr.subarray(0, this.vertices);
        }
        
        if(reallocatemem) { 
            //actually copy smaller arrays to save memory
            if(this.normalArray) this.normalArray = new Float32Array(this.normalArray);
            if(this.faceArray) this.faceArray = new Uint16Array(this.faceArray);
            if(this.lineArray) this.lineArray = new Uint16Array(this.lineArray);
            if(this.vertexArray) this.vertexArray = new Float32Array(this.vertexArray);
            if(this.colorArray) this.colorArray = new Float32Array(this.colorArray);
            if(this.radiusArray) this.radiusArray = new Float32Array(this.radiusArray);
        }
        this.__inittedArrays = true;        
        
    };
    
    var addGroup = function(geo) {
        var ret = new geometryGroup(geo.geometryGroups.length);
        geo.geometryGroups.push(ret);
        geo.groups = geo.geometryGroups.length;
        
        ret.vertexArray = new Float32Array(BUFFERSIZE*3);
        ret.colorArray = new Float32Array(BUFFERSIZE*3);
        
        //TODO: instantiating uint arrays according to max number of vertices
        // is dangerous, since there exists the possibility that there will be 
        // more face or line indices than vertex points - but so far that doesn't
        // seem to be the case for any of the renders 
        if (geo.mesh) {
            ret.normalArray = new Float32Array(BUFFERSIZE*3);
            ret.faceArray = new Uint16Array(BUFFERSIZE*6);
            ret.lineArray = new Uint16Array(BUFFERSIZE*6);
        }
        if (geo.radii) {
            ret.radiusArray = new Float32Array(BUFFERSIZE);
        }
        ret.useOffset = geo.offset;
        
        
        return ret;
    };
    /** @constructor */
    var Geometry = function(mesh, radii,offset) {
        
        $3Dmol.EventDispatcher.call(this);
        
        this.id = $3Dmol.GeometryIDCount++;
    
        this.name = '';
    
        this.hasTangents = false;
    
        this.dynamic = true; // the intermediate typed arrays will be deleted when set to false
        this.mesh = (mesh === true) ? true : false; // Does this geometry represent a mesh (i.e. do we need Face/Line index buffers?)
        this.radii = radii || false;
        this.offset = offset || false; //offset buffer used for instancing
        // update flags
    
        this.verticesNeedUpdate = false;
        this.elementsNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
    
        this.buffersNeedUpdate = false;
        
        this.geometryGroups = [];
        this.groups = 0;
        
    };
    
    Geometry.prototype = {
        
        constructor : Geometry,

        //Get geometry group to accomodate addVertices new vertices - create 
        // new group if necessary       
        updateGeoGroup : function(addVertices) {
        
            addVertices = addVertices || 0;
            
            var retGroup = this.groups > 0 ? this.geometryGroups[ this.groups - 1 ] : null;
            
            if (!retGroup || retGroup.vertices + addVertices > retGroup.vertexArray.length/3) 
                retGroup = addGroup(this);
                
            return retGroup;
            
        },
        
        addGeoGroup : function() {
            return addGroup(this);  
        },
        
        setUpNormals : function(three) {
            
            three = three || false;
            
            for (var g = 0; g < this.groups; g++) {
            
                var geoGroup = this.geometryGroups[g];            
                
                geoGroup.setNormals(three);
                
            }  
                      
        },
        
        setColors : function(setcolor) {
            var len = this.geometryGroups.length;
            for (var g = 0; g < len; g++) {
                
                var geoGroup = this.geometryGroups[g];                            
                geoGroup.setColors(setcolor);
                
            }  
        },
        
        setUpWireframe : function() {
            for (var g = 0; g < this.groups; g++) {
                var geoGroup = this.geometryGroups[g];
                
                geoGroup.setLineIndices();
            }
        },
        
        //After vertices, colors, etc are collected in regular or typed arrays,
        //  create typed arrays from regular arrays if they don't already exist,
        initTypedArrays : function() {
                
            for (var g = 0; g < this.groups; g++) {
                
                var group = this.geometryGroups[g];
                
                if (group.__inittedArrays === true)
                    continue;
                
                //do not actually reallocate smaller memory here because
                //of the performance hit - if you know your geometry is small,
                //truncate manually with the second parameter true
                group.truncateArrayBuffers(this.mesh, false);
            }
            
        
        },
        
        dispose : function() {
            this.dispatchEvent( {type : 'dispose'} );
        }
    };

    
    return Geometry;
    
})();

Object.defineProperty($3Dmol.Geometry.prototype, "vertices", {
    
    /** @this {$3Dmol.Geometry} */
    get : function() {
        var vertices = 0;
        for (var g = 0; g < this.groups; g++)
            vertices += this.geometryGroups[g].vertices;
            
        return vertices;
    } 
        
});

$3Dmol.GeometryIDCount = 0;


//Raycaster
/** @constructor */
$3Dmol.Raycaster = (function() {
    
    var Raycaster = function(origin, direction, far, near) {
        
        this.ray = new $3Dmol.Ray(origin, direction);
        
        if (this.ray.direction.lengthSq() > 0) 
            this.ray.direction.normalize();
        
        this.near = near || 0;
        this.far = far || Infinity;
    
    };
    
    var sphere = new $3Dmol.Sphere();
    var cylinder = new $3Dmol.Cylinder();
    var triangle = new $3Dmol.Triangle();
    var w_0 = new $3Dmol.Vector3(); // for cylinders, cylinder.c1 - ray.origin
    var v1 = new $3Dmol.Vector3(); // all purpose local vector
    var v2 = new $3Dmol.Vector3();
    var v3 = new $3Dmol.Vector3();
    //var facePlane = new $3Dmol.Plane();
    var localRay = new $3Dmol.Ray();
    var intersectPoint = new $3Dmol.Vector3();
    var matrixPosition = new $3Dmol.Vector3();
    
    var inverseMatrix = new $3Dmol.Matrix4();
        
    var descSort = function(a, b) {
        return a.distance - b.distance;
    };

    // [-1, 1]
    var clamp = function(x) {
        return Math.min(Math.max(x, -1), 1);
    };
    
    //object is a Sphere or (Bounding) Box
    var intersectObject = function(group, clickable, raycaster, intersects) {
        
        matrixPosition.getPositionFromMatrix(group.matrixWorld);
        
        if (clickable.intersectionShape === undefined)
            return intersects;       
        var intersectionShape = clickable.intersectionShape;
        var precision = raycaster.linePrecision;
        precision *= group.matrixWorld.getMaxScaleOnAxis();
        var precisionSq = precision*precision;

        //Check for intersection with clickable's bounding sphere, if it exists
        if (clickable.boundingSphere !== undefined && clickable.boundingSphere instanceof $3Dmol.Sphere) {
            sphere.copy(clickable.boundingSphere);
            sphere.applyMatrix4(group.matrixWorld);          
            if (!raycaster.ray.isIntersectionSphere(sphere)) {             
				return intersects;
            }
        }     


        //Iterate through intersection objects
        var i, il,
            norm, normProj, cylProj, rayProj,
            distance, closestDistSq, denom, discriminant,
            s, t, s_c, t_c;
        //triangle faces
        for (i = 0, il = intersectionShape.triangle.length; i < il; i++) {
            
            if (intersectionShape.triangle[i] instanceof $3Dmol.Triangle) {
                
                triangle.copy(intersectionShape.triangle[i]);
                triangle.applyMatrix4(group.matrixWorld);
                
                norm = triangle.getNormal();
                
                normProj = raycaster.ray.direction.dot(norm);
                
                //face culling
                if (normProj >= 0)
                    continue;
                
                w_0.subVectors(triangle.a, raycaster.ray.origin);
                
                distance = (norm.dot(w_0)) / normProj;
                
                if (distance < 0)
                    continue;
                    
                //intersects with plane, check if P inside triangle
                v1.copy(raycaster.ray.direction).multiplyScalar(distance).add(raycaster.ray.origin);
                v1.sub(triangle.a); // from pt a to intersection point P
                
                v2.copy(triangle.b).sub(triangle.a); // from pt a to b
                v3.copy(triangle.c).sub(triangle.a); // from pt a to c
                var b_dot_c = v2.dot(v3);
                var b_sq = v2.lengthSq();
                var c_sq = v3.lengthSq();
                
                // P = A + s(v2) + t(v3), inside trianle if 0 <= s, t <=1  and (s + t) <=0
                
                t = ( b_sq*v1.dot(v3) - b_dot_c*v1.dot(v2) ) / ( b_sq*c_sq - b_dot_c*b_dot_c );
                
                if (t < 0 || t > 1)
                    continue;
                
                s = ( v1.dot(v2) - t*b_dot_c ) / b_sq;
                
                if ( (s < 0 || s > 1) || s + t > 1)
                    continue;
                    
                else{
                    intersects.push({clickable : clickable,
                                     distance : distance});
				}  
            }
        }    
        //cylinders
        for (i = 0, il = intersectionShape.cylinder.length; i < il; i++) {
            
            if (intersectionShape.cylinder[i] instanceof $3Dmol.Cylinder){
                
                cylinder.copy(intersectionShape.cylinder[i]);
                cylinder.applyMatrix4(group.matrixWorld);
                
                w_0.subVectors(cylinder.c1, raycaster.ray.origin); 
                
                cylProj = w_0.dot(cylinder.direction); // Dela
                rayProj = w_0.dot(raycaster.ray.direction); // Epsilon
                
                normProj = clamp(raycaster.ray.direction.dot(cylinder.direction)); // Beta
                
                denom = 1 - normProj*normProj;
                
                if (denom === 0.0)
                    continue;
                
                s_c = (normProj*rayProj - cylProj) / denom;
                t_c = (rayProj - normProj*cylProj) / denom;
                
                v1.copy(cylinder.direction).multiplyScalar(s_c).add(cylinder.c1);  // Q_c
                v2.copy(raycaster.ray.direction).multiplyScalar(t_c).add(raycaster.ray.origin); // P_c
                
                closestDistSq = v3.subVectors(v1, v2).lengthSq();
                var radiusSq = cylinder.radius*cylinder.radius;
                
                //Smoothing?
                //if (closestDistSq > radiusSq) radiusSq += precisionSq;
                
                // closest distance between ray and cylinder axis not greater than cylinder radius;
                // might intersect this cylinder between atom and bond midpoint
                if (closestDistSq <= radiusSq){

                    //Find points where ray intersects sides of cylinder
                    discriminant = (normProj*cylProj - rayProj)*(normProj*cylProj - rayProj) - 
                            denom*(w_0.lengthSq() - cylProj*cylProj - radiusSq);
                    
                    // ray tangent to cylinder?
                    if (discriminant <= 0)
                        t = distance = Math.sqrt(closestDistSq);
                    else
                        t = distance = ( (rayProj - normProj*cylProj) - Math.sqrt(discriminant) ) / denom; 
                    
                    //find closest intersection point; make sure it's between atom's position and cylinder midpoint
                    
                    s = normProj*t - cylProj;
                    
                    //does not intersect cylinder between atom and midpoint,
                    // or intersects cylinder behind camera
                    if (s < 0 || s*s > cylinder.lengthSq() || t < 0)
                        continue;
                    
                    else
                        intersects.push({clickable : clickable,
                                         distance : distance});
                    
                }
                    
                
            }
            
        }       
        //lines
        for (i = 0, il = intersectionShape.line.length; i < il; i += 2) {
            
            v1.copy(intersectionShape.line[i]);
            v1.applyMatrix4(group.matrixWorld);
            v2.copy(intersectionShape.line[i+1]);
            v2.applyMatrix4(group.matrixWorld);
            
            v3.subVectors(v2, v1);
            var bondLengthSq = v3.lengthSq();
            v3.normalize();
            
            w_0.subVectors(v1, raycaster.ray.origin);
            
            var lineProj = w_0.dot(v3);
            rayProj = w_0.dot(raycaster.ray.direction);
            
            normProj = clamp(raycaster.ray.direction.dot(v3));
            
            denom = 1 - normProj*normProj;
            
            if (denom === 0.0)
                continue;
            
            s_c = (normProj*rayProj - lineProj) / denom;
            t_c = (rayProj - normProj*lineProj) / denom;
            
            v1.add(v3.multiplyScalar(s_c)); // Q_c
            v2.copy(raycaster.ray.direction).multiplyScalar(t_c).add(raycaster.ray.origin); // P_c
            
            closestDistSq = v3.subVectors(v2, v1).lengthSq();
            
            if (closestDistSq < precisionSq && s_c*s_c < bondLengthSq)
                intersects.push({clickable : clickable,
                                 distance : t_c
                                });
            
        }
        for (i = 0, il = intersectionShape.sphere.length; i < il; i++) {
            //sphere
            if (intersectionShape.sphere[i] instanceof $3Dmol.Sphere) {
                
                sphere.copy(intersectionShape.sphere[i]);
                sphere.applyMatrix4(group.matrixWorld);
                
                if (raycaster.ray.isIntersectionSphere(sphere)) {
                    
                    v1.subVectors(sphere.center, raycaster.ray.origin);
                    
                    //distance from ray origin to point on the ray normal to sphere's center
                    //must be less than sphere's radius (since ray intersects sphere)
                    var distanceToCenter = v1.dot(raycaster.ray.direction);
                    
                    discriminant = distanceToCenter*distanceToCenter - (v1.lengthSq() - sphere.radius*sphere.radius);
                    
                    //Don't select if sphere center behind camera
                    if (distanceToCenter < 0) 
                        return intersects;
                    
                    //ray tangent to sphere?
                    if (discriminant <= 0)
                        distance = distanceToCenter;
                    
                    //This is reversed if sphere is closer than ray origin.  Do we have 
                    //to worry about handling that case?
                    else 
                        distance = distanceToCenter - Math.sqrt(discriminant);
    
                    intersects.push({clickable : clickable, 
                                     distance : distance});
                    return intersects;
                }
            }        
       }
        
    };   
       
    Raycaster.prototype.precision = 0.0001;
    Raycaster.prototype.linePrecision = 0.2;
    
    Raycaster.prototype.set = function(origin, direction) {
        
        this.ray.set(origin, direction);
          
    };
    
    Raycaster.prototype.intersectObjects = function(group, objects) {     
        var intersects = [];
        
        for (var i = 0, l = objects.length; i < l; i++)            
            intersectObject(group, objects[i], this, intersects);
            
        intersects.sort(descSort);
        
        return intersects;
        
    };
    
    return Raycaster;
    
})();


//$3Dmol Projecion 
//TODO: can probably strip this down a lot (only used for selection handling)
/** @constructor */
$3Dmol.Projector = function () {

    var _viewMatrix = new $3Dmol.Matrix4(),
    _viewProjectionMatrix = new $3Dmol.Matrix4();

    this.projectVector = function ( vector, camera ) {

        camera.matrixWorldInverse.getInverse( camera.matrixWorld );

        _viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );

        return vector.applyProjection( _viewProjectionMatrix );

    };

    this.unprojectVector = function ( vector, camera ) {

        camera.projectionMatrixInverse.getInverse(camera.projectionMatrix);

        _viewProjectionMatrix.multiplyMatrices(camera.matrixWorld, camera.projectionMatrixInverse);

        return vector.applyProjection( _viewProjectionMatrix );

    };

};
/*
 * Simplified Perspective Camera
 */

/** @constructor */
$3Dmol.Camera = function(fov, aspect, near, far, ortho) {
    
    $3Dmol.Object3D.call(this);
    
    this.fov = fov !== undefined ? fov : 50;
    this.aspect = aspect !== undefined ? aspect : 1;
    this.near = near !== undefined ? near : 0.1;
    this.far = far !== undefined ? far : 2000;

    this.projectionMatrix = new $3Dmol.Matrix4();
    this.projectionMatrixInverse = new $3Dmol.Matrix4();
    this.matrixWorldInverse = new $3Dmol.Matrix4();
    
    var center = this.position.z;
    this.right = center * Math.tan(Math.PI / 180 * fov);
    this.left = -this.right;
    this.top = this.right / this.aspect;
    this.bottom = -this.top;
    
    this.ortho = !!ortho;
    
    this.updateProjectionMatrix();
        
};

//Inherit Object3D's prototyped methods
$3Dmol.Camera.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Camera.prototype.lookAt = function(vector){
    
    //Why is the parameter order switched (compared to Object3D)?
    this.matrix.lookAt(this.position, vector, this.up);
    
    if (this.rotationAutoUpdate) {    
        
        if (this.useQuaternion === false) 
            this.rotation.setEulerFromRotationMatrix( this.matrix, this.eulerOrder );
        else
            this.quaternion.copy( this.matrix.decompose()[ 1 ] );    
            
    }
    
};

$3Dmol.Camera.prototype.updateProjectionMatrix = function () {

    if(this.ortho) {
        this.projectionMatrix.makeOrthographic( this.left, this.right, this.top, this.bottom, this.near, this.far );
    } else {
        this.projectionMatrix.makePerspective( this.fov, this.aspect, this.near, this.far );
    }
    
    this.projectionMatrixInverse.getInverse(this.projectionMatrix);
};


//Render plugins go here

/**
 * Sprite render plugin
 * @this {$3Dmol.SpritePlugin}
 */

$3Dmol.SpritePlugin = function () {

    var _gl, _renderer, _precision, _sprite = {};

    this.init = function ( renderer ) {

        _gl = renderer.context;
        _renderer = renderer;

        _precision = renderer.getPrecision();

        _sprite.vertices = new Float32Array( 8 + 8 );
        _sprite.faces    = new Uint16Array( 6 );

        var i = 0;

        _sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = -1; // vertex 0
        _sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 0;  // uv 0

        _sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = -1; // vertex 1
        _sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 0;  // uv 1

        _sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;  // vertex 2
        _sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;  // uv 2

        _sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = 1;  // vertex 3
        _sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 1;  // uv 3

        i = 0;

        _sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 1; _sprite.faces[ i++ ] = 2;
        _sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 2; _sprite.faces[ i++ ] = 3;

        _sprite.vertexBuffer  = _gl.createBuffer();
        _sprite.elementBuffer = _gl.createBuffer();

        _gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );
        _gl.bufferData( _gl.ARRAY_BUFFER, _sprite.vertices, _gl.STATIC_DRAW );

        _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );
        _gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, _sprite.faces, _gl.STATIC_DRAW );

        _sprite.program = createProgram( $3Dmol.ShaderLib.sprite, _precision );

        _sprite.attributes = {};
        _sprite.uniforms = {};

        _sprite.attributes.position           = _gl.getAttribLocation ( _sprite.program, "position" );
        _sprite.attributes.uv                 = _gl.getAttribLocation ( _sprite.program, "uv" );

        _sprite.uniforms.uvOffset             = _gl.getUniformLocation( _sprite.program, "uvOffset" );
        _sprite.uniforms.uvScale              = _gl.getUniformLocation( _sprite.program, "uvScale" );

        _sprite.uniforms.rotation             = _gl.getUniformLocation( _sprite.program, "rotation" );
        _sprite.uniforms.scale                = _gl.getUniformLocation( _sprite.program, "scale" );
        _sprite.uniforms.alignment            = _gl.getUniformLocation( _sprite.program, "alignment" );

        _sprite.uniforms.color                = _gl.getUniformLocation( _sprite.program, "color" );
        _sprite.uniforms.map                  = _gl.getUniformLocation( _sprite.program, "map" );
        _sprite.uniforms.opacity              = _gl.getUniformLocation( _sprite.program, "opacity" );

        _sprite.uniforms.useScreenCoordinates = _gl.getUniformLocation( _sprite.program, "useScreenCoordinates" );
        _sprite.uniforms.screenPosition       = _gl.getUniformLocation( _sprite.program, "screenPosition" );
        _sprite.uniforms.modelViewMatrix      = _gl.getUniformLocation( _sprite.program, "modelViewMatrix" );
        _sprite.uniforms.projectionMatrix     = _gl.getUniformLocation( _sprite.program, "projectionMatrix" );

        _sprite.uniforms.fogType              = _gl.getUniformLocation( _sprite.program, "fogType" );
        _sprite.uniforms.fogDensity           = _gl.getUniformLocation( _sprite.program, "fogDensity" );
        _sprite.uniforms.fogNear              = _gl.getUniformLocation( _sprite.program, "fogNear" );
        _sprite.uniforms.fogFar               = _gl.getUniformLocation( _sprite.program, "fogFar" );
        _sprite.uniforms.fogColor             = _gl.getUniformLocation( _sprite.program, "fogColor" );

        _sprite.uniforms.alphaTest            = _gl.getUniformLocation( _sprite.program, "alphaTest" );

    };

    this.render = function ( scene, camera, viewportWidth, viewportHeight ) {

        var sprites = scene.__webglSprites,
            nSprites = sprites.length;

        if ( ! nSprites ) return;

        var attributes = _sprite.attributes,
            uniforms = _sprite.uniforms;

        var invAspect = viewportHeight / viewportWidth;

        var halfViewportWidth = viewportWidth * 0.5,
            halfViewportHeight = viewportHeight * 0.5;

        // setup gl

        _gl.useProgram( _sprite.program );

        _gl.enableVertexAttribArray( attributes.position );
        _gl.enableVertexAttribArray( attributes.uv );

        _gl.disable( _gl.CULL_FACE );
        _gl.enable( _gl.BLEND );

        _gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );
        _gl.vertexAttribPointer( attributes.position, 2, _gl.FLOAT, false, 2 * 8, 0 );
        _gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 2 * 8, 8 );

        _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );

        _gl.uniformMatrix4fv( uniforms.projectionMatrix, false, camera.projectionMatrix.elements );

        _gl.activeTexture( _gl.TEXTURE0 );
        _gl.uniform1i( uniforms.map, 0 );

        var oldFogType = 0;
        var sceneFogType = 0;
        var fog = scene.fog;

        if ( fog ) {

            _gl.uniform3f( uniforms.fogColor, fog.color.r, fog.color.g, fog.color.b );

            _gl.uniform1f( uniforms.fogNear, fog.near );
            _gl.uniform1f( uniforms.fogFar, fog.far );

            _gl.uniform1i( uniforms.fogType, 1 );
            oldFogType = 1;
            sceneFogType = 1;


        } 
        
        else {

            _gl.uniform1i( uniforms.fogType, 0 );
            oldFogType = 0;
            sceneFogType = 0;

        }


        // update positions and sort

        var i, sprite, material, screenPosition, size, fogType, scale = [];

        for( i = 0; i < nSprites; i ++ ) {

            sprite = sprites[ i ];
            material = sprite.material;

            if ( ! sprite.visible || material.opacity === 0 ) continue;

            if ( ! material.useScreenCoordinates ) {

                sprite._modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, sprite.matrixWorld );
                sprite.z = - sprite._modelViewMatrix.elements[ 14 ];

            } else {

                sprite.z = - sprite.position.z;

            }

        }

        sprites.sort( painterSortStable );

        // render all sprites

        for( i = 0; i < nSprites; i ++ ) {

            sprite = sprites[ i ];
            material = sprite.material;

            if ( ! sprite.visible || material.opacity === 0 ) continue;

            if ( material.map && material.map.image && material.map.image.width ) {

                _gl.uniform1f( uniforms.alphaTest, material.alphaTest );
                var w = material.map.image.width;
                var h = material.map.image.height;
                
                scale[ 0 ] = w*_renderer.devicePixelRatio/viewportWidth;
                scale[ 1 ] = h*_renderer.devicePixelRatio/viewportHeight;
                
                if ( material.useScreenCoordinates === true ) {

                    _gl.uniform1i( uniforms.useScreenCoordinates, 1 );
                    _gl.uniform3f(
                        uniforms.screenPosition,
                        ( ( sprite.position.x * _renderer.devicePixelRatio ) - halfViewportWidth  ) / halfViewportWidth,
                        ( halfViewportHeight - ( sprite.position.y * _renderer.devicePixelRatio ) ) / halfViewportHeight,
                        Math.max( 0, Math.min( 1, sprite.position.z ) )
                    );

                } else {

                    _gl.uniform1i( uniforms.useScreenCoordinates, 0 );
                    _gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, sprite._modelViewMatrix.elements );
                }

                if ( scene.fog && material.fog ) {

                    fogType = sceneFogType;

                } else {

                    fogType = 0;

                }

                if ( oldFogType !== fogType ) {

                    _gl.uniform1i( uniforms.fogType, fogType );
                    oldFogType = fogType;

                }

                size = 1 / ( material.scaleByViewport ? viewportHeight : 1 );

                scale[ 0 ] *= size * sprite.scale.x;
                scale[ 1 ] *= size * sprite.scale.y;

                _gl.uniform2f( uniforms.uvScale, material.uvScale.x, material.uvScale.y );
                _gl.uniform2f( uniforms.uvOffset, material.uvOffset.x, material.uvOffset.y );
                _gl.uniform2f( uniforms.alignment, material.alignment.x, material.alignment.y );

                _gl.uniform1f( uniforms.opacity, material.opacity );
                _gl.uniform3f( uniforms.color, material.color.r, material.color.g, material.color.b );

                _gl.uniform1f( uniforms.rotation, sprite.rotation );
                _gl.uniform2fv( uniforms.scale, scale );

                //_renderer.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );
                _renderer.setDepthTest( material.depthTest );
                _renderer.setDepthWrite( material.depthWrite );
                _renderer.setTexture( material.map, 0 );

                _gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );

            }

        }

        // restore gl

        _gl.enable( _gl.CULL_FACE );

    };

    function createProgram ( shader, precision ) {

        var program = _gl.createProgram();

        var fragmentShader = _gl.createShader( _gl.FRAGMENT_SHADER );
        var vertexShader = _gl.createShader( _gl.VERTEX_SHADER );

        var prefix = "precision " + precision + " float;\n";

        _gl.shaderSource( fragmentShader, prefix + shader.fragmentShader );
        _gl.shaderSource( vertexShader, prefix + shader.vertexShader );

        _gl.compileShader( fragmentShader );
        _gl.compileShader( vertexShader );
        
        if ( ! _gl.getShaderParameter(fragmentShader, _gl.COMPILE_STATUS) || ! _gl.getShaderParameter(vertexShader,_gl.COMPILE_STATUS) ) {

                console.error(_gl.getShaderInfoLog(fragmentShader));
                console.error("could not initialize shader");
                return null;
        }

        _gl.attachShader( program, fragmentShader );
        _gl.attachShader( program, vertexShader );

        _gl.linkProgram( program );

        if (! _gl.getProgramParameter(program, _gl.LINK_STATUS) )
                console.error("Could not initialize shader");

        return program;

    }

    function painterSortStable ( a, b ) {

        if ( a.z !== b.z ) {

            return b.z - a.z;

        } else {

            return b.id - a.id;

        }

    }

};

$3Dmol.Light = function(hex, intensity) {
    
    $3Dmol.Object3D.call(this);
    
    this.color = new $3Dmol.Color(hex);
    this.position = new $3Dmol.Vector3( 0, 1, 0 );
    this.target = new $3Dmol.Object3D();

    this.intensity = ( intensity !== undefined ) ? intensity : 1;

    this.castShadow = false;
    this.onlyShadow = false;
    
};

$3Dmol.Light.prototype = Object.create($3Dmol.Object3D.prototype);
/**
 * Line and Mesh material types
 * @constructor
 */
$3Dmol.Material = function () {

    $3Dmol.EventDispatcher.call( this );

    this.id = $3Dmol.MaterialIdCount ++;

    this.name = '';
    
    //TODO: Which of these instance variables can I remove??
    this.side = $3Dmol.FrontSide;

    this.opacity = 1;
    this.transparent = false;

    this.depthTest = true;
    this.depthWrite = true;
    
    this.stencilTest = true;

    this.polygonOffset = false;
    this.polygonOffsetFactor = 0;
    this.polygonOffsetUnits = 0;

    this.alphaTest = 0;

    this.visible = true;

    this.needsUpdate = true;

};


$3Dmol.Material.prototype.setValues = function ( values ) {

    if ( values === undefined ) return;

    for ( var key in values ) {

        var newValue = values[ key ];

        if ( newValue === undefined ) {

            console.warn( '$3Dmol.Material: \'' + key + '\' parameter is undefined.' );
            continue;

        }

        if ( key in this ) {

            var currentValue = this[ key ];

            if ( currentValue instanceof $3Dmol.Color && newValue instanceof $3Dmol.Color ) {

                currentValue.copy( newValue );

            } else if ( currentValue instanceof $3Dmol.Color ) {

                currentValue.set( newValue );

            } else if ( currentValue instanceof $3Dmol.Vector3 && newValue instanceof $3Dmol.Vector3 ) {

                currentValue.copy( newValue );

            } else {

                this[ key ] = newValue;

            }

        }

    }

};
//TODO: might want to look into blending equations
$3Dmol.Material.prototype.clone = function ( material ) {

    if ( material === undefined ) material = new $3Dmol.Material();

    material.name = this.name;

    material.side = this.side;

    material.opacity = this.opacity;
    material.transparent = this.transparent;

    material.depthTest = this.depthTest;
    material.depthWrite = this.depthWrite;
    material.stencilTest = this.stencilTest;

    material.polygonOffset = this.polygonOffset;
    material.polygonOffsetFactor = this.polygonOffsetFactor;
    material.polygonOffsetUnits = this.polygonOffsetUnits;

    material.alphaTest = this.alphaTest;

    material.overdraw = this.overdraw;

    material.visible = this.visible;

    return material;

};

$3Dmol.Material.prototype.dispose = function () {

    this.dispatchEvent( { type: 'dispose' } );

};

$3Dmol.MaterialIdCount = 0;

//Line basic material
/** @constructor */
$3Dmol.LineBasicMaterial = function(parameters) {
    
    $3Dmol.Material.call(this);
    
    this.color = new $3Dmol.Color(0xffffff);
    
    this.linewidth = 1;
    this.linecap = 'round';
    this.linejoin = 'round';
    
    this.vertexColors = false;
    
    this.fog = true;
    this.shaderID = "basic";
    this.setValues(parameters);
    
};

$3Dmol.LineBasicMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.LineBasicMaterial.prototype.clone = function() {
  
    var material = new $3Dmol.LineBasicMaterial();
    
    $3Dmol.Material.prototype.clone.call(this, material);
    
    material.color.copy(this.color);
    return material;
};

//Mesh Lambert material
/** @constructor */
$3Dmol.MeshLambertMaterial = function(parameters) {
    
    $3Dmol.Material.call(this);
    
    this.color = new $3Dmol.Color(0xffffff);
    this.ambient = new $3Dmol.Color(0xfffff);
    this.emissive = new $3Dmol.Color(0x000000);
    
    //TODO: Which of these instance variables do I really need?
    this.wrapAround = false;
    this.wrapRGB = new $3Dmol.Vector3(1,1,1);
    
    this.map = null;
    
    this.lightMap = null;
    
    this.specularMap = null;
    
    this.envMap = null;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    
    this.fog = true;
    
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';
    
    this.shading = $3Dmol.SmoothShading;
    this.shaderID = "lambert";
    this.vertexColors = $3Dmol.NoColors;
    
    this.skinning = false;
    
    this.setValues(parameters);
    
};

$3Dmol.MeshLambertMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.MeshLambertMaterial.prototype.clone = function(material) {
  
    if ( typeof material === "undefined" ) material = new $3Dmol.MeshLambertMaterial();
    
    $3Dmol.Material.prototype.clone.call(this, material);
    
    material.color.copy(this.color);
    material.ambient.copy(this.ambient);
    material.emissive.copy(this.emissive);
    
    material.wrapAround = this.wrapAround;
    material.wrapRGB.copy(this.wrapRGB);
    
    material.map = this.map;
    
    material.lightMap = this.lightMap;
    
    material.specularMap = this.specularMap;
    
    material.envMap = this.envMap;
    material.combine = this.combine;
    material.reflectivity = this.reflectivity;
    material.refractionRatio = this.refractionRatio;
    
    material.fog = this.fog;
    
    material.shading = this.shading;
    material.shaderID = this.shaderID;
    material.vertexColors = this.vertexColors;
    
    material.skinning = this.skinning;
    material.morphTargets = this.morphTargets;
    material.morphNormals = this.morphNormals;
    
    return material;
    
};

//Double sided Mesh Lambert material
/** @constructor */
$3Dmol.MeshDoubleLambertMaterial = function(parameters) {
    
    $3Dmol.MeshLambertMaterial.call(this, parameters);

    this.shaderID = "lambertdouble";
    this.side = $3Dmol.DoubleSide;    
    
};

$3Dmol.MeshDoubleLambertMaterial.prototype = Object.create($3Dmol.MeshLambertMaterial.prototype);

$3Dmol.MeshDoubleLambertMaterial.prototype.clone = function() {
  
    var material = new $3Dmol.MeshDoubleLambertMaterial();
    
    $3Dmol.MeshLambertMaterial.prototype.clone.call(this, material);
        
    return material;
    
};

//Outlined Mesh Lamert material
/** @constructor */
$3Dmol.MeshOutlineMaterial = function(parameters) {
    $3Dmol.Material.call(this);
    parameters = parameters || {};
    this.fog = true;
    this.shaderID = "outline";
    this.wireframe=false;
    this.outlineColor= parameters.color || new $3Dmol.Color(0.0,0.0,0.0);
    this.outlineWidth= parameters.width || 0.1;
    this.outlinePushback= parameters.pushback || 1.0;
    
};

$3Dmol.MeshOutlineMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.MeshOutlineMaterial.prototype.clone = function(material) {
    if ( typeof material === "undefined" ) material = new $3Dmol.MeshOutlineMaterial();
    $3Dmol.Material.prototype.clone.call(this, material);
    material.fog = this.fog;
    material.shaderID = this.shaderID;
    material.wireframe = this.wireframe;
    return material;
};


//Imposter material
/** @constructor */
$3Dmol.ImposterMaterial = function(parameters) {
  
  $3Dmol.Material.call(this);
  
  this.color = new $3Dmol.Color(0xffffff);
  this.ambient = new $3Dmol.Color(0xfffff);
  this.emissive = new $3Dmol.Color(0x000000);
  this.imposter = true;
  
  //TODO: Which of these instance variables do I really need?
  this.wrapAround = false;
  this.wrapRGB = new $3Dmol.Vector3(1,1,1);
  
  this.map = null;
  
  this.lightMap = null;
  
  this.specularMap = null;
  
  this.envMap = null;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  
  this.fog = true;
  
  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.wireframeLinecap = 'round';
  this.wireframeLinejoin = 'round';
  
  this.shading = $3Dmol.SmoothShading;
  this.shaderID = null;
  this.vertexColors = $3Dmol.NoColors;
  
  this.skinning = false;
  
  this.setValues(parameters);
  
};

$3Dmol.ImposterMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.ImposterMaterial.prototype.clone = function() {

  var material = new $3Dmol.ImposterMaterial();
  
  $3Dmol.Material.prototype.clone.call(this, material);
  
  material.color.copy(this.color);
  material.ambient.copy(this.ambient);
  material.emissive.copy(this.emissive);
  
  material.wrapAround = this.wrapAround;
  material.wrapRGB.copy(this.wrapRGB);
  
  material.map = this.map;
  
  material.lightMap = this.lightMap;
  
  material.specularMap = this.specularMap;
  
  material.envMap = this.envMap;
  material.combine = this.combine;
  material.reflectivity = this.reflectivity;
  material.refractionRatio = this.refractionRatio;
  
  material.fog = this.fog;
  
  material.shading = this.shading;
  material.shaderID = this.shaderID;
  material.vertexColors = this.vertexColors;
  
  material.skinning = this.skinning;
  material.morphTargets = this.morphTargets;
  material.morphNormals = this.morphNormals;
  
  return material;
  
};


$3Dmol.SphereImposterMaterial = function(parameters) {
    
    $3Dmol.ImposterMaterial.call(this);

    this.shaderID = "sphereimposter";    
    this.setValues(parameters);
    
};

$3Dmol.SphereImposterMaterial.prototype = Object.create($3Dmol.ImposterMaterial.prototype);

$3Dmol.SphereImposterMaterial.prototype.clone = function() {

    var material = new $3Dmol.SphereImposterMaterial();
    $3Dmol.ImposterMaterial.prototype.clone.call(this, material);
    return material;
};


$3Dmol.SphereImposterOutlineMaterial = function(parameters) {
    
    $3Dmol.ImposterMaterial.call(this);
    parameters = parameters || {};

    this.shaderID = "sphereimposteroutline";
    this.outlineColor= parameters.color || new $3Dmol.Color(0.0,0.0,0.0);
    this.outlineWidth= parameters.width || 0.1;
    this.outlinePushback= parameters.pushback || 1.0;
    
    this.setValues(parameters);
    
};

$3Dmol.SphereImposterOutlineMaterial.prototype = Object.create($3Dmol.ImposterMaterial.prototype);

$3Dmol.SphereImposterOutlineMaterial.prototype.clone = function() {

    var material = new $3Dmol.SphereImposterOutlineMaterial();
    $3Dmol.ImposterMaterial.prototype.clone.call(this, material);
    material.outlineColor = this.outlineColor;
    material.outlineWidth = this.outlineWidth;
    material.outlinePushback = this.outlinePushback;
    return material;
};


$3Dmol.StickImposterMaterial = function(parameters) {
    
    $3Dmol.ImposterMaterial.call(this);

    this.shaderID = "stickimposter";    
    this.setValues(parameters);
    
};

$3Dmol.StickImposterMaterial.prototype = Object.create($3Dmol.ImposterMaterial.prototype);

$3Dmol.StickImposterMaterial.prototype.clone = function() {

    var material = new $3Dmol.StickImposterOutlineMaterial();
    $3Dmol.ImposterMaterial.prototype.clone.call(this, material);
    return material;
};


$3Dmol.StickImposterOutlineMaterial = function(parameters) {
    
    $3Dmol.ImposterMaterial.call(this);
    parameters = parameters || {};

    this.shaderID = "stickimposteroutline";
    this.outlineColor= parameters.color || new $3Dmol.Color(0.0,0.0,0.0);
    this.outlineWidth= parameters.width || 0.1;
    this.outlinePushback= parameters.pushback || 1.0;
    
    this.setValues(parameters);
    
};

$3Dmol.StickImposterOutlineMaterial.prototype = Object.create($3Dmol.ImposterMaterial.prototype);

$3Dmol.StickImposterOutlineMaterial.prototype.clone = function() {

    var material = new $3Dmol.StickImposterOutlineMaterial();
    $3Dmol.ImposterMaterial.prototype.clone.call(this, material);
    material.outlineColor = this.outlineColor;
    material.outlineWidth = this.outlineWidth;
    material.outlinePushback = this.outlinePushback;
    return material;
};


$3Dmol.InstancedMaterial = function(parameters) {

    $3Dmol.Material.call(this);

    this.color = new $3Dmol.Color(0xffffff);
    this.ambient = new $3Dmol.Color(0xfffff);
    this.emissive = new $3Dmol.Color(0x000000);

    //TODO: Which of these instance variables do I really need?
    this.wrapAround = false;
    this.wrapRGB = new $3Dmol.Vector3(1,1,1);

    this.map = null;

    this.lightMap = null;

    this.specularMap = null;

    this.envMap = null;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;

    this.fog = true;

    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';

    this.shading = $3Dmol.SmoothShading;
    this.shaderID = "instanced";
    this.vertexColors = $3Dmol.NoColors;

    this.skinning = false;

    this.sphere = null;

    this.setValues(parameters);

};

$3Dmol.InstancedMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.InstancedMaterial.prototype.clone = function() {

    var material = new $3Dmol.InstancedMaterial();

    $3Dmol.Material.prototype.clone.call(this, material);

    material.color.copy(this.color);
    material.ambient.copy(this.ambient);
    material.emissive.copy(this.emissive);

    material.wrapAround = this.wrapAround;
    material.wrapRGB.copy(this.wrapRGB);

    material.map = this.map;

    material.lightMap = this.lightMap;

    material.specularMap = this.specularMap;

    material.envMap = this.envMap;
    material.combine = this.combine;
    material.reflectivity = this.reflectivity;
    material.refractionRatio = this.refractionRatio;

    material.fog = this.fog;

    material.shading = this.shading;
    material.shaderID = this.shaderID;
    material.vertexColors = this.vertexColors;

    material.skinning = this.skinning;
    material.morphTargets = this.morphTargets;
    material.morphNormals = this.morphNormals;

    material.sphere = this.sphere;

  return material;

};


//Sprite material
/** @constructor */
$3Dmol.SpriteMaterial = function(parameters) {
    
    $3Dmol.Material.call(this);
    
    this.color = new $3Dmol.Color(0xffffff);
    this.map = new $3Dmol.Texture();
    
    this.useScreenCoordinates = true;
    this.depthTest = !this.useScreenCoordinates;
    this.sizeAttenuation = !this.useScreenCoordinates;
    this.scaleByViewPort = !this.sizeAttenuation;
    this.alignment = $3Dmol.SpriteAlignment.center.clone();
    
    this.fog = false; // use scene fog
    
    this.uvOffset = new $3Dmol.Vector2(0, 0);
    this.uvScale = new $3Dmol.Vector2(1, 1);
    
    this.setValues(parameters);
    
    parameters = parameters || {};
    
    if (parameters.depthTest === undefined)
        this.depthTest = !this.useScreenCoordinates;
    if (parameters.sizeAttenuation === undefined)
        this.sizeAttenuation = !this.useScreenCoordinates;
    if (parameters.scaleByViewPort === undefined)
        this.scaleByViewPort = !this.sizeAttenuation;
    
};

$3Dmol.SpriteMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.SpriteMaterial.prototype.clone = function() {
    
    var material = new $3Dmol.SpriteMaterial();
    
    $3Dmol.Material.prototype.clone.call(this, material);
    
    material.color.copy(this.color);
    material.map = this.map;
    
    material.useScreenCoordinates = useScreenCoordinates;
    material.sizeAttenuation = this.sizeAttenuation;
    material.scaleByViewport = this.scaleByViewPort;
    material.alignment.copy(this.alignment);
    
    material.uvOffset.copy(this.uvOffset);
    
    return material;
    
};

//Alignment for Sprites

$3Dmol.SpriteAlignment = {};
$3Dmol.SpriteAlignment.topLeft = new $3Dmol.Vector2(1, -1);
$3Dmol.SpriteAlignment.topCenter = new $3Dmol.Vector2(0, -1);
$3Dmol.SpriteAlignment.topRight = new $3Dmol.Vector2(-1, -1);
$3Dmol.SpriteAlignment.centerLeft = new $3Dmol.Vector2(1, 0);
$3Dmol.SpriteAlignment.center = new $3Dmol.Vector2(0, 0);
$3Dmol.SpriteAlignment.centerRight = new $3Dmol.Vector2(-1, 0);
$3Dmol.SpriteAlignment.bottomLeft = new $3Dmol.Vector2(1, 1);
$3Dmol.SpriteAlignment.bottomCenter = new $3Dmol.Vector2(0, 1);
$3Dmol.SpriteAlignment.bottomRight = new $3Dmol.Vector2(-1, 1);


//Texture
//We really only create textures from 2d rendering contexts (to display text labels)
/** @constructor */
$3Dmol.Texture = function(image) {

    $3Dmol.EventDispatcher.call(this);
    
    this.id = $3Dmol.TextureIdCount++;
    
    this.name = "";
    
    this.image = image;
    this.mipmaps = [];
    
    this.mapping = new $3Dmol.UVMapping();
    
    this.wrapS = $3Dmol.ClampToEdgeWrapping;
    this.wrapT = $3Dmol.ClampToEdgeWrapping;
    
    this.magFilter = $3Dmol.LinearFilter;
    this.minFilter = $3Dmol.LinearMipMapLinearFilter;
    
    this.anisotropy = 1;
    
    this.format = $3Dmol.RGBAFormat;
    this.type = $3Dmol.UnsignedByteType;
    
    this.offset = new $3Dmol.Vector2(0, 0);
    this.repeat = new $3Dmol.Vector2(1, 1);
    
    this.generateMipmaps = true;
    this.premultiplyAlpha = false;
    this.flipY = true;
    this.unpackAlignment = 4;
    
    this.needsUpdate = false;
    this.onUpdate = null;
    
};

$3Dmol.Texture.prototype = {

    constructor : $3Dmol.Texture,
    
    clone : function(texture) {
        
        if (texture === undefined)
            texture = new $3Dmol.Texture();
        
        texture.image = this.image;
        texture.mipmaps = this.mipmaps.slice(0);
        
        texture.mapping = this.mapping;
        
        texture.wrapS = this.wrapS;
        texture.wrapT = this.wrapT;
        
        texture.magFilter = this.magFilter;
        texture.minFilter = this.minFilter;
        
        texture.anisotropy = this.anisotropy;
        
        texture.format = this.format;
        texture.type = this.type;
        
        texture.offset.copy(this.offset);
        texture.repeat.copy(this.repeat);
        
        texture.generateMipmaps = this.generateMipmaps;
        texture.premultiplyAlpha = this.premultiplyAlpha;
        texture.flipY = this.flipY;
        texture.unpackAlignment = this.unpackAlignment;
        
        return texture;
        
    },
    
    dispose : function() {
        
        this.dispatchEvent( {type: 'dispose'});
        
    }    
    
};

$3Dmol.TextureIdCount = 0;


// sides
$3Dmol.FrontSide = 0;
$3Dmol.BackSide = 1;
$3Dmol.DoubleSide = 2;

// shading
$3Dmol.NoShading = 0;
$3Dmol.FlatShading = 1;
$3Dmol.SmoothShading = 2;

// colors
$3Dmol.NoColors = 0;
$3Dmol.FaceColors = 1;
$3Dmol.VertexColors = 2;

//Texture constants
//TODO: Which of these do I need (since I only use textures to display label sprites) ?
$3Dmol.MultiplyOperation = 0;
$3Dmol.MixOperation = 1;
$3Dmol.AddOperation = 2;

// mapping modes

$3Dmol.UVMapping = function() {};

// wrapping modes
$3Dmol.ClampToEdgeWrapping = 1001;

//Filters
$3Dmol.LinearFilter = 1006;
$3Dmol.LinearMipMapLinearFilter = 1008;

//Data types
$3Dmol.UnsignedByteType = 1009;

//Pixel formats
$3Dmol.RGBAFormat = 1021;
/* 
 * $3Dmol Mesh and Line objects
 */


//Line Object
/** @constructor */
$3Dmol.Line = function (geometry, material, type) {

    $3Dmol.Object3D.call(this);

    this.geometry = geometry;
        //TODO: update material and type to webgl
    this.material = (material !== undefined) ? material : new $3Dmol.LineBasicMaterial( { color: Math.random() * 0xffffff } );
    this.type = (type !== undefined) ? type : $3Dmol.LineStrip;

};

$3Dmol.LineStrip = 0;
$3Dmol.LinePieces = 1;

$3Dmol.Line.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Line.prototype.clone = function (object) {

    if (object === undefined) object = new $3Dmol.Line(this.geometry, this.material, this.type);

    $3Dmol.Object3D.prototype.clone.call(this, object);

    return object;

};


//Mesh Object
/** @constructor */
$3Dmol.Mesh = function(geometry, material) {

    $3Dmol.Object3D.call(this);

    this.geometry = geometry;
    this.material = (material !== undefined) ? material : new $3Dmol.MeshBasicMaterial( { color: Math.random() * 0xffffff, wireframe: true } );

};

$3Dmol.Mesh.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Mesh.prototype.clone = function (object) {

    if (object === undefined) object = new $3Dmol.Mesh(this.geometry, this.material);

    $3Dmol.Object3D.prototype.clone.call(this, object);

    return object;

};


//Sprite object
/** @constructor */
$3Dmol.Sprite = function(material) {
    
    $3Dmol.Object3D.call(this);
    
    this.material = (material !== undefined) ? material : new $3Dmol.SpriteMaterial();

    this.rotation3d = this.rotation;
    this.rotation = 0;
    
};

$3Dmol.Sprite.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Sprite.prototype.updateMatrix = function() {
    
    this.matrix.setPosition(this.position);
    
    this.rotation3d.set(0, 0, this.rotation);
    this.matrix.setRotationFromEuler(this.rotation3d);
    
    if (this.scale.x !== 1 || this.scale.y !== 1)
        this.matrix.scale(this.scale);
    
    this.matrixWorldNeedsUpdate = true;
    
};

$3Dmol.Sprite.prototype.clone = function(object) {
    
    if (object === undefined)
        object = new $3Dmol.Sprite(this.material);
    
    $3Dmol.Object3D.prototype.clone.call(this, object);
    
    return object;
    
};
/**
 * Simplified webGL renderer
 */

$3Dmol.Renderer = function(parameters) {

    parameters = parameters || {};

    var _canvas = parameters.canvas !== undefined ? parameters.canvas
            : document.createElement('canvas'),


    _precision = parameters.precision !== undefined ? parameters.precision
            : 'highp', _alpha = parameters.alpha !== undefined ? parameters.alpha
            : true, _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha
            : true, _antialias = parameters.antialias !== undefined ? parameters.antialias
            : false, _stencil = parameters.stencil !== undefined ? parameters.stencil
            : true, _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer
            : false, _clearColor = parameters.clearColor !== undefined ? new $3Dmol.Color(
            parameters.clearColor) : new $3Dmol.Color(0x000000),
             _clearAlpha = parameters.clearAlpha !== undefined ? parameters.clearAlpha : 0, 
            _outlineMaterial = new $3Dmol.MeshOutlineMaterial(parameters.outline),
            _outlineSphereImposterMaterial = new $3Dmol.SphereImposterOutlineMaterial(parameters.outline),
            _outlineStickImposterMaterial = new $3Dmol.StickImposterOutlineMaterial(parameters.outline),
            _outlineEnabled = !!parameters.outline
            ;
    this.domElement = _canvas;
    this.context = null;
    this.devicePixelRatio = parameters.devicePixelRatio !== undefined ? parameters.devicePixelRatio
            : (self.devicePixelRatio !== undefined) ? self.devicePixelRatio : 1;

    // clearing
    _canvas.id=parameters.id;
    this.autoClear = true;
    this.autoClearColor = true;
    this.autoClearDepth = true;
    this.autoClearStencil = true;

    // scene graph

    this.sortObjects = true;

    this.autoUpdateObjects = true;
    this.autoUpdateScene = true;

    this.renderPluginsPost = [];

    // info

    this.info = {
        memory : {

            programs : 0,
            geometries : 0,
            textures : 0

        },
        render : {

            calls : 0,
            vertices : 0,
            faces : 0,
            points : 0

        }
    };

    // internal properties
    var _this = this,
    _programs = [], _programs_counter = 0,
    
    // internal state cache
    _currentProgram = null, _currentFramebuffer = null, _currentMaterialId = -1, _currentGeometryGroupHash = null, _currentCamera = null, _geometryGroupCounter = 0,
    _usedTextureUnits = 0,

    // GL state cache
    _oldDoubleSided = -1, _oldFlipSided = -1,
    _oldBlending = -1,
    _oldBlendEquation = -1, _oldBlendSrc = -1, _oldBlendDst = -1,
    _oldDepthTest = -1, _oldDepthWrite = -1,
    _oldPolygonOffset = null, _oldPolygonOffsetFactor = null, _oldPolygonOffsetUnits = null,
    _oldLineWidth = null,

    _viewportWidth = 0, _viewportHeight = 0, _currentWidth = 0, _currentHeight = 0,
    _enabledAttributes = {},

    // camera matrices cache
    _projScreenMatrix = new $3Dmol.Matrix4(),
    _vector3 = new $3Dmol.Vector3(),

    // light arrays cache
    _direction = new $3Dmol.Vector3(),
    _lightsNeedUpdate = true,

    _lights = {
        ambient : [ 0, 0, 0 ],
        directional : {
            length : 0,
            colors : [],
            positions : []
        },
        point : {
            length : 0,
            colors : [],
            positions : [],
            distances : []
        },
        spot : {
            length : 0,
            colors : [],
            positions : [],
            distances : [],
            directions : [],
            anglesCos : [],
            exponents : []
        },
        hemi : {
            length : 0,
            skyColors : [],
            groundColors : [],
            positions : []
        }

    };

    // initialize
    var _gl;

    initGL();
    setDefaultGLState();

    this.context = _gl;
    var _extInstanced = _gl.getExtension("ANGLE_instanced_arrays");
    var _extFragDepth = _gl.getExtension("EXT_frag_depth");

    // API
    
    this.supportedExtensions = function() {
        return {supportsAIA: Boolean(_extInstanced),
            supportsImposters:  Boolean(_extFragDepth)
            };
    };
    
    this.getContext = function() {
        return _gl;
    };

    this.getPrecision = function() {
        return _precision;
    };

    this.setClearColorHex = function(hex, alpha) {
        _clearColor.setHex(hex);
        _clearAlpha = alpha;

        _gl.clearColor(_clearColor.r, _clearColor.g, _clearColor.b,
                        _clearAlpha);
    };

    this.enableOutline = function(parameters) {
        _outlineMaterial = new $3Dmol.MeshOutlineMaterial(parameters);
        _outlineSphereImposterMaterial = new $3Dmol.SphereImposterOutlineMaterial(parameters);
        _outlineStickImposterMaterial = new $3Dmol.StickImposterOutlineMaterial(parameters);
        _outlineEnabled = true;
    };

    this.disableOutline = function() {
        _outlineEnabled = false;
    };

    this.setSize = function(width, height) {

        _viewportWidth = _canvas.width = width * this.devicePixelRatio;
        _viewportHeight =  _canvas.height = height * this.devicePixelRatio;

        _canvas.style.width = width + 'px';
        _canvas.style.height = height + 'px';

        _gl.viewport(0, 0, _gl.drawingBufferWidth, _gl.drawingBufferHeight);
    };

    this.clear = function(color, depth, stencil) {

        var bits = 0;

        if (color === undefined || color)
            bits |= _gl.COLOR_BUFFER_BIT;
        if (depth === undefined || depth)
            bits |= _gl.DEPTH_BUFFER_BIT;
        if (stencil === undefined || stencil)
            bits |= _gl.STENCIL_BUFFER_BIT;
        _gl.clear(bits);

    };

    this.clearTarget = function(color, depth, stencil) {

        this.clear(color, depth, stencil);

    };

    this.setMaterialFaces = function(material, reflected) {

        var doubleSided = material.side === $3Dmol.DoubleSide;
        var flipSided = material.side === $3Dmol.BackSide;
        flipSided = reflected ? !flipSided : flipSided;

        if (_oldDoubleSided !== doubleSided) {

            if (doubleSided) {

                _gl.disable(_gl.CULL_FACE);

            } else {

                _gl.enable(_gl.CULL_FACE);

            }

            _oldDoubleSided = doubleSided;

        }

        if (_oldFlipSided !== flipSided) {

            if (flipSided) {

                _gl.frontFace(_gl.CW);

            } else {

                _gl.frontFace(_gl.CCW);

            }

            _oldFlipSided = flipSided;

        }

    };

    this.setDepthTest = function(depthTest) {

        if (_oldDepthTest !== depthTest) {

            if (depthTest) {

                _gl.enable(_gl.DEPTH_TEST);

            } else {

                _gl.disable(_gl.DEPTH_TEST);

            }

            _oldDepthTest = depthTest;

        }

    };

    this.setDepthWrite = function(depthWrite) {

        if (_oldDepthWrite !== depthWrite) {

            _gl.depthMask(depthWrite);
            _oldDepthWrite = depthWrite;

        }

    };

    this.setBlending = function(blending) {

        if (!blending) {
            _gl.disable(_gl.BLEND);

        } else {
            _gl.enable(_gl.BLEND);
            _gl.blendEquationSeparate(_gl.FUNC_ADD, _gl.FUNC_ADD);
            _gl.blendFuncSeparate(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA,
                    _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA);

        }

        _oldBlending = blending;
    };

    // Plugins

    this.addPostPlugin = function(plugin) {

        plugin.init(this);
        this.renderPluginsPost.push(plugin);

    };

    // Sorting

    function numericalSort(a, b) {

        return b[0] - a[0];

    }

    function enableAttribute(attribute) {

        if (!_enabledAttributes[attribute]) {

            _gl.enableVertexAttribArray(attribute);
            _enabledAttributes[attribute] = true;

        }

    }

    function disableAttributes() {

        for ( var attribute in _enabledAttributes) {

            if (_enabledAttributes[attribute]) {

                _gl.disableVertexAttribArray(attribute);
                _enabledAttributes[attribute] = false;

            }

        }

    }

    function setPolygonOffset(polygonOffset, factor, units) {

        if (_oldPolygonOffset !== polygonOffset) {

            if (polygonOffset)
                _gl.enable(_gl.POLYGON_OFFSET_FILL);
            else
                _gl.disable(_gl.POLYGON_OFFSET_FILL);
        }
    }

    function setLineWidth(width) {

        if (width !== _oldLineWidth) {
            _gl.lineWidth(width);
            _oldLineWidth = width;
        }

    }

    var onGeometryDispose = function(event) {

        var geometry = event.target;
        geometry.removeEventListener('dispose', onGeometryDispose);

        deallocateGeometry(geometry);

        _this.info.memory.geometries--;

    };

    var onTextureDispose = function(event) {

        var texture = event.target;

        texture.removeEventListener('dispose', onTextureDispose);

        deallocateTexture(texture);

        _this.info.memory.textures--;

    };

    var onMaterialDispose = function(event) {

        var material = event.target;
        material.removeEventListener('dispose', onMaterialDispose);

        deallocateMaterial(material);

    };

    var deallocateGeometry = function(geometry) {

        geometry.__webglInit = undefined;

        if (geometry.__webglVertexBuffer !== undefined)
            _gl.deleteBuffer(geometry.__webglVertexBuffer);

        if (geometry.__webglColorBuffer !== undefined)
            _gl.deleteBuffer(geometry.__webglColorBuffer);

        if (geometry.geometryGroups !== undefined) {

            for (var g = 0, gl = geometry.groups; g < gl; g++) {

                var geometryGroup = geometry.geometryGroups[g];

                if (geometryGroup.__webglVertexBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglVertexBuffer);

                if (geometryGroup.__webglColorBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglColorBuffer);

                if (geometryGroup.__webglNormalBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglNormalBuffer);

                if (geometryGroup.__webglFaceBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglFaceBuffer);

                if (geometryGroup.__webglLineBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglLineBuffer);

            }
        }
    };

    var deallocateMaterial = function(material) {

        var program = material.program;

        if (program === undefined)
            return;

        material.program = undefined;

        // only deallocate GL program if this was the last use of shared program
        // assumed there is only single copy of any program in the _programs
        // list
        // (that's how it's constructed)

        var i, il, programInfo;
        var deleteProgram = false;

        for (i = 0, il = _programs.length; i < il; i++) {

            programInfo = _programs[i];

            if (programInfo.program === program) {

                programInfo.usedTimes--;

                if (programInfo.usedTimes === 0) {

                    deleteProgram = true;

                }

                break;

            }

        }

        if (deleteProgram === true) {

            // avoid using array.splice, this is costlier than creating new
            // array from scratch

            var newPrograms = [];

            for (i = 0, il = _programs.length; i < il; i++) {

                programInfo = _programs[i];

                if (programInfo.program !== program) {

                    newPrograms.push(programInfo);

                }

            }

            _programs = newPrograms;

            _gl.deleteProgram(program);

            _this.info.memory.programs--;

        }

    };

    var deallocateTexture = function(texture) {

        if (texture.image && texture.image.__webglTextureCube) {

            // cube texture

            _gl.deleteTexture(texture.image.__webglTextureCube);

        }

        else {

            // 2D texture

            if (!texture.__webglInit)
                return;

            texture.__webglInit = false;
            _gl.deleteTexture(texture.__webglTexture);

        }

    };

    // Compile and return shader
    function getShader(type, str) {

        var shader;

        if (type === "fragment")
            shader = _gl.createShader(_gl.FRAGMENT_SHADER);
        else if (type === "vertex")
            shader = _gl.createShader(_gl.VERTEX_SHADER);

        _gl.shaderSource(shader, str);
        _gl.compileShader(shader);

        if (!_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {

            console.error(_gl.getShaderInfoLog(shader));
            console.error("could not initialize shader");
            return null;

        }

        return shader;

    }

    // Compile appropriate shaders (if necessary) from source code and attach to
    // gl program.
    function buildProgram(fragmentShader, vertexShader, uniforms, parameters) {

        var p, pl, d, program, code;
        var chunks = [];

        chunks.push(fragmentShader);
        chunks.push(vertexShader);

        for (p in parameters) {
            chunks.push(p);
            chunks.push(parameters[p]);
        }

        code = chunks.join();

        // check if program has already been compiled

        for (p = 0, pl = _programs.length; p < pl; p++) {

            var programInfo = _programs[p];

            if (programInfo.code === code) {

                programInfo.usedTimes++;

                return programInfo.program;
            }
        }

        // Set up new program and compile shaders

        program = _gl.createProgram();

        // set up precision
        var precision = _precision;
        var prefix = "precision " + precision + " float;";

        var prefix_vertex = [ prefix ].join("\n");

        var prefix_fragment = [
                parameters.fragdepth ? "#extension GL_EXT_frag_depth: enable"
                        : "",
                parameters.wireframe ? "#define WIREFRAME 1" : "", prefix ]
                .join("\n");

        var glFragmentShader = getShader("fragment", prefix_fragment
                + fragmentShader);
        var glVertexShader = getShader("vertex", prefix_vertex + vertexShader);

        _gl.attachShader(program, glVertexShader);
        _gl.attachShader(program, glFragmentShader);

        _gl.linkProgram(program);

        if (!_gl.getProgramParameter(program, _gl.LINK_STATUS))
            console.error("Could not initialize shader");

        // gather and cache uniform variables and attributes

        program.uniforms = {};
        program.attributes = {};

        var identifiers, u, a, i;

        // uniform vars
        identifiers = [ 'viewMatrix', 'modelViewMatrix', 'projectionMatrix', 
                'normalMatrix'];

        // custom uniform vars
        for (u in uniforms)
            identifiers.push(u);

        for (i = 0; i < identifiers.length; i++) {

            var uniformVar = identifiers[i];
            program.uniforms[uniformVar] = _gl.getUniformLocation(program,
                    uniformVar);

        }

        // attributes
        identifiers = [ 'position', 'normal', 'color', 'lineDistance',
                'offset', 'radius' ];

        /*
         * for (a in attributes) identifiers.push(a);
         */

        for (i = 0; i < identifiers.length; i++) {

            var attributeVar = identifiers[i];
            program.attributes[attributeVar] = _gl.getAttribLocation(program,
                    attributeVar);
        }

        program.id = _programs_counter++;
        _programs.push({
            program : program,
            code : code,
            usedTimes : 1
        });
        _this.info.memory.programs = _programs.length;

        return program;
    }

    // TODO: need to set up shader attributes and uniforms as attributes on
    // material object after attaching prgm
    // We need to attach appropriate uniform variables to material after shaders
    // have been chosen
    this.initMaterial = function(material, lights, fog, object) {

        material.addEventListener('dispose', onMaterialDispose);

        var u, a, identifiers, i, parameters, maxLightCount, maxBones, maxShadows, shaderID;

        shaderID = material.shaderID;

        if (shaderID) {

            var shader = $3Dmol.ShaderLib[shaderID];
            material.vertexShader = shader.vertexShader;
            material.fragmentShader = shader.fragmentShader;
            material.uniforms = $3Dmol.ShaderUtils.clone(shader.uniforms);
            // TODO: set material uniforms to shader uniform variables

        }

        parameters = {
            wireframe : material.wireframe,
            fragdepth : material.imposter
        };

        material.program = buildProgram(material.fragmentShader,
                material.vertexShader, material.uniforms, parameters);

    };

    function setProgram(camera, lights, fog, material, object) {

        if (material.needsUpdate) {

            if (material.program)
                deallocateMaterial(material);

            _this.initMaterial(material, lights, fog, object);
            material.needsUpdate = false;
        }

        var refreshMaterial = false;

        // p_uniforms: uniformVarName => uniformLocation
        // m_uniforms: uniformVarName => uniformJsVal
        var program = material.program, p_uniforms = program.uniforms, m_uniforms = material.uniforms;

        if (program != _currentProgram) {
            _gl.useProgram(program);
            _currentProgram = program;

            refreshMaterial = true;
        }

        if (material.id != _currentMaterialId) {
            _currentMaterialId = material.id;
            refreshMaterial = true;
        }

        if (camera != _currentCamera) {
            _currentCamera = camera;
            refreshMaterial = true;
        }

        _gl.uniformMatrix4fv(p_uniforms.projectionMatrix, false,
                camera.projectionMatrix.elements);
        _gl.uniformMatrix4fv(p_uniforms.modelViewMatrix, false,
                object._modelViewMatrix.elements);
        _gl.uniformMatrix3fv(p_uniforms.normalMatrix, false,
                object._normalMatrix.elements);

        // Send projection matrix to uniform variable in shader
        if (refreshMaterial) {

            // Load projection, model-view matrices for perspective

            // Set up correct fog uniform vals
            m_uniforms.fogColor.value = fog.color;
            m_uniforms.fogNear.value = fog.near;
            m_uniforms.fogFar.value = fog.far;

            // Set up lights for lambert shader
            if (material.shaderID.startsWith("lambert")
                    || material.shaderID === "instanced"
                    || material.shaderID.endsWith("imposter")) {

                // load view and normal matrices for directional and object
                // lighting
                _gl.uniformMatrix4fv(p_uniforms.viewMatrix, false,
                        camera.matrixWorldInverse.elements);

                if (_lightsNeedUpdate) {
                    setupLights(program, lights);
                    _lightsNeedUpdate = false;
                }

                // Set up correct light uniform var vals
                m_uniforms.directionalLightColor.value = _lights.directional.colors;
                m_uniforms.directionalLightDirection.value = _lights.directional.positions;

            } else if (material.shaderID.endsWith("outline")) {
                m_uniforms.outlineColor.value = material.outlineColor;
                m_uniforms.outlineWidth.value = material.outlineWidth;
                m_uniforms.outlinePushback.value = material.outlinePushback;
            } else if (material.shaderID === "sphereimposter") {
                _gl.uniformMatrix4fv(p_uniforms.viewMatrix, false,
                        camera.matrixWorldInverse.elements);
                _gl.uniformMatrix3fv(p_uniforms.normalMatrix, false,
                        object._normalMatrix.elements);
                m_uniforms.directionalLightColor.value = _lights.directional.colors;
                m_uniforms.directionalLightDirection.value = _lights.directional.positions;
            }

            // opacity, diffuse, emissive, etc
            m_uniforms.opacity.value = material.opacity;

            // Load any other material specific uniform variables to gl shaders
            loadMaterialUniforms(p_uniforms, m_uniforms);

        }

        return program;

    }

    function loadMaterialUniforms(p_uniforms, m_uniforms) {
        var uniformVar, type, uniformVal, uniformLoc;

        for (uniformVar in m_uniforms) {
            if (!p_uniforms[uniformVar])
                continue;

            type = m_uniforms[uniformVar].type;
            uniformVal = m_uniforms[uniformVar].value;
            uniformLoc = p_uniforms[uniformVar];

            // single float
            if (type === 'f')
                _gl.uniform1f(uniformLoc, uniformVal);
            // array of floats
            else if (type === 'fv')
                _gl.uniform3fv(uniformLoc, uniformVal);
            // color - r,g,b floats
            else if (type === 'c')
                _gl.uniform3f(uniformLoc, uniformVal.r, uniformVal.g,
                        uniformVal.b);
            else if (type === 'f4')
                _gl.uniform4f(uniformLoc, uniformVal[0], uniformVal[1],
                        uniformVal[2],uniformVal[3]);

        }

    }

    this.renderBuffer = function(camera, lights, fog, material, geometryGroup,
            object) {

        if (!material.visible)
            return;

        var program, attributes, linewidth, primitives, a, attribute, i, il;

        // Sets up proper vertex and fragment shaders and attaches them to webGL
        // program
        // Also sets appropriate uniform variables
        program = setProgram(camera, lights, fog, material, object);

        attributes = program.attributes;

        var updateBuffers = false, wireframeBit = material.wireframe ? 1 : 0, geometryGroupHash = (geometryGroup.id * 0xffffff)
                + (program.id * 2) + wireframeBit;

        if (geometryGroupHash !== _currentGeometryGroupHash) {
            _currentGeometryGroupHash = geometryGroupHash;
            updateBuffers = true;
        }

        // rebind shader attributes to appropriate (and already initialized) gl
        // buffers
        if (updateBuffers) {

            disableAttributes();

            // Vertices
            if (attributes.position >= 0) {
                _gl.bindBuffer(_gl.ARRAY_BUFFER,
                        geometryGroup.__webglVertexBuffer);
                enableAttribute(attributes.position);
                _gl.vertexAttribPointer(attributes.position, 3, _gl.FLOAT,
                        false, 0, 0);
            }

            // Colors
            if (attributes.color >= 0) {
                _gl.bindBuffer(_gl.ARRAY_BUFFER,
                        geometryGroup.__webglColorBuffer);
                enableAttribute(attributes.color);
                _gl.vertexAttribPointer(attributes.color, 3, _gl.FLOAT, false,
                        0, 0);
            }

            // Normals
            if (attributes.normal >= 0) {
                _gl.bindBuffer(_gl.ARRAY_BUFFER,
                        geometryGroup.__webglNormalBuffer);
                enableAttribute(attributes.normal);
                _gl.vertexAttribPointer(attributes.normal, 3, _gl.FLOAT, false,
                        0, 0);
            }

            // Offsets (Instanced only)
            if (attributes.offset >= 0) {
                _gl.bindBuffer(_gl.ARRAY_BUFFER,
                        geometryGroup.__webglOffsetBuffer);
                enableAttribute(attributes.offset);
                _gl.vertexAttribPointer(attributes.offset, 3, _gl.FLOAT, false,
                        0, 0);
            }

            // Radii (Instanced only)
            if (attributes.radius >= 0) {
                _gl.bindBuffer(_gl.ARRAY_BUFFER,
                        geometryGroup.__webglRadiusBuffer);
                enableAttribute(attributes.radius);
                _gl.vertexAttribPointer(attributes.radius, 1, _gl.FLOAT, false,
                        0, 0);
            }

        }

        // Render
        var faceCount, lineCount;
        // lambert shaders - draw triangles
        // TODO: make sure geometryGroup's face count is setup correctly
        if (object instanceof $3Dmol.Mesh) {

            if (material.shaderID === "instanced") {
                var sphereGeometryGroup = material.sphere.geometryGroups[0];
                if (updateBuffers) {
                    _gl.bindBuffer(_gl.ARRAY_BUFFER,
                            geometryGroup.__webglVertexBuffer);
                    _gl.bufferData(_gl.ARRAY_BUFFER,
                            sphereGeometryGroup.vertexArray, _gl.STATIC_DRAW);
                    _gl.bindBuffer(_gl.ARRAY_BUFFER,
                            geometryGroup.__webglNormalBuffer);
                    _gl.bufferData(_gl.ARRAY_BUFFER,
                            sphereGeometryGroup.normalArray, _gl.STATIC_DRAW);
                    _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER,
                            geometryGroup.__webglFaceBuffer);
                    _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER,
                            sphereGeometryGroup.faceArray, _gl.STATIC_DRAW);
                }

                faceCount = sphereGeometryGroup.faceidx;

                _extInstanced.vertexAttribDivisorANGLE(attributes.offset, 1);
                _extInstanced.vertexAttribDivisorANGLE(attributes.radius, 1);
                _extInstanced.vertexAttribDivisorANGLE(attributes.color, 1);

                _extInstanced.drawElementsInstancedANGLE(_gl.TRIANGLES,
                        faceCount, _gl.UNSIGNED_SHORT, 0,
                        geometryGroup.radiusArray.length);

                _extInstanced.vertexAttribDivisorANGLE(attributes.offset, 0);
                _extInstanced.vertexAttribDivisorANGLE(attributes.radius, 0);
                _extInstanced.vertexAttribDivisorANGLE(attributes.color, 0);

            }

            else if (material.wireframe) {
                lineCount = geometryGroup.lineidx;
                setLineWidth(material.wireframeLinewidth);

                if (updateBuffers)
                    _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER,
                            geometryGroup.__webglLineBuffer);

                _gl.drawElements(_gl.LINES, lineCount, _gl.UNSIGNED_SHORT, 0);
            }

            else {
                faceCount = geometryGroup.faceidx;

                if (updateBuffers)
                    _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER,
                            geometryGroup.__webglFaceBuffer);
                _gl.drawElements(_gl.TRIANGLES, faceCount, _gl.UNSIGNED_SHORT,
                        0);

            }

            _this.info.render.calls++;
            _this.info.render.vertices += faceCount;
            _this.info.render.faces += faceCount / 3;
        }

        // basic shaders - draw lines
        else if (object instanceof $3Dmol.Line) {
            lineCount = geometryGroup.vertices;

            setLineWidth(material.linewidth);
            _gl.drawArrays(_gl.LINES, 0, lineCount);

            _this.info.render.calls++;
        }

    };

    // rendering
    function renderObjects(renderList, reverse, materialType, camera, lights,
            fog, useBlending, overrideMaterial) {

        var webglObject, object, buffer, material, start, end, delta;

        // Forward or backward render

        if (reverse) {
            start = renderList.length - 1;
            end = -1;
            delta = -1;
        }

        else {
            start = 0;
            end = renderList.length;
            delta = 1;
        }

        for (var i = start; i !== end; i += delta) {

            webglObject = renderList[i];

            if (webglObject.render) {

                object = webglObject.object;
                buffer = webglObject.buffer;
                material = webglObject[materialType];

                if (!material)
                    continue;

                if (useBlending)
                    _this.setBlending(true);

                _this.setDepthTest(material.depthTest);
                _this.setDepthWrite(material.depthWrite);
                setPolygonOffset(material.polygonOffset,
                        material.polygonOffsetFactor,
                        material.polygonOffsetUnits);

                var reflected = object._modelViewMatrix.isReflected();

                _this.setMaterialFaces(material, reflected);

                _this.renderBuffer(camera, lights, fog, material, buffer,
                        object);
                if (_outlineEnabled || material.outline) {                  
                    if(material.shaderID == 'sphereimposter') {
                        _this.renderBuffer(camera, lights, fog, _outlineSphereImposterMaterial,
                                buffer, object);                        
                    }
                    else if(material.shaderID == 'stickimposter') {
                        _this.renderBuffer(camera, lights, fog, _outlineStickImposterMaterial,
                                buffer, object);                        
                    }
                    else if(!material.wireframe                
                        && material.shaderID !== 'basic'
                        && material.opacity !== 0.0) {
                        _this.renderBuffer(camera, lights, fog, _outlineMaterial,
                            buffer, object);
                    }
                }
            }
        }

    }

    this.render = function(scene, camera, forceClear) {

        if (camera instanceof $3Dmol.Camera === false) {

            console
                    .error('$3Dmol.Renderer.render: camera is not an instance of $3Dmol.Camera.');
            return;

        }

        var i, il,

        webglObject, object, renderList,

        lights = scene.__lights, fog = scene.fog;

        // reset caching for this frame

        _currentMaterialId = -1;
        _lightsNeedUpdate = true;

        // update scene graph

        if (this.autoUpdateScene)
            scene.updateMatrixWorld();

        // update camera matrices
        // Pretty sure camera's parent is always going to be undefined for our
        // purposes...
        if (camera.parent === undefined)
            camera.updateMatrixWorld();

        camera.matrixWorldInverse.getInverse(camera.matrixWorld);

        _projScreenMatrix.multiplyMatrices(camera.projectionMatrix,
                camera.matrixWorldInverse);

        // update WebGL objects

        if (this.autoUpdateObjects)
            this.initWebGLObjects(scene);

        _this.info.render.calls = 0;
        _this.info.render.vertices = 0;
        _this.info.render.faces = 0;
        _this.info.render.points = 0;

        _currentWidth = _viewportWidth;
        _currentHeight = _viewportHeight;

        if (this.autoClear || forceClear) {
            this.clear(this.autoClearColor, this.autoClearDepth,
                    this.autoClearStencil);

        }

        // set matrices for regular objects (frustum culled)

        renderList = scene.__webglObjects;

        for (i = 0, il = renderList.length; i < il; i++) {

            webglObject = renderList[i];
            object = webglObject.object;

            webglObject.render = false;

            if (object.visible) {
                setupMatrices(object, camera);
                unrollBufferMaterial(webglObject);
                webglObject.render = true;
            }
        }

        // set matrices for immediate objects

        var material = null;

        // opaque pass (front-to-back order)

        this.setBlending(false);

        renderObjects(scene.__webglObjects, true, "opaque", camera, lights,
                fog, false, material);

        // prime depth buffer
        renderObjects(scene.__webglObjects, true, "blank", camera, lights, fog,
                true, material);

        // transparent pass (back-to-front order)

        renderObjects(scene.__webglObjects, false, "transparent", camera,
                lights, fog, true, material);

        // Render plugins (e.g. sprites), and reset state

        renderPlugins(this.renderPluginsPost, scene, camera);

        // Ensure depth buffer writing is enabled so it can be cleared on next
        // render

        this.setDepthTest(true);
        this.setDepthWrite(true);

        // _gl.finish();

    };

    function renderPlugins(plugins, scene, camera) {

        // Reset state once regardless
        // This should also fix cartoon render bug (after transparent surface
        // render)

        _currentGeometryGroupHash = -1;
        _currentProgram = null;
        _currentCamera = null;
        _oldBlending = -1;
        _oldDepthWrite = -1;
        _oldDepthTest = -1;
        _oldDoubleSided = -1;
        _currentMaterialId = -1;
        _oldFlipSided = -1;

        if (!plugins.length)
            return;

        for (var i = 0, il = plugins.length; i < il; i++) {

            _lightsNeedUpdate = true;

            plugins[i].render(scene, camera, _currentWidth, _currentHeight);

            // Reset state after plugin render
            _currentGeometryGroupHash = -1;
            _currentProgram = null;
            _currentCamera = null;
            _oldBlending = -1;
            _oldDepthWrite = -1;
            _oldDepthTest = -1;
            _oldDoubleSided = -1;
            _currentMaterialId = -1;
            _oldFlipSided = -1;

        }

    }

    this.initWebGLObjects = function(scene) {

        if (!scene.__webglObjects) {

            scene.__webglObjects = [];
            scene.__webglObjectsImmediate = [];
            scene.__webglSprites = [];
            scene.__webglFlares = [];

        }

        // Add objects; this sets up buffers for each geometryGroup
        if (scene.__objectsAdded.length) {

            while (scene.__objectsAdded.length) {
                addObject(scene.__objectsAdded[0], scene);
                scene.__objectsAdded.splice(0, 1);
            }

            // Force buffer update during render
            // Hackish fix for initial cartoon-render-then-transparent-surface
            // bug
            _currentGeometryGroupHash = -1;

        }

        while (scene.__objectsRemoved.length) {

            removeObject(scene.__objectsRemoved[0], scene);
            scene.__objectsRemoved.splice(0, 1);

        }

        // update must be called after objects adding / removal
        // This sends typed arrays to GL buffers for each geometryGroup
        for (var o = 0, ol = scene.__webglObjects.length; o < ol; o++) {

            updateObject(scene.__webglObjects[o].object);

        }

    };

    // Objects adding

    function addObject(object, scene) {

        var g, gl, geometry, material, geometryGroup;

        if (!object.__webglInit) {

            object.__webglInit = true;

            object._modelViewMatrix = new $3Dmol.Matrix4();
            object._normalMatrix = new $3Dmol.Matrix3();

            if (object.geometry !== undefined
                    && object.geometry.__webglInit === undefined) {

                object.geometry.__webglInit = true;
                object.geometry.addEventListener('dispose', onGeometryDispose);

            }

            if (object instanceof $3Dmol.Mesh || object instanceof $3Dmol.Line) {
                geometry = object.geometry;
                material = object.material;

                for (g = 0, gl = geometry.geometryGroups.length; g < gl; g++) {

                    geometryGroup = geometry.geometryGroups[g];

                    geometryGroup.id = _geometryGroupCounter++;

                    // initialise VBO on the first access

                    if (!geometryGroup.__webglVertexBuffer) {

                        if (object instanceof $3Dmol.Mesh) {
                            createMeshBuffers(geometryGroup);
                            geometry.elementsNeedUpdate = true;
                            geometry.normalsNeedUpdate = true;
                        }

                        else if (object instanceof $3Dmol.Line)
                            createLineBuffers(geometryGroup);

                        geometry.verticesNeedUpdate = true;
                        geometry.colorsNeedUpdate = true;

                    }

                }

            }

        }

        if (!object.__webglActive) {

            if (object instanceof $3Dmol.Mesh || object instanceof $3Dmol.Line) {

                geometry = object.geometry;

                for (g = 0, gl = geometry.geometryGroups.length; g < gl; g++) {
                    geometryGroup = geometry.geometryGroups[g];

                    addBuffer(scene.__webglObjects, geometryGroup, object);
                }

            }

            // Sprite
            else if (object instanceof $3Dmol.Sprite)
                scene.__webglSprites.push(object);

            object.__webglActive = true;

        }

    }

    function updateObject(object) {

        var geometry = object.geometry, material = object.material, geometryGroup, customAttributesDirty;

        if (object instanceof $3Dmol.Mesh || object instanceof $3Dmol.Line) {

            for (var g = 0, gl = geometry.geometryGroups.length; g < gl; g++) {

                geometryGroup = geometry.geometryGroups[g];

                if (geometry.verticesNeedUpdate || geometry.elementsNeedUpdate
                        || geometry.colorsNeedUpdate
                        || geometry.normalsNeedUpdate) {
                    setBuffers(geometryGroup, _gl.STATIC_DRAW);
                }
            }

            geometry.verticesNeedUpdate = false;
            geometry.elementsNeedUpdate = false;
            geometry.normalsNeedUpdate = false;
            geometry.colorsNeedUpdate = false;

            geometry.buffersNeedUpdate = false;

        }

    }

    function removeObject(object, scene) {

        if (object instanceof $3Dmol.Mesh || object instanceof $3Dmol.Line)
            removeInstances(scene.__webglObjects, object);

        else if (object instanceof $3Dmol.Sprite)
            removeInstancesDirect(scene.__webglSprites, object);

        object.__webglActive = false;

    }

    function removeInstances(objList, object) {

        for (var o = objList.length - 1; o >= 0; --o) {

            if (objList[o].object === object)
                objList.splice(o, 1);

        }
    }

    function removeInstancesDirect(objList, object) {

        for (var o = objList.length - 1; o >= 0; --o) {

            if (objList[o] === object)
                objList.splice(o, 1);

        }
    }

    function unrollBufferMaterial(globject) {

        var object = globject.object;
        var material = object.material;

        if (material.transparent) {
            globject.opaque = null;
            globject.transparent = material;
            if (!material.wireframe) {
                var blankMaterial = material.clone();
                blankMaterial.opacity = 0.0;
                globject.blank = blankMaterial;
            }
        }

        else {
            globject.opaque = material;
            globject.transparent = null;

        }

    }

    function setBuffers(geometryGroup, hint, line) {

        var vertexArray = geometryGroup.vertexArray;
        var colorArray = geometryGroup.colorArray;

        // offset buffers
        if (geometryGroup.__webglOffsetBuffer !== undefined ) {
            _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglOffsetBuffer);
            _gl.bufferData(_gl.ARRAY_BUFFER, vertexArray, hint);
        }
        else {
            //normal, non-instanced case
            _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer);
            _gl.bufferData(_gl.ARRAY_BUFFER, vertexArray, hint);            
        }
        // color buffers
        _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer);
        _gl.bufferData(_gl.ARRAY_BUFFER, colorArray, hint);

        // normal buffers
        if (geometryGroup.normalArray
                && geometryGroup.__webglNormalBuffer !== undefined) {
            var normalArray = geometryGroup.normalArray;
            _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer);
            _gl.bufferData(_gl.ARRAY_BUFFER, normalArray, hint);

        }



        // radius buffers
        if (geometryGroup.radiusArray
                && geometryGroup.__webglRadiusBuffer !== undefined) {
            _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglRadiusBuffer);
            _gl.bufferData(_gl.ARRAY_BUFFER, geometryGroup.radiusArray, hint);
        }

        // face (index) buffers
        if (geometryGroup.faceArray
                && geometryGroup.__webglFaceBuffer !== undefined) {
            var faceArray = geometryGroup.faceArray;
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER,
                    geometryGroup.__webglFaceBuffer);
            _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, faceArray, hint);

        }

        // line (index) buffers (for wireframe)
        if (geometryGroup.lineArray
                && geometryGroup.__webglLineBuffer !== undefined) {
            var lineArray = geometryGroup.lineArray;
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER,
                    geometryGroup.__webglLineBuffer);
            _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, lineArray, hint);
        }

    }

    // Creates appropriate gl buffers for geometry chunk
    // TODO: do we need line buffer for mesh objects?
    // Also, can we integrate this with createLineBuffers?
    function createMeshBuffers(geometryGroup) {

        if (geometryGroup.radiusArray) {
            geometryGroup.__webglRadiusBuffer = _gl.createBuffer();
        }
        if(geometryGroup.useOffset) {
            geometryGroup.__webglOffsetBuffer = _gl.createBuffer();
        }
        geometryGroup.__webglVertexBuffer = _gl.createBuffer();
        geometryGroup.__webglNormalBuffer = _gl.createBuffer();
        geometryGroup.__webglColorBuffer = _gl.createBuffer();

        geometryGroup.__webglFaceBuffer = _gl.createBuffer();
        geometryGroup.__webglLineBuffer = _gl.createBuffer();

        _this.info.memory.geometries++;
    }

    function createLineBuffers(geometry) {

        geometry.__webglVertexBuffer = _gl.createBuffer();
        geometry.__webglColorBuffer = _gl.createBuffer();

        _this.info.memory.geometries++;
    }

    function addBuffer(objlist, buffer, object) {

        objlist.push({
            buffer : buffer,
            object : object,
            opaque : null,
            transparent : null
        });

    }

    function setupMatrices(object, camera) {

        object._modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse,
                object.matrixWorld);

        object._normalMatrix.getInverse(object._modelViewMatrix);
        object._normalMatrix.transpose();

    }

    function isPowerOfTwo(value) {

        return (value & (value - 1)) === 0;

    }

    // Fallback filters for non-power-of-2 textures

    function filterFallback(f) {

        return _gl.LINEAR;

    }

    function setTextureParameters(textureType, texture, isImagePowerOfTwo) {

        if (isImagePowerOfTwo) {

            _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S,
                    paramToGL(texture.wrapS));
            _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T,
                    paramToGL(texture.wrapT));

            _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER,
                    paramToGL(texture.magFilter));
            _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER,
                    paramToGL(texture.minFilter));

        } else {

            _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S,
                    _gl.CLAMP_TO_EDGE);
            _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T,
                    _gl.CLAMP_TO_EDGE);

            _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER,
                    filterFallback(texture.magFilter));
            _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER,
                    filterFallback(texture.minFilter));

        }

    }

    this.setTexture = function(texture, slot) {

        if (texture.needsUpdate) {

            if (!texture.__webglInit) {

                texture.__webglInit = true;

                texture.addEventListener('dispose', onTextureDispose);

                texture.__webglTexture = _gl.createTexture();

                _this.info.memory.textures++;

            }

            _gl.activeTexture(_gl.TEXTURE0 + slot);
            _gl.bindTexture(_gl.TEXTURE_2D, texture.__webglTexture);

            _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
            _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                    texture.premultiplyAlpha);
            _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);

            var image = texture.image, isImagePowerOfTwo = isPowerOfTwo(image.width)
                    && isPowerOfTwo(image.height), glFormat = paramToGL(texture.format), glType = paramToGL(texture.type);

            setTextureParameters(_gl.TEXTURE_2D, texture, isImagePowerOfTwo);

            var mipmap, mipmaps = texture.mipmaps;

            // regular Texture (image, video, canvas)

            // use manually created mipmaps if available
            // if there are no manual mipmaps
            // set 0 level mipmap and then use GL to generate other mipmap
            // levels

            if (mipmaps.length > 0 && isImagePowerOfTwo) {

                for (var i = 0, il = mipmaps.length; i < il; i++) {
                    mipmap = mipmaps[i];
                    _gl.texImage2D(_gl.TEXTURE_2D, i, glFormat, glFormat,
                            glType, mipmap);
                }

                texture.generateMipmaps = false;
            }

            else
                _gl.texImage2D(_gl.TEXTURE_2D, 0, glFormat, glFormat, glType,
                        texture.image);

            if (texture.generateMipmaps && isImagePowerOfTwo)
                _gl.generateMipmap(_gl.TEXTURE_2D);

            texture.needsUpdate = false;

            if (texture.onUpdate)
                texture.onUpdate();

        } else {

            _gl.activeTexture(_gl.TEXTURE0 + slot);
            _gl.bindTexture(_gl.TEXTURE_2D, texture.__webglTexture);

        }

    };

    // Map constants to WebGL constants

    function paramToGL(p) {

        if (p === $3Dmol.UnsignedByteType)
            return _gl.UNSIGNED_BYTE;
        if (p === $3Dmol.RGBAFormat)
            return _gl.RGBA;

        return 0;

    }

    function setupLights(program, lights) {
        var l, ll, light, n, r = 0, g = 0, b = 0, color, position, intensity, distance,

        zlights = _lights,

        dirColors = zlights.directional.colors, dirPositions = zlights.directional.positions,

        dirCount = 0, dirLength = 0, dirOffset = 0;

        for (l = 0, ll = lights.length; l < ll; l++) {

            light = lights[l];

            color = light.color;
            intensity = light.intensity;
            distance = light.distance;

            if (light instanceof $3Dmol.Light) {

                dirCount++;

                _direction.getPositionFromMatrix(light.matrixWorld);
                _vector3.getPositionFromMatrix(light.target.matrixWorld);
                _direction.sub(_vector3);
                _direction.normalize();

                if (_direction.x === 0 && _direction.y === 0
                        && _direction.z === 0)
                    continue;

                dirPositions[dirOffset] = _direction.x;
                dirPositions[dirOffset + 1] = _direction.y;
                dirPositions[dirOffset + 2] = _direction.z;

                dirColors[dirOffset] = color.r * intensity;
                dirColors[dirOffset + 1] = color.g * intensity;
                dirColors[dirOffset + 2] = color.b * intensity;

                dirOffset += 3;

                dirLength++;
            }

        }

        zlights.ambient[0] = r;
        zlights.ambient[1] = g;
        zlights.ambient[2] = b;
        zlights.directional.length = dirLength;
    }

    function initGL() {

        try {

            if (!(_gl = _canvas.getContext('experimental-webgl', {
                alpha : _alpha,
                premultipliedAlpha : _premultipliedAlpha,
                antialias : _antialias,
                stencil : _stencil,
                preserveDrawingBuffer : _preserveDrawingBuffer
            }))) {
                if (!(_gl = _canvas.getContext('webgl', {
                    alpha : _alpha,
                    premultipliedAlpha : _premultipliedAlpha,
                    antialias : _antialias,
                    stencil : _stencil,
                    preserveDrawingBuffer : _preserveDrawingBuffer
                }))) {
                    throw 'Error creating WebGL context.';
                }
            }

        } catch (error) {

            console.error(error);
        }
    }

    function setDefaultGLState() {

        _gl.clearColor(0, 0, 0, 1);
        _gl.clearDepth(1);
        _gl.clearStencil(0);

        _gl.enable(_gl.DEPTH_TEST);
        _gl.depthFunc(_gl.LEQUAL);

        _gl.frontFace(_gl.CCW);
        _gl.cullFace(_gl.BACK);
        _gl.enable(_gl.CULL_FACE);

        _gl.enable(_gl.BLEND);
        _gl.blendEquation(_gl.FUNC_ADD);
        _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);

        _gl.clearColor(_clearColor.r, _clearColor.g, _clearColor.b,
                        _clearAlpha);
    }

    this.addPostPlugin(new $3Dmol.SpritePlugin());

};
/*
 * Scene class
 */
/** @constructor */
$3Dmol.Scene = function() {
    
    $3Dmol.Object3D.call(this);
    
    this.fog = null;
    
    //May not need...
    this.overrideMaterial = null;
    
    this.matrixAutoUpdate = false;
    
    this.__objects = [];
    this.__lights = [];
    
    this.__objectsAdded = [];
    this.__objectsRemoved = [];
    
};

$3Dmol.Scene.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Scene.prototype.__addObject = function(object) {
    
    //Directional Lighting
    if (object instanceof $3Dmol.Light) {
        
        if (this.__lights.indexOf(object) === -1)
            this.__lights.push(object);
        
        //TODO: Do I need this??
        if (object.target && object.target.parent === undefined)
            this.add(object.target);
            
    }
    
    //Rotation group
    else {
        
        if (this.__objects.indexOf(object) === -1) {
            
            this.__objects.push(object);
            this.__objectsAdded.push(object);
            
            //Check if previously removed
            
            var idx = this.__objectsRemoved.indexOf(object);
            
            if (idx !== -1)
                this.__objectsRemoved.splice(i, 1);
                
        }
    }
    
    //Add object's children
    
    for (var i = 0; i < object.children.length; i++) 
        this.__addObject(object.children[i]);
    
};

$3Dmol.Scene.prototype.__removeObject = function(object) {
    
    var idx;
    if (object instanceof $3Dmol.Light) {
        
        idx = this.__lights.indexOf(object);
        
        if (idx !== -1)
            this.__lights.splice(idx, 1);
            
    }
    
    //Object3D
    else {
        
        idx = this.__objects.indexOf(object);
        
        if (idx !== -1) {
            
            this.__objects.splice(idx, 1);
            this.__objectsRemoved.push(object);
            
            //Check if previously added
            
            var ai = this.__objectsAdded.indexOf(object);
            
            if (ai !== -1) 
                this.__objectsAdded.splice(idx, 1);
                
        }
    
    }
    
    //Remove object's children
    for (var i = 0; i < object.children.length; i++)
        this.__removeObject(object.children[i]);
    
};


/*
 * Fog Class
 */

/** @constructor */
$3Dmol.Fog = function ( hex, near, far ) {

    this.name = '';

    this.color = new $3Dmol.Color( hex );

    this.near = ( near !== undefined ) ? near : 1;
    this.far = ( far !== undefined ) ? far : 1000;

};

$3Dmol.Fog.prototype.clone = function () {

    return new $3Dmol.Fog( this.color.getHex(), this.near, this.far );

};

$3Dmol.ShaderUtils = {
    
    clone: function ( uniforms_src ) {
        
        var u, p, parameter, parameter_src, uniforms_clone = {};
        
        for (u in uniforms_src) {
            uniforms_clone[u] = {};
            uniforms_clone[u].type = uniforms_src[u].type;
            
            var srcValue = uniforms_src[u].value;
            
            if (srcValue instanceof $3Dmol.Color)
                uniforms_clone[u].value = srcValue.clone();
            else if (typeof srcValue === "number")
                uniforms_clone[u].value = srcValue;
            else if (srcValue instanceof Array) 
                uniforms_clone[u].value = [];
            else
                console.error("Error copying shader uniforms from ShaderLib: unknown type for uniform");
            
        }
        
        return uniforms_clone;
    },
    //fragment shader reused by outline shader
    stickimposterFragmentShader: [
     "uniform float opacity;",
     "uniform mat4 projectionMatrix;",

     "uniform vec3 fogColor;",
     "uniform float fogNear;",
     "uniform float fogFar;",

     "varying vec3 vLight;",
     "varying vec3 vColor;",
     "varying vec3 cposition;",
     "varying vec3 p1;",
     "varying vec3 p2;",
     "varying float r;",


     //cylinder-ray intersection testing taken from http://mrl.nyu.edu/~dzorin/cg05/lecture12.pdf
     //also useful: http://stackoverflow.com/questions/9595300/cylinder-impostor-in-glsl
     //with a bit more care (caps) this could be a general cylinder imposter (see also outline)
     "void main() {",   
     "    vec3 color = abs(vColor);",
     "    vec3 pos = cposition;",
     "    vec3 p = pos;", //ray point
     "    vec3 v = normalize(pos);", //ray normal
     "    vec3 pa = p1;", //cyl start
     "    vec3 va = normalize(p2-p1);", //cyl norm
     "    vec3 tmp1 = v-(dot(v,va)*va);",
     "    vec3 deltap = p-pa;",
     "    float A = dot(tmp1,tmp1);",
     "    if(A == 0.0) discard;",
     "    vec3 tmp2 = deltap-(dot(deltap,va)*va);",
     "    float B = 2.0*dot(tmp1, tmp2);",
     "    float C = dot(tmp2,tmp2)-r*r;",
     //quadratic equation!
     "    float det = (B*B) - (4.0*A*C);",
     "    if(det < 0.0) discard;",
     "    float sqrtDet = sqrt(det);",
     "    float posT = (-B+sqrtDet)/(2.0*A);",
     "    float negT = (-B-sqrtDet)/(2.0*A);",
     "    float intersectionT = min(posT,negT);",
     "    vec3 qi = p+v*intersectionT;", 
     "    float dotp1 = dot(va,qi-p1);",
     "    float dotp2 = dot(va,qi-p2);",
     "    vec3 norm;",
     "    if( dotp1 < 0.0 || dotp2 > 0.0) {", //(p-c)^2 + 2(p-c)vt +v^2+t^2 - r^2 = 0
     "       vec3 cp;",
     "       if( dotp1 < 0.0) {" +
     //"        if(vColor.x < 0.0 ) discard;", //color sign bit indicates if we should cap or not
     "        cp = p1;",
     "       } else {",
     //"          if(vColor.y < 0.0 ) discard;",
     "          cp = p2;",
     "       }",
     "       vec3 diff = p-cp;",
     "       A = dot(v,v);",
     "       B = dot(diff,v)*2.0;",
     "       C = dot(diff,diff)-r*r;",
     "       det = (B*B) - (4.0*C);",
     "       if(det < 0.0) discard;",
     "       sqrtDet = sqrt(det);",
     "       posT = (-B+sqrtDet)/(2.0);",
     "       negT = (-B-sqrtDet)/(2.0);",
     "       float t = min(posT,negT);",
     "       qi = p+v*t;",
     "       norm = normalize(qi-cp);",
     "    } else {",
     "       norm = normalize(qi-(dotp1*va + p1));",
     "    }",
     "    vec4 clipPos = projectionMatrix * vec4(qi, 1.0);",
     "    float ndcDepth = clipPos.z / clipPos.w;",
     "    float depth = ((gl_DepthRange.diff * ndcDepth) + gl_DepthRange.near + gl_DepthRange.far) / 2.0;",
     "    gl_FragDepthEXT = depth;",
    ].join("\n")  
};

$3Dmol.ShaderLib = { 
    'basic' : {
        fragmentShader : [                    
"uniform mat4 viewMatrix;",
"uniform float opacity;",

"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",

"varying vec3 vColor;",

"void main() {",
    
"    gl_FragColor = vec4( vColor, opacity );",
    
"    float depth = gl_FragCoord.z / gl_FragCoord.w;",    
"    float fogFactor = smoothstep( fogNear, fogFar, depth );",
    
"    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

"}"
                                                     
].join("\n"),
        
        vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",

"attribute vec3 position;",
"attribute vec3 color;",

"varying vec3 vColor;",

"void main() {",

"    vColor = color;",
"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
"    gl_Position = projectionMatrix * mvPosition;",

"}"
        
].join("\n"),
    
        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000}
        }

    },
    
 'sphereimposter' : {
        fragmentShader : [
"uniform mat4 viewMatrix;",
"uniform float opacity;",
"uniform mat4 projectionMatrix;",

"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",
"uniform float uDepth;",
"uniform vec3 directionalLightColor[ 1 ];",

"varying vec3 vColor;",
"varying vec2 mapping;",
"varying float rval;",
"varying vec3 vLight;",
"varying vec3 center;",


"void main() {",
"    float lensqr = dot(mapping,mapping);",
"    float rsqr = rval*rval;",
"    if(lensqr > rsqr)",
"       discard;",
"    float z = sqrt(rsqr-lensqr);",
"    vec3 cameraPos = center+ vec3(mapping.x,mapping.y,z);",
"    vec4 clipPos = projectionMatrix * vec4(cameraPos, 1.0);",
"    float ndcDepth = clipPos.z / clipPos.w;",
"    gl_FragDepthEXT = ((gl_DepthRange.diff * ndcDepth) + gl_DepthRange.near + gl_DepthRange.far) / 2.0;",
"    vec3 norm = normalize(vec3(mapping.x,mapping.y,z));",
"    float dotProduct = dot( norm, vLight );",
"    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",    
"    vec3 vLight = directionalLightColor[ 0 ] * directionalLightWeighting;",
"    gl_FragColor = vec4(vLight*vColor, opacity*opacity );", 
"    float fogFactor = smoothstep( fogNear, fogFar, gl_FragDepthEXT/gl_FragCoord.w );",
"    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",


"}"
                                                     
].join("\n"),
        
        vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 directionalLightColor[ 1 ];",
"uniform vec3 directionalLightDirection[ 1 ];",

"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",

"varying vec2 mapping;",
"varying vec3 vColor;",
"varying float rval;",
"varying vec3 vLight;",
"varying vec3 center;",

"void main() {",

"    vColor = color;",
"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
"    center = mvPosition.xyz;",
"    vec4 projPosition = projectionMatrix * mvPosition;",
"    vec4 adjust = projectionMatrix* vec4(normal,0.0); adjust.z = 0.0; adjust.w = 0.0;",
"    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );",
"    vLight = normalize( lDirection.xyz );",
"    mapping = normal.xy;",
"    rval = abs(normal.x);",
"    gl_Position = projPosition+adjust;",

"}"
        
].join("\n"),
    
        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000},
            directionalLightColor: { type: 'fv', value: [] },
            directionalLightDirection: { type: 'fv', value: [] }
        }

    },
    
    
    'lambert' : { 
        fragmentShader : [

"uniform mat4 viewMatrix;",
"uniform float opacity;",

"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",

"varying vec3 vLightFront;",
"varying vec3 vColor;",

"void main() {",
    
"    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
    
"    #ifndef WIREFRAME",
"    gl_FragColor.xyz *= vLightFront;",
"    #endif",
    
"    gl_FragColor = gl_FragColor * vec4( vColor, opacity );",
"    float depth = gl_FragCoord.z / gl_FragCoord.w;",
    
"    float fogFactor = smoothstep( fogNear, fogFar, depth );",
    
"    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

"}"


].join("\n"),
       
       vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 directionalLightColor[ 1 ];",
"uniform vec3 directionalLightDirection[ 1 ];",

"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",

"varying vec3 vColor;",
"varying vec3 vLightFront;",

"void main() {",
    
"    vColor = color;",
    
"    vec3 objectNormal = normal;",  
"    vec3 transformedNormal = normalMatrix * objectNormal;",    
"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
    
"    vLightFront = vec3( 0.0 );",
    
"    transformedNormal = normalize( transformedNormal );",
    
"    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );",
"    vec3 dirVector = normalize( lDirection.xyz );",
"    float dotProduct = dot( transformedNormal, dirVector );",
"    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",
    
"    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;",
    
"    gl_Position = projectionMatrix * mvPosition;",
"}"
           
].join("\n"),

        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000},
            directionalLightColor: { type: 'fv', value: [] },
            directionalLightDirection: { type: 'fv', value: [] }
        }

    },


    'instanced' : {
        fragmentShader : [

"uniform mat4 viewMatrix;",
"uniform float opacity;",

"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",

"varying vec3 vLightFront;",
"varying vec3 vColor;",

"void main() {",

"    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",

"    #ifndef WIREFRAME",
"    gl_FragColor.xyz *= vLightFront;",
"    #endif",

"    gl_FragColor = gl_FragColor * vec4( vColor, opacity );",
"    float depth = gl_FragCoord.z / gl_FragCoord.w;",

"    float fogFactor = smoothstep( fogNear, fogFar, depth );",

"    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

"}"


].join("\n"),

       vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 directionalLightColor[ 1 ];",
"uniform vec3 directionalLightDirection[ 1 ];",

"attribute vec3 offset;",
"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",
"attribute float radius;",

"varying vec3 vColor;",
"varying vec3 vLightFront;",

"void main() {",

"    vColor = color;",

"    vec3 objectNormal = normal;",
"    vec3 transformedNormal = normalMatrix * objectNormal;",
"    vec4 mvPosition = modelViewMatrix * vec4( position * radius + offset, 1.0 );",

"    vLightFront = vec3( 0.0 );",

"    transformedNormal = normalize( transformedNormal );",

"    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );",
"    vec3 dirVector = normalize( lDirection.xyz );",
"    float dotProduct = dot( transformedNormal, dirVector );",
"    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",

"    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;",

"    gl_Position = projectionMatrix * mvPosition;",
"}"

].join("\n"),

        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000},
            directionalLightColor: { type: 'fv', value: [] },
            directionalLightDirection: { type: 'fv', value: [] }
        }

    },
 
//for outline
     'outline' : { 
        fragmentShader : [

"uniform float opacity;",
"uniform vec3 outlineColor;",
"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",

"void main() {",
    
"    gl_FragColor = vec4( outlineColor, 1 );",
"}"


].join("\n"),
       
       vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform float outlineWidth;",
"uniform float outlinePushback;",

"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",

"void main() {",

"    vec4 norm = modelViewMatrix*vec4(normalize(normal),0.0);",
"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
"    mvPosition.xy += norm.xy*outlineWidth;",
"    gl_Position = projectionMatrix * mvPosition;",
"    mvPosition.z -= outlinePushback;", //go backwards in model space
"    vec4 pushpos = projectionMatrix*mvPosition;", //project to get z in projection space, I'm probably missing some simple math to do the same thing..
"    gl_Position.z = gl_Position.w*pushpos.z/pushpos.w;",
"}"
           
].join("\n"),

        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            outlineColor: { type: 'c', value: new $3Dmol.Color(0.0, 0.0, 0.0) },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000},           
            outlineWidth: { type: 'f', value: 0.1 },
            outlinePushback: { type: 'f', value: 1.0 },
        }

    },
//for outlining sphere imposter
    'sphereimposteroutline' : { 
       fragmentShader : [

"uniform float opacity;",
"uniform vec3 outlineColor;",
"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",
"uniform mat4 projectionMatrix;",
"varying vec2 mapping;",
"varying float rval;",
"varying vec3 center;",

"uniform float outlinePushback;",


"void main() {",
"    float lensqr = dot(mapping,mapping);",
"    float rsqr = rval*rval;",
"    if(lensqr > rsqr)",
"       discard;",
"    float z = sqrt(rsqr-lensqr);",
"    vec3 cameraPos = center+ vec3(mapping.x,mapping.y,z-outlinePushback);",
"    vec4 clipPos = projectionMatrix * vec4(cameraPos, 1.0);",
"    float ndcDepth = clipPos.z / clipPos.w;",
"    gl_FragDepthEXT = ((gl_DepthRange.diff * ndcDepth) + gl_DepthRange.near + gl_DepthRange.far) / 2.0;",
"    gl_FragColor = vec4(outlineColor, 1 );",
"}"


].join("\n"),
      
      vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform float outlineWidth;",
"uniform float outlinePushback;",

"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",

"varying vec2 mapping;",
"varying float rval;",
"varying vec3 center;",

"void main() {",

"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
"    center = mvPosition.xyz;",
"    vec4 projPosition = projectionMatrix * mvPosition;",
"    vec2 norm = normal.xy + vec2(sign(normal.x)*outlineWidth,sign(normal.y)*outlineWidth);", 
"    vec4 adjust = projectionMatrix* vec4(norm,normal.z,0.0); adjust.z = 0.0; adjust.w = 0.0;",
"    mapping = norm.xy;",
"    rval = abs(norm.x);",
"    gl_Position = projPosition+adjust;",
"}"
          
].join("\n"),

       uniforms : {
           opacity: { type: 'f', value: 1.0 },
           outlineColor: { type: 'c', value: new $3Dmol.Color(0.0, 0.0, 0.0) },
           fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
           fogNear: { type: 'f', value: 1.0 },
           fogFar: { type: 'f', value: 2000},           
           outlineWidth: { type: 'f', value: 0.1 },
           outlinePushback: { type: 'f', value: 1.0 },
       }

   },
   //stick imposters
   'stickimposter' : { 
      fragmentShader : [$3Dmol.ShaderUtils.stickimposterFragmentShader,
    "    float dotProduct = dot( norm, vLight );",
    "    vec3 light = vec3( max( dotProduct, 0.0 ) );",    
    "    gl_FragColor = vec4(light*color, opacity*opacity );", 
    "    float fogFactor = smoothstep( fogNear, fogFar, depth );",   
    "    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",
    "}"].join("\n"),
      vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 directionalLightColor[ 1 ];",
"uniform vec3 directionalLightDirection[ 1 ];",

"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",
"attribute float radius;",

"varying vec3 vColor;",
"varying vec3 vLight;",
"varying vec3 cposition;",
"varying vec3 p1;",
"varying vec3 p2;",
"varying float r;",

"void main() {",
   
"    vColor = color; vColor.z = abs(vColor.z);", //z indicates which vertex and so would vary
"    r = abs(radius);",
"    vec4 to = modelViewMatrix*vec4(normal, 1.0);", //normal is other point of cylinder
"    vec4 pt = modelViewMatrix*vec4(position, 1.0);",
"    vec4 mvPosition = pt;",
"    p1 = pt.xyz; p2 = to.xyz;",
"    vec3 norm = to.xyz-pt.xyz;","" +
"    float mult = 1.1;", //slop to account for perspective of sphere
"    if(length(p1) > length(p2)) {", //billboard at level of closest point
"       mvPosition = to;",
"    }",
"    vec3 n = normalize(mvPosition.xyz);",
//intersect with the plane defined by the camera looking at the billboard point
"    if(color.z >= 0.0) {", //p1
"       vec3 pnorm = normalize(p1);",
"       float t = dot(mvPosition.xyz-p1,n)/dot(pnorm,n);",
"       mvPosition.xyz = p1+t*pnorm;",
"    } else {",
"       vec3 pnorm = normalize(p2);",
"       float t = dot(mvPosition.xyz-p2,n)/dot(pnorm,n);",
"       mvPosition.xyz = p2+t*pnorm;",
"       mult *= -1.0;",
"    }",
"    vec3 cr = normalize(cross(mvPosition.xyz,norm))*radius;", 
"    vec3 doublecr = normalize(cross(mvPosition.xyz,cr))*radius;", 
"    mvPosition.xy +=  mult*(cr + doublecr).xy;",
"    cposition = mvPosition.xyz;",
"    gl_Position = projectionMatrix * mvPosition;",
"    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );",
"    vLight = normalize( lDirection.xyz )*directionalLightColor[0];", //not really sure this is right, but color is always white so..
"}"
          
].join("\n"),

       uniforms : {
           opacity: { type: 'f', value: 1.0 },
           fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
           fogNear: { type: 'f', value: 1.0 },
           fogFar: { type: 'f', value: 2000},         
           directionalLightColor: { type: 'fv', value: [] },
           directionalLightDirection: { type: 'fv', value: [] }
       }

   },
   //stick imposter outlines
   'stickimposteroutline' : { 
      fragmentShader : $3Dmol.ShaderUtils.stickimposterFragmentShader + 'gl_FragColor = vec4(color,1.0);}',   
      vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 directionalLightColor[ 1 ];",
"uniform vec3 directionalLightDirection[ 1 ];",
"uniform vec3 outlineColor;",
"uniform float outlineWidth;",
"uniform float outlinePushback;",


"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",
"attribute float radius;",

"varying vec3 vColor;",
"varying vec3 vLight;",
"varying vec3 cposition;",
"varying vec3 p1;",
"varying vec3 p2;",
"varying float r;",

"void main() {",
   
"    vColor = outlineColor;",
"    float rad = radius+sign(radius)*outlineWidth;",
"    r = abs(rad);",
"    vec4 to = modelViewMatrix*vec4(normal, 1.0);", //normal is other point of cylinder
"    vec4 pt = modelViewMatrix*vec4(position, 1.0);",
//pushback
"    to.xyz += normalize(to.xyz)*outlinePushback;",
"    pt.xyz += normalize(pt.xyz)*outlinePushback;",

"    vec4 mvPosition = pt;",
"    p1 = pt.xyz; p2 = to.xyz;",
"    vec3 norm = to.xyz-pt.xyz;","" +
"    float mult = 1.1;", //slop to account for perspective of sphere
"    if(length(p1) > length(p2)) {", //billboard at level of closest point
"       mvPosition = to;",
"    }",
"    vec3 n = normalize(mvPosition.xyz);",
//intersect with the plane defined by the camera looking at the billboard point
"    if(color.z >= 0.0) {", //p1
"       vec3 pnorm = normalize(p1);",
"       float t = dot(mvPosition.xyz-p1,n)/dot(pnorm,n);",
"       mvPosition.xyz = p1+t*pnorm;",
"    } else {",
"       vec3 pnorm = normalize(p2);",
"       float t = dot(mvPosition.xyz-p2,n)/dot(pnorm,n);",
"       mvPosition.xyz = p2+t*pnorm;",
"       mult *= -1.0;",
"    }",
"    vec3 cr = normalize(cross(mvPosition.xyz,norm))*rad;", 
"    vec3 doublecr = normalize(cross(mvPosition.xyz,cr))*rad;", 
"    mvPosition.xy +=  mult*(cr + doublecr).xy;",
"    cposition = mvPosition.xyz;",
"    gl_Position = projectionMatrix * mvPosition;",
"    vLight = vec3(1.0,1.0,1.0);",
"}"
          
].join("\n"),

       uniforms : {
           opacity: { type: 'f', value: 1.0 },
           fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
           fogNear: { type: 'f', value: 1.0 },
           fogFar: { type: 'f', value: 2000},         
           outlineColor: { type: 'c', value: new $3Dmol.Color(0.0, 0.0, 0.0) },         
           outlineWidth: { type: 'f', value: 0.1 },
           outlinePushback: { type: 'f', value: 1.0 },         
       }

   },
    //for double sided lighting
    'lambertdouble' : { 
        fragmentShader : [

"uniform mat4 viewMatrix;",
"uniform float opacity;",

"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",

"varying vec3 vLightFront;",
"varying vec3 vLightBack;",

"varying vec3 vColor;",

"void main() {",
    
"    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
    
"    #ifndef WIREFRAME",
"    if ( gl_FrontFacing )",
"       gl_FragColor.xyz *= vLightFront;",
"    else",
"       gl_FragColor.xyz *= vLightBack;",
"    #endif",
    
"    gl_FragColor = gl_FragColor * vec4( vColor, opacity );",
"    float depth = gl_FragCoord.z / gl_FragCoord.w;",
    
"    float fogFactor = smoothstep( fogNear, fogFar, depth );",
    
"    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

"}"


].join("\n"),
       
       vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 directionalLightColor[ 1 ];",
"uniform vec3 directionalLightDirection[ 1 ];",

"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",

"varying vec3 vColor;",
"varying vec3 vLightFront;",
"varying vec3 vLightBack;",

"void main() {",
    
"    vColor = color;",
    
"    vec3 objectNormal = normal;",  
"    vec3 transformedNormal = normalMatrix * objectNormal;",    
"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
    
"    vLightFront = vec3( 0.0 );",
"    vLightBack = vec3( 0.0 );",
    
"    transformedNormal = normalize( transformedNormal );",
    
"    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );",
"    vec3 dirVector = normalize( lDirection.xyz );",
"    float dotProduct = dot( transformedNormal, dirVector );",
"    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",
"    vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

"    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;",
"    vLightBack += directionalLightColor[ 0 ] * directionalLightWeightingBack;",

"    gl_Position = projectionMatrix * mvPosition;",
"}"
           
].join("\n"),

        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000},           
            directionalLightColor: { type: 'fv', value: [] },
            directionalLightDirection: { type: 'fv', value: [] }
        }

    },
    
    
    'sprite': {
        
        fragmentShader: [
                                                         
"uniform vec3 color;",
"uniform sampler2D map;",
"uniform float opacity;",

"uniform int fogType;",
"uniform vec3 fogColor;",
"uniform float fogDensity;",
"uniform float fogNear;",
"uniform float fogFar;",
"uniform float alphaTest;",

"varying vec2 vUV;",

"void main() {",
    
"    vec4 texture = texture2D(map, vUV);",
    
"    if (texture.a < alphaTest) discard;",
    
"    gl_FragColor = vec4(color * texture.xyz, texture.a * opacity);",
    
"    if (fogType > 0) {",
        
"        float depth = gl_FragCoord.z / gl_FragCoord.w;",
"        float fogFactor = 0.0;",
        
"        if (fogType == 1) {",
"            fogFactor = smoothstep(fogNear, fogFar, depth);",
"        }",
        
"        else {",
"            const float LOG2 = 1.442695;",
"            float fogFactor = exp2(- fogDensity * fogDensity * depth * depth * LOG2);",
"            fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);",
"        }",
        
"        gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);",
        
"    }",
"}"                                              
            
].join("\n"),
        
        vertexShader: [

"uniform int useScreenCoordinates;",
"uniform vec3 screenPosition;",
"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform float rotation;",
"uniform vec2 scale;",
"uniform vec2 alignment;",
"uniform vec2 uvOffset;",
"uniform vec2 uvScale;",

"attribute vec2 position;",
"attribute vec2 uv;",

"varying vec2 vUV;",

"void main() {",
    
"    vUV = uvOffset + uv * uvScale;",
    
"    vec2 alignedPosition = position + alignment;",
    
"    vec2 rotatedPosition;",
"    rotatedPosition.x = ( cos(rotation) * alignedPosition.x - sin(rotation) * alignedPosition.y ) * scale.x;",
"    rotatedPosition.y = ( sin(rotation) * alignedPosition.x + cos(rotation) * alignedPosition.y ) * scale.y;",
    
"    vec4 finalPosition;",
    
"    if(useScreenCoordinates != 0) {",
"        finalPosition = vec4(screenPosition.xy + rotatedPosition, screenPosition.z, 1.0);",
"    }",
    
"    else {",
"        finalPosition = projectionMatrix * modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0); finalPosition /= finalPosition.w;",
"        finalPosition.xy += rotatedPosition; ",
"    }",
    
"    gl_Position = finalPosition;",
    
"}"
       
].join("\n"),

        uniforms : {
            
        }
        
    }
    
};
/*  ProteinSurface.js by biochem_fan

Ported and modified for Javascript based on EDTSurf,
  whose license is as follows.

Permission to use, copy, modify, and distribute this program for any
purpose, with or without fee, is hereby granted, provided that this
copyright notice and the reference information appear in all copies or
substantial portions of the Software. It is provided "as is" without
express or implied warranty. 

Reference:
http://zhanglab.ccmb.med.umich.edu/EDTSurf/
D. Xu, Y. Zhang (2009) Generating Triangulated Macromolecular Surfaces
by Euclidean Distance Transform. PLoS ONE 4(12): e8140.

=======

TODO: Improved performance on Firefox
      Reduce memory consumption
      Refactor!
 */


// dkoes
// Surface calculations.  This must be safe to use within a web worker.
if (typeof console === 'undefined') {
    // this should only be true inside of a webworker
    console = {
        log : function() {
        }
    };
}

$3Dmol.ProteinSurface = function() {

    // constants for vpbits bitmasks
    /** @const */
    var INOUT = 1;
    /** @const */
    var ISDONE = 2;
    /** @const */
    var ISBOUND = 4;

    var ptranx = 0, ptrany = 0, ptranz = 0;
    var probeRadius = 1.4;
    var defaultScaleFactor = 2;
    var scaleFactor = defaultScaleFactor; // 2 is .5A grid; if this is made user configurable,
                            // also have to adjust offset used to find non-shown
                            // atoms
    var pHeight = 0, pWidth = 0, pLength = 0;
    var cutRadius = 0;
    var vpBits = null; // uint8 array of bitmasks
    var vpDistance = null; // floatarray of _squared_ distances
    var vpAtomID = null; // intarray
    var vertnumber = 0, facenumber = 0;
    var pminx = 0, pminy = 0, pminz = 0, pmaxx = 0, pmaxy = 0, pmaxz = 0;

    var vdwRadii = {
            "H" : 1.2,
            "Li" : 1.82,
            "Na" : 2.27,
            "K" : 2.75,
            "C" : 1.7,
            "N" : 1.55,
            "O" : 1.52,
            "F" : 1.47,
            "P" : 1.80,
            "S" : 1.80,
            "CL" : 1.75,
            "BR" : 1.85,
            "SE" : 1.90,
            "ZN" : 1.39,
            "CU" : 1.4,
            "NI" : 1.63,
            "X" : 2
        };
    
    /** @param {AtomSpec} atom */
    var getVDWIndex = function(atom) {
        if(!atom.elem || typeof(vdwRadii[atom.elem]) == "undefined") {
            return "X";
        }
        return atom.elem;
    };
    
    var depty = {}, widxz = {};
    var faces, verts;
    var nb = [ new Int32Array([ 1, 0, 0 ]), new Int32Array([ -1, 0, 0 ]), 
               new Int32Array([ 0, 1, 0 ]), new Int32Array([ 0, -1, 0 ]),
               new Int32Array([ 0, 0, 1 ]), 
               new Int32Array([ 0, 0, -1 ]), 
               new Int32Array([ 1, 1, 0 ]), 
               new Int32Array([ 1, -1, 0 ]), 
               new Int32Array([ -1, 1, 0 ]),
               new Int32Array([ -1, -1, 0 ]), 
               new Int32Array([ 1, 0, 1 ]), 
               new Int32Array([ 1, 0, -1 ]), 
               new Int32Array([ -1, 0, 1 ]),
               new Int32Array([ -1, 0, -1 ]), 
               new Int32Array([ 0, 1, 1 ]), 
               new Int32Array([ 0, 1, -1 ]), 
               new Int32Array([ 0, -1, 1 ]),
               new Int32Array([ 0, -1, -1 ]), 
               new Int32Array([ 1, 1, 1 ]), 
               new Int32Array([ 1, 1, -1 ]), 
               new Int32Array([ 1, -1, 1 ]),
               new Int32Array([ -1, 1, 1 ]), 
               new Int32Array([ 1, -1, -1 ]), 
               new Int32Array([ -1, -1, 1 ]), 
               new Int32Array([ -1, 1, -1 ]),
               new Int32Array([ -1, -1, -1 ]) ];

    var origextent;

    var inOrigExtent = function(x, y, z) {
        if (x < origextent[0][0] || x > origextent[1][0])
            return false;
        if (y < origextent[0][1] || y > origextent[1][1])
            return false;
        if (z < origextent[0][2] || z > origextent[1][2])
            return false;
        return true;
    };

    this.getFacesAndVertices = function(atomlist) {
        var atomsToShow = {};
        var i, il;
        for (i = 0, il = atomlist.length; i < il; i++)
            atomsToShow[atomlist[i]] = true;
        var vertices = verts;
        for (i = 0, il = vertices.length; i < il; i++) {
            vertices[i].x = vertices[i].x / scaleFactor - ptranx;
            vertices[i].y = vertices[i].y / scaleFactor - ptrany;
            vertices[i].z = vertices[i].z / scaleFactor - ptranz;
        }

        var finalfaces = [];
        for (i = 0, il = faces.length; i < il; i += 3) {
            //var f = faces[i];
            var fa = faces[i], fb = faces[i+1], fc = faces[i+2];
            var a = vertices[fa]['atomid'], b = vertices[fb]['atomid'], c = vertices[fc]['atomid'];

            // must be a unique face for each atom
            var which = a;
            if (b < which)
                which = b;
            if (c < which)
                which = c;
            if (!atomsToShow[which]) {
                continue;
            }
            var av = vertices[faces[i]];
            var bv = vertices[faces[i+1]];
            var cv = vertices[faces[i+2]];

            if (fa !== fb && fb !== fc && fa !== fc){
                finalfaces.push(fa); 
                finalfaces.push(fb); 
                finalfaces.push(fc); 
            }
               
        }

        //try to help the garbage collector
        vpBits = null; // uint8 array of bitmasks
        vpDistance = null; // floatarray
        vpAtomID = null; // intarray
        
        return {
            'vertices' : vertices,
            'faces' : finalfaces
        };
    };


    this.initparm = function(extent, btype, volume) {
        if(volume > 1000000) //heuristical decrease resolution to avoid large memory consumption
            scaleFactor = defaultScaleFactor/2;
        
        var margin = (1 / scaleFactor) * 5.5; // need margin to avoid
                                                // boundary/round off effects
        origextent = extent;
        pminx = extent[0][0]; pmaxx = extent[1][0];
        pminy = extent[0][1]; pmaxy = extent[1][1];
        pminz = extent[0][2]; pmaxz = extent[1][2];

        if (!btype) {
            pminx -= margin;
            pminy -= margin;
            pminz -= margin;
            pmaxx += margin;
            pmaxy += margin;
            pmaxz += margin;
        } else {
            pminx -= probeRadius + margin;
            pminy -= probeRadius + margin;
            pminz -= probeRadius + margin;
            pmaxx += probeRadius + margin;
            pmaxy += probeRadius + margin;
            pmaxz += probeRadius + margin;
        }

        pminx = Math.floor(pminx * scaleFactor) / scaleFactor;
        pminy = Math.floor(pminy * scaleFactor) / scaleFactor;
        pminz = Math.floor(pminz * scaleFactor) / scaleFactor;
        pmaxx = Math.ceil(pmaxx * scaleFactor) / scaleFactor;
        pmaxy = Math.ceil(pmaxy * scaleFactor) / scaleFactor;
        pmaxz = Math.ceil(pmaxz * scaleFactor) / scaleFactor;

        ptranx = -pminx;
        ptrany = -pminy;
        ptranz = -pminz;

        pLength = Math.ceil(scaleFactor * (pmaxx - pminx)) + 1;
        pWidth = Math.ceil(scaleFactor * (pmaxy - pminy)) + 1;
        pHeight = Math.ceil(scaleFactor * (pmaxz - pminz)) + 1;

        this.boundingatom(btype);
        cutRadius = probeRadius * scaleFactor;

        vpBits = new Uint8Array(pLength * pWidth * pHeight);
        vpDistance = new Float64Array(pLength * pWidth * pHeight); // float 32
        // doesn't
        // play
        // nicely
        // with
        // native
        // floats
        vpAtomID = new Int32Array(pLength * pWidth * pHeight);
        //console.log("Box size: ", pLength, pWidth, pHeight, vpBits.length);
    };

    this.boundingatom = function(btype) {
        var tradius = [];
        var txz, tdept, sradius, idx;
        flagradius = btype;

        for ( var i in vdwRadii) {
            if(!vdwRadii.hasOwnProperty(i))
                continue;
            var r = vdwRadii[i];
            if (!btype)
                tradius[i] = r * scaleFactor + 0.5;
            else
                tradius[i] = (r + probeRadius) * scaleFactor + 0.5;

            sradius = tradius[i] * tradius[i];
            widxz[i] = Math.floor(tradius[i]) + 1;
            depty[i] = new Int32Array(widxz[i] * widxz[i]);
            indx = 0;
            for (j = 0; j < widxz[i]; j++) {
                for (k = 0; k < widxz[i]; k++) {
                    txz = j * j + k * k;
                    if (txz > sradius)
                        depty[i][indx] = -1; // outside
                    else {
                        tdept = Math.sqrt(sradius - txz);
                        depty[i][indx] = Math.floor(tdept);
                    }
                    indx++;
                }
            }
        }
    };

    this.fillvoxels = function(atoms, atomlist) { // (int seqinit,int
        // seqterm,bool
        // atomtype,atom*
        // proseq,bool bcolor)
        var i, il;
        for (i = 0, il = vpBits.length; i < il; i++) {
            vpBits[i] = 0;
            vpDistance[i] = -1.0;
            vpAtomID[i] = -1;
        }

        for (i in atomlist) {
            var atom = atoms[atomlist[i]];
            if (atom === undefined)
                continue;
            this.fillAtom(atom, atoms);
        }

        for (i = 0, il = vpBits.length; i < il; i++)
            if (vpBits[i] & INOUT)
                vpBits[i] |= ISDONE;

    };


    this.fillAtom = function(atom, atoms) {
        var cx, cy, cz, ox, oy, oz, mi, mj, mk, i, j, k, si, sj, sk;
        var ii, jj, kk, n;
        cx = Math.floor(0.5 + scaleFactor * (atom.x + ptranx));
        cy = Math.floor(0.5 + scaleFactor * (atom.y + ptrany));
        cz = Math.floor(0.5 + scaleFactor * (atom.z + ptranz));

        var at = getVDWIndex(atom);
        var nind = 0;
        var cnt = 0;
        var pWH = pWidth*pHeight;
        
        for (i = 0, n = widxz[at]; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (depty[at][nind] != -1) {
                    for (ii = -1; ii < 2; ii++) {
                        for (jj = -1; jj < 2; jj++) {
                            for (kk = -1; kk < 2; kk++) {
                                if (ii !== 0 && jj !== 0 && kk !== 0) {
                                    mi = ii * i;
                                    mk = kk * j;
                                    for (k = 0; k <= depty[at][nind]; k++) {
                                        mj = k * jj;
                                        si = cx + mi;
                                        sj = cy + mj;
                                        sk = cz + mk;
                                        if (si < 0 || sj < 0 || 
                                                sk < 0 ||
                                                si >= pLength || 
                                                sj >= pWidth || 
                                                sk >= pHeight)
                                            continue;
                                        var index = si * pWH + sj * pHeight + sk;

                                        if (!(vpBits[index] & INOUT)) {
                                            vpBits[index] |= INOUT;
                                            vpAtomID[index] = atom.serial;
                                        } else {
                                            var atom2 = atoms[vpAtomID[index]];
                                            if(atom2.serial != atom.serial) {
                                                ox = cx + mi - Math.floor(0.5 + scaleFactor *
                                                        (atom2.x + ptranx));
                                                oy = cy + mj - Math.floor(0.5 + scaleFactor *
                                                        (atom2.y + ptrany));
                                                oz = cz + mk - Math.floor(0.5 + scaleFactor *
                                                        (atom2.z + ptranz));
                                                if (mi * mi + mj * mj + mk * mk < ox *
                                                        ox + oy * oy + oz * oz)
                                                    vpAtomID[index] = atom.serial;
                                            }
                                        }

                                    }// k
                                }// if
                            }// kk
                        }// jj
                    }// ii
                }// if
                nind++;
            }// j
        }// i
    };

    this.fillvoxelswaals = function(atoms, atomlist) {
        var i, il;
        for (i = 0, il = vpBits.length; i < il; i++)
            vpBits[i] &= ~ISDONE; // not isdone

        for (i in atomlist) {
            var atom = atoms[atomlist[i]];
            if (atom === undefined)
                continue;

            this.fillAtomWaals(atom, atoms);
        }
    };

    this.fillAtomWaals = function(atom, atoms) {
        var cx, cy, cz, ox, oy, oz, nind = 0;
        var mi, mj, mk, si, sj, sk, i, j, k, ii, jj, kk, n;
        cx = Math.floor(0.5 + scaleFactor * (atom.x + ptranx));
        cy = Math.floor(0.5 + scaleFactor * (atom.y + ptrany));
        cz = Math.floor(0.5 + scaleFactor * (atom.z + ptranz));

        var at = getVDWIndex(atom);
        var pWH = pWidth*pHeight;
        for (i = 0, n = widxz[at]; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (depty[at][nind] != -1) {
                    for (ii = -1; ii < 2; ii++) {
                        for (jj = -1; jj < 2; jj++) {
                            for (kk = -1; kk < 2; kk++) {
                                if (ii !== 0 && jj !== 0 && kk !== 0) {
                                    mi = ii * i;
                                    mk = kk * j;
                                    for (k = 0; k <= depty[at][nind]; k++) {
                                        mj = k * jj;
                                        si = cx + mi;
                                        sj = cy + mj;
                                        sk = cz + mk;
                                        if (si < 0 || sj < 0 || 
                                                sk < 0 || 
                                                si >= pLength || 
                                                sj >= pWidth || 
                                                sk >= pHeight)
                                            continue;
                                        var index = si * pWH + sj * pHeight + sk;
                                        if (!(vpBits[index] & ISDONE)) {
                                            vpBits[index] |= ISDONE;
                                            vpAtomID[index] = atom.serial;
                                        }  else {
                                            var atom2 = atoms[vpAtomID[index]];
                                            if(atom2.serial != atom.serial) {
                                                ox = cx + mi - Math.floor(0.5 + scaleFactor *
                                                        (atom2.x + ptranx));
                                                oy = cy + mj - Math.floor(0.5 + scaleFactor *
                                                        (atom2.y + ptrany));
                                                oz = cz + mk - Math.floor(0.5 + scaleFactor *
                                                        (atom2.z + ptranz));
                                                if (mi * mi + mj * mj + mk * mk < ox *
                                                        ox + oy * oy + oz * oz)
                                                    vpAtomID[index] = atom.serial;
                                            }
                                        }
                                    }// k
                                }// if
                            }// kk
                        }// jj
                    }// ii
                }// if
                nind++;
            }// j
        }// i
    };

    this.buildboundary = function() {
        var pWH = pWidth*pHeight;
        for (i = 0; i < pLength; i++) {
            for (j = 0; j < pHeight; j++) {
                for (k = 0; k < pWidth; k++) {
                    var index = i * pWH + k * pHeight + j;
                    if (vpBits[index] & INOUT) {
                        var flagbound = false;
                        var ii = 0;
                        while (ii < 26) {
                            var ti = i + nb[ii][0], tj = j + nb[ii][2], tk = k +
                                    nb[ii][1];
                            if (ti > -1 && 
                                ti < pLength && 
                                tk > -1 && 
                                tk < pWidth && 
                                tj > -1 && 
                                tj < pHeight && 
                                !(vpBits[ti * pWH + tk * pHeight + tj] & INOUT)) {
                                vpBits[index] |= ISBOUND;
                                break;
                            } else
                                ii++;
                        }
                    }
                }
            }
        }
    };

    // a little class for 3d array, should really generalize this and
    // use throughout...
    var PointGrid = function(length, width, height) {
        // the standard says this is zero initialized
        var data = new Int32Array(length * width * height * 3);

        // set position x,y,z to pt, which has ix,iy,and iz
        this.set = function(x, y, z, pt) {
            var index = ((((x * width) + y) * height) + z) * 3;
            data[index] = pt.ix;
            data[index + 1] = pt.iy;
            data[index + 2] = pt.iz;
        };

        // return point at x,y,z
        this.get = function(x, y, z) {
            var index = ((((x * width) + y) * height) + z) * 3;
            return {
                ix : data[index],
                iy : data[index + 1],
                iz : data[index + 2]
            };
        };
    };

    this.fastdistancemap = function() {
        var eliminate = 0;
        var certificate;
        var i, j, k, n;

        var boundPoint = new PointGrid(pLength, pWidth, pHeight);
        var pWH = pWidth*pHeight;
        var cutRSq = cutRadius*cutRadius;
        
        var inarray = [];
        var outarray = [];
        
        var index;
        
        for (i = 0; i < pLength; i++) {
            for (j = 0; j < pWidth; j++) {
                for (k = 0; k < pHeight; k++) {
                    index = i * pWH + j * pHeight + k;
                    vpBits[index] &= ~ISDONE; // isdone = false
                    if (vpBits[index] & INOUT) {
                        if (vpBits[index] & ISBOUND) {
                            var triple = {
                                ix : i,
                                iy : j,
                                iz : k
                            };
                            boundPoint.set(i, j, k, triple);
                            inarray.push(triple);
                            vpDistance[index] = 0;
                            vpBits[index] |= ISDONE;
                            vpBits[index] &= ~ISBOUND;
                        } 
                    }
                }
            }
        }

        do {
            outarray = this.fastoneshell(inarray, boundPoint);
            inarray = [];
            for (i = 0, n = outarray.length; i < n; i++) {
                index = pWH * outarray[i].ix + pHeight *
                    outarray[i].iy + outarray[i].iz;
                vpBits[index] &= ~ISBOUND;
                if (vpDistance[index] <= 1.0404 * cutRSq) {
                    inarray.push({
                        ix : outarray[i].ix,
                        iy : outarray[i].iy,
                        iz : outarray[i].iz
                    });
                }
            }
        } while (inarray.length !== 0);

        inarray = [];
        outarray = [];
        boundPoint = null;
        
        var cutsf = scaleFactor - 0.5;
        if (cutsf < 0)
            cutsf = 0;
        var cutoff = cutRSq - 0.50 / (0.1 + cutsf);
        for (i = 0; i < pLength; i++) {
            for (j = 0; j < pWidth; j++) {
                for (k = 0; k < pHeight; k++) {
                    index = i * pWH + j * pHeight + k;
                    vpBits[index] &= ~ISBOUND;
                    // ses solid
                    if (vpBits[index] & INOUT) {
                        if (!(vpBits[index] & ISDONE) ||
                                ((vpBits[index] & ISDONE) && vpDistance[index] >= cutoff)) {
                            vpBits[index] |= ISBOUND;
                        }
                    }
                }
            }
        }

    };

    this.fastoneshell = function(inarray, boundPoint) { // (int* innum,int
        // *allocout,voxel2
        // ***boundPoint, int*
        // outnum, int *elimi)
        var tx, ty, tz;
        var dx, dy, dz;
        var i, j, n;
        var square;
        var bp, index;
        var outarray = [];
        if (inarray.length === 0)
            return outarray;

        tnv = {
            ix : -1,
            iy : -1,
            iz : -1
        };
        var pWH = pWidth*pHeight;
        for ( i = 0, n = inarray.length; i < n; i++) {
            tx = inarray[i].ix;
            ty = inarray[i].iy;
            tz = inarray[i].iz;
            bp = boundPoint.get(tx, ty, tz);

            for (j = 0; j < 6; j++) {
                tnv.ix = tx + nb[j][0];
                tnv.iy = ty + nb[j][1];
                tnv.iz = tz + nb[j][2];
                
                if (tnv.ix < pLength && tnv.ix > -1 && tnv.iy < pWidth &&
                        tnv.iy > -1 && tnv.iz < pHeight && tnv.iz > -1) {
                    index = tnv.ix * pWH + pHeight * tnv.iy + tnv.iz;
                    
                    if ((vpBits[index] & INOUT) && !(vpBits[index] & ISDONE)) {
    
                        boundPoint.set(tnv.ix, tnv.iy, tz + nb[j][2], bp);
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        vpDistance[index] = square;
                        vpBits[index] |= ISDONE;
                        vpBits[index] |= ISBOUND;
    
                        outarray.push({
                            ix : tnv.ix,
                            iy : tnv.iy,
                            iz : tnv.iz
                        });
                    } else if ((vpBits[index] & INOUT) && (vpBits[index] & ISDONE)) {
    
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        if (square < vpDistance[index]) {
                            boundPoint.set(tnv.ix, tnv.iy, tnv.iz, bp);
    
                            vpDistance[index] = square;
                            if (!(vpBits[index] & ISBOUND)) {
                                vpBits[index] |= ISBOUND;
                                outarray.push({
                                    ix : tnv.ix,
                                    iy : tnv.iy,
                                    iz : tnv.iz
                                });
                            }
                        }
                    }
                }
            }
        }

        // console.log("part1", positout);

        for (i = 0, n = inarray.length; i < n; i++) {
            tx = inarray[i].ix;
            ty = inarray[i].iy;
            tz = inarray[i].iz;
            bp = boundPoint.get(tx, ty, tz);

            for (j = 6; j < 18; j++) {
                tnv.ix = tx + nb[j][0];
                tnv.iy = ty + nb[j][1];
                tnv.iz = tz + nb[j][2];

                if(tnv.ix < pLength && tnv.ix > -1 && tnv.iy < pWidth &&
                        tnv.iy > -1 && tnv.iz < pHeight && tnv.iz > -1) {
                    index = tnv.ix * pWH + pHeight * tnv.iy + tnv.iz;
                    
                    if ((vpBits[index] & INOUT) && !(vpBits[index] & ISDONE)) {
                        boundPoint.set(tnv.ix, tnv.iy, tz + nb[j][2], bp);
    
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        vpDistance[index] = square;
                        vpBits[index] |= ISDONE;
                        vpBits[index] |= ISBOUND;
    
                        outarray.push({
                            ix : tnv.ix,
                            iy : tnv.iy,
                            iz : tnv.iz
                        });
                    } else if ((vpBits[index] & INOUT) && (vpBits[index] & ISDONE)) {
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        if (square < vpDistance[index]) {
                            boundPoint.set(tnv.ix, tnv.iy, tnv.iz, bp);
                            vpDistance[index] = square;
                            if (!(vpBits[index] & ISBOUND)) {
                                vpBits[index] |= ISBOUND;
                                outarray.push({
                                    ix : tnv.ix,
                                    iy : tnv.iy,
                                    iz : tnv.iz
                                });
                            }
                        }
                    }
                }
            }
        }

        // console.log("part2", positout);

        for (i = 0, n = inarray.length; i < n; i++) {
            tx = inarray[i].ix;
            ty = inarray[i].iy;
            tz = inarray[i].iz;
            bp = boundPoint.get(tx, ty, tz);

            for (j = 18; j < 26; j++) {
                tnv.ix = tx + nb[j][0];
                tnv.iy = ty + nb[j][1];
                tnv.iz = tz + nb[j][2];

                if (tnv.ix < pLength && tnv.ix > -1 && tnv.iy < pWidth &&
                        tnv.iy > -1 && tnv.iz < pHeight && tnv.iz > -1) {
                    index = tnv.ix * pWH + pHeight * tnv.iy + tnv.iz;

                    if ((vpBits[index] & INOUT) && !(vpBits[index] & ISDONE)) {
                        boundPoint.set(tnv.ix, tnv.iy, tz + nb[j][2], bp);

                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        vpDistance[index] = square;
                        vpBits[index] |= ISDONE;
                        vpBits[index] |= ISBOUND;

                        outarray.push({
                            ix : tnv.ix,
                            iy : tnv.iy,
                            iz : tnv.iz
                        });
                    } else if ((vpBits[index] & INOUT)  && (vpBits[index] & ISDONE)) {
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        if (square < vpDistance[index]) {
                            boundPoint.set(tnv.ix, tnv.iy, tnv.iz, bp);

                            vpDistance[index] = square;
                            if (!(vpBits[index] & ISBOUND)) {
                                vpBits[index] |= ISBOUND;
                                outarray.push({
                                    ix : tnv.ix,
                                    iy : tnv.iy,
                                    iz : tnv.iz
                                });
                            }
                        }
                    }
                }
            }
        }

        // console.log("part3", positout);
        return outarray;
    };

    this.marchingcubeinit = function(stype) {
        for ( var i = 0, lim = vpBits.length; i < lim; i++) {
            if (stype == 1) {// vdw
                vpBits[i] &= ~ISBOUND;
            } else if (stype == 4) { // ses
                vpBits[i] &= ~ISDONE;
                if (vpBits[i] & ISBOUND)
                    vpBits[i] |= ISDONE;
                vpBits[i] &= ~ISBOUND;
            } else if (stype == 2) {// after vdw
                if ((vpBits[i] & ISBOUND) && (vpBits[i] & ISDONE))
                    vpBits[i] &= ~ISBOUND;
                else if ((vpBits[i] & ISBOUND) && !(vpBits[i] & ISDONE))
                    vpBits[i] |= ISDONE;
            } else if (stype == 3) { // sas
                vpBits[i] &= ~ISBOUND;
            }
        }
    };

    // this code allows me to empirically prune the marching cubes code tables
    // to more efficiently handle discrete data
    var counter = function() {
        var data = Array(256);
        for ( var i = 0; i < 256; i++)
            data[i] = [];

        this.incrementUsed = function(i, j) {
            if (typeof data[i][j] === 'undefined')
                data[i][j] = {
                    used : 0,
                    unused : 0
                };
            data[i][j].used++;
        };

        this.incrementUnused = function(i, j) {
            if (typeof data[i][j] === 'undefined')
                data[i][j] = {
                    used : 0,
                    unused : 0
                };
            data[i][j].unused++;

        };

        var redoTable = function(triTable) {
            var str = "[";
            for ( var i = 0; i < triTable.length; i++) {
                var code = 0;
                var table = triTable[i];
                for ( var j = 0; j < table.length; j++) {
                    code |= (1 << (table[j]));
                }
                str += "0x" + code.toString(16) + ", ";
            }
            str += "]";
            console.log(str);
        };

        this.print = function() {

            var table = MarchingCube.triTable;
            var str;
            var newtable = [];
            for ( var i = 0; i < table.length; i++) {
                var newarr = [];
                for ( var j = 0; j < table[i].length; j += 3) {
                    var k = j / 3;
                    if (typeof data[i][k] === 'undefined' || !data[i][k].unused) {
                        newarr.push(table[i][j]);
                        newarr.push(table[i][j + 1]);
                        newarr.push(table[i][j + 2]);
                    }
                    if (typeof data[i][k] === 'undefined')
                        console.log("undef " + i + "," + k);
                }
                newtable.push(newarr);
            }
            console.log(JSON.stringify(newtable));
            redoTable(newtable);
        };
    };
    
    this.marchingcube = function(stype) {
        this.marchingcubeinit(stype);
        verts = []; faces = [];   
        $3Dmol.MarchingCube.march(vpBits, verts, faces, {
            smooth : 1,
            nX : pLength,
            nY : pWidth,
            nZ : pHeight        
        });      

        var pWH = pWidth*pHeight;
        for (var i = 0, vlen = verts.length; i < vlen; i++) {
            verts[i]['atomid'] = vpAtomID[verts[i].x * pWH + pHeight *
                    verts[i].y + verts[i].z];
        }  

        $3Dmol.MarchingCube.laplacianSmooth(1, verts, faces);

    };


};
//auto-initialization
//Create embedded viewer from HTML attributes if true
$3Dmol.autoload=function(viewer){
    if ($(".viewer_3Dmoljs")[0] !== undefined)
        $3Dmol.autoinit = true;

    if ($3Dmol.autoinit) {
        viewer =(viewer!= undefined) ?
            viewer :null;
        
        $3Dmol.viewers = {};
        var nviewers = 0;
        $(".viewer_3Dmoljs").each( function() {
            var viewerdiv = $(this);
            var datauri = [];
            if(viewerdiv.css('position') == 'static') {
                //slight hack - canvas needs this element to be positioned
                viewerdiv.css('position','relative');
            }
            var callback = (typeof(window[viewerdiv.data("callback")]) === 'function') ? 
                    window[viewerdiv.data("callback")] : null;
            var type = null;
            if (viewerdiv.data("pdb")) {
                datauri.push("https://files.rcsb.org/view/" + viewerdiv.data("pdb") + ".pdb");
                type = "pdb";
            } else if(viewerdiv.data("cid")) {
                //this doesn't actually work since pubchem does have CORS enabled
                type = "sdf";
                datauri.push("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + viewerdiv.data("cid") + 
                "/SDF?record_type=3d");
            }
            else if (viewerdiv.data("href")){
                datauri.push(viewerdiv.data("href"));

            }
            
            var divdata=viewerdiv.data();
            for(var i in divdata){
                if((i.substring(0,3) ==="pdb" && !(i === "pdb"))){
                    datauri.push("https://files.rcsb.org/view/" +divdata[i]+".pdb")

                }else if(i.substring(0,4) ==="href" && !(i==="href")){
                    datauri.push(divdata[i]);

                }else if(i.substring(0,3)==="cid" && !(i==="cid")){
                datauri.push("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + divdata[i] + 
                "/SDF?record_type=3d");
                }
            }
            var options = {}
            if(viewerdiv.data("options"))
                options = $3Dmol.specStringToObject(viewerdiv.data("options"));
                
            var bgcolor = $3Dmol.CC.color(viewerdiv.data("backgroundcolor"));
            var style = {line:{}};
            if(viewerdiv.data("style")) style = $3Dmol.specStringToObject(viewerdiv.data("style"));
            var select = {};
            if(viewerdiv.data("select")) select = $3Dmol.specStringToObject(viewerdiv.data("select"));
            var selectstylelist = [];
            var surfaces = [];
            var labels = [];
            var d = viewerdiv.data();
            
            //let users specify individual but matching select/style tags, eg.
            //data-select1 data-style1
            var stylere = /style(.+)/;
            var surfre = /surface(.*)/;
            var reslabre = /labelres(.*)/;
            var keys = [];
            for(var dataname in d) {
                if(d.hasOwnProperty(dataname)) {
                    keys.push(dataname);
                }
            }
            keys.sort();
            for(var i = 0; i < keys.length; i++) {
                var dataname = keys[i];
                var m = stylere.exec(dataname);
                if(m) {
                    var selname = "select"+m[1];
                    var newsel = $3Dmol.specStringToObject(d[selname]);
                    var styleobj = $3Dmol.specStringToObject(d[dataname]);
                    selectstylelist.push([newsel,styleobj]);
                }         
                m = surfre.exec(dataname);
                if(m) {
                    var selname = "select"+m[1];
                    var newsel = $3Dmol.specStringToObject(d[selname]);
                    var styleobj = $3Dmol.specStringToObject(d[dataname]);
                    surfaces.push([newsel,styleobj]);
                }
                m = reslabre.exec(dataname);
                if(m) {
                    var selname = "select"+m[1];
                    var newsel = $3Dmol.specStringToObject(d[selname]);
                    var styleobj = $3Dmol.specStringToObject(d[dataname]);
                    labels.push([newsel,styleobj]);
                }
            }
            
            //apply all the selections/styles parsed out above to the passed viewer
            var applyStyles = function(glviewer) {
                glviewer.setStyle(select,style);
                for(var i = 0; i < selectstylelist.length; i++) {
                    var sel = selectstylelist[i][0] || {};
                    var sty = selectstylelist[i][1] || {"line":{}}
                    glviewer.setStyle(sel, sty);
                }
                for(var i = 0; i < surfaces.length; i++) {
                    var sel = surfaces[i][0] || {};
                    var sty = surfaces[i][1] || {}
                    glviewer.addSurface($3Dmol.SurfaceType.VDW, sty, sel, sel);
                }
                for(var i = 0; i < labels.length; i++) {
                    var sel = labels[i][0] || {};
                    var sty = labels[i][1] || {}
                    glviewer.addResLabels(sel, sty);
                }               
                
                glviewer.zoomTo();
                glviewer.render();             
            }
            
            
            var glviewer = viewer;
            try {
                if(glviewer==null)
                    glviewer = $3Dmol.viewers[this.id || nviewers++] = $3Dmol.createViewer(viewerdiv, {defaultcolors: $3Dmol.rasmolElementColors});
                glviewer.setBackgroundColor(bgcolor);                            
            } catch ( error ) {
                console.log(error);
                //for autoload, provide a useful error message
                window.location = "http://get.webgl.org";                    
            }           
            
            if (datauri.length!=0) {
                for(var i=0;i<datauri.length;i++){
                    val=i;
                    uri=datauri[i];
                    type = viewerdiv.data("type") || viewerdiv.data("datatype") || type;
                    if(!type) {
                        type = uri.substr(uri.lastIndexOf('.')+1);
                    }
                                
                    $.get(uri, function(ret) {
                        glviewer.addModel(ret, type, options);
                        applyStyles(glviewer);       
                        if (callback) {
                            if(val==datauri.length-1){

                                callback(glviewer);
                            }
                        }
                    }, 'text');        
                }
            }           
            else {
                
                if (viewerdiv.data("element")) {
                    var moldata = $("#" + viewerdiv.data("element")).val() || "";
                    var type = viewerdiv.data("type") || viewerdiv.data("datatype");

                    if (!type){

                        console.log("Warning: No type specified for embedded viewer with moldata from " + viewerdiv.data("element") +
                                    "\n assuming type 'pdb'")

                        type = 'pdb';
                    }

                    glviewer.addModel(moldata, type, options);        
                }

                applyStyles(glviewer);              
                if (callback) 
                    callback(glviewer);
            }
            
        });              
    }}
$(document).ready(function() {
    $3Dmol.autoload();
    
});
    
 
//this is only used for create the enum documentation in JSDoc
(function() {
/**
 * Color representation. 
 * @typedef ColorSpec
 * @prop {string} 0xAF10AB - any hex number
 * @prop {string} white   - 0xFFFFFF
 * @prop {string} silver  - 0xC0C0C0
 * @prop {string} gray    - 0x808080
 * @prop {string} grey    - 0x808080
 * @prop {string} black   - 0x000000
 * @prop {string} red     - 0xFF0000
 * @prop {string} maroon  - 0x800000
 * @prop {string} yellow  - 0xFFFF00
 * @prop {string} orange  - 0xFF6600
 * @prop {string} olive   - 0x808000
 * @prop {string} lime    - 0x00FF00
 * @prop {string} green   - 0x008000
 * @prop {string} aqua    - 0x00FFFF
 * @prop {string} cyan    - 0x00FFFF
 * @prop {string} teal    - 0x008080
 * @prop {string} blue    - 0x0000FF
 * @prop {string} navy    - 0x000080
 * @prop {string} fuchsia - 0xFF00FF
 * @prop {string} magenta - 0xFF00FF
 * @prop {string} purple  - 0x800080
 */
//duplicate ---------------------------------------------------------------------------------------------------------------------------------
$3Dmol.elementColors.greenCarbon['C'] = 0x00ff00;


$3Dmol.elementColors.cyanCarbon['C'] = 0x00ffff;


$3Dmol.elementColors.magentaCarbon['C'] = 0xff00ff;


$3Dmol.elementColors.yellowCarbon['C'] = 0xffff00;


$3Dmol.elementColors.whiteCarbon['C'] = 0xffffff;


$3Dmol.elementColors.orangeCarbon['C'] = 0xff6600;


$3Dmol.elementColors.purpleCarbon['C'] = 0x800080;

$3Dmol.elementColors.blueCarbon['C'] = 0x0000ff;

 /**
 
 * @typedef ColorschemeSpec
 * Built in colorschemes
 *
 * @example 
 
              $.get('../test_structs/benzene-homo.cube', function(data){
                  var voldata = new $3Dmol.VolumeData(data, "cube");
                  viewer.addIsosurface(voldata, {isoval: 0.01,
                                                 color: "blue",
                                                 alpha: 0.5,
                                                 smoothness: 10});
                  viewer.addIsosurface(voldata, {isoval: -0.01,
                                                 color: "red",
                                                 smoothness: 5,
                                                 opacity:0.5,
                                                 wireframe:true,
                                                 linewidth:0.1,
                                                 clickable:true,
                                                 callback:
                                                 function() {
                                                     this.opacity = 0.0;
                                                 }});
                  viewer.setStyle({}, {stick:{}});
                  viewer.zoomTo();
                  
                                                  viewer.render();
                 
                });

 * @example //Using a gradient with colorscheme.
     viewer.setViewStyle({style:"outline"});
             

              viewer.setViewStyle({style:"outline"});
              $.get('volData/1fas.pqr', function(data){
                  viewer.addModel(data, "pqr");
                  $.get("volData/1fas.cube",function(volumedata){
                      viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.85,voldata: new $3Dmol.VolumeData(volumedata, "cube"), volscheme: new $3Dmol.Gradient.RWB(-10,10)},{});
                      
                  viewer.render(callback);
                  });
                  viewer.zoomTo();
              });
 * @example //Using a function in order to define the colors. 
  $3Dmol.download("pdb:4UAA",viewer,{},function(){
                  viewer.setBackgroundColor(0xffffffff);
                  var colorAsSnake = function(atom) {
                    return atom.resi % 2 ? 'white': 'green'
                  };

                  viewer.setStyle( {}, { cartoon: {colorfunc: colorAsSnake }});

                  viewer.render();
              });
 * @prop {string} greenCarbon   - 0x00FF00
 * @prop {string} cyanCarbon    - 0x00FFFF
 * @prop {string} magentaCarbon - 0xFF00FF
 * @prop {string} yellowCarbon  - 0xFFFF00
 * @prop {string} whiteCarbon   - 0xFFFFFF
 * @prop {string} orangeCarbon  - 0xFF6600
 * @prop {string} purpleCarbon  - 0x100080
 * @prop {string} blueCarbon    - 0x0000FF
 * @prop {string} ssPyMOL - PyMol secondary colorscheme
 * @prop {string} ssJmol - Jmol secondary colorscheme
 * @prop {string} Jmol - Jmol primary colorscheme
 * @prop {string} default - default colorscheme
 * @prop {string} amino - amino acid colorscheme
 * @prop {string} shapely - shapely protien colorscheme
 * @prop {string} nucleic - nucleic acid colorscheme
 * @prop {string} chain - standard chain colorscheme
 * @prop {string} chainHetatm - chain Hetatm colorscheme
 * @prop {string} prop - atomSpec property. Example 'b'. See AtomSpec.
 * @prop {Gradient} gradient - Allows the user to provide a gradient to the colorsheme. See example #3.
 * @prop {object} map - map of a certain AtomSpec propery to a color.: {}} elementMap - Allows the user to provide a mapping of elements to colors to the colorscheme. This is shown in example #2 and it should be noted that this can be done with any properties, and not just 'elem'.
 * @prop {function} colorfunc - Allows the user to provide a function for setting the colorshemes.See example #4.
 */
 
});

// in an attempt to reduce memory overhead, cache all $3Dmol.Colors
// this makes things a little faster
$3Dmol.CC = {
    cache : {0:new $3Dmol.Color(0)},
    color : function color_(hex) {
        // Undefined values default to black
        if(!hex)
            return this.cache[0];
        // cache hits
        if(typeof(this.cache[hex]) !== "undefined") {
            return this.cache[hex];
        }
        // arrays
        else if(hex && hex.constructor === Array) {
            // parse elements recursively
            return hex.map(color_,this);
        }
        // numbers and hex strings
        hex = this.getHex(hex);
        if(typeof hex === 'number') {
            var c = new $3Dmol.Color(hex);
            this.cache[hex] = c;
            return c;
        } else {
            // pass through $3Dmol.Color & other objects
            return hex;
        }
    },
 
    colorTab : {
        'white' : 0xFFFFFF,
        'silver' : 0xC0C0C0,
        'gray' : 0x808080,
        'grey' : 0x808080,
        'black' : 0x000000,
        'red' : 0xFF0000,
        'maroon' : 0x800000,
        'yellow' : 0xFFFF00,
        'orange' : 0xFF6600,
        'olive' : 0x808000,
        'lime' : 0x00FF00,
        'green' : 0x008000,
        'aqua' : 0x00FFFF,
        'cyan' : 0x00FFFF,
        'teal' : 0x008080,
        'blue' : 0x0000FF,
        'navy' : 0x000080,
        'fuchsia' : 0xFF00FF,
        'magenta' : 0xFF00FF,
        'purple' : 0x800080
    },    
    getHex : function(hex) {
        if (!isNaN(parseInt(hex)))
            return parseInt(hex);        
        else if (typeof(hex) === 'string') {
            hex = hex.trim();
            
            if(hex.length == 4 && hex[0] == '#') {
                hex = '#' + hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3]; //expand to full hex number
            }
            
            if(hex.length == 7 && hex[0] == '#') {
                return parseInt(hex.substring(1),16);
            } 
            else {
                return this.colorTab[hex.toLowerCase()] || 0x000000;
            }
        }
        return hex;
    }
    
};


$3Dmol['CC'] = $3Dmol.CC;
$3Dmol['CC']['color'] = $3Dmol.CC.color;




/** Preset secondary structure color scheme 
 * @struct
 */
$3Dmol.ssColors = $3Dmol.ssColors || {};
//names are in helix-sheet-coil order
$3Dmol.ssColors.pyMol = {'h': 0xff0000, 's':  0xffff00, 'c': 0x00ff00};
$3Dmol.ssColors.Jmol = {'h': 0xff0080, 's': 0xffc800, 'c': 0xffffff};


/** Preset element coloring - from individual element colors to entire mappings (e.g. '$3Dmol.elementColors.Jmol' colors atoms with Jmol stylings)
 * @struct
 */
$3Dmol.elementColors = $3Dmol.elementColors || {};

$3Dmol.elementColors.defaultColor = 0xff1493;

/** @property Jmol-like element colors*/
$3Dmol.elementColors.Jmol = {
        'H': 0xFFFFFF,
        'He': 0xD9FFFF,
        'HE': 0xD9FFFF,
        'Li': 0xCC80FF,
        'LI': 0xCC80FF,
        'B': 0xFFB5B5,
        'C': 0x909090,
        'N': 0x3050F8,
        'O': 0xFF0D0D,
        'F': 0x90E050,
        'Na': 0xAB5CF2,
        'NA': 0xAB5CF2,
        'Mg': 0x8AFF00,
        'MG': 0x8AFF00,
        'Al': 0xBFA6A6,
        'AL': 0xBFA6A6,
        'Si': 0xF0C8A0,
        'SI': 0xF0C8A0,
        'P': 0xFF8000,
        'S': 0xFFFF30,
        'Cl': 0x1FF01F,
        'CL': 0x1FF01F,
        'Ca': 0x3DFF00, 
        'CA': 0x3DFF00,
        'Ti': 0xBFC2C7,
        'TI': 0xBFC2C7,
        'Cr': 0x8A99C7,
        'CR': 0x8A99C7,
        'Mn': 0x9C7AC7,
        'MN': 0x9C7AC7,
        'Fe': 0xE06633,
        'FE': 0xE06633,
        'Ni': 0x50D050,
        'NI': 0x50D050,
        'Cu': 0xC88033,
        'CU': 0xC88033,
        'Zn': 0x7D80B0,
        'ZN': 0x7D80B0,
        'Br': 0xA62929,
        'BR': 0xA62929,
        'Ag': 0xC0C0C0,
        'AG': 0xC0C0C0,
        'I': 0x940094,
        'Ba': 0x00C900,
        'BA': 0x00C900,
        'Au': 0xFFD123,
        'AU': 0xFFD123
};

/** @property rasmol-like element colors */
$3Dmol.elementColors.rasmol = {
        'H': 0xFFFFFF,
        'He': 0xFFC0CB,
        'HE': 0xFFC0CB,
        'Li': 0xB22222,
        'LI': 0xB22222,
        'B': 0x00FF00,
        'C': 0xC8C8C8,
        'N': 0x8F8FFF,
        'O': 0xF00000,
        'F': 0xDAA520,
        'Na': 0x0000FF,
        'NA': 0x0000FF,
        'Mg': 0x228B22,
        'MG': 0x228B22,
        'Al': 0x808090,
        'AL': 0x808090,
        'Si': 0xDAA520,
        'SI': 0xDAA520,
        'P': 0xFFA500,
        'S': 0xFFC832,
        'Cl': 0x00FF00,
        'CL': 0x00FF00,
        'Ca': 0x808090,
        'CA': 0x808090,
        'Ti': 0x808090,
        'TI': 0x808090,
        'Cr': 0x808090,
        'CR': 0x808090,
        'Mn': 0x808090,
        'MN': 0x808090,
        'Fe': 0xFFA500,
        'FE': 0xFFA500,
        'Ni': 0xA52A2A,
        'NI': 0xA52A2A,
        'Cu': 0xA52A2A,
        'CU': 0xA52A2A,
        'Zn': 0xA52A2A,
        'ZN': 0xA52A2A,
        'Br': 0xA52A2A,
        'BR': 0xA52A2A,
        'Ag': 0x808090,
        'AG': 0x808090,
        'I': 0xA020F0,
        'Ba': 0xFFA500,
        'BA': 0xFFA500,
        'Au': 0xDAA520,
        'AU': 0xDAA520    
};

$3Dmol.elementColors.defaultColors = $3Dmol.elementColors.rasmol;

$3Dmol.elementColors.greenCarbon = $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.greenCarbon['C'] = 0x00ff00;

$3Dmol.elementColors.cyanCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.cyanCarbon['C'] = 0x00ffff;

$3Dmol.elementColors.magentaCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.magentaCarbon['C'] = 0xff00ff;

$3Dmol.elementColors.yellowCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.yellowCarbon['C'] = 0xffff00;

$3Dmol.elementColors.whiteCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.whiteCarbon['C'] = 0xffffff;

$3Dmol.elementColors.orangeCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.orangeCarbon['C'] = 0xff6600;

$3Dmol.elementColors.purpleCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.purpleCarbon['C'] = 0x800080;

$3Dmol.elementColors.blueCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.blueCarbon['C'] = 0x0000ff;

$3Dmol.residues = {};

/** @property standard amino acid color scheme*/
$3Dmol.residues.amino ={
'Ala' : 0xC8C8C8,        
'Arg' : 0x145AFF,              
'Asn' : 0x00DCDC,              
'Asp' : 0xE60A0A,             
'Cys' : 0xE6E600,             
'Gln' : 0x00DCDC,            
'Glu' : 0xE60A0A,              
'Gly' : 0xEBEBEB,        
'His' :  0x8282D2,       
'Ile' :0x0F820F,             
'Leu':0x0F820F,              
'Lys' :0x145AFF,              
'Met' :0xE6E600,             
'Phe':0x3232AA,            
'Pro' :  0xDC9682,    
'Ser': 0xFA9600,           
'Thr': 0xFA9600,          
'Trp' :   0xB45AB4,    
'Tyr' :0x3232AA,            
'Val' :0x0F820F,            
'Asx'  :0xFF69B4,     
'Glx'  :0xFF69B4,       
'other' :0xBEA06E,

};

/** @property shapely amino acid color scheme*/
$3Dmol.residues.shapely ={
'Ala' : 0x8CFF8C,         
'Arg' : 0x00007C,              
'Asn' : 0xFF7C70,              
'Asp' : 0xA00042,             
'Cys' : 0xFFFF70,             
'Gln' : 0xFF4C4C,            
'Glu' : 0x660000,              
'Gly' : 0xFFFFFF,        
'His' :  0x7070FF,       
'Ile' :0x004C00,             
'Leu':0x455E45,              
'Lys' :0x4747B8,              
'Met' :0xB8A042,             
'Phe':0x534C52,            
'Pro' :  0x525252,    
'Ser': 0xFF7042,           
'Thr': 0xB84C00,          
'Trp' :   0x4F4600,    
'Tyr' :0x8C704C,            
'Val' :0xFF8CFF,            
'Asx'  :0xFF00FF,     
'Glx'  :0xFF00FF,       
'other' :0xFF00FF,

};

/** @property nucleic acid color scheme*/
$3Dmol.residues.nucleic = {
    'A':0xA0A0FF,    
    'G':  0xFF7070,    
    'I':  0x80FFFF,    
    'C':  0xFF8C4B,    
    'T':  0xA0FFA0,    
    'U':   0xFF8080
};
$3Dmol.chains ={};

/** @property chain based standard color scheme */
$3Dmol.chains.atom = {

'A' : 0xC0D0FF,        
'B' : 0xB0FFB0,              
'C' : 0xFFC0C8 ,              
'D' : 0xFFFF80,             
'E' : 0xFFC0FF,             
'F' : 0xB0F0F0,            
'G' : 0xFFD070,              
'H' : 0xF08080,        
'I' :  0xF5DEB3,       
'J' :0x00BFFF,             
'K':0xCD5C5C ,              
'L' :0x66CDAA,              
'M' :0x9ACD32,             
'N':0xEE82EE ,            
'O' :  0x00CED1,    
'P': 0x00FF7F,           
'Q': 0x3CB371 ,          
'R' :   0x00008B,    
'S' :0xBDB76B,            
'T' :0x006400,            
'U'  :0x800000,     
'V'  :0x808000,       
'W' :0x800080,
'X' :0x008080 ,
 'Y':0xB8860B,
 'Z':0xB22222,
};

/** @property hetatm color scheme */
$3Dmol.chains.hetatm = {

'A' : 0x90A0CF,        
'B' : 0x80CF98,              
'C' : 0xCF90B0 ,              
'D' : 0xCFCF70,             
'E' : 0xCF90CF,             
'F' : 0x80C0C0,            
'G' : 0xCFA060,              
'H' : 0xC05070,        
'I' : 0xC5AE83,       
'J' :0x00A7CF,             
'K':0xB54C4C ,              
'L' :0x56B592,              
'M' :0x8AB52A,             
'N':0xBE72BE ,            
'O' :  0x00B6A1,    
'P': 0x00CF6F,           
'Q': 0x349B61 ,          
'R' :   0x0000BB  ,    
'S' :0xA59F5B,            
'T' :0x009400,            
'U'  :0xB00000,     
'V'  :0xB0B000,       
'W' :0xB000B0,
'X' :0x00B0B0 ,
 'Y':0xE8B613,
 'Z':0xC23232,
};

/** @property built in color schemes 
* The user can pass all of these values directly as the colorscheme and they will use the respective colorscheme */
$3Dmol.builtinColorSchemes = {
        'ssPyMol' : {'prop':'ss', map:$3Dmol.ssColors.pyMol},
        'ssJmol' :{'prop':'ss', map:$3Dmol.ssColors.Jmol},
        'Jmol' :{'prop':'elem', map:$3Dmol.elementColors.Jmol},
        'default' : {'prop': 'elem', map:$3Dmol.elementColors.defaultColors},
        'greenCarbon' : {'prop':'elem', map:$3Dmol.elementColors.greenCarbon},
        'cyanCarbon' : {'prop':'elem', map:$3Dmol.elementColors.cyanCarbon},
        'magentaCarbon' : {'prop':'elem', map:$3Dmol.elementColors.magentaCarbon},
        'yellowCarbon' : {'prop':'elem', map:$3Dmol.elementColors.yellowCarbon},
        'whiteCarbon' : {'prop':'elem', map:$3Dmol.elementColors.whiteCarbon},
        'orangeCarbon' : {'prop':'elem', map:$3Dmol.elementColors.orangeCarbon},
        'purpleCarbon' : {'prop':'elem', map:$3Dmol.elementColors.purpleCarbon},
        'blueCarbon' : {'prop':'elem', map:$3Dmol.elementColors.blueCarbon},
        'amino' : {'prop':'resAmino', map:$3Dmol.residues.amino},
        'shapely' :{'prop':'resShapely', map:$3Dmol.residues.shapely},
        'nucleic' :{'prop':'resNucleic', map:$3Dmol.residues.nucleic},
        'chain' :{'prop':'chain', map:$3Dmol.chains.atom},
        'chainHetatm' :{'prop':'chain', map:$3Dmol.chains.hetatm},
        
};

/** Return proper color for atom given style
 * @param {AtomSpec} atom
 * @param {AtomStyle} style
 * @return {$3Dmol.Color}
 */
 
$3Dmol.getColorFromStyle = function(atom, style) {
    var scheme = style.colorscheme;  
    if(typeof($3Dmol.builtinColorSchemes[scheme]) != "undefined") {
        scheme = $3Dmol.builtinColorSchemes[scheme];
    }
    var color = atom.color;
    if (typeof (style.color) != "undefined" && style.color != "spectrum")
        color = style.color;
    if(typeof(scheme) != "undefined") {
        if(typeof($3Dmol.builtinColorSchemes[scheme]) != "undefined") {
            //name of builtin colorscheme
            if(typeof(scheme[atom[scheme.prop]]) != "undefined") {
                color = scheme.map[atom[scheme.prop]];
            }
        } 
        else if(typeof($3Dmol.elementColors[scheme]) != "undefined") {
            //name of builtin colorscheme
            var scheme = $3Dmol.elementColors[scheme];
            if(typeof(scheme[atom[scheme.prop]]) != "undefined") {
                color = scheme.map[atom[scheme.prop]];
            }
        } else if(typeof(scheme[atom[scheme.prop]]) != 'undefined') {
            //actual color scheme provided
            color = scheme.map[atom[scheme.prop]];
        } else if(typeof(scheme.prop) != 'undefined' &&
                typeof(scheme.gradient) != 'undefined') {         
            //apply a property mapping
            var prop = scheme.prop;
            var grad = scheme.gradient; //redefining scheme
            if(typeof($3Dmol.Gradient.builtinGradients[grad]) != "undefined") {
                grad = new $3Dmol.Gradient.builtinGradients[grad](scheme.min, scheme.max, scheme.mid);
            }
            
            var range = grad.range() || [-1,1]; //sensible default
            var val = $3Dmol.getAtomProperty(atom, prop);
            if(val != null) {
                color = grad.valueToHex(val, range);
            }
        } else if(typeof(scheme.prop) != 'undefined' &&
                typeof(scheme.map) != 'undefined') {         
            //apply a discrete property mapping
            var prop = scheme.prop;
            var val = $3Dmol.getAtomProperty(atom, prop);
            if( typeof scheme.map[val] != 'undefined' ) {
                color = scheme.map[val];
            }
        } else if(typeof(style.colorscheme[atom.elem]) != 'undefined') {
            //actual color scheme provided
            color = style.colorscheme[atom.elem];
        } else {
            console.log("Could not interpret colorscheme "+scheme);
        } 
    } 
    else if(typeof(style.colorfunc) != "undefined") {
        //this is a user provided function for turning an atom into a color
        color = style.colorfunc(atom);
    }
    
    var C = $3Dmol.CC.color(color);
    return C;
};
//glcartoon.js
//This contains all the routines for rendering a cartoon given a set
//of atoms with assigned secondary structure

//TODO: generate normals directly in drawStrip and drawThinStrip

var $3Dmol = $3Dmol || {};

/**
 * @typedef CartoonStyleSpec
 * @prop {ColorSpec} color - strand color, may specify as 'spectrum'
 * @prop {string} style - style of cartoon rendering (trace, oval, rectangle
 *       (default), parabola, edged)
 * @prop {boolean} ribbon - whether to use constant strand width, disregarding
 *       secondary structure; use thickness to adjust radius
 * @prop {boolean} arrows - whether to add arrows showing beta-sheet
 *       directionality; does not apply to trace or ribbon
 * @prop {boolean} tubes - whether to display alpha helices as simple cylinders;
 *       does not apply to trace
 * @prop {number} thickness - cartoon strand thickness, default is 0.4
 * @prop {number} width - cartoon strand width, default is secondary
 *       structure-dependent; does not apply to trace or ribbon
 * @prop {number} opacity - set opacity from 0-1; transparency is set per-chain
 *       with a warning outputted in the event of ambiguity
 * @prop {} In nucleic acids, the base cylinders obtain their color from the
 *       atom to which the cylinder is drawn, which is 'N1' for purines (resn:
 *       'A', 'G', 'DA', 'DG') and 'N3' for pyrimidines (resn: 'C', 'U', 'DC',
 *       'DT'). The different nucleobases can therefore be distinguished as
 *       follows:
 * @example $3Dmol.download("pdb:4ZD3",viewer,{},function(){
                  viewer.setBackgroundColor(0xffffffff);
                  viewer.setViewStyle({style:"outline"});
                  viewer.setStyle({},{cartoon:{}});
                  viewer.render();
              });
 */

/**
 * @ignore
 * @param {$3Dmol.Object3D}
 *            group
 * @param {AtomSpec}
 *            atomlist

 */
$3Dmol.drawCartoon = (function() {

    var defaultNum = 5; // for cross-sectional shape
    var defaultDiv = 5; // for length-wise splicing

    var coilWidth = 0.5;
    var helixSheetWidth = 1.3;
    var nucleicAcidWidth = 0.8;
    var arrowTipWidth = 0.1;
    var defaultThickness = 0.4;

    // helper functions
    // Catmull-Rom subdivision
    var subdivide = function(_points, DIV) { // points as Vector3
        var ret = [];
        var points = _points;
        points = []; // Smoothing test
        points.push(_points[0]);

        var i, lim, size;
        var p0, p1, p2, p3, v0, v1;

        for (i = 1, lim = _points.length - 1; i < lim; i++) {
            p1 = _points[i];
            p2 = _points[i + 1];
            if (p1.smoothen) {
                var np = new $3Dmol.Vector3((p1.x + p2.x) / 2,
                        (p1.y + p2.y) / 2, (p1.z + p2.z) / 2);
                np.atom = p1.atom;
                points.push(np);
            }
            else
                points.push(p1);
        }
        points.push(_points[_points.length - 1]);

        for (i = -1, size = points.length; i <= size - 3; i++) {
            p0 = points[(i === -1) ? 0 : i];
            p1 = points[i + 1];
            p2 = points[i + 2];
            p3 = points[(i === size - 3) ? size - 1 : i + 3];
            v0 = new $3Dmol.Vector3().subVectors(p2, p0).multiplyScalar(0.5);
            v1 = new $3Dmol.Vector3().subVectors(p3, p1).multiplyScalar(0.5);
            if (p2.skip)
                continue;

            for (var j = 0; j < DIV; j++) {
                var t = 1.0 / DIV * j;
                var x = p1.x + t * v0.x + t * t
                        * (-3 * p1.x + 3 * p2.x - 2 * v0.x - v1.x) + t * t * t
                        * (2 * p1.x - 2 * p2.x + v0.x + v1.x);
                var y = p1.y + t * v0.y + t * t
                        * (-3 * p1.y + 3 * p2.y - 2 * v0.y - v1.y) + t * t * t
                        * (2 * p1.y - 2 * p2.y + v0.y + v1.y);
                var z = p1.z + t * v0.z + t * t
                        * (-3 * p1.z + 3 * p2.z - 2 * v0.z - v1.z) + t * t * t
                        * (2 * p1.z - 2 * p2.z + v0.z + v1.z);

                var pt = new $3Dmol.Vector3(x, y, z);
                if(j < DIV/2) {
                    pt.atom = p1.atom;
                } else {
                    pt.atom = p2.atom;
                }
                
                ret.push(pt);
            }
        }
        ret.push(points[points.length - 1]);
        return ret;
    };

    var drawThinStrip = function(geo, p1, p2, colors, div, opacity) {

        var offset, vertoffset;
        var color, colori;

        for (var i = 0, lim = p1.length; i < lim; i++) {

            colori = Math.round(i * (colors.length - 1) / lim);
            color = $3Dmol.CC.color(colors[colori]);

            geoGroup = geo.updateGeoGroup(2);
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            var faceArray = geoGroup.faceArray;
            offset = geoGroup.vertices;
            vertoffset = offset * 3;

            vertexArray[vertoffset] = p1[i].x;
            vertexArray[vertoffset + 1] = p1[i].y;
            vertexArray[vertoffset + 2] = p1[i].z;

            vertexArray[vertoffset + 3] = p2[i].x;
            vertexArray[vertoffset + 4] = p2[i].y;
            vertexArray[vertoffset + 5] = p2[i].z;

            for (var j = 0; j < 6; ++j) {
                colorArray[vertoffset + 3 * j] = color.r;
                colorArray[vertoffset + 1 + 3 * j] = color.g;
                colorArray[vertoffset + 2 + 3 * j] = color.b;
            }

            if (i > 0) {
                var faces = [ offset, offset + 1, offset - 1, offset - 2 ];
                var faceoffset = geoGroup.faceidx;

                faceArray[faceoffset] = faces[0];
                faceArray[faceoffset + 1] = faces[1];
                faceArray[faceoffset + 2] = faces[3];
                faceArray[faceoffset + 3] = faces[1];
                faceArray[faceoffset + 4] = faces[2];
                faceArray[faceoffset + 5] = faces[3];

                geoGroup.faceidx += 6;
            }

            geoGroup.vertices += 2;
        }

    };

    var drawShapeStrip = function(geo, points, colors, div, thickness, opacity,
            shape) {

        // points is a 2D array, dimensionality given by [num = cross-sectional
        // resolution][len = length of strip]
        var i, j, num, len;
        num = points.length;
        if (num < 2 || points[0].length < 2)
            return;

        div = div || axisDIV;
        for (i = 0; i < num; i++) { // spline to generate greater length-wise
                                    // resolution
            points[i] = subdivide(points[i], div)
        }
        len = points[0].length;

        if (!thickness) // if thickness is 0, we can use a smaller geometry than
                        // this function generates
            return drawThinStrip(geo, points[0], points[num - 1], colors, div,
                    opacity);

        var axis, cs_shape, cs_bottom, cs_top, last_cs_bottom, last_cs_top;

        // cache the available cross-sectional shapes
        var cs_ellipse = [], cs_rectangle = [], cs_parabola = [];
        for (j = 0; j < num; j++) {
            cs_ellipse.push(0.25 + 1.5
                    * Math.sqrt((num - 1) * j - Math.pow(j, 2)) / (num - 1));
            cs_rectangle.push(0.5);
            cs_parabola.push(2 * (Math.pow(j / num, 2) - j / num) + 0.6);
        }

        /*
         * face_refs array is used to generate faces from vertexArray
         * iteratively. As we move through each cross-sectional segment of
         * points, we draw lateral faces backwards to the previous
         * cross-sectional segment.
         * 
         * To correctly identify the points needed to make each face we use this
         * array as a lookup table for the relative indices of each needed point
         * in the vertices array.
         * 
         * 4 points are used to create 2 faces.
         */

        var face_refs = [];
        for (j = 0; j < num * 2 - 1; j++) {
            /*
             * [curr vertex in curr cross-section, next vertex in curr
             * cross-section, next vertex in prev cross-section, curr vertex in
             * prev cross-section]
             */
            face_refs[j] = [ j, j + 1, j + 1 - 2 * num, j - 2 * num ];
        }
        // last face is different. easier to conceptualize this by drawing a
        // diagram
        face_refs[num * 2 - 1] = [ j, j + 1 - 2 * num, j + 1 - 4 * num,
                j - 2 * num ];

        var v_offset, va_offset, f_offset;
        var currentAtom, lastAtom
        var color, colori;
        var geoGroup = geo.updateGeoGroup(2 * num * len); // ensure vertex
                                                            // capacity

        for (i = 0; i < len; i++) {

            colori = Math.round(i * (colors.length - 1) / len);
            color = $3Dmol.CC.color(colors[colori]);

            last_cs_bottom = cs_bottom;
            last_cs_top = cs_top;
            cs_bottom = [];
            cs_top = [];
            axis = [];

            if (points[0][i].atom !== undefined) // TODO better edge case
                                                    // handling
            {
                currentAtom = points[0][i].atom;
                if (shape === "oval")
                    cs_shape = cs_ellipse;
                else if (shape === "rectangle")
                    cs_shape = cs_rectangle;
                else if (shape === "parabola")
                    cs_shape = cs_parabola;
            }
            if (!cs_shape)
                cs_shape = cs_rectangle;

            // calculate thickness at each width point, from cross-sectional
            // shape
            var toNext, toSide;
            for (j = 0; j < num; j++) {
                if (i < len - 1)
                    toNext = points[j][i + 1].clone().sub(points[j][i]);
                else
                    toNext = points[j][i - 1].clone().sub(points[j][i])
                            .negate();

                if (j < num - 1)
                    toSide = points[j + 1][i].clone().sub(points[j][i]);
                else
                    toSide = points[j - 1][i].clone().sub(points[j][i])
                            .negate();

                axis[j] = toSide.cross(toNext).normalize().multiplyScalar(
                        thickness * cs_shape[j]);
            }

            // generate vertices by applying cross-sectional shape thickness to
            // input points
            for (j = 0; j < num; j++)
                cs_bottom[j] = points[j][i].clone().add(
                        axis[j].clone().negate());
            for (j = 0; j < num; j++)
                cs_top[j] = points[j][i].clone().add(axis[j]);

            /*
             * Until this point the vertices have been dealt with as
             * $3Dmol.Vector3() objects, but we need to serialize them into the
             * geoGroup.vertexArray, where every three indices represents the
             * next vertex. The colorArray is analogous.
             * 
             * In the following for-loops, j iterates through VERTICES so we
             * need to index them in vertexArray by 3*j + either 0, 1, or 2 for
             * xyz or rgb component.
             */

            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            var faceArray = geoGroup.faceArray;
            v_offset = geoGroup.vertices;
            va_offset = v_offset * 3; // in case geoGroup already contains
                                        // vertices

            // bottom edge of cross-section, vertices [0, num)
            for (j = 0; j < num; j++) {
                vertexArray[va_offset + 3 * j + 0] = cs_bottom[j].x;
                vertexArray[va_offset + 3 * j + 1] = cs_bottom[j].y;
                vertexArray[va_offset + 3 * j + 2] = cs_bottom[j].z;
            }

            // top edge of cross-section, vertices [num, 2*num)
            // add these backwards, so that each cross-section's vertices are
            // added sequentially to vertexArray
            for (j = 0; j < num; j++) {
                vertexArray[va_offset + 3 * j + 0 + 3 * num] = cs_top[num - 1
                        - j].x;
                vertexArray[va_offset + 3 * j + 1 + 3 * num] = cs_top[num - 1
                        - j].y;
                vertexArray[va_offset + 3 * j + 2 + 3 * num] = cs_top[num - 1
                        - j].z;
            }

            for (j = 0; j < 2 * num; ++j) {
                colorArray[va_offset + 3 * j + 0] = color.r;
                colorArray[va_offset + 3 * j + 1] = color.g;
                colorArray[va_offset + 3 * j + 2] = color.b;
            }

            if (i > 0) {

                for (j = 0; j < num * 2; j++) {

                    // get VERTEX indices of the 4 points of a rectangular face
                    // (as opposed to literal vertexArray indices)
                    var face = [ v_offset + face_refs[j][0],
                            v_offset + face_refs[j][1],
                            v_offset + face_refs[j][2],
                            v_offset + face_refs[j][3] ];

                    f_offset = geoGroup.faceidx;

                    // need 2 triangles to draw a face between 4 points
                    faceArray[f_offset] = face[0];
                    faceArray[f_offset + 1] = face[1];
                    faceArray[f_offset + 2] = face[3];

                    faceArray[f_offset + 3] = face[1];
                    faceArray[f_offset + 4] = face[2];
                    faceArray[f_offset + 5] = face[3];

                    geoGroup.faceidx += 6;

                    // TODO implement clickable the right way. midpoints of
                    // strand between consecutive atoms
                }

                if (currentAtom.clickable) {
                    var faces = [];

                    faces.push(new $3Dmol.Triangle(last_cs_bottom[0],
                            cs_bottom[0], cs_bottom[num - 1]));
                    faces.push(new $3Dmol.Triangle(last_cs_bottom[0],
                            cs_bottom[num - 1], last_cs_bottom[num - 1]));

                    faces.push(new $3Dmol.Triangle(last_cs_bottom[num - 1],
                            cs_bottom[num - 1], cs_top[num - 1]));
                    faces.push(new $3Dmol.Triangle(last_cs_bottom[num - 1],
                            cs_top[num - 1], last_cs_top[num - 1]));

                    faces.push(new $3Dmol.Triangle(cs_top[0], last_cs_top[0],
                            last_cs_top[num - 1]));
                    faces.push(new $3Dmol.Triangle(cs_top[num - 1], cs_top[0],
                            last_cs_top[num - 1]));

                    faces.push(new $3Dmol.Triangle(cs_bottom[0],
                            last_cs_bottom[0], last_cs_top[0]));
                    faces.push(new $3Dmol.Triangle(cs_top[0], cs_bottom[0],
                            last_cs_top[0]));

                    for (j in faces) {
                        currentAtom.intersectionShape.triangle.push(faces[j]);
                    }
                }
            }

            geoGroup.vertices += 2 * num;
            lastAtom = currentAtom;
        }

        // for terminal faces
        var vertexArray = geoGroup.vertexArray;
        var colorArray = geoGroup.colorArray;
        var faceArray = geoGroup.faceArray;
        v_offset = geoGroup.vertices;
        va_offset = v_offset * 3;
        f_offset = geoGroup.faceidx;

        for (i = 0; i < num - 1; i++) // "rear" face
        {
            var face = [ i, i + 1, 2 * num - 2 - i, 2 * num - 1 - i ];

            f_offset = geoGroup.faceidx;

            faceArray[f_offset] = face[0];
            faceArray[f_offset + 1] = face[1];
            faceArray[f_offset + 2] = face[3];

            faceArray[f_offset + 3] = face[1];
            faceArray[f_offset + 4] = face[2];
            faceArray[f_offset + 5] = face[3];

            geoGroup.faceidx += 6;
        }

        for (i = 0; i < num - 1; i++) // "front" face
        {
            var face = [ v_offset - 1 - i, v_offset - 2 - i,
                    v_offset - 2 * num + i + 1, v_offset - 2 * num + i ];

            f_offset = geoGroup.faceidx;

            faceArray[f_offset] = face[0];
            faceArray[f_offset + 1] = face[1];
            faceArray[f_offset + 2] = face[3];

            faceArray[f_offset + 3] = face[1];
            faceArray[f_offset + 4] = face[2];
            faceArray[f_offset + 5] = face[3];

            geoGroup.faceidx += 6;
        }

    };

    var drawPlainStrip = function(geo, points, colors, div, thickness, opacity) {
        if ((points.length) < 2)
            return;

        var p1, p2;
        p1 = points[0];
        p2 = points[points.length - 1];

        div = div || axisDIV;
        p1 = subdivide(p1, div);
        p2 = subdivide(p2, div);
        if (!thickness)
            return drawThinStrip(geo, p1, p2, colors, div, opacity);

        // var vs = geo.vertices, fs = geo.faces;
        var vs = [], fs = [];
        var axis, p1v, p2v, a1v, a2v;

        var faces = [ [ 0, 2, -6, -8 ], [ -4, -2, 6, 4 ], [ 7, -1, -5, 3 ],
                [ -3, 5, 1, -7 ] ];

        var offset, vertoffset, faceoffset;
        var color, colori;
        var currentAtom, lastAtom;
        var i, lim, j;
        var face1, face2, face3;
        var geoGroup;

        for (i = 0, lim = p1.length; i < lim; i++) {

            colori = Math.round(i * (colors.length - 1) / lim);
            color = $3Dmol.CC.color(colors[colori]);

            vs.push(p1v = p1[i]); // 0
            vs.push(p1v); // 1
            vs.push(p2v = p2[i]); // 2
            vs.push(p2v); // 3
            if (i < lim - 1) {
                var toNext = p1[i + 1].clone().sub(p1[i]);
                var toSide = p2[i].clone().sub(p1[i]);
                axis = toSide.cross(toNext).normalize().multiplyScalar(
                        thickness);
            }
            vs.push(a1v = p1[i].clone().add(axis)); // 4
            vs.push(a1v); // 5
            vs.push(a2v = p2[i].clone().add(axis)); // 6
            vs.push(a2v); // 7

            if (p1v.atom !== undefined)
                currentAtom = p1v.atom;

            geoGroup = geo.updateGeoGroup(8);
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            var faceArray = geoGroup.faceArray;
            offset = geoGroup.vertices;
            vertoffset = offset * 3;

            vertexArray[vertoffset] = p1v.x;
            vertexArray[vertoffset + 1] = p1v.y;
            vertexArray[vertoffset + 2] = p1v.z;
            vertexArray[vertoffset + 3] = p1v.x;
            vertexArray[vertoffset + 4] = p1v.y;
            vertexArray[vertoffset + 5] = p1v.z;
            vertexArray[vertoffset + 6] = p2v.x;
            vertexArray[vertoffset + 7] = p2v.y;
            vertexArray[vertoffset + 8] = p2v.z;
            vertexArray[vertoffset + 9] = p2v.x;
            vertexArray[vertoffset + 10] = p2v.y;
            vertexArray[vertoffset + 11] = p2v.z;
            vertexArray[vertoffset + 12] = a1v.x;
            vertexArray[vertoffset + 13] = a1v.y;
            vertexArray[vertoffset + 14] = a1v.z;
            vertexArray[vertoffset + 15] = a1v.x;
            vertexArray[vertoffset + 16] = a1v.y;
            vertexArray[vertoffset + 17] = a1v.z;
            vertexArray[vertoffset + 18] = a2v.x;
            vertexArray[vertoffset + 19] = a2v.y;
            vertexArray[vertoffset + 20] = a2v.z;
            vertexArray[vertoffset + 21] = a2v.x;
            vertexArray[vertoffset + 22] = a2v.y;
            vertexArray[vertoffset + 23] = a2v.z;

            for (j = 0; j < 8; ++j) {
                colorArray[vertoffset + 3 * j] = color.r;
                colorArray[vertoffset + 1 + 3 * j] = color.g;
                colorArray[vertoffset + 2 + 3 * j] = color.b;
            }

            if (i > 0) {

                // both points have distinct atoms
                var diffAtoms = ((lastAtom !== undefined && currentAtom !== undefined) && lastAtom.serial !== currentAtom.serial);

                for (j = 0; j < 4; j++) {

                    var face = [ offset + faces[j][0], offset + faces[j][1],
                            offset + faces[j][2], offset + faces[j][3] ];

                    faceoffset = geoGroup.faceidx;

                    faceArray[faceoffset] = face[0];
                    faceArray[faceoffset + 1] = face[1];
                    faceArray[faceoffset + 2] = face[3];
                    faceArray[faceoffset + 3] = face[1];
                    faceArray[faceoffset + 4] = face[2];
                    faceArray[faceoffset + 5] = face[3];

                    geoGroup.faceidx += 6;

                    if (currentAtom.clickable || lastAtom.clickable) {

                        var p1a = vs[face[3]].clone(), p1b = vs[face[0]]
                                .clone(), p2a = vs[face[2]].clone(), p2b = vs[face[1]]
                                .clone();

                        p1a.atom = vs[face[3]].atom || null; // should be
                                                                // same
                        p2a.atom = vs[face[2]].atom || null;

                        p1b.atom = vs[face[0]].atom || null; // should be
                                                                // same
                        p2b.atom = vs[face[1]].atom || null;

                        if (diffAtoms) {
                            var m1 = p1a.clone().add(p1b).multiplyScalar(0.5);
                            var m2 = p2a.clone().add(p2b).multiplyScalar(0.5);
                            var m = p1a.clone().add(p2b).multiplyScalar(0.5);

                            if (j % 2 === 0) {
                                if (lastAtom.clickable) {
                                    face1 = new $3Dmol.Triangle(m1, m, p1a);
                                    face2 = new $3Dmol.Triangle(m2, p2a, m);
                                    face3 = new $3Dmol.Triangle(m, p2a, p1a);
                                    lastAtom.intersectionShape.triangle
                                            .push(face1);
                                    lastAtom.intersectionShape.triangle
                                            .push(face2);
                                    lastAtom.intersectionShape.triangle
                                            .push(face3);
                                }

                                if (currentAtom.clickable) {
                                    face1 = new $3Dmol.Triangle(p1b, p2b, m);
                                    face2 = new $3Dmol.Triangle(p2b, m2, m);
                                    face3 = new $3Dmol.Triangle(p1b, m, m1);
                                    currentAtom.intersectionShape.triangle
                                            .push(face1);
                                    currentAtom.intersectionShape.triangle
                                            .push(face2);
                                    currentAtom.intersectionShape.triangle
                                            .push(face3);
                                }
                            } else {
                                if (currentAtom.clickable) {
                                    face1 = new $3Dmol.Triangle(m1, m, p1a);
                                    face2 = new $3Dmol.Triangle(m2, p2a, m);
                                    face3 = new $3Dmol.Triangle(m, p2a, p1a);
                                    currentAtom.intersectionShape.triangle
                                            .push(face1);
                                    currentAtom.intersectionShape.triangle
                                            .push(face2);
                                    currentAtom.intersectionShape.triangle
                                            .push(face3);
                                }

                                if (lastAtom.clickable) {
                                    face1 = new $3Dmol.Triangle(p1b, p2b, m);
                                    face2 = new $3Dmol.Triangle(p2b, m2, m);
                                    face3 = new $3Dmol.Triangle(p1b, m, m1);
                                    lastAtom.intersectionShape.triangle
                                            .push(face1);
                                    lastAtom.intersectionShape.triangle
                                            .push(face2);
                                    lastAtom.intersectionShape.triangle
                                            .push(face3);
                                }
                            }

                        }

                        // face for single atom
                        else if (currentAtom.clickable) {
                            face1 = new $3Dmol.Triangle(p1b, p2b, p1a);
                            face2 = new $3Dmol.Triangle(p2b, p2a, p1a);
                            currentAtom.intersectionShape.triangle.push(face1);
                            currentAtom.intersectionShape.triangle.push(face2);
                        }

                    }

                }
            }

            geoGroup.vertices += 8;
            lastAtom = currentAtom;
        }

        var vsize = vs.length - 8; // Cap

        geoGroup = geo.updateGeoGroup(8);
        var vertexArray = geoGroup.vertexArray;
        var colorArray = geoGroup.colorArray;
        var faceArray = geoGroup.faceArray;
        offset = geoGroup.vertices;
        vertoffset = offset * 3;
        faceoffset = geoGroup.faceidx;

        for (i = 0; i < 4; i++) {
            vs.push(vs[i * 2]);
            vs.push(vs[vsize + i * 2]);

            var v1 = vs[i * 2], v2 = vs[vsize + i * 2];

            vertexArray[vertoffset + 6 * i] = v1.x;
            vertexArray[vertoffset + 1 + 6 * i] = v1.y;
            vertexArray[vertoffset + 2 + 6 * i] = v1.z;
            vertexArray[vertoffset + 3 + 6 * i] = v2.x;
            vertexArray[vertoffset + 4 + 6 * i] = v2.y;
            vertexArray[vertoffset + 5 + 6 * i] = v2.z;

            colorArray[vertoffset + 6 * i] = color.r;
            colorArray[vertoffset + 1 + 6 * i] = color.g;
            colorArray[vertoffset + 2 + 6 * i] = color.b;
            colorArray[vertoffset + 3 + 6 * i] = color.r;
            colorArray[vertoffset + 4 + 6 * i] = color.g;
            colorArray[vertoffset + 5 + 6 * i] = color.b;

        }

        vsize += 8;

        face1 = [ offset, offset + 2, offset + 6, offset + 4 ];
        face2 = [ offset + 1, offset + 5, offset + 7, offset + 3 ];

        faceArray[faceoffset] = face1[0];
        faceArray[faceoffset + 1] = face1[1];
        faceArray[faceoffset + 2] = face1[3];
        faceArray[faceoffset + 3] = face1[1];
        faceArray[faceoffset + 4] = face1[2];
        faceArray[faceoffset + 5] = face1[3];
        faceArray[faceoffset + 6] = face2[0];
        faceArray[faceoffset + 7] = face2[1];
        faceArray[faceoffset + 8] = face2[3];
        faceArray[faceoffset + 9] = face2[1];
        faceArray[faceoffset + 10] = face2[2];
        faceArray[faceoffset + 11] = face2[3];

        geoGroup.faceidx += 12;
        geoGroup.vertices += 8;

        // TODO: Add intersection planes for caps

        // HalfEdgeRec used to store adjacency info of mesh
        var HalfEdge = function(vertIdx) {
            this.vert = vertIdx; // Vertex index at the end of this half-edge
            this.twin = null; // Oppositely oriented adjacent half-edge
            this.next = null; // Next half-edge around the face
        };

        var computeAdjacency = function(faces, faceCount, vertCount) {
            // all pieces of the half-edge data structure
            edges = [];

            // a hash table to hold the adjaceney info
            // - Keys are pairs of vertex indices
            // - Values are pointers to half-edge
            var edgeTable = {};
            var len = 0;

            // Plow through faces and fill all half-edge info except twin
            // pointers:
            for (var i = 0; i < faceCount; i += 3) {
                var A = faces[i];
                var B = faces[i + 1];
                var C = faces[i + 2];
                // console.log("A="+A+ " B="+ B+ " C="+C);

                // create the half-edge that goes from C to A
                var CA = new HalfEdge(A);
                edges.push(CA);
                // create the half-edge that goes from A to B
                var AB = new HalfEdge(B);
                edges.push(AB);
                // create the half-edge that goes from B to C
                var BC = new HalfEdge(C);
                edges.push(BC);

                CA.next = AB;
                AB.next = BC;
                BC.next = CA;

                edgeTable[C | (A << 16)] = CA;
                edgeTable[A | (B << 16)] = AB;
                edgeTable[B | (C << 16)] = BC;
            }

            // verify that the mesh is clean
            for ( var key in edgeTable) {
                if (edgeTable.hasOwnProperty(key)) {
                    len++;
                }
            }
            if (len != faceCount * 3) {
                console
                        .warn("Bad mesh: duplicated edges or inconsistent winding.len="
                                + len
                                + " faceCount="
                                + faceCount
                                + " vertCount=" + vertCount);
            }

            // Populate the twin pointers by iterating over the hash table
            var boundaryCount = 0;
            for ( var key in edgeTable) {
                if (edgeTable.hasOwnProperty(key)) {
                    var twinKey = ((key & 0xffff) << 16) | (key >> 16);
                    if (edgeTable.hasOwnProperty(twinKey)) {
                        edgeTable[key].twin = edgeTable[twinKey];
                        edgeTable[twinKey].twin = edgeTable[key];
                    } else {
                        boundaryCount += 1;
                    }
                }
            }

            var ret = new Uint16Array(faceCount * 6);
            // Now that we have a half-edge structure, it's easy to create
            // adjacency info for WebGL
            if (boundaryCount > 0) {
                console.log("Mesh is not watertight. Contains " + boundaryCount
                        + " edges");

                for (var i = 0; i < faceCount; i += 3) {
                    ret[i * 2 + 0] = edges[i + 2].vert;
                    ret[i * 2 + 1] = edges[i + 0].twin == null ? ret[i * 2 + 0]
                            : edges[i + 0].twin.next.vert;
                    ret[i * 2 + 2] = edges[i + 0].vert;
                    ret[i * 2 + 3] = edges[i + 1].twin == null ? ret[i * 2 + 1]
                            : edges[i + 1].twin.next.vert;
                    ret[i * 2 + 4] = edges[i + 1].vert;
                    ret[i * 2 + 5] = edges[i + 2].twin == null ? ret[i * 2 + 2]
                            : edges[i + 2].twin.next.vert;
                }
            } else {
                for (var i = 0; i < faceCount; i += 3) {
                    ret[i * 2 + 0] = edges[i + 2].vert;
                    ret[i * 2 + 1] = edges[i + 0].twin.next.vert;
                    ret[i * 2 + 2] = edges[i + 0].vert;
                    ret[i * 2 + 3] = edges[i + 1].twin.next.vert;
                    ret[i * 2 + 4] = edges[i + 1].vert;
                    ret[i * 2 + 5] = edges[i + 2].twin.next.vert;
                }
            }

            return ret;
        };

        // geoGroup.adjFaceArray =
        // computeAdjacency(faceArray,faceArray.length,offset);

    };

    // TODO: Need to update this (will we ever use this?)
    var drawSmoothCurve = function(group, _points, width, colors, div) {
        if (_points.length === 0)
            return;

        div = (div === undefined) ? 5 : div;

        var geo = new $3Dmol.Geometry();
        var points = subdivide(_points, div);
        /*
         * for ( var i = 0; i < points.length; i++) {
         * geo.vertices.push(points[i]); geo.colors.push($3Dmol.color(colors[(i ==
         * 0) ? 0 : Math.round((i - 1) / div)])); }
         */
        var lineMaterial = new $3Dmol.LineBasicMaterial({
            linewidth : width
        });
        lineMaterial.vertexColors = true;
        var line = new $3Dmol.Line(geo, lineMaterial);
        line.type = $3Dmol.LineStrip;
        group.add(line);
    };

    var drawStrip = function(geo, points, colors, div, thickness, opacity,
            shape) {
        if (!shape || shape === "default")
            shape = "rectangle";
        if (shape === 'edged')
            drawPlainStrip(geo, points, colors, div, thickness, opacity);
        else if (shape === "rectangle" || shape === "oval"
                || shape === "parabola")
            drawShapeStrip(geo, points, colors, div, thickness, opacity, shape);
    }

    // check if given atom is an alpha carbon
    var isAlphaCarbon = function(atom) {
        return atom && atom.elem === "C" && atom.atom === "CA"; // note that
                                                                // calcium is
                                                                // also CA
    }

    // check whether two atoms are members of the same residue or subsequent,
    // connected residues (a before b)
    var inConnectedResidues = function(a, b) {
        if (a && b && a.chain === b.chain) {
            if ((a.reschain === b.reschain)
                    && (a.resi === b.resi || a.resi === b.resi - 1))
                return true;
            if (a.resi < b.resi) {
                // some PDBs have gaps in the numbering but the residues are
                // still connected
                // assume if within 4A they are connected
                var dx = a.x - b.x;
                var dy = a.y - b.y;
                var dz = a.z - b.z;
                var dist = dx * dx + dy * dy + dz * dz;
                if (dist < 16.0)
                    return true; // calpha dist
            }
        }

        return false;

    }

    // add geo to the group
    var setGeo = function(group, geo, opacity, outline, setNormals) {

        if(geo == null || geo.vertices == 0) return;
        if (setNormals) {
            geo.initTypedArrays();
            geo.setUpNormals();
        }

        var cartoonMaterial = new $3Dmol.MeshDoubleLambertMaterial();
        cartoonMaterial.vertexColors = $3Dmol.FaceColors;
        if (typeof (opacity) === "number" && opacity >= 0 && opacity < 1) {
            cartoonMaterial.transparent = true;
            cartoonMaterial.opacity = opacity;
        }
        cartoonMaterial.outline = outline;
        var cartoonMesh = new $3Dmol.Mesh(geo, cartoonMaterial);
        group.add(cartoonMesh);
    };

    
    // proteins na backbone na terminus nucleobases
    var cartoonAtoms = { "C":true, "CA":true, "O":true, "P":true, "OP2": true, 
            "O2P": true, "O5'": true, "O3'": true, "C5'":true,
            "C2'": true, "O5*": true, "O3*": true, "C5*": true, 
            "C2*":true, "N1":true, "N3":true };
    var purResns = { "DA":true, "DG":true, "A":true, "G":true};
    var pyrResns = { "DT": true, "DC":true, "U":true, "C":true, "T":true };
    var naResns = { "DA":true, "DG":true, "A":true, "G":true, "DT": true, "DC":true, "U":true, "C":true, "T":true };
    
    var drawCartoon = function(group, atomList, gradientrange, fill,
            doNotSmoothen, num, div) {
        num = num || defaultNum;
        div = div || defaultDiv;

        var cartoon, prev, curr, next, currColor, nextColor, thickness, i, nextResAtom, arrow;
        var backbonePt, orientPt, prevOrientPt, terminalPt, termOrientPt, baseStartPt, baseEndPt;
        var tubeStart, tubeEnd, drawingTube;
        var shapeGeo = new $3Dmol.Geometry(true); // for shapes that don't need normals computed
        var geo = new $3Dmol.Geometry(true);
        var colors = [];
        var points = [];
        var opacity = 1;
        var outline = false;
        
        var gradients = {};
        for(var g in $3Dmol.Gradient.builtinGradients) {
            if($3Dmol.Gradient.builtinGradients.hasOwnProperty(g)) {
                gradients[g] = new $3Dmol.Gradient.builtinGradients[g](gradientrange[0],gradientrange[1]);
            }
        }
        
        var cartoonColor = function(next, cartoon) { //atom and cartoon style object
            if (gradientrange && cartoon.color === 'spectrum') {
                if(cartoon.colorscheme in gradients) {
                    return gradients[cartoon.colorscheme].valueToHex(next.resi);
                } else {
                    return gradients['sinebow'].valueToHex(next.resi);
                }
            }
            else {
                return $3Dmol.getColorFromStyle(next, cartoon).getHex();
            }
        }

        for (var i = 0; i < num; i++)
            points[i] = [];

        // first determine where beta sheet arrows and alpha helix tubes belong
        var inSheet = false;
        var inHelix = false;
        i = 0;
        var atoms = [];
        for (i in atomList) {
            next = atomList[i];
            if (next.elem === 'C' && next.atom === 'CA') {
                var connected = inConnectedResidues(curr, next);

                // last two residues in a beta sheet become arrowhead
                if (connected && next.ss === "s") {
                    inSheet = true;
                } else if (inSheet) {
                    if (curr && prev && curr.style.cartoon.arrows
                            && prev.style.cartoon.arrows) {
                        curr.ss = "arrow end";
                        prev.ss = "arrow start";
                    }
                    inSheet = false;
                }

                // first and last residues in a helix are used to draw tube
                if (connected && curr.ss === "h") {
                    if (!inHelix && next.style.cartoon.tubes)
                        next.ss = "tube start";
                    inHelix = true;
                } else if (inHelix && curr.ss !== "tube start") {
                    if (prev && prev.style.cartoon.tubes)
                        prev.ss = "tube end";
                    inHelix = false;
                }
                prev = curr;
                curr = next;
            }
            if(next && next.atom in cartoonAtoms) {
                atoms.push(next);
            }
        }

        var flushGeom = function(connect) {
            //write out points, update geom,etc
            for (var i = 0; !thickness && i < num; i++)
                drawSmoothCurve(group, points[i], 1, colors, div, opacity);
            if (fill && points[0].length > 0) {
                drawStrip(geo, points, colors, div, thickness, opacity,
                        points.style);
            }
            
            if(connect) {
                //recycle last point to first point of next points array
                var saved = [];
                for(i = 0; i < num; i++) {
                    saved[i] = points[i][points[i].length-1];
                }
                var savedc = colors[colors.length-1];
            }
            points = [];
            for (i = 0; i < num; i++)
                points[i] = [];
            colors = [];
            
            if(connect) {
                for(i = 0; i < num; i++) {
                    points[i].push(saved[i]);
                }
                colors.push(savedc);
            }
            
            setGeo(group, geo, opacity, outline, true);
            setGeo(group, shapeGeo, opacity, outline, false);
            geo = new $3Dmol.Geometry(true);
            shapeGeo = new $3Dmol.Geometry(true);
        };
        
        // then accumulate points
        curr = undefined;
        for (var a = 0; a < atoms.length; a++) {
            next = atoms[a];

            var nextresn = next.resn.trim();
            var inNucleicAcid = nextresn in naResns;
            opacity = 1;
            // determine cartoon style
            cartoon = next.style.cartoon;
            if(curr && curr.style.cartoon)
                opacity = curr.style.cartoon.opacity;
            if(curr && curr.style.cartoon && curr.style.cartoon.outline)
                outline = curr.style.cartoon.outline;
            
            // create a new geometry when opacity changes
            //the should work fine if opacity is set by chain, but will
            //break if it changes within the chain
            if (curr && curr.style.cartoon && (!next.style.cartoon ||
                    curr.style.cartoon.opacity != next.style.cartoon.opacity)) {
                flushGeom(curr.chain == next.chain);
            }
            
            if(points.length && points[0].length > (30000/num/div/2)) {
                flushGeom(true);
            }
            
            if (cartoon.style === "trace") // draw cylinders connecting
                                            // consecutive 'backbone' atoms
            {
                /*
                 * "trace" style just draws cylinders between consecutive
                 * 'backbone' atoms, such as alpha carbon for polypeptides and
                 * phosphorus for DNA.
                 */
                if (next.hetflag) 
                    ; //ignore non-protein atoms
                else if (next.elem === 'C' && next.atom === 'CA' || inNucleicAcid
                        && next.atom === "P") {
                    // determine cylinder color
                    nextColor = cartoonColor(next, cartoon);                    

                    // determine cylinder thickness
                    if ($.isNumeric(cartoon.thickness))
                        thickness = cartoon.thickness;
                    else
                        thickness = defaultThickness;

                    if (inConnectedResidues(curr, next)) {
                        // if both atoms are same color, draw single cylinder
                        if (nextColor == currColor) {
                            var color = $3Dmol.CC.color(nextColor);
                            $3Dmol.GLDraw.drawCylinder(shapeGeo, curr, next,
                                    thickness, color, 2, 2);
                        }

                        else // otherwise draw cylinders for each color
                                // (split down the middle)
                        {
                            var midpoint = new $3Dmol.Vector3().addVectors(
                                    curr, next).multiplyScalar(0.5);
                            var color1 = $3Dmol.CC.color(currColor);
                            var color2 = $3Dmol.CC.color(nextColor);
                            $3Dmol.GLDraw.drawCylinder(shapeGeo, curr,
                                    midpoint, thickness, color1, 2, 0);
                            $3Dmol.GLDraw.drawCylinder(shapeGeo, midpoint,
                                    next, thickness, color2, 0, 2);
                        } // note that an atom object can be duck-typed as a
                            // $3Dmol.Vector3 in this case
                    }

                    curr = next;
                    currColor = nextColor;
                }
            } else // draw default-style cartoons based on secondary structure
            {
                // draw backbone through these atoms
                if (isAlphaCarbon(next) || inNucleicAcid
                        && (next.atom === "P" || next.atom.indexOf('O5') == 0)) {
                    if (drawingTube) {
                        if (next.ss === "tube end") {
                            drawingTube = false;
                            tubeEnd = new $3Dmol.Vector3(next.x, next.y, next.z);
                            $3Dmol.GLDraw.drawCylinder(shapeGeo, tubeStart,
                                    tubeEnd, 2, $3Dmol.CC.color(currColor), 1,
                                    1);
                            next.ss = "h";

                        } else
                            continue; // don't accumulate strand points while
                                        // in the middle of drawing a tube
                    }

                    // end of a chain of connected residues (of same style)
                    if (curr && (!inConnectedResidues(curr, next)
                                    || curr.ss === "tube start")) {
                        if (curr.ss === "tube start") {
                            drawingTube = true;
                            tubeStart = new $3Dmol.Vector3(curr.x, curr.y,
                                    curr.z);
                            curr.ss = "h";
                        }

                        if (baseEndPt) // draw the last base if it's a NA chain
                        {
                            if (terminalPt)
                                baseStartPt = new $3Dmol.Vector3().addVectors(
                                        curr, terminalPt).multiplyScalar(0.5);
                            else
                                baseStartPt = new $3Dmol.Vector3(curr.x,
                                        curr.y, curr.z);

                            $3Dmol.GLDraw.drawCylinder(shapeGeo, baseStartPt,
                                    baseEndPt, 0.4, $3Dmol.CC
                                            .color(baseEndPt.color), 0, 2);
                            addBackbonePoints(points, num,
                                    !doNotSmoothen, terminalPt, termOrientPt,
                                    prevOrientPt, curr, atoms, a);
                            colors.push(nextColor);

                            baseStartPt = null;
                            baseEndPt = null;
                        }

                        // draw accumulated strand points
                        for (i = 0; !thickness && i < num; i++)
                            drawSmoothCurve(group, points[i], 1, colors, div,
                                    opacity);
                        if (fill && points[0].length > 0)
                            drawStrip(geo, points, colors, div, thickness,
                                    opacity, points.style);

                        // clear arrays for points and colors
                        points = [];
                        for (i = 0; i < num; i++)
                            points[i] = [];
                        colors = [];
                    }

                    // reached next residue (potentially the first residue)
                    if (curr === undefined || curr.rescode != next.rescode
                            || curr.resi != next.resi) {
                        if (baseEndPt) // draw last NA residue's base
                        {
                            // start the cylinder at the midpoint between
                            // consecutive backbone atoms
                            baseStartPt = new $3Dmol.Vector3().addVectors(curr,
                                    next).multiplyScalar(0.5);
                            var startFix = baseStartPt.clone().sub(baseEndPt)
                                    .multiplyScalar(0.02); // TODO: apply this
                                                            // as function of
                                                            // thickness
                            baseStartPt.add(startFix);

                            $3Dmol.GLDraw.drawCylinder(shapeGeo, baseStartPt,
                                    baseEndPt, 0.4, $3Dmol.CC
                                            .color(baseEndPt.color), 0, 2);
                            baseStartPt = null;
                            baseEndPt = null;
                        }

                        // determine color and thickness of the next strand
                        // segment
                        nextColor = cartoonColor(next, cartoon); 
                        colors.push(nextColor);
                        if ($.isNumeric(cartoon.thickness))
                            thickness = cartoon.thickness;
                        else
                            thickness = defaultThickness;

                        curr = next; // advance backbone
                        backbonePt = new $3Dmol.Vector3(curr.x, curr.y, curr.z);
                        backbonePt.resi = curr.resi;
                        currColor = nextColor;
                    }

                    // click handling
                    if (next.clickable === true
                            && (next.intersectionShape === undefined || next.intersectionShape.triangle === undefined))
                        next.intersectionShape = {
                            sphere : null,
                            cylinder : [],
                            line : [],
                            triangle : []
                        };
                }
                // atoms used to orient the backbone strand
                else if (isAlphaCarbon(curr) && next.atom === "O"
                        || inNucleicAcid && curr.atom === "P"
                        && (next.atom === "OP2" || next.atom === "O2P")
                        || inNucleicAcid && curr.atom.indexOf("O5") == 0
                        && next.atom.indexOf("C5") == 0) {
                    orientPt = new $3Dmol.Vector3(next.x, next.y, next.z);
                    orientPt.resi = next.resi;
                    if (next.atom === "OP2" || next.atom === "O2P") // for NA 3'
                                                                    // terminus
                        termOrientPt = new $3Dmol.Vector3(next.x, next.y,
                                next.z);
                }

                // NA 3' terminus is an edge case, need a vector for most recent
                // O3'
                else if (inNucleicAcid && next.atom.indexOf("O3") == 0) {
                    terminalPt = new $3Dmol.Vector3(next.x, next.y, next.z);
                }

                // atoms used for drawing the NA base cylinders (diff for
                // purines and pyramidines)
                else if ((next.atom === "N1" && (nextresn in purResns))
                        || (next.atom === "N3" && (nextresn in pyrResns))) {
                    baseEndPt = new $3Dmol.Vector3(next.x, next.y, next.z);
                    baseEndPt.color = $3Dmol.getColorFromStyle(next, cartoon)
                            .getHex();
                }

                // when we have a backbone point and orientation point in the
                // same residue, accumulate strand points
                if (orientPt && backbonePt && orientPt.resi === backbonePt.resi) {
                    addBackbonePoints(points, num, !doNotSmoothen,
                            backbonePt, orientPt, prevOrientPt, curr, atoms,
                            a);
                    prevOrientPt = orientPt;
                    backbonePt = null;
                    orientPt = null;
                    colors.push(nextColor);
                }
            }
            
        }

        if (baseEndPt) // draw last NA base if needed
        {
            if (terminalPt)
                baseStartPt = new $3Dmol.Vector3().addVectors(curr, terminalPt)
                        .multiplyScalar(0.5);
            else
                baseStartPt = new $3Dmol.Vector3(curr.x, curr.y, curr.z);

            $3Dmol.GLDraw.drawCylinder(shapeGeo, baseStartPt, baseEndPt, 0.4,
                    $3Dmol.CC.color(baseEndPt.color), 0, 2);
            addBackbonePoints(points, num, !doNotSmoothen, terminalPt,
                    termOrientPt, prevOrientPt, curr, atoms, a);
            colors.push(nextColor);
        }

        // for default style, draw the last strand
        flushGeom();    
    };

    var addBackbonePoints = function(points, num, smoothen, backbonePt,
            orientPt, prevOrientPt, backboneAtom, atoms, atomi) {
        var widthScalar, i, delta, v, addArrowPoints, testOpacity, testStyle;


        if (!backbonePt || !orientPt || !backboneAtom)
            return;

        // the side vector points along the axis from backbone atom to
        // orientation atom (eg. CA to O, in peptides)
        var sideVec = orientPt.sub(backbonePt);
        sideVec.normalize();

        //find next atom like this one
        var forwardVec = atoms[atomi];
        for(var i = atomi+1; i < atoms.length; i++) {
            forwardVec = atoms[i];
            if(forwardVec.atom == backboneAtom.atom)
                break;
        }
        // the forward vector points along the axis from backbone atom to next
        // backbone atom
        forwardVec = forwardVec ? new $3Dmol.Vector3(forwardVec.x,
                forwardVec.y, forwardVec.z) : new $3Dmol.Vector3(0, 0, 0);
        forwardVec.sub(backbonePt);

        // adjustments for proper beta arrow appearance
        if (backboneAtom.ss === "arrow start") {
            var adjustment = forwardVec.clone().multiplyScalar(0.3).cross(
                    orientPt); // adjust perpendicularly to strand face
            backbonePt.add(adjustment);

            var upVec = forwardVec.clone().cross(sideVec).normalize();
            sideVec.rotateAboutVector(upVec, 0.43);
        }

        // determine from cartoon style or secondary structure how wide the
        // strand should be here
        // ribbon shape should have same width as thickness
        if (backboneAtom.style.cartoon.ribbon) {
            widthScalar = backboneAtom.style.cartoon.thickness
                    || defaultThickness;

        } else // depending on secondary structure, multiply the orientation
                // vector by some scalar
        {
            if (!backboneAtom.style.cartoon.width) {
                if (backboneAtom.ss === "c") {
                    if (backboneAtom.atom === "P")
                        widthScalar = nucleicAcidWidth;
                    else
                        widthScalar = coilWidth;
                } else if (backboneAtom.ss === "arrow start") {
                    widthScalar = helixSheetWidth;
                    addArrowPoints = true;

                } else if (backboneAtom.ss === "arrow end")
                    widthScalar = coilWidth;

                else if (backboneAtom.ss === "h"
                        && backboneAtom.style.cartoon.tubes
                        || backboneAtom.ss === "tube start")
                    widthScalar = coilWidth;

                else
                    widthScalar = helixSheetWidth;
            } else
                widthScalar = backboneAtom.style.cartoon.width;
        }

        // make sure the strand orientation doesn't twist more than 90 degrees
        if (prevOrientPt != null && sideVec.dot(prevOrientPt) < 0)
            sideVec.negate();

        sideVec.multiplyScalar(widthScalar);
        for (i = 0; i < num; i++) {
            // produces NUM incremental points from backbone atom minus
            // orientation vector
            // to backbone atom plus orientation vector
            delta = -1 + i * 2 / (num - 1); // -1 to 1 incrementing by num
            v = new $3Dmol.Vector3(backbonePt.x + delta * sideVec.x,
                    backbonePt.y + delta * sideVec.y, backbonePt.z + delta
                            * sideVec.z);
            v.atom = backboneAtom;
            if (smoothen && backboneAtom.ss === "s")
                v.smoothen = true;
            points[i].push(v); // a num-length array of arrays, where each
                                // inner array contains length-wise points
            // along the backbone offset by some constant pertaining to its cell
            // in the outer array
        }

        if (addArrowPoints) {

            sideVec.multiplyScalar(2);
            for (i = 0; i < num; i++) {
                delta = -1 + i * 2 / (num - 1); // -1 to 1 incrementing by num
                v = new $3Dmol.Vector3(backbonePt.x + delta * sideVec.x,
                        backbonePt.y + delta * sideVec.y, backbonePt.z + delta
                                * sideVec.z);
                v.atom = backboneAtom;
                v.smoothen = false;
                v.skip = true;
                points[i].push(v);
            }
        }

        // make sure the strand is all the same style
        testStyle = backboneAtom.style.cartoon.style || 'default';
        if (points.style) {
            if (points.style != testStyle) {
                console
                        .log("Warning: a cartoon chain's strand-style is ambiguous");
                points.style = 'default';
            }

        } else
            points.style = testStyle;

        // revert ss keywords used for arrow rendering back to original value
        if (backboneAtom.ss === "arrow start"
                || backboneAtom.ss === "arrow end")
            backboneAtom.ss = "s";

        return addArrowPoints;
    };

    var defaultDrawCartoon = function(group, atomList, gradientrange, quality) {
        quality = parseInt(parseFloat(quality) * 5) || 5;
        drawCartoon(group, atomList, gradientrange, true,
                false, quality, quality);
    }

    return defaultDrawCartoon;
})();
//

var $3Dmol = $3Dmol || {};

/**
 * Lower level utilities for creating WebGL shape geometries.
 * These are not intended for general consumption.
 * @namespace $3Dmol.GLDraw
  */
$3Dmol.GLDraw = (function() {

    var draw = {}; // object for exporting functions

    // Rotation matrix around z and x axis -
    // according to y basis vector
    // TODO: Try to optimize this (square roots?)
    var getRotationMatrix = function() {

        var d = new $3Dmol.Vector3();
        // var rot = new (9);

        return function(dir) {

            d.set(dir[0], dir[1], dir[2]);

            var dx = d.x, dy = d.y, dz = d.z;

            var dxy = Math.sqrt(dx * dx + dy * dy);
            var dxz, dyz;

            var sinA, cosA, sinB, cosB, sinC, cosC;

            // about z axis - Phi
            if (dxy < 0.0001) {
                sinA = 0;
                cosA = 1;
            }

            else {
                sinA = -dx / dxy;
                cosA = dy / dxy;
            }

            // recast dy in terms of new axes - z is the same

            dy = -sinA * dx + cosA * dy;
            dyz = Math.sqrt(dy * dy + dz * dz);

            // about new x axis - Theta

            if (dyz < 0.0001) {
                sinB = 0;
                cosB = 1;
            }

            else {
                sinB = dz / dyz;
                cosB = dy / dyz;
            }

            var rot = new Float32Array(9);
            rot[0] = cosA;
            rot[1] = sinA;
            rot[2] = 0;
            rot[3] = -sinA * cosB;
            rot[4] = cosA * cosB;
            rot[5] = sinB;
            rot[6] = sinA * sinB;
            rot[7] = -cosA * sinB;
            rot[8] = cosB;

            return rot;

        };

    }();
    
    // Ortho normal vectors for cylinder radius/ sphere cap equator and cones
    // Direction is j basis (0,1,0)
    var basisVectors = function() {

        var ret = {
            vertices : [],
            norms : []
        };

        var nvecs = [];

        var subdivisions = 4; // including the initial 2, eg. 4 => 16 subintervals
        var N = Math.pow(2, subdivisions);  // eg. 2**4 = 16 subintervals in total
        var i = 2;  // start with 2 subdivisions already done
        var M = Math.pow(2, i); // 4
        var spacing = N/M;  // 16/4 = 4; if there were 5 subdivs, then 32/4 = 8.
        var j;

        nvecs[0] = new $3Dmol.Vector3(-1, 0, 0);
        nvecs[spacing] = new $3Dmol.Vector3(0, 0, 1);
        nvecs[spacing*2] = new $3Dmol.Vector3(1, 0, 0);
        nvecs[spacing*3] = new $3Dmol.Vector3(0, 0, -1);

        for ( i = 3; i <= subdivisions; i ++ ) {
            // eg. i=3, we need to add 2**(3-1) = 4 new vecs. Call it M.
            // their spacing is N/M, eg. N=16, M=4, N/M=4; M=8, N/M=2.
            // they start off at half this spacing
            // and are equal to the average of the two vectors on either side
            M = Math.pow(2, (i-1));
            spacing = N/M;
            for ( j = 0; j < (M-1); j ++ ) {
                nvecs[spacing/2 + j*spacing] = nvecs[j*spacing].clone().add(nvecs[(j+1)*spacing]).normalize();
            }
            // treat the last one specially so it wraps around to zero
            j = M - 1;
            nvecs[spacing/2 + j*spacing] = nvecs[j*spacing].clone().add(nvecs[0]).normalize();
        }

        /*
         * nvecs[0] = new $3Dmol.Vector3(-1,0,0); nvecs[1] = new
         * $3Dmol.Vector3(0,0,1); nvecs[2] = new $3Dmol.Vector3(1,0,0);
         * nvecs[3] = new $3Dmol.Vector3(0,0,-1);
         */
        return nvecs;

    }();

    // memoize capped cylinder for given radius
    var cylVertexCache = {

        // memoize both rounded and flat caps (hemisphere and circle)
        cache :{} ,

        getVerticesForRadius : function(radius, cap, capType) {
            if(typeof(this.chache) !== undefined && this.cache[radius] !== undefined)
                if(this.cache[radius][cap+capType] !== undefined)                                                      
                    return this.cache[radius][cap+capType];

            var dir = new $3Dmol.Vector3(0, 1, 0);
            var w = basisVectors.length;
            var nvecs = [], norms = [];
            var n;


            for (var i = 0; i < w; i++) {
                // bottom
                nvecs.push(basisVectors[i].clone().multiplyScalar(radius));
                // top
                nvecs.push(basisVectors[i].clone().multiplyScalar(radius));

                // NOTE: this normal is used for constructing sphere caps -
                // cylinder normals taken care of in drawCylinder
                n = basisVectors[i].clone().normalize();
                norms.push(n);
                norms.push(n);
            }

            // norms[0]

            var verticesRows = [];

            // Require that heightSegments is even and >= 2
            // Equator points at h/2 (theta = pi/2)
            // (repeated) polar points at 0 and h (theta = 0 and pi)
            var heightSegments = 10, widthSegments = w; // 16 or however many
                                                        // basis vectors for
                                                        // cylinder

            if (heightSegments % 2 !== 0 || !heightSegments) {
                console.error("heightSegments must be even");

                return null;
            }

            var phiStart = 0;
            var phiLength = Math.PI * 2;

            var thetaStart = 0;
            var thetaLength = Math.PI;

            var x, y;
            var polar = false, equator = false;

            for (y = 0; y <= heightSegments; y++) {

                polar = (y === 0 || y === heightSegments) ? true : false;
                equator = (y === heightSegments / 2) ? true : false;

                var verticesRow = [], toRow = [];

                for (x = 0; x <= widthSegments; x++) {

                    // Two vertices rows for equator pointing to previously
                    // constructed cyl points
                    if (equator) {
                        var xi = (x < widthSegments) ? 2 * x : 0;
                        toRow.push(xi + 1);
                        verticesRow.push(xi);

                        continue;
                    }

                    var u = x / widthSegments;
                    var v = y / heightSegments;

                    // Only push first polar point

                    if (!polar || x === 0) {

                        if (x < widthSegments) {
                            var vertex = new $3Dmol.Vector3();
                            vertex.x = -radius
                                    * Math.cos(phiStart + u * phiLength)
                                    * Math.sin(thetaStart + v * thetaLength);
                            if(cap==1)
                                vertex.y=0;
                            else
                                vertex.y=radius * Math.cos(thetaStart + v * thetaLength);

                            vertex.z = radius
                                    * Math.sin(phiStart + u * phiLength)
                                    * Math.sin(thetaStart + v * thetaLength);

                            if (Math.abs(vertex.x) < 1e-5)
                                vertex.x = 0;
                            if (Math.abs(vertex.y) < 1e-5)
                                vertex.y = 0;
                            if (Math.abs(vertex.z) < 1e-5)
                                vertex.z = 0;

                            if (cap === 1) {
                                n = new $3Dmol.Vector3(0, Math.cos(thetaStart + v * thetaLength), 0);
                                n.normalize();
                            }
                            else {
                                n = new $3Dmol.Vector3(vertex.x, vertex.y, vertex.z);
                                n.normalize();
                            }

                            nvecs.push(vertex);
                            norms.push(n);

                            verticesRow.push(nvecs.length - 1);
                        }

                        // last point is just the first point for this row
                        else {
                            verticesRow.push(nvecs.length - widthSegments);
                        }

                    }

                    // x > 0; index to already added point
                    else if (polar)
                        verticesRow.push(nvecs.length - 1);

                }

                // extra equator row
                if (equator)
                    verticesRows.push(toRow);

                verticesRows.push(verticesRow);

            }

            var obj = {
                vertices : nvecs,
                normals : norms,
                verticesRows : verticesRows,
                w : widthSegments,
                h : heightSegments
            };
            this.cache[radius]={};
            this.cache[radius][cap+capType] = obj;

            return obj;

        }
    };
    this.caps = {
        NONE : 0,
        FLAT : 1,
        ROUND : 2
        };
    // creates a cylinder
    var drawnC = 0;
    
    /** Create a cylinder 
     * @function $3Dmol.GLDraw.drawCylinder
     * @param {geometry}
     *            geo
     * @param {Point}
     *            from
     * @param {Point}
     *            to
     * @param {float}
     *            radius
     * @param {$3Dmol.Color}
     *            color
     * @param {integer} fromCap - 0 for none, 1 for flat, 2 for round; Note: currently does not support different styles of caps on the same cylinder.
     * @param {integer} toCap = 0 for none, 1 for flat, 2 for round
     *            
     * */
    draw.drawCylinder = function(geo, from, to, radius, color, fromCap, toCap) {
        if (!from || !to)
            return;
        drawnC++;
        // vertices
        var drawcaps = toCap || fromCap;
        color = color || {r:0, g:0, b:0};

        /** @type {Array.<number>} */
        var dir = [ to.x, to.y, to.z ];
        dir[0] -= from.x;
        dir[1] -= from.y;
        dir[2] -= from.z;

        var e = getRotationMatrix(dir);
        // get orthonormal vectors from cache
        // TODO: Will have orient with model view matrix according to direction

        var vobj = cylVertexCache.getVerticesForRadius(radius, toCap, "to");
        // w (n) corresponds to the number of orthonormal vectors for cylinder
        // (default 16)
        var n = vobj.w, h = vobj.h;
        var w = n;
        // get orthonormal vector
        var n_verts = (drawcaps) ? h * n + 2 : 2 * n;

        var geoGroup = geo.updateGeoGroup(n_verts);

        var vertices = vobj.vertices, normals = vobj.normals, verticesRows = vobj.verticesRows;
        var toRow = verticesRows[h / 2], fromRow = verticesRows[h / 2 + 1];

        var start = geoGroup.vertices;
        var offset, faceoffset;
        var i, x, y, z;

        var vertexArray = geoGroup.vertexArray;
        var normalArray = geoGroup.normalArray;
        var colorArray = geoGroup.colorArray;
        var faceArray = geoGroup.faceArray;
        // add vertices, opposing vertices paired together
        for (i = 0; i < n; ++i) {

            var vi = 2 * i;

            x = e[0] * vertices[vi].x + e[3] * vertices[vi].y + e[6]
                    * vertices[vi].z;
            y = e[1] * vertices[vi].x + e[4] * vertices[vi].y + e[7]
                    * vertices[vi].z;
            z = e[5] * vertices[vi].y + e[8] * vertices[vi].z;

            // var xn = x/radius, yn = y/radius, zn = z/radius;

            offset = 3 * (start + vi);
            faceoffset = geoGroup.faceidx;

            // from
            vertexArray[offset] = x + from.x;
            vertexArray[offset + 1] = y + from.y;
            vertexArray[offset + 2] = z + from.z;
            // to
            vertexArray[offset + 3] = x + to.x;
            vertexArray[offset + 4] = y + to.y;
            vertexArray[offset + 5] = z + to.z;

            // normals
            normalArray[offset] = x;
            normalArray[offset + 3] = x;
            normalArray[offset + 1] = y;
            normalArray[offset + 4] = y;
            normalArray[offset + 2] = z;
            normalArray[offset + 5] = z;

            // colors
            colorArray[offset] = color.r;
            colorArray[offset + 3] = color.r;
            colorArray[offset + 1] = color.g;
            colorArray[offset + 4] = color.g;
            colorArray[offset + 2] = color.b;
            colorArray[offset + 5] = color.b;

            // faces
            // 0 - 2 - 1
            faceArray[faceoffset] = fromRow[i] + start;
            faceArray[faceoffset + 1] = fromRow[i + 1] + start;
            faceArray[faceoffset + 2] = toRow[i] + start;
            // 1 - 2 - 3
            faceArray[faceoffset + 3] = toRow[i] + start;
            faceArray[faceoffset + 4] = fromRow[i + 1] + start;
            faceArray[faceoffset + 5] = toRow[i + 1] + start;

            geoGroup.faceidx += 6;

        }

        // SPHERE CAPS
        if (drawcaps) {
            // h - sphere rows, verticesRows.length - 2
            
            var ystart = (toCap) ? 0 : h / 2;
            var yend = (fromCap) ? h + 1 : h / 2 + 1;
            var v1, v2, v3, v4, x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, nx1, nx2, nx3, nx4, ny1, ny2, ny3, ny4, nz1, nz2, nz3, nz4, v1offset, v2offset, v3offset, v4offset;

            for (y = ystart; y < yend; y++) {
                if (y === h / 2)
                    continue;
                // n number of points for each level (verticesRows[i].length -
                // 1)
                var cap = (y <= h / 2) ? to : from;
                var toObj = cylVertexCache.getVerticesForRadius(radius, toCap, "to");
                var fromObj = cylVertexCache.getVerticesForRadius(radius, fromCap, "from");
                if(cap===to){
                    vertices = toObj.vertices, normals = toObj.normals, verticesRows = toObj.verticesRows;
                }else if(cap==from){
                    vertices = fromObj.vertices, normals = fromObj.normals, verticesRows = fromObj.verticesRows;
                }
                for (x = 0; x < n; x++) {

                    faceoffset = geoGroup.faceidx;

                    v1 = verticesRows[y][x + 1];
                    v1offset = (v1 + start) * 3;
                    v2 = verticesRows[y][x];
                    v2offset = (v2 + start) * 3;
                    v3 = verticesRows[y + 1][x];
                    v3offset = (v3 + start) * 3;
                    v4 = verticesRows[y + 1][x + 1];
                    v4offset = (v4 + start) * 3;

                    // rotate sphere vectors
                    x1 = e[0] * vertices[v1].x + e[3] * vertices[v1].y + e[6]
                            * vertices[v1].z;
                    x2 = e[0] * vertices[v2].x + e[3] * vertices[v2].y + e[6]
                            * vertices[v2].z;
                    x3 = e[0] * vertices[v3].x + e[3] * vertices[v3].y + e[6]
                            * vertices[v3].z;
                    x4 = e[0] * vertices[v4].x + e[3] * vertices[v4].y + e[6]
                            * vertices[v4].z;

                    y1 = e[1] * vertices[v1].x + e[4] * vertices[v1].y + e[7]
                            * vertices[v1].z;
                    y2 = e[1] * vertices[v2].x + e[4] * vertices[v2].y + e[7]
                            * vertices[v2].z;
                    y3 = e[1] * vertices[v3].x + e[4] * vertices[v3].y + e[7]
                            * vertices[v3].z;
                    y4 = e[1] * vertices[v4].x + e[4] * vertices[v4].y + e[7]
                            * vertices[v4].z;

                    z1 = e[5] * vertices[v1].y + e[8] * vertices[v1].z;
                    z2 = e[5] * vertices[v2].y + e[8] * vertices[v2].z;
                    z3 = e[5] * vertices[v3].y + e[8] * vertices[v3].z;
                    z4 = e[5] * vertices[v4].y + e[8] * vertices[v4].z;

                    vertexArray[v1offset] = x1 + cap.x;
                    vertexArray[v2offset] = x2 + cap.x;
                    vertexArray[v3offset] = x3 + cap.x;
                    vertexArray[v4offset] = x4 + cap.x;

                    vertexArray[v1offset + 1] = y1 + cap.y;
                    vertexArray[v2offset + 1] = y2 + cap.y;
                    vertexArray[v3offset + 1] = y3 + cap.y;
                    vertexArray[v4offset + 1] = y4 + cap.y;

                    vertexArray[v1offset + 2] = z1 + cap.z;
                    vertexArray[v2offset + 2] = z2 + cap.z;
                    vertexArray[v3offset + 2] = z3 + cap.z;
                    vertexArray[v4offset + 2] = z4 + cap.z;

                    colorArray[v1offset] = color.r;
                    colorArray[v2offset] = color.r;
                    colorArray[v3offset] = color.r;
                    colorArray[v4offset] = color.r;

                    colorArray[v1offset + 1] = color.g;
                    colorArray[v2offset + 1] = color.g;
                    colorArray[v3offset + 1] = color.g;
                    colorArray[v4offset + 1] = color.g;

                    colorArray[v1offset + 2] = color.b;
                    colorArray[v2offset + 2] = color.b;
                    colorArray[v3offset + 2] = color.b;
                    colorArray[v4offset + 2] = color.b;

                    nx1 = e[0] * normals[v1].x + e[3] * normals[v1].y + e[6]
                            * normals[v1].z;
                    nx2 = e[0] * normals[v2].x + e[3] * normals[v2].y + e[6]
                            * normals[v2].z;
                    nx3 = e[0] * normals[v3].x + e[3] * normals[v3].y + e[6]
                            * normals[v3].z;
                    nx4 = e[0] * normals[v4].x + e[3] * normals[v4].y + e[6]
                            * normals[v4].z;

                    ny1 = e[1] * normals[v1].x + e[4] * normals[v1].y + e[7]
                            * normals[v1].z;
                    ny2 = e[1] * normals[v2].x + e[4] * normals[v2].y + e[7]
                            * normals[v2].z;
                    ny3 = e[1] * normals[v3].x + e[4] * normals[v3].y + e[7]
                            * normals[v3].z;
                    ny4 = e[1] * normals[v4].x + e[4] * normals[v4].y + e[7]
                            * normals[v4].z;

                    nz1 = e[5] * normals[v1].y + e[8] * normals[v1].z;
                    nz2 = e[5] * normals[v2].y + e[8] * normals[v2].z;
                    nz3 = e[5] * normals[v3].y + e[8] * normals[v3].z;
                    nz4 = e[5] * normals[v4].y + e[8] * normals[v4].z;

                    // if (Math.abs(vobj.sphereVertices[v1].y) === radius) {

                    if (y === 0) {//to center circle
                        // face = [v1, v3, v4];
                        // norm = [n1, n3, n4];

                        normalArray[v1offset] = nx1;
                        normalArray[v3offset] = nx3;
                        normalArray[v4offset] = nx4;
                        normalArray[v1offset + 1] = ny1;
                        normalArray[v3offset + 1] = ny3;
                        normalArray[v4offset + 1] = ny4;
                        normalArray[v1offset + 2] = nz1;
                        normalArray[v3offset + 2] = nz3;
                        normalArray[v4offset + 2] = nz4;

                        faceArray[faceoffset] = v1 + start;
                        faceArray[faceoffset + 1] = v3 + start;
                        faceArray[faceoffset + 2] = v4 + start;

                        geoGroup.faceidx += 3;

                    }

                    // else if (Math.abs(vobj.sphereVertices[v3].y) === radius)
                    // {
                    else if (y === yend - 1) {//from end center circle
                        // face = [v1, v2, v3];
                        // norm = [n1, n2, n3];

                        normalArray[v1offset] = nx1;
                        normalArray[v2offset] = nx2;
                        normalArray[v3offset] = nx3;
                        normalArray[v1offset + 1] = ny1;
                        normalArray[v2offset + 1] = ny2;
                        normalArray[v3offset + 1] = ny3;
                        normalArray[v1offset + 2] = nz1;
                        normalArray[v2offset + 2] = nz2;
                        normalArray[v3offset + 2] = nz3;

                        faceArray[faceoffset] = v1 + start;
                        faceArray[faceoffset + 1] = v2 + start;
                        faceArray[faceoffset + 2] = v3 + start;

                        geoGroup.faceidx += 3;

                    }

                    else { // the rest of the circles
                        // face = [v1, v2, v3, v4];
                        // norm = [n1, n2, n3, n4];

                        normalArray[v1offset] = nx1;
                        normalArray[v2offset] = nx2;
                        normalArray[v4offset] = nx4;
                        normalArray[v1offset + 1] = ny1;
                        normalArray[v2offset + 1] = ny2;
                        normalArray[v4offset + 1] = ny4;
                        normalArray[v1offset + 2] = nz1;
                        normalArray[v2offset + 2] = nz2;
                        normalArray[v4offset + 2] = nz4;

                        normalArray[v2offset] = nx2;
                        normalArray[v3offset] = nx3;
                        normalArray[v4offset] = nx4;
                        normalArray[v2offset + 1] = ny2;
                        normalArray[v3offset + 1] = ny3;
                        normalArray[v4offset + 1] = ny4;
                        normalArray[v2offset + 2] = nz2;
                        normalArray[v3offset + 2] = nz3;
                        normalArray[v4offset + 2] = nz4;

                        faceArray[faceoffset] = v1 + start;
                        faceArray[faceoffset + 1] = v2 + start;
                        faceArray[faceoffset + 2] = v4 + start;

                        faceArray[faceoffset + 3] = v2 + start;
                        faceArray[faceoffset + 4] = v3 + start;
                        faceArray[faceoffset + 5] = v4 + start;

                        geoGroup.faceidx += 6;
                    }

                }
            }

        }

        geoGroup.vertices += n_verts;
    };

    /** Create a cone 
     * @function $3Dmol.GLDraw.drawCone
     * @param {geometry}
     *            geo
     * @param {Point}
     *            from
     * @param {Point}
     *            to
     * @param {float}
     *            radius
     * @param {$3Dmol.Color}
     *            color
     *            */
    draw.drawCone = function(geo, from, to, radius, color) {
        if (!from || !to)
            return;

        color = color || {r:0, g:0, b:0};

        var dir =[to.x, to.y, to.z ];        
        dir.x -= from.x;
        dir.y -= from.y;
        dir.z -= from.z;

        var e = getRotationMatrix(dir);


        // n vertices around bottom plust the two points
        var n = basisVectors.length;
        var basis = basisVectors;
        var n_verts =  n + 2;

        
        //setup geo structures
        var geoGroup = geo.updateGeoGroup(n_verts);
        var start = geoGroup.vertices;    
        var offset, faceoffset;
        var i, x, y, z;
        var vertexArray = geoGroup.vertexArray;
        var normalArray = geoGroup.normalArray;
        var colorArray = geoGroup.colorArray;
        var faceArray = geoGroup.faceArray;
        
        var offset = start*3;
        var ndir = new $3Dmol.Vector3(dir[0],dir[1],dir[2]).normalize();
        //base point first vertex
        vertexArray[offset] = from.x;
        vertexArray[offset+1] = from.y;
        vertexArray[offset+2] = from.z;
        normalArray[offset] = -ndir.x;
        normalArray[offset + 1] = -ndir.y;
        normalArray[offset + 2] = -ndir.z;
        colorArray[offset] = color.r;
        colorArray[offset + 1] = color.g;
        colorArray[offset + 2] = color.b;
        
        //second vertex top
        vertexArray[offset+3] = to.x;
        vertexArray[offset+4] = to.y;
        vertexArray[offset+5] = to.z;
        
        normalArray[offset+3] = ndir.x;
        normalArray[offset+4] = ndir.y;
        normalArray[offset+5] = ndir.z;
        colorArray[offset+3] = color.r;
        colorArray[offset + 4] = color.g;
        colorArray[offset + 5] = color.b;
        
        offset += 6;
        
        // add circle vertices
        for (i = 0; i < n; ++i) {
            var vec = basis[i].clone();
            vec.multiplyScalar(radius);
            x = e[0] * vec.x + e[3] * vec.y + e[6]
                    * vec.z;
            y = e[1] * vec.x + e[4] * vec.y + e[7]
                    * vec.z;
            z = e[5] * vec.y + e[8] * vec.z;

            // from
            vertexArray[offset] = x + from.x;
            vertexArray[offset + 1] = y + from.y;
            vertexArray[offset + 2] = z + from.z;

            // normals
            normalArray[offset] = x;
            normalArray[offset + 1] = y;
            normalArray[offset + 2] = z;

            // colors
            colorArray[offset] = color.r;
            colorArray[offset + 1] = color.g;
            colorArray[offset + 2] = color.b;
            
            offset += 3;

        }
        geoGroup.vertices += (n+2);
        //faces
        var faceoffset = geoGroup.faceidx;
        for( i = 0; i < n; i++) {
            //two neighboring circle vertices
            var v1 = start+2+i;
            var v2 = start+2+ ((i+1)%n);
            
            faceArray[faceoffset] = v1;
            faceArray[faceoffset+1] = v2;
            faceArray[faceoffset+2] = start;
            faceoffset += 3;
            faceArray[faceoffset] = v1;
            faceArray[faceoffset+1] = v2;
            faceArray[faceoffset+2] = start+1;
            faceoffset += 3;
        }
        geoGroup.faceidx += 6*n;
    };

    
    // Sphere component
    var sphereVertexCache = {
        cache : {},
        getVerticesForRadius : function(radius) {

            if (typeof (this.cache[radius]) !== "undefined")
                return this.cache[radius];

            var obj = {
                vertices : [],
                verticesRows : [],
                normals : []
            };
            // scale quality with radius heuristically
            var sphereQuality = 1;
            var widthSegments = 16 * sphereQuality;
            var heightSegments = 10 * sphereQuality;
            if (radius < 1) {
                widthSegments = 10 * sphereQuality;
                heightSegments = 8 * sphereQuality;
            }

            var phiStart = 0;
            var phiLength = Math.PI * 2;

            var thetaStart = 0;
            var thetaLength = Math.PI;

            var x, y, vertices = [], uvs = [];

            for (y = 0; y <= heightSegments; y++) {

                var verticesRow = [];
                for (x = 0; x <= widthSegments; x++) {

                    var u = x / widthSegments;
                    var v = y / heightSegments;

                    var vertex = {};
                    vertex.x = -radius * Math.cos(phiStart + u * phiLength)
                            * Math.sin(thetaStart + v * thetaLength);
                    vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
                    vertex.z = radius * Math.sin(phiStart + u * phiLength)
                            * Math.sin(thetaStart + v * thetaLength);

                    var n = new $3Dmol.Vector3(vertex.x, vertex.y, vertex.z);
                    n.normalize();

                    obj.vertices.push(vertex);
                    obj.normals.push(n);

                    verticesRow.push(obj.vertices.length - 1);

                }

                obj.verticesRows.push(verticesRow);

            }

            this.cache[radius] = obj;
            return obj;
        }

    };

    /** Create a sphere.
     * @function $3Dmol.GLDraw.drawSphere
     * @param {geometry}
     *            geo
     * @param {Point}
     *            pos
     * @param {float}
     *            radius
     * @param {$3Dmol.Color}
     *            color
     */
    draw.drawSphere = function(geo, pos, radius, color) {

        var center = new $3Dmol.Vector3(pos.x, pos.y, pos.z);

        var x, y;
        var vobj = sphereVertexCache.getVerticesForRadius(radius);

        var vertices = vobj.vertices;
        var normals = vobj.normals;

        var geoGroup = geo.updateGeoGroup(vertices.length);

        var start = geoGroup.vertices;
        var vertexArray = geoGroup.vertexArray;
        var colorArray = geoGroup.colorArray;
        var faceArray = geoGroup.faceArray;
        var lineArray = geoGroup.lineArray;
        var normalArray = geoGroup.normalArray;

        for (var i = 0, il = vertices.length; i < il; ++i) {
            var offset = 3 * (start + i);
            var v = vertices[i];

            vertexArray[offset] = (v.x + pos.x);
            vertexArray[offset + 1] = (v.y + pos.y);
            vertexArray[offset + 2] = (v.z + pos.z);

            colorArray[offset] = color.r;
            colorArray[offset + 1] = color.g;
            colorArray[offset + 2] = color.b;

        }

        geoGroup.vertices += vertices.length;

        var verticesRows = vobj.verticesRows;
        var h = verticesRows.length - 1;

        for (y = 0; y < h; y++) {
            var w = verticesRows[y].length - 1;
            for (x = 0; x < w; x++) {

                var faceoffset = geoGroup.faceidx, lineoffset = geoGroup.lineidx;

                var v1 = verticesRows[y][x + 1] + start, v1offset = v1 * 3;
                var v2 = verticesRows[y][x] + start, v2offset = v2 * 3;
                var v3 = verticesRows[y + 1][x] + start, v3offset = v3 * 3;
                var v4 = verticesRows[y + 1][x + 1] + start, v4offset = v4 * 3;

                var n1 = normals[v1 - start];
                var n2 = normals[v2 - start];
                var n3 = normals[v3 - start];
                var n4 = normals[v4 - start];
                var face, norm;
                if (Math.abs(vertices[v1 - start].y) === radius) {
                    // face = [v1, v3, v4];
                    // norm = [n1, n3, n4];

                    normalArray[v1offset] = n1.x;
                    normalArray[v3offset] = n3.x;
                    normalArray[v4offset] = n4.x;
                    normalArray[v1offset + 1] = n1.y;
                    normalArray[v3offset + 1] = n3.y;
                    normalArray[v4offset + 1] = n4.y;
                    normalArray[v1offset + 2] = n1.z;
                    normalArray[v3offset + 2] = n3.z;
                    normalArray[v4offset + 2] = n4.z;

                    faceArray[faceoffset] = v1;
                    faceArray[faceoffset + 1] = v3;
                    faceArray[faceoffset + 2] = v4;

                    lineArray[lineoffset] = v1;
                    lineArray[lineoffset + 1] = v3;
                    lineArray[lineoffset + 2] = v1;
                    lineArray[lineoffset + 3] = v4;
                    lineArray[lineoffset + 4] = v3;
                    lineArray[lineoffset + 5] = v4;

                    geoGroup.faceidx += 3;
                    geoGroup.lineidx += 6;

                } else if (Math.abs(vertices[v3 - start].y) === radius) {
                    // face = [v1, v2, v3];
                    // norm = [n1, n2, n3];

                    normalArray[v1offset] = n1.x;
                    normalArray[v2offset] = n2.x;
                    normalArray[v3offset] = n3.x;
                    normalArray[v1offset + 1] = n1.y;
                    normalArray[v2offset + 1] = n2.y;
                    normalArray[v3offset + 1] = n3.y;
                    normalArray[v1offset + 2] = n1.z;
                    normalArray[v2offset + 2] = n2.z;
                    normalArray[v3offset + 2] = n3.z;

                    faceArray[faceoffset] = v1;
                    faceArray[faceoffset + 1] = v2;
                    faceArray[faceoffset + 2] = v3;

                    lineArray[lineoffset] = v1;
                    lineArray[lineoffset + 1] = v2;
                    lineArray[lineoffset + 2] = v1;
                    lineArray[lineoffset + 3] = v3;
                    lineArray[lineoffset + 4] = v2;
                    lineArray[lineoffset + 5] = v3;

                    geoGroup.faceidx += 3;
                    geoGroup.lineidx += 6;

                } else {
                    // face = [v1, v2, v3, v4];
                    // norm = [n1, n2, n3, n4];

                    normalArray[v1offset] = n1.x;
                    normalArray[v2offset] = n2.x;
                    normalArray[v4offset] = n4.x;
                    normalArray[v1offset + 1] = n1.y;
                    normalArray[v2offset + 1] = n2.y;
                    normalArray[v4offset + 1] = n4.y;
                    normalArray[v1offset + 2] = n1.z;
                    normalArray[v2offset + 2] = n2.z;
                    normalArray[v4offset + 2] = n4.z;

                    normalArray[v2offset] = n2.x;
                    normalArray[v3offset] = n3.x;
                    normalArray[v4offset] = n4.x;
                    normalArray[v2offset + 1] = n2.y;
                    normalArray[v3offset + 1] = n3.y;
                    normalArray[v4offset + 1] = n4.y;
                    normalArray[v2offset + 2] = n2.z;
                    normalArray[v3offset + 2] = n3.z;
                    normalArray[v4offset + 2] = n4.z;

                    faceArray[faceoffset] = v1;
                    faceArray[faceoffset + 1] = v2;
                    faceArray[faceoffset + 2] = v4;

                    faceArray[faceoffset + 3] = v2;
                    faceArray[faceoffset + 4] = v3;
                    faceArray[faceoffset + 5] = v4;

                    lineArray[lineoffset] = v1;
                    lineArray[lineoffset + 1] = v2;
                    lineArray[lineoffset + 2] = v1;
                    lineArray[lineoffset + 3] = v4;

                    lineArray[lineoffset + 4] = v2;
                    lineArray[lineoffset + 5] = v3;
                    lineArray[lineoffset + 6] = v3;
                    lineArray[lineoffset + 7] = v4;

                    geoGroup.faceidx += 6;
                    geoGroup.lineidx += 8;

                }

            }
        }

    };

    return draw;

})();// A model is a collection of related atoms.  Bonds are only allowed between
//atoms in the same model.  An atom is uniquely specified by its model id and
//its serial number.
//A glmodel knows how to apply the styles on each atom to create a gl object

var $3Dmol = $3Dmol || {};

/**
 * GLModel represents a group of related atoms
 * @constructor 
 * @param {number=} mid 
 * @param {Object=} defaultcolors Object defining default atom colors as atom => color property value pairs
 * @see $3Dmol.download
 */
$3Dmol.GLModel = (function() {

    // class variables go here
    var defaultAtomStyle = {
        line : {}
    };

    var Nucleotides = [ '  G', '  A', '  T', '  C', '  U', ' DG', ' DA', ' DT',
            ' DC', ' DU' ];

    var defaultlineWidth = 1.0;

    // Reference: A. Bondi, J. Phys. Chem., 1964, 68, 441.
    var vdwRadii = {
        "H" : 1.2,
        "Li" : 1.82,
        "LI" : 1.82,
        "Na" : 2.27,
        "NA" : 2.27,
        "K" : 2.75,
        "C" : 1.7,
        "N" : 1.55,
        "O" : 1.52,
        "F" : 1.47,
        "P" : 1.80,
        "S" : 1.80,
        "CL" : 1.75,
        "Cl" : 1.75,
        "BR" : 1.85,
        "Br" : 1.85,
        "SE" : 1.90,
        "Se" : 1.90,
        "ZN" : 1.39,
        "Zn" : 1.39,
        "CU" : 1.4,
        "Cu" : 1.4,
        "NI" : 1.63,
        "Ni" : 1.63
    };

    var validAtomSpecs = [
        "resn", // Parent residue name
        "x", // Atom's x coordinate
        "y", // Atom's y coordinate
        "z", // Atom's z coordinate
        "color", // Atom's color, as hex code
        "surfaceColor", // Hex code for color to be used for surface patch over this atom
        "elem", // Element abbreviation (e.g. 'H', 'Ca', etc)
        "hetflag", // Set to true if atom is a heteroatom
        "chain", // Chain this atom belongs to, if specified in input file (e.g 'A' for chain A)
        "resi", // Residue number 
        "icode",
        "rescode",
        "serial", // Atom's serial id numbermodels
        "atom", // Atom name; may be more specific than 'elem' (e.g 'CA' for alpha carbon)
        "bonds", // Array of atom ids this atom is bonded to
        "ss", // Secondary structure identifier (for cartoon render; e.g. 'h' for helix)
        "singleBonds", // true if this atom forms only single bonds or no bonds at all
        "bondOrder", // Array of this atom's bond orders, corresponding to bonds identfied by 'bonds'
        "properties", // Optional mapping of additional properties
        "b", // Atom b factor data
        "pdbline", // If applicable, this atom's record entry from the input PDB file (used to output new PDB from models)
        "clickable", // Set this flag to true to enable click selection handling for this atom
        "callback", // Callback click handler function to be executed on this atom and its parent viewer
        "invert", // for selection, inverts the meaning of the selection
        "reflectivity", //for describing the reflectivity of a model
        "altLoc"
    ];

    var validAtomSelectionSpecs = validAtomSpecs.concat([  // valid atom specs are ok too
        "model", // a single model or list of models from which atoms should be selected
        "bonds", // overloaded to select number of bonds, e.g. {bonds: 0} will select all nonbonded atoms
        "predicate", // user supplied function that gets passed an {AtomSpec} and should return true if the atom should be selected
        "invert", // if set, inverts the meaning of the selection
        "byres", // if set, expands the selection to include all atoms of any residue that has any atom selected
        "expand", // expands the selection to include all atoms within a given distance from the selection
        "within", // intersects the selection with the set of atoms within a given distance from another selection
        "and", // and boolean logic
        "or", // or boolean logic
        "not", // not boolean logic
    ]);

    var validAtomStyleSpecs = [
        "line", // draw bonds as lines
        "cross", // draw atoms as crossed lines (aka stars)
        "stick", // draw bonds as capped cylinders
        "sphere", // draw atoms as spheres
        "cartoon", // draw cartoon representation of secondary structure
        "colorfunc",
    ];

    // class functions

    // return true if a and b represent the same style
    var sameObj = function(a,b) {
        if(a && b)
            return JSON.stringify(a) == JSON.stringify(b);
        else
            return a == b;
    };    

   
    function GLModel(mid, defaultcolors) {
        // private variables
        var atoms = [];
        var frames = [];
        var id = mid;
        var hidden = false;
        var molObj = null;
        var renderedMolObj = null;
        var lastColors = null;
        var modelData = {};
        var idMatrix = new $3Dmol.Matrix4();
        var dontDuplicateAtoms = true;
        var defaultColor = $3Dmol.elementColors.defaultColor;
        
        var ElementColors = (defaultcolors) ? defaultcolors : $3Dmol.elementColors.defaultColors;


        // drawing functions must be associated with model object since
        // geometries can't span multiple canvases

        // sphere drawing
        var defaultSphereRadius = 1.5;

        // return proper radius for atom given style
        /** 
         * 
         * @param {AtomSpec} atom
         * @param {atomstyle} style
         * @return {number} 
         * 
         */
        var getRadiusFromStyle = function(atom, style) {
            var r = defaultSphereRadius;
            if (typeof (style.radius) != "undefined")
                r = style.radius;
            else if (vdwRadii[atom.elem])
                r = vdwRadii[atom.elem];

            if (typeof (style.scale) != "undefined")
                r *= style.scale;
            return r;
        };

        // cross drawing
        /** @typedef CrossStyleSpec
         * @prop {boolean} hidden - do not show 
         * @prop {number} linewidth 
         * @prop {number} radius 
         * @prop {number} scale - scale radius by specified amount
         * @prop {ColorschemeSpec} colorscheme - element based coloring
         * @prop {ColorSpec} color - fixed coloring, overrides colorscheme
         */
        
        /**
         * 
         * @param {AtomSpec} atom
         * @param {$3Dmol.Geometry[]} geos
         */
        var drawAtomCross = function(atom, geos) {
            if (!atom.style.cross)
                return;
            var style = atom.style.cross;
            if (style.hidden)
                return;
            var linewidth = (style.linewidth || defaultlineWidth);
            if (!geos[linewidth])
                geos[linewidth] = new $3Dmol.Geometry();
                
            var geoGroup = geos[linewidth].updateGeoGroup(6);
            
            var delta = getRadiusFromStyle(atom, style);

            var points = [ [ delta, 0, 0 ], [ -delta, 0, 0 ], [ 0, delta, 0 ],
                    [ 0, -delta, 0 ], [ 0, 0, delta ], [ 0, 0, -delta ] ];

            var clickable = atom.clickable || atom.hoverable;
            if (clickable && atom.intersectionShape === undefined)
                atom.intersectionShape = {sphere : [], cylinder : [], line : []};
            
            var c = $3Dmol.getColorFromStyle(atom, style);
            
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            
            for ( var j = 0; j < 6; j++) {
                
                var offset = geoGroup.vertices*3;
                
                geoGroup.vertices++;
                vertexArray[offset] = atom.x + points[j][0];
                vertexArray[offset+1] = atom.y + points[j][1];
                vertexArray[offset+2] = atom.z + points[j][2];
                colorArray[offset] = c.r;
                colorArray[offset+1] = c.g;
                colorArray[offset+2] = c.b;
                
                if (clickable){
                    var point = new $3Dmol.Vector3(points[j][0], points[j][1], points[j][2]);
                    
                    //decrease cross size for selection to prevent misselection from atom overlap
                    point.multiplyScalar(0.1);
                    point.set(point.x+atom.x, point.y+atom.y, point.z+atom.z);
                    atom.intersectionShape.line.push(point);
                }

            }
                        
        };

        //from atom, return a normalized vector v that is orthogonal and along which
        //it is appropraite to draw multiple bonds
        var getSideBondV = function(atom, atom2, i) {

            var p1 = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
            var p2 = new $3Dmol.Vector3(atom2.x, atom2.y, atom2.z);

            var dir = p2.clone();
            var v = null;
            dir.sub(p1);

            var p1a, p1b, p2a, p2b;
            var i2, j2, atom3, p3, dir2;
            if (atom.bonds.length === 1) {
                if (atom2.bonds.length === 1) {
                    v = dir.clone();
                    if (Math.abs(v.x) > 0.0001)
                        v.y += 1;
                    else
                        v.x += 1;
                } else {
                    i2 = (i + 1) % atom2.bonds.length;
                    j2 = atom2.bonds[i2];
                    atom3 = atoms[j2];
                    p3 = new $3Dmol.Vector3(atom3.x, atom3.y, atom3.z);

                    dir2 = p3.clone();
                    dir2.sub(p1);

                    v = dir2.clone();
                    v.cross(dir);
                }
            } else {
                // get vector 2 different neighboring atom
                i2 = (i + 1) % atom.bonds.length;
                j2 = atom.bonds[i2];
                atom3 = atoms[j2];
                p3 = new $3Dmol.Vector3(atom3.x, atom3.y, atom3.z);

                dir2 = p3.clone();
                dir2.sub(p1);

                v = dir2.clone();
                v.cross(dir);
            }

            // especially for C#C (triple bond) dir and dir2
            // may be opposites resulting in a zero v
            if (v.lengthSq() < 0.01) {
                v = dir.clone();
                if (Math.abs(v.x) > 0.0001)
                    v.y += 1;
                else
                    v.x += 1;
            }

            v.cross(dir);
            v.normalize();
            
            return v;
            
            //v.multiplyScalar(r * 1.5);

        }
        
        var getTripleBondPoints = function() {
            
            v.cross(dir);
            v.normalize();
            v.multiplyScalar(r * 3);

            p1a = p1.clone();
            p1a.add(v);
            p1b = p1.clone();
            p1b.sub(v);

            p2a = p1a.clone();
            p2a.add(dir);
            p2b = p1b.clone();
            p2b.add(dir);
        }
        
        var addLine = function(vertexArray, colorArray, offset, p1, p2, c1) {
            //make line from p1 to p2, does not incremeant counts
            vertexArray[offset] = p1.x; vertexArray[offset+1] = p1.y; vertexArray[offset+2] = p1.z;
            colorArray[offset] = c1.r; colorArray[offset+1] = c1.g; colorArray[offset+2] = c1.b;
            vertexArray[offset+3] = p2.x; vertexArray[offset+4] = p2.y; vertexArray[offset+5] = p2.z;
            colorArray[offset+3] = c1.r; colorArray[offset+4] = c1.g; colorArray[offset+5] = c1.b;            
        }
        
        /**@typedef LineStyleSpec
         * @prop {boolean} hidden - do not show line
         * @prop {number} linewidth 
         * @prop {ColorschemeSpec} colorscheme - element based coloring
         * @prop {ColorSpec} color - fixed coloring, overrides colorscheme
         */
        
        // bonds - both atoms must match bond style
        // standardize on only drawing for lowest to highest
        /**
         * 
         * @param {AtomSpec}
         *            atom
         * @param {AtomSpec[]} atoms
         * @param {$3Dmol.Geometry[]} geos
         */
        var drawBondLines = function(atom, atoms, geos) {
            if (!atom.style.line)
                return;
            var style = atom.style.line;
            if (style.hidden)
                return;
             var p1a, p1b, p2a, p2b;
            // have a separate geometry for each linewidth
            var linewidth = (style.linewidth || defaultlineWidth);

            if (!geos[linewidth])
                geos[linewidth] = new $3Dmol.Geometry();
            /** @type {geometryGroup} */
            var geoGroup = geos[linewidth].updateGeoGroup(6*atom.bonds.length); //reserve enough space even for triple bonds
            
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            
            for ( var i = 0; i < atom.bonds.length; i++) {
                var j = atom.bonds[i]; // our neighbor
                
                var atom2 = atoms[j];
                if (!atom2.style.line)
                    continue; // don't sweat the details

                if (atom.serial >= atom2.serial) // only draw if less, this way we can do multi bonds correctly
                    continue;
                var p1 = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                var p2 = new $3Dmol.Vector3(atom2.x, atom2.y, atom2.z);                
                var mp = p1.clone().add(p2).multiplyScalar(0.5);
                var singleBond = false;               
                
                if (atom.clickable || atom.hoverable){
                    if (atom.intersectionShape === undefined)
                        atom.intersectionShape = {sphere : [], cylinder : [], line : [], triangle : []};
                    atom.intersectionShape.line.push(p1);
                    atom.intersectionShape.line.push(mp);
                    atom2.intersectionShape.line.push(mp);
                    atom2.intersectionShape.line.push(p2);
                }

                var c1 = $3Dmol.getColorFromStyle(atom, atom.style.line);
                var c2 = $3Dmol.getColorFromStyle(atom2, atom2.style.line);
               
                if(atom.bondStyles && atom.bondStyles[i]) {
                    var bstyle = atom.bondStyles[i];
                    if(!bstyle.iswire) {
                        continue;
                    }
                    if(bstyle.radius) bondR = bstyle.radius;
                    if(bstyle.singleBond) singleBond = true;
                    if(typeof(bstyle.color1) != "undefined") {
                        c1 = $3Dmol.CC.color(bstyle.color1);
                    }
                    if(typeof(bstyle.color2) != "undefined") {
                        c2 = $3Dmol.CC.color(bstyle.color2);
                    }
                }

                var offset = geoGroup.vertices*3;
                
                if(atom.bondOrder[i] > 1 && atom.bondOrder[i] < 4 && !singleBond) {
                    var v = getSideBondV(atom, atom2, i);
                    var dir = p2.clone();
                    dir.sub(p1);
                    
                    if(atom.bondOrder[i] == 2) { //double
                        
                        v.multiplyScalar(.1);
                        p1a = p1.clone();
                        p1a.add(v);
                        p1b = p1.clone();
                        p1b.sub(v);

                        p2a = p1a.clone();
                        p2a.add(dir);
                        p2b = p1b.clone();
                        p2b.add(dir);
                        
                        if(c1 == c2) {
                            geoGroup.vertices += 4;
                            addLine(vertexArray, colorArray, offset, p1a, p2a, c1);                            
                            addLine(vertexArray, colorArray, offset+6, p1b, p2b, c1);                            
                        }
                        else {
                            geoGroup.vertices += 8;
                            dir.multiplyScalar(0.5);
                            var mpa = p1a.clone();
                            mpa.add(dir);
                            var mpb = p1b.clone();
                            mpb.add(dir);
                            
                            addLine(vertexArray, colorArray, offset, p1a, mpa, c1);                            
                            addLine(vertexArray, colorArray, offset+6, mpa, p2a, c2);                            
                            addLine(vertexArray, colorArray, offset+12, p1b, mpb, c1); 
                            addLine(vertexArray, colorArray, offset+18, mpb, p2b, c2); 
                        }
                    }
                    else if(atom.bondOrder[i] == 3) { //triple
                        
                        v.multiplyScalar(.1);
                           p1a = p1.clone();
                        p1a.add(v);
                        p1b = p1.clone();
                        p1b.sub(v);

                        p2a = p1a.clone();
                        p2a.add(dir);
                        p2b = p1b.clone();
                        p2b.add(dir);
                        
                        if(c1 == c2) {
                            geoGroup.vertices += 6;
                            addLine(vertexArray, colorArray, offset, p1, p2, c1);                            
                            addLine(vertexArray, colorArray, offset+6, p1a, p2a, c1);                            
                            addLine(vertexArray, colorArray, offset+12, p1b, p2b, c1);                            
                        }
                        else {
                            geoGroup.vertices += 12;
                            dir.multiplyScalar(0.5);
                            var mpa = p1a.clone();
                            mpa.add(dir);
                            var mpb = p1b.clone();
                            mpb.add(dir);

                            addLine(vertexArray, colorArray, offset, p1, mp, c1);                            
                            addLine(vertexArray, colorArray, offset+6, mp, p2, c2);
                            addLine(vertexArray, colorArray, offset+12, p1a, mpa, c1);                            
                            addLine(vertexArray, colorArray, offset+18, mpa, p2a, c2);                            
                            addLine(vertexArray, colorArray, offset+24, p1b, mpb, c1); 
                            addLine(vertexArray, colorArray, offset+30, mpb, p2b, c2); 
                        }
                    }
                }
                else { //single bond                                    
                    if(c1 == c2) {
                        geoGroup.vertices += 2;
                        addLine(vertexArray, colorArray, offset, p1, p2, c1);
                    } else {
                        geoGroup.vertices += 4;
                        addLine(vertexArray, colorArray, offset, p1, mp, c1);
                        addLine(vertexArray, colorArray, offset+6, mp, p2, c2);                        
                    }
                    
                }
            }

        };

        // bonds as cylinders
        var defaultStickRadius = 0.25;

        /**@typedef SphereStyleSpec
         * @prop {boolean} hidden - do not show atom
         * @prop {number} radius - override van der waals radius
         * @prop {number} scale - scale radius by specified amount
         * @prop {ColorschemeSpec} colorscheme - element based coloring
         * @prop {ColorSpec} color - fixed coloring, overrides colorscheme
         */
        
        //sphere drawing
        //See also: drawCylinder
        /** 
         * 
         * @param {AtomSpec} atom
         * @param {$3Dmol.Geometry} geo
         */
        var drawAtomSphere = function(atom, geo) {
            
            if (!atom.style.sphere)
                return;
            var style = atom.style.sphere;
            if (style.hidden)
                return;
                                                                 
            var C = $3Dmol.getColorFromStyle(atom, style);
            
            var x, y;
            var radius = getRadiusFromStyle(atom, style);
            
            if ((atom.clickable === true || atom.hoverable) && (atom.intersectionShape !== undefined)) {
                var center = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                atom.intersectionShape.sphere.push(new $3Dmol.Sphere(center, radius));
            }
            
            $3Dmol.GLDraw.drawSphere(geo, atom, radius, C);    
            
        };

        var drawAtomInstanced = function(atom, geo) {

            if (!atom.style.sphere)
                return;
            var style = atom.style.sphere;
            if (style.hidden)
                return;

            var radius = getRadiusFromStyle(atom, style);
            var C = $3Dmol.getColorFromStyle(atom, style);

            var geoGroup = geo.updateGeoGroup(1);
            var startv =  geoGroup.vertices;
            var start = startv*3;
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            var radiusArray = geoGroup.radiusArray;

            vertexArray[start] = atom.x;
            vertexArray[start+1] = atom.y ;
            vertexArray[start+2] = atom.z;

            var normalArray = geoGroup.normalArray;
            var colorArray = geoGroup.colorArray;
            colorArray[start] = C.r;
            colorArray[start+1] = C.g;
            colorArray[start+2] = C.b;

            radiusArray[startv] = radius;

            if ((atom.clickable === true || atom.hoverable) && (atom.intersectionShape !== undefined)) {
                var center = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                atom.intersectionShape.sphere.push(new $3Dmol.Sphere(center, radius));
            }
            
            geoGroup.vertices += 1;

        };

        var drawSphereImposter = function(geo, center, radius, C) {
            //create flat square                                   
            var geoGroup = geo.updateGeoGroup(4);
            var startv =  geoGroup.vertices;
            var start = startv*3;
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            
            //use center point for each vertex
            for(var i = 0; i < 4; i++) {
                vertexArray[start+3*i] = center.x;
                vertexArray[start+3*i+1] = center.y ;
                vertexArray[start+3*i+2] = center.z;                           
            }
            

            //same colors for all 4 vertices
            var normalArray = geoGroup.normalArray;
            var colorArray = geoGroup.colorArray;
            for(var i = 0; i < 4; i++) {
                colorArray[start+3*i] = C.r;
                colorArray[start+3*i+1] = C.g;
                colorArray[start+3*i+2] = C.b;                
            }
            
            normalArray[start+0] = -radius;
            normalArray[start+1] = radius;
            normalArray[start+2] = 0;
            
            normalArray[start+3] = -radius;
            normalArray[start+4] = -radius;
            normalArray[start+5] = 0;
            
            normalArray[start+6] = radius;
            normalArray[start+7] = -radius;
            normalArray[start+8] = 0;
            
            normalArray[start+9] = radius;
            normalArray[start+10] = radius;
            normalArray[start+11] = 0;
            
            geoGroup.vertices += 4;
            
            //two faces
            var faceArray = geoGroup.faceArray;
            var faceoffset = geoGroup.faceidx; //not number faces, but index
            faceArray[faceoffset+0] = startv;
            faceArray[faceoffset+1] = startv+1;
            faceArray[faceoffset+2] = startv+2;
            faceArray[faceoffset+3] = startv+2;
            faceArray[faceoffset+4] = startv+3;
            faceArray[faceoffset+5] = startv;
            geoGroup.faceidx += 6;
        };
        
        //dkoes -  code for sphere imposters
        var drawAtomImposter = function(atom, geo) {
            
            if (!atom.style.sphere)
                return;
            var style = atom.style.sphere;
            if (style.hidden)
                return;
            
            var radius = getRadiusFromStyle(atom, style);
            var C = $3Dmol.getColorFromStyle(atom, style);
            
            if ((atom.clickable === true || atom.hoverable) && (atom.intersectionShape !== undefined)) {
                var center = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                atom.intersectionShape.sphere.push(new $3Dmol.Sphere(center, radius));
            }
            
            drawSphereImposter(geo, atom, radius, C);            
        };
                
          
        var drawStickImposter =  function(geo, from, to, radius, color, fromCap, toCap) {
           //we need the four corners - two have from coord, two have to coord, the normal
            //is the opposing point, from which we can get the normal and length
            //also need the radius
            var geoGroup = geo.updateGeoGroup(4);
            var startv =  geoGroup.vertices;
            var start = startv*3;
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            var radiusArray = geoGroup.radiusArray;
            var normalArray = geoGroup.normalArray;
            //encode extra bits of information in the color
            var r = color.r;
            var g = color.g;
            var b = color.b;
            
            var negateColor = function(c) {
                //set sign bit
                var n = -c;
                if(n == 0) n = -0.0001;
                return n;
            };
            
            /* for sticks, always draw caps, but we could in theory set caps in color */
            
            //4 vertices, distinguish between p1 and p2 with neg blue
            var pos = start;
            for(var i = 0; i < 4; i++) {
                vertexArray[pos] = from.x;
                normalArray[pos] = to.x;
                colorArray[pos] = r;
                pos++;
                vertexArray[pos] = from.y;
                normalArray[pos] = to.y;
                colorArray[pos] = g;
                pos++;
                vertexArray[pos] = from.z;
                normalArray[pos] = to.z;
                if(i < 2)
                    colorArray[pos] = b;
                else
                    colorArray[pos] = negateColor(b);
                pos++;
            }

            geoGroup.vertices += 4;

            radiusArray[startv] = -radius;
            radiusArray[startv+1] = radius;
            radiusArray[startv+2] = -radius;
            radiusArray[startv+3] = radius;      
                        
            //two faces
            var faceArray = geoGroup.faceArray;
            var faceoffset = geoGroup.faceidx; //not number faces, but index
            faceArray[faceoffset+0] = startv;
            faceArray[faceoffset+1] = startv+1;
            faceArray[faceoffset+2] = startv+2;
            faceArray[faceoffset+3] = startv+2;
            faceArray[faceoffset+4] = startv+3;
            faceArray[faceoffset+5] = startv;
            geoGroup.faceidx += 6;          
        };
        
        /**@typedef StickStyleSpec
         * @prop {boolean} hidden - do not show 
         * @prop {number} radius 
         * @prop {boolean} singleBonds - draw all bonds as single bonds if set
         * @prop {ColorschemeSpec} colorscheme - element based coloring
         * @prop {ColorSpec} color - fixed coloring, overrides colorscheme
         */
        
        // draws cylinders and small spheres (at bond radius)
        var drawBondSticks = function(atom, atoms, geo) {
            if (!atom.style.stick)
                return;
            var style = atom.style.stick;
            if (style.hidden)
                return;

            var atomBondR = style.radius || defaultStickRadius;
            var bondR = atomBondR;
            var atomSingleBond = style.singleBonds || false;
            var fromCap = 0, toCap = 0;

            var C1 = $3Dmol.getColorFromStyle(atom, style);

            var mp, mp1, mp2;
            
            if (!atom.capDrawn && atom.bonds.length < 4)
                fromCap = 2;
            
            var drawCyl = $3Dmol.GLDraw.drawCylinder; //mesh cylinder
            if(geo.imposter) 
                drawCyl = drawStickImposter;

                
            for (var i = 0; i < atom.bonds.length; i++) {
                var j = atom.bonds[i]; // our neighbor
                var atom2 = atoms[j]; //parsePDB, etc should only add defined bonds
                
                if (atom.serial < atom2.serial) {// only draw if less, this
                    // lets us combine
                    // cylinders of the same
                    // color
                    var style2 = atom2.style;
                    if (!style2.stick)
                        continue; // don't sweat the details                     
                   
                    var C2 = $3Dmol.getColorFromStyle(atom2, style2.stick);
                    
                    //support bond specific styles
                    bondR = atomBondR;                    
                    var singleBond = atomSingleBond;
                    if(atom.bondStyles && atom.bondStyles[i]) {
                        var bstyle = atom.bondStyles[i];
                        if(bstyle.iswire) {
                            continue;
                        }
                        if(bstyle.radius) bondR = bstyle.radius;
                        if(bstyle.singleBond) singleBond = true;
                        if(typeof(bstyle.color1) != "undefined") {
                            C1 = $3Dmol.CC.color(bstyle.color1);
                        }
                        if(typeof(bstyle.color2) != "undefined") {
                            C2 = $3Dmol.CC.color(bstyle.color2);
                        }
                    }
                    var p1 = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                    var p2 = new $3Dmol.Vector3(atom2.x, atom2.y, atom2.z);

                    // draw cylinders
                    if (atom.bondOrder[i] === 1 || singleBond) {

                        if (!atom2.capDrawn && atom2.bonds.length < 4)
                            toCap = 2;       
                                                
                        if (C1 != C2) {
                            mp = new $3Dmol.Vector3().addVectors(p1, p2)
                                    .multiplyScalar(0.5);
                            drawCyl(geo, p1, mp, bondR, C1, fromCap, 0);
                            drawCyl(geo, mp, p2, bondR, C2, 0, toCap);
                        } else {
                            drawCyl(geo, p1, p2, bondR, C1, fromCap, toCap);
                        }
                        
                        if (atom.clickable || atom2.clickable) {
                            mp = new $3Dmol.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
                            if (atom.clickable || atom.hoverable){
                                var cylinder1 = new $3Dmol.Cylinder(p1 , mp , bondR);
                                var sphere1 = new $3Dmol.Sphere(p1 , bondR);
                                atom.intersectionShape.cylinder.push(cylinder1);   
                                atom.intersectionShape.sphere.push(sphere1);                             
                            }
                            if (atom2.clickable || atom2.hoverable){
                                var cylinder2 = new $3Dmol.Cylinder(p2 , mp , bondR);
                                var sphere2 = new $3Dmol.Sphere(p2 , bondR);
                                atom2.intersectionShape.cylinder.push(cylinder2);
                                atom2.intersectionShape.sphere.push(sphere2);
                            }

                        }
                        
                    } 
                    
                    else if (atom.bondOrder[i] > 1) {
                        //multi bond caps
                        var mfromCap = 0;
                        var mtoCap = 0;
                        
                        if(bondR != atomBondR) {
                            //assume jmol style multiple bonds - the radius doesn't fit within atom sphere
                            mfromCap = 2;
                            mtoCap = 2;
                        }
                        
                        var dir = p2.clone();
                        var v = null;
                        dir.sub(p1);
                        
                        var r, p1a, p1b, p2a, p2b;
                        var v = getSideBondV(atom, atom2, i);
                        
                        if (atom.bondOrder[i] == 2) {
                            var r = bondR/2.5;
                            var v = getSideBondV(atom, atom2, i);
                            
                            v.multiplyScalar(r*1.5);
                            p1a = p1.clone();
                            p1a.add(v);
                            p1b = p1.clone();
                            p1b.sub(v);

                            p2a = p1a.clone();
                            p2a.add(dir);
                            p2b = p1b.clone();
                            p2b.add(dir);

                                                                 
                            if (C1 != C2) {
                                mp = new $3Dmol.Vector3().addVectors(p1a, p2a)
                                        .multiplyScalar(0.5);
                                mp2 = new $3Dmol.Vector3().addVectors(p1b, p2b)
                                        .multiplyScalar(0.5);
                                drawCyl(geo, p1a, mp, r, C1, mfromCap, 0);
                                drawCyl(geo, mp, p2a, r, C2, 0, mtoCap);
                                drawCyl(geo, p1b, mp2, r, C1, mfromCap, 0);
                                drawCyl(geo, mp2, p2b, r, C2, 0, mtoCap);
                            } else {
                                drawCyl(geo, p1a, p2a, r, C1, mfromCap, mtoCap);
                                drawCyl(geo, p1b, p2b, r, C1, mfromCap, mtoCap);
                            }
                            if (atom.clickable || atom2.clickable){
                                mp = new $3Dmol.Vector3().addVectors(p1a, p2a)
                                               .multiplyScalar(0.5);
                                mp2 = new $3Dmol.Vector3().addVectors(p1b, p2b)
                                                .multiplyScalar(0.5);
                                if (atom.clickable || atom.hoverable) {
                                    var cylinder1a = new $3Dmol.Cylinder(p1a , mp , r);
                                    var cylinder1b = new $3Dmol.Cylinder(p1b , mp2 , r);
                                    atom.intersectionShape.cylinder.push(cylinder1a);
                                    atom.intersectionShape.cylinder.push(cylinder1b);
                                }
                                if (atom2.clickable || atom2.hoverable) {
                                    var cylinder2a = new $3Dmol.Cylinder(p2a , mp , r);
                                    var cylinder2b = new $3Dmol.Cylinder(p2b , mp2 , r);
                                    atom2.intersectionShape.cylinder.push(cylinder2a);
                                    atom2.intersectionShape.cylinder.push(cylinder2b);                               
                                }
                            }
                        } 
                        else if (atom.bondOrder[i] == 3) {
                            r = bondR / 4;
                            v.cross(dir);
                            v.normalize();
                            v.multiplyScalar(r * 3);

                            p1a = p1.clone();
                            p1a.add(v);
                            p1b = p1.clone();
                            p1b.sub(v);

                            p2a = p1a.clone();
                            p2a.add(dir);
                            p2b = p1b.clone();
                            p2b.add(dir);

                            if (C1 != C2) {
                                mp = new $3Dmol.Vector3().addVectors(p1a, p2a)
                                        .multiplyScalar(0.5);
                                mp2 = new $3Dmol.Vector3().addVectors(p1b, p2b)
                                        .multiplyScalar(0.5);
                                mp3 = new $3Dmol.Vector3().addVectors(p1, p2)
                                        .multiplyScalar(0.5);
                                drawCyl(geo, p1a, mp, r, C1, mfromCap, 0);
                                drawCyl(geo, mp, p2a, r, C2, 0, mtoCap);
                                drawCyl(geo, p1, mp3, r, C1, fromCap, 0);
                                drawCyl(geo, mp3, p2, r, C2, 0, toCap);
                                drawCyl(geo, p1b, mp2, r, C1, mfromCap, 0);
                                drawCyl(geo, mp2, p2b, r, C2, 0, mtoCap);
                            } else {
                                drawCyl(geo, p1a, p2a, r, C1, mfromCap, mtoCap);
                                drawCyl(geo, p1, p2, r, C1, fromCap, toCap);
                                drawCyl(geo, p1b, p2b, r, C1, mfromCap, mtoCap);

                            }
                            if (atom.clickable || atom2.clickable) {
                                mp = new $3Dmol.Vector3().addVectors(p1a, p2a)
                                        .multiplyScalar(0.5);
                                mp2 = new $3Dmol.Vector3().addVectors(p1b, p2b)
                                        .multiplyScalar(0.5);
                                mp3 = new $3Dmol.Vector3().addVectors(p1, p2)
                                        .multiplyScalar(0.5);
                                                                
                                if (atom.clickable || atom.hoverable) {
                                    var cylinder1a = new $3Dmol.Cylinder(p1a.clone(), mp.clone(), r);
                                    var cylinder1b = new $3Dmol.Cylinder(p1b.clone(), mp2.clone(), r);
                                    var cylinder1c = new $3Dmol.Cylinder(p1.clone(), mp3.clone(), r);
                                    atom.intersectionShape.cylinder.push(cylinder1a);
                                    atom.intersectionShape.cylinder.push(cylinder1b);
                                    atom.intersectionShape.cylinder.push(cylinder1c);
                                } 
                                if (atom2.clickable || atom2.hoverable) {                               
                                    var cylinder2a = new $3Dmol.Cylinder(p2a.clone(), mp.clone(), r);
                                    var cylinder2b = new $3Dmol.Cylinder(p2b.clone(), mp2.clone(), r);
                                    var cylinder2c = new $3Dmol.Cylinder(p2.clone(), mp3.clone(), r);
                                    atom2.intersectionShape.cylinder.push(cylinder2a);
                                    atom2.intersectionShape.cylinder.push(cylinder2b);
                                    atom2.intersectionShape.cylinder.push(cylinder2c);                                
                                }
                            }
                        }
                    }
                     
                }                   
                                 
            }            

            // draw non bonded heteroatoms as spheres
            var drawSphere = false;
            var numsinglebonds = 0;
            var differentradii = false;
            //also, if any bonds were drawn as multiples, need sphere
            for(var i = 0; i < atom.bonds.length; i++) {
                var singleBond = atomSingleBond;
                if(atom.bondStyles && atom.bondStyles[i]) {
                    var bstyle = atom.bondStyles[i];
                    if(bstyle.singleBond) singleBond = true;
                    if(bstyle.radius && bstyle.radius != atomBondR) {
                        differentradii = true;
                    }
                }
                if(singleBond || atom.bondOrder[i] == 1) {
                    numsinglebonds++;
                }
            }
            
            if(differentradii) { //jmol style double/triple bonds - no sphere
                if(numsinglebonds > 0) drawSphere = true; //unless needed as a cap
            }
            else if(numsinglebonds == 0 && atom.bonds.length > 0) {
                drawSphere = true;
            }
           
            if (drawSphere) {
                var savedstyle = atom.style;
                bondR = atomBondR;
                //do not use bond style as this can be variable, particularly
                //with jmol export of double/triple bonds
                if(geo.imposter) {
                    drawSphereImposter(geo.sphereGeometry, atom, bondR, C1);
                }
                else {
                    $3Dmol.GLDraw.drawSphere(geo, atom, bondR, C1);
                }
            }
            
        };
        
        

        // go through all the atoms and regenerate their geometries
        // we try to have one geometry for each style since this is much much
        // faster
        // at some point we should optimize this to avoid unnecessary
        // recalculation
        /** param {AtomSpec[]} atoms */
        var createMolObj = function(atoms, options) {

            options = options || {};

            var ret = new $3Dmol.Object3D();
            var cartoonAtoms = [];
            var lineGeometries = {};
            var crossGeometries = {};
            
            var drawSphereFunc = drawAtomSphere;
            var sphereGeometry = null;
            var stickGeometry = null;
            if (options.supportsImposters) {
                drawSphereFunc = drawAtomImposter;
                sphereGeometry = new $3Dmol.Geometry(true);
                sphereGeometry.imposter = true;
                stickGeometry = new $3Dmol.Geometry(true, true);
                stickGeometry.imposter = true;
                stickGeometry.sphereGeometry = sphereGeometry; //for caps
                stickGeometry.drawnCaps = {};
            }
            else if (options.supportsAIA) {
                drawSphereFunc = drawAtomInstanced;
                sphereGeometry = new $3Dmol.Geometry(false, true,true);
                sphereGeometry.instanced = true;
                stickGeometry = new $3Dmol.Geometry(true); //don't actually have instanced sticks
            }  else {
                sphereGeometry = new $3Dmol.Geometry(true);
                stickGeometry = new $3Dmol.Geometry(true);
            }
            
            var i, j, n, testOpacities;
            var opacities = {};
            var range = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
            for (i = 0, n = atoms.length; i < n; i++) {
                var atom = atoms[i];
                // recreate gl info for each atom as necessary
                // set up appropriate intersection spheres for clickable atoms

                if (atom && atom.style) {

                    if ((atom.clickable || atom.hoverable) && atom.intersectionShape === undefined)
                        atom.intersectionShape = {sphere: [], cylinder: [], line: [], triangle : []};

                    testOpacities = {line:undefined, cross:undefined, stick:undefined, sphere:undefined};
                    for (j in testOpacities)
                    {
                        if (atom.style[j])
                        {
                            if (atom.style[j].opacity)
                                testOpacities[j] = parseFloat(atom.style[j].opacity);
                            else
                                testOpacities[j] = 1;

                        } else testOpacities[j] = undefined;

                        if (opacities[j])
                        {
                            if (testOpacities[j] != undefined && opacities[j] != testOpacities[j])
                            {
                                console.log("Warning: " + j + " opacity is ambiguous");
                                opacities[j] = 1;
                            }

                        } else opacities[j] = testOpacities[j];
                    }

                    drawSphereFunc(atom, sphereGeometry);
                   
                    drawAtomCross(atom, crossGeometries);
                    drawBondLines(atom, atoms, lineGeometries);
                    drawBondSticks(atom, atoms, stickGeometry);

                    if (typeof (atom.style.cartoon) !== "undefined" && !atom.style.cartoon.hidden) {
                        //gradient color scheme range
                        if (atom.style.cartoon.color === "spectrum" && typeof(atom.resi) === "number" && !atom.hetflag) {                            
                            if (atom.resi < range[0])
                                range[0] = atom.resi;
                            if (atom.resi > range[1])
                                range[1] = atom.resi;
                        }

                        cartoonAtoms.push(atom);
                    }                   
                }
            }
            // create cartoon if needed - this is a whole model analysis
            if (cartoonAtoms.length > 0) {
                $3Dmol.drawCartoon(ret, cartoonAtoms, range);
            }

            // add sphere geometry
            if (sphereGeometry && sphereGeometry.vertices > 0) {
                //Initialize buffers in geometry                
                sphereGeometry.initTypedArrays();                
                var sphereMaterial = null;
                
                //create appropriate material
                if(sphereGeometry.imposter) {
                    sphereMaterial = new $3Dmol.SphereImposterMaterial({
                        ambient : 0x000000,
                        vertexColors : true,
                        reflectivity : 0
                    });            
                }
                else if(sphereGeometry.instanced) {
                    var sphere = new $3Dmol.Geometry(true);
                    $3Dmol.GLDraw.drawSphere(sphere, {x:0, y:0, z:0}, 1, new $3Dmol.Color(0.5, 0.5, 0.5));
                    sphere.initTypedArrays();
                    sphereMaterial = new $3Dmol.InstancedMaterial({
                        sphereMaterial : new $3Dmol.MeshLambertMaterial({
                            ambient : 0x000000,
                            vertexColors : true,
                            reflectivity : 0,
                        }),
                        sphere : sphere
                    });                
                }
                else { //regular mesh
                    var sphereMaterial = new $3Dmol.MeshLambertMaterial({
                        ambient : 0x000000,
                        vertexColors : true,
                        reflectivity : 0,
                    });
                }
                if (opacities.sphere < 1 && opacities.sphere >= 0)
                {
                    sphereMaterial.transparent = true;
                    sphereMaterial.opacity = opacities.sphere;
                }
                
                var sphere = new $3Dmol.Mesh(sphereGeometry, sphereMaterial);
                ret.add(sphere);
            }
            
            // add stick geometry
            if (stickGeometry.vertices > 0) {
                
                if(stickGeometry.imposter) {
                    var imposterMaterial = new $3Dmol.StickImposterMaterial({
                        ambient : 0x000000,
                        vertexColors : true,
                        reflectivity : 0
                    });
                    
                    //Initialize buffers in geometry                
                    stickGeometry.initTypedArrays();
                    
                    var sticks = new $3Dmol.Mesh(stickGeometry, imposterMaterial);
                    ret.add(sticks);                    
                } else {                
                    var cylinderMaterial = new $3Dmol.MeshLambertMaterial({
                        vertexColors : true,
                        ambient : 0x000000,
                        reflectivity : 0
                    });
                    if (opacities.stick < 1 && opacities.stick >= 0)
                    {
                        cylinderMaterial.transparent = true;
                        cylinderMaterial.opacity = opacities.stick;
                    }
    
                    //Initialize buffers in geometry                
                    stickGeometry.initTypedArrays();
                    
                    if (cylinderMaterial.wireframe)
                        stickGeometry.setUpWireframe();
                
                    var sticks = new $3Dmol.Mesh(stickGeometry, cylinderMaterial);
                    ret.add(sticks);
                }
            }
            
            //var linewidth;
            // add any line geometries, distinguished by line width
            for (i in lineGeometries) {
                if (lineGeometries.hasOwnProperty(i)) {
                    var linewidth = i;
                    var lineMaterial = new $3Dmol.LineBasicMaterial({
                        linewidth : linewidth,
                        vertexColors : true
                    });
                    if (opacities.line < 1 && opacities.line >= 0)
                    {
                        lineMaterial.transparent = true;
                        lineMaterial.opacity = opacities.line;
                    }
                    
                    lineGeometries[i].initTypedArrays();
                    
                    var line = new $3Dmol.Line(lineGeometries[i], lineMaterial,
                            $3Dmol.LinePieces);

                    ret.add(line);
                }
            }

            // add any cross geometries
            for (i in crossGeometries) {
                if (crossGeometries.hasOwnProperty(i)) {
                    var linewidth = i;
                    var crossMaterial = new $3Dmol.LineBasicMaterial({
                        linewidth : linewidth,
                        vertexColors : true
                    });
                    if (opacities.cross < 1 && opacities.cross >= 0)
                    {
                        crossMaterial.transparent = true;
                        crossMaterial.opacity = opacities.cross;
                    }

                    crossGeometries[i].initTypedArrays();
                    
                    var cross = new $3Dmol.Line(crossGeometries[i], crossMaterial,
                            $3Dmol.LinePieces);

                    ret.add(cross);
                }
            }

            
            //for BIOMT assembly
            if (dontDuplicateAtoms && modelData.symmetries && modelData.symmetries.length > 0) {
                var finalRet = new $3Dmol.Object3D();
                var t;
                for (t = 0; t < modelData.symmetries.length; t++) {
                    var transformedRet = new $3Dmol.Object3D();
                    transformedRet = ret.clone();
                    transformedRet.matrix.copy(modelData.symmetries[t]);
                    transformedRet.matrixAutoUpdate = false;
                    finalRet.add(transformedRet);
                }
                return finalRet;
            }

            return ret;
        };
        
        
        this.getCrystData = function() {
            if (modelData.cryst) {
                return modelData.cryst;
            }
            else {
                return null;
            }
        }
        
        /**
         * Returns list of rotational/translational matrices if there is BIOMT data
         * Otherwise returns a list of just the ID matrix
         *
         * @function $3Dmol.GlModel#getSymmetries
         * @return {Array<$3Dmol.Matrix4>}
         *
         */
        this.getSymmetries = function() {
            
            if (typeof(modelData.symmetries) == 'undefined') {
                modelData.symmetries = [idMatrix];
            }
            return modelData.symmetries; 
        };
        
        /**
         * Sets symmetries based on specified matrices in list
         *
         * @function $3Dmol.GlModel#setSymmetries
         * @param {Array<$3Dmol.Matrix4>} list
         *
         */
        this.setSymmetries = function(list) {
            if (typeof(list) == "undefined") { //delete sym data
                modelData.symmetries = [idMatrix];
            }
            else {
                modelData.symmetries = list;
            }
        };

        /**
         * Returns model id number
         * 
         * @function $3Dmol.GLModel#getID
         * @return {number} Model ID
         */
        this.getID = function() {
            return id;
        };
        
        /**
         * Returns model's frames property, a list of atom lists
         * 
         * @function $3Dmol.GLModel#getFrames
         * @return {Array.<Object>}
         */
        this.getFrames = function() {
            return frames;
        };
        
        /**
         * Sets model's atomlist to specified frame
         * Sets to last frame if framenum out of range
         * 
         * @function $3Dmol.GLModel#setFrame
         * @param {number} framenum - model's atoms are set to this index in frames list
         */
        this.setFrame = function(framenum) {
            if (frames.length == 0) {
                return;
            }
            if (framenum >= 0 && framenum < frames.length) {
                atoms = frames[framenum];
            }
            else {
                atoms = frames[frames.length-1];
            }
            molObj = null;
        };
        
        /**
         * Add atoms as frames of model
         * 
         * @function $3Dmol.GLModel#addFrame
         * @param {AtomSpec} atom - atoms to be added
         */
        this.addFrame = function(atoms) {
            frames.push(atoms);
        };

        
        /**
         * If model atoms have dx, dy, dz properties (in some xyz files), vibrate populates the model's frame property based on parameters.
         * Model can then be animated
         * 
         * @function $3Dmol.GLModel#vibrate
         * @param {number} numFrames - number of frames to be created, default to 10
         * @param {number} amplitude - amplitude of distortion, default to 1 (full)
         * 
         *@example

          $3Dmol.download("pdb:4UAA",viewer,{},function(){  
            viewer.setStyle({},{stick:{}});
            viewer.vibrate(10, 1);
            viewer.animate({loop: "backAndForth"});
            viewer.zoomTo();
                  viewer.render();
              });            
         */
        this.vibrate = function(numFrames, amplitude) {
            var amplitude = amplitude || 1;
            var numFrames = numFrames || 10; 
            numFrames--;
            for (var i = 1; i <= numFrames; i++) {
                var newAtoms = [];
                for (var j = 0; j < atoms.length; j++) {
                    var newVector = new $3Dmol.Vector3(
                                            $3Dmol.getAtomProperty(atoms[j],'dx'), 
                                            $3Dmol.getAtomProperty(atoms[j],'dy'), 
                                            $3Dmol.getAtomProperty(atoms[j],'dz'));
                    var starting = new $3Dmol.Vector3(atoms[j].x, atoms[j].y, atoms[j].z);
                    newVector.multiplyScalar((i*amplitude)/numFrames);
                    starting.add(newVector);
                    var newAtom = {};
                    for (var k in atoms[j]) {
                        newAtom[k] = atoms[j][k];
                    }
                    newAtom.x = starting.x;
                    newAtom.y = starting.y;
                    newAtom.z = starting.z;
                    newAtoms.push(newAtom);
                }
                frames.push(newAtoms);
            }
            frames.unshift(atoms); //add 1st frame
        };
        
        // set default style and colors for atoms
        this.setAtomDefaults = function(atoms) {
            for ( var i = 0; i < atoms.length; i++) {
                var atom = atoms[i];
                if (atom) {
                    atom.style = atom.style || defaultAtomStyle;
                    atom.color = atom.color || ElementColors[atom.elem] || defaultColor;
                    atom.model = id;
                    if (atom.clickable || atom.hoverable)
                        atom.intersectionShape = {sphere : [], cylinder : [], line : [], triangle : []};
                }
            }
        };

        /** add atoms to this model from molecular data string
         * 
         * @function $3Dmol.GLModel#addMolData
         * @param {string|ArrayBuffer} data - atom structure file input data string, for gzipped input use ArrayBuffer
         * @param {string} format - input file string format (e.g 'pdb', 'sdf', 'sdf.gz', etc.)
         * @param {ParserOptionsSpec} options - format dependent options. Attributes depend on the input format
         */
        this.addMolData = function(data, format, options) {
            options = options || {};
            var parsedAtoms = $3Dmol.GLModel.parseMolData(data, format, options);
            dontDuplicateAtoms = !options.duplicateAssemblyAtoms;
            var mData = parsedAtoms.modelData;
            if (mData) {
                if (Array.isArray(mData)) {
                    modelData = mData[0];
                } else {
                    modelData = mData;
                }
            }

            if (frames.length == 0) { //first call
                for (var i = 0; i < parsedAtoms.length; i++) {  
                    if (parsedAtoms[i].length != 0)
                        frames.push(parsedAtoms[i]);
                }
                if(frames[0])
                    atoms = frames[0];
            }
            
            else { //subsequent calls
                if (options.frames) { //add to new frame
                    for (var i = 0; i < parsedAtoms.length; i++) {
                        frames.push(parsedAtoms[i]);
                    }
                }
                else { //add atoms to current frame
                    for (var i = 0; i < parsedAtoms.length; i++) {
                        this.addAtoms(parsedAtoms[i]); 
                    }
                }
            }
            
            for (var i = 0; i < frames.length; i++) {
                this.setAtomDefaults(frames[i], id);
            }

            if(options.vibrate && options.vibrate.frames && options.vibrate.amplitude) {
                //fill in vibrational modes
                this.vibrate(options.vibrate.frames, options.vibrate.amplitude);
            }
            
            if(options.style) {
                this.setStyle({},options.style);
            }
        };

        this.setDontDuplicateAtoms = function(dup) {
            dontDuplicateAtoms = dup;
        }

        this.setModelData = function(mData) {
            modelData = mData;
        }
        
        /** given a selection specification, return true if atom is selected
         * 
         * @function $3Dmol.GLModel#atomIsSelected
         * @param {AtomSpec} atom
         * @param {AtomSelectionSpec} sel
         * @return {boolean}
         */
        this.atomIsSelected = function(atom, sel) {
            if (typeof (sel) === "undefined")
                return true; // undef gets all
            var invert = !!sel.invert;
            var ret = true;
            for ( var key in sel) {
                if(key == "and" || key == "or" || key == "not"){//boolean fields
                    if(key == "not"){
                        if(this.atomIsSelected(atom,sel[key])){
                            ret=false;
                            break;
                        }
                    }else{//"or" and "and"
                        if(key == "and"){
                            var and=sel[key];//array format
                            for(var i=0;i<and.length;i++){
                                if(!this.atomIsSelected(atom,and[i])){
                                    ret=false;
                                    break;
                                }
                            }
                        }else if(key =="or"){
                            var or=sel[key];
                            var condition=true;
                            for(var i=0;i<or.length;i++){
                                if(this.atomIsSelected(atom,or[i])){
                                    condition=true;
                                    break;
                                }
                                else{
                                    condition=false;
                                }
                            }
                            ret=condition;
                        }
                    }

                }else if(key === 'predicate') { //a user supplied function for evaluating atoms
                    if(!sel['predicate'](atom) ) {
                        ret = false;
                        break;
                    }
                }
                else if(key == "properties" && atom[key]) {
                    for (var propkey in sel.properties) {
                        if(typeof(atom.properties[propkey]) === 'undefined') {
                            ret = false;
                            break
                        }
                        if(atom.properties[propkey] != sel.properties[propkey]) {
                            ret = false;
                            break;
                        }
                    }
                }
                else if (sel.hasOwnProperty(key) && key != "props" && key != "invert" && key != "model" && key != "byres" && key != "expand" && key != "within"  && key != "and" && key != "or" && key != "not") {

                    // if something is in sel, atom must have it                    
                    if (typeof (atom[key]) === "undefined") {
                        ret = false;
                        break;
                    }
                    var isokay = false;
                    if(key === "bonds") {
                        //special case counting number of bonds, for selecting nonbonded mostly
                        var val = sel[key];
                        if(val != atom.bonds.length) {
                            ret = false;
                            break;
                        }
                    }
                    else if ($.isArray(sel[key])) {
                        // can be any of the listed values
                        var valarr = sel[key];
                        for ( var i = 0; i < valarr.length; i++) {
                            if (atom[key] == valarr[i]) {
                                isokay = true;
                                break;
                            }
                        }
                        if (!isokay) {
                            ret = false;
                            break;
                        }
                    } else { // single match
                        var val = sel[key];
                        if (atom[key] != val) {
                            ret = false;
                            break;
                        }
                    }
                }
            }
            
            return invert ? !ret : ret;
        };


        /** return list of atoms selected by sel, this is specific to glmodel
         * 
         * @function $3Dmol.GLModel#selectedAtoms
         * @param {AtomSelectionSpec} sel
         * @return {Array.<Object>}
         * @example
         *$3Dmol.download("pdb:4UB9",viewer,{},function(){
                  viewer.setBackgroundColor(0xffffffff);

                  viewer.setStyle({chain:'A'},{line:{hidden:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'B'},{line:{linewidth:2.0,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'C'},{cross:{hidden:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'D'},{cross:{linewidth:2.0,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.RWB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'E'},{cross:{radius:2.0,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.RWB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'F'},{stick:{hidden:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.RWB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'G'},{stick:{radius:0.8,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.ROYGB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'H'},{stick:{singleBonds:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.ROYGB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.render();
              });
         */
        this.selectedAtoms = function(sel, from) {
            var ret = [];
            sel = sel || {};

            if (!from) from = atoms;
            var aLength = from.length;
            for ( var i = 0; i < aLength; i++) {
                var atom = from[i];
                if (atom) {
                    if (this.atomIsSelected(atom, sel))
                        ret.push(atom);
                }
            }

            // expand selection by some distance
            if (sel.hasOwnProperty("expand")) {

                // get atoms in expanded bounding box

                var expand = expandAtomList(ret, parseFloat(sel.expand));
                var retlen = ret.length;
                for (var i = 0; i < expand.length; i++) {
                    for (var j = 0; j < retlen; j++) {

                        var dist = squaredDistance(expand[i], ret[j]);
                        var thresh = Math.pow(sel.expand, 2);
                        if (dist < thresh && dist > 0) {
                            ret.push(expand[i]);
                        }
                    }
                }
            }

            // selection within distance of sub-selection
            if (sel.hasOwnProperty("within") && sel.within.hasOwnProperty("sel") && sel.within.hasOwnProperty("distance")) {

                // get atoms in second selection
                var sel2 = this.selectedAtoms(sel.within.sel, atoms);
                var within = {};
                for (var i = 0; i < sel2.length; i++) {
                    for (var j = 0; j < ret.length; j++) {

                        var dist = squaredDistance(sel2[i], ret[j]);
                        var thresh = Math.pow(parseFloat(sel.within.distance), 2);
                        if (dist < thresh && dist > 0) {
                          within[j] = 1;
                        }
                  }
                }
                var newret = [];
                if(sel.within.invert) {
                  for (var j = 0; j < ret.length; j++) {
                    if(!within[j]) newret.push(ret[j]);
                  }
                } else {
                  for(j in within) {
                    newret.push(ret[j]);
                  }
                }
                ret = newret;
            }

            // byres selection flag
            if (sel.hasOwnProperty("byres")) {

                // Keep track of visited residues, visited atoms, and atom stack
                var vResis = {};
                var vAtoms = [];
                var stack = [];

                for (var i = 0; i < ret.length; i++) {
                    
                    // Check if atom is part of a residue, and that the residue hasn't been traversed yet
                    var atom = ret[i];
                    var c = atom.chain;
                    var r = atom.resi;
                    if (vResis[c] === undefined) vResis[c] = {};
                    if (atom.hasOwnProperty("resi") && vResis[c][r] === undefined) {

                        // Perform a depth-first search of atoms with the same resi
                        vResis[c][r] = true;
                        stack.push(atom);
                        while(stack.length > 0) {
                            atom = stack.pop();
                            c = atom.chain;
                            r = atom.resi;
                            if (vAtoms[atom.index] === undefined) {
                                vAtoms[atom.index] = true;
                                for (var j = 0; j < atom.bonds.length; j++) {
                                    var atom2 = atoms[atom.bonds[j]];
                                    if (vAtoms[atom2.index] === undefined && atom2.hasOwnProperty("resi") && atom2.chain == c && atom2.resi == r) {
                                        stack.push(atom2);
                                        ret.push(atom2);
                                    }
                                }
                            }
                        }
                    }   
                }
            }

            return ret;
        };

        var squaredDistance = function(atom1, atom2) {
            var xd = atom2.x - atom1.x;
            var yd = atom2.y - atom1.y;
            var zd = atom2.z - atom1.z;
            return (Math.pow(xd, 2) + Math.pow(yd, 2) + Math.pow(zd, 2));
        };

        /** returns a list of atoms in the expanded bounding box, but not in the current one
         *
         *  Bounding box:
         *
         *    [ [ xmin, ymin, zmin ],
         *      [ xmax, ymax, zmax ],
         *      [ xctr, yctr, zctr ] ]
         *
         **/
        var expandAtomList = function(atomList, amt) {

            if (amt <= 0) return atomList;

            var pb = $3Dmol.getExtent(atomList); // previous bounding box
            var nb = [[], [], []]; // expanded bounding box

            for (var i = 0; i < 3; i++)
            {
                nb[0][i] = pb[0][i]-amt;
                nb[1][i] = pb[1][i]+amt;
                nb[2][i] = pb[2][i];
            }

            // look in added box "shell" for new atoms
            var expand = [];
            for (var i = 0; i < atoms.length; i++) {

                var x = atoms[i].x;
                var y = atoms[i].y;
                var z = atoms[i].z;

                if (x >= nb[0][0] && x <= nb[1][0] && y >= nb[0][1] && y <= nb[1][1] && z >= nb[0][2] && z <= nb[1][2]) {
                    if (!(x >= pb[0][0] && x <= pb[1][0] && y >= pb[0][1] && y <= pb[1][1] && z >= pb[0][2] && z <= pb[1][2])) {
                        expand.push(atoms[i]);
                    }
                }
            }
            return expand;
        };
        
        /** Add list of new atoms to model.  Adjusts bonds appropriately.
         * 
         * @function $3Dmol.GLModel#addAtoms
         * @param {type} newatoms
         * @example
         * var atoms = [{elem: 'C', x: 0, y: 0, z: 0, bonds: [1,2], bondOrder: [1,2]}, {elem: 'O', x: -1.5, y: 0, z: 0, bonds: [0]},{elem: 'O', x: 1.5, y: 0, z: 0, bonds: [0], bondOrder: [2]}];
           
            viewer.setBackgroundColor(0xffffffff);
            var m = viewer.addModel();
            m.addAtoms(atoms);
            m.setStyle({},{stick:{}});
            viewer.zoomTo();
            viewer.render();
         */        
        this.addAtoms = function(newatoms) {
            molObj = null;
            var start = atoms.length;
            var indexmap = [];
            // mapping from old index to new index
            var i;
            for(i = 0; i < newatoms.length; i++) {
                if(typeof(newatoms[i].index) == "undefined")
                    newatoms[i].index = i;
                if(typeof(newatoms[i].serial) == "undefined")
                    newatoms[i].serial = i;
                indexmap[newatoms[i].index] = start+i;
            }
            
            // copy and push newatoms onto atoms
            for(i = 0; i < newatoms.length; i++) {
                var olda = newatoms[i];
                var nindex = indexmap[olda.index];
                var a = $.extend(false, {}, olda);
                a.index = nindex;
                a.bonds = [];
                a.bondOrder = [];
                a.model = id;
                a.style = a.style || defaultAtomStyle;
                if(typeof(a.color) == "undefined")
                    a.color = ElementColors[a.elem] || defaultColor;                
                // copy over all bonds contained in selection,
                // updating indices appropriately
                var nbonds = olda.bonds ? olda.bonds.length : 0;
                for(var j = 0; j < nbonds; j++) {
                    var neigh = indexmap[olda.bonds[j]];
                    if(typeof(neigh) != "undefined") {
                        a.bonds.push(neigh);
                        a.bondOrder.push(olda.bondOrder ? olda.bondOrder[j] : 1);
                    }                
                }
                atoms.push(a);
            }
        };

        /** Remove specified atoms from model
         * 
         * @function $3Dmol.GLModel#removeAtoms
         * @param {type} badatoms - list of atoms
         * @return {removeAtoms}
         */
        this.removeAtoms = function(badatoms) {
            molObj = null;
            // make map of all baddies
            var baddies = [];
            var i;
            for(i = 0; i < badatoms.length; i++) {
                baddies[badatoms[i].index] = true;
            }
            
            // create list of good atoms
            var newatoms = [];
            for(i = 0; i < atoms.length; i++) {
                var a = atoms[i];
                if(!baddies[a.index])
                    newatoms.push(a);
            }
            
            // clear it all out
            atoms = [];
            // and add back in to get updated bonds
            this.addAtoms(newatoms);
        };
        
        
        /** Set atom style of selected atoms
         * 
         * @function $3Dmol.GLModel#setStyle
         * @param {AtomSelectionSpec} sel
         * @param {AtomStyleSpec} style
         * @param {boolean} add - if true, add to current style, don't replace
         @example
        $3Dmol.download("pdb:4UB9",viewer,{},function(){
                  viewer.setBackgroundColor(0xffffffff);

                  viewer.setStyle({chain:'A'},{line:{hidden:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'B'},{line:{linewidth:2.0,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'C'},{cross:{hidden:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'D'},{cross:{linewidth:2.0,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.RWB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'E'},{cross:{radius:2.0,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.RWB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'F'},{stick:{hidden:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.RWB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'G'},{stick:{radius:0.8,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.ROYGB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.setStyle({chain:'H'},{stick:{singleBonds:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.ROYGB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
                  viewer.render();
              });
         */
        this.setStyle = function(sel, style, add) {
            
            if(typeof(style) === 'undefined' && typeof(add) == 'undefined') {
                //if a single argument is provided, assume it is a style and select all
                style = sel;
                sel = {};
            }
            
            // report to console if this is not a valid selector
            var s;
            for (s in sel) {
                if(validAtomSelectionSpecs.indexOf(s) === -1) {
                    console.log('Unknown selector ' + s);
                }
            }
            // report to console if this is not a valid style
            for (s in style) {
                if(validAtomStyleSpecs.indexOf(s) === -1) {
                    console.log('Unknown style ' + s);
                }
            }

            var changedAtoms = false;
            // somethings we only calculate if there is a change in a certain
            // style, although these checks will only catch cases where both
            // are either null or undefined
            
            var setStyleHelper = function(atomArr) {
                var selected = that.selectedAtoms(sel, atomArr);
                for (var i = 0; i < atomArr.length; i++) {
                    if (atomArr[i]) atomArr[i].capDrawn = false; //reset for proper stick render
                }
            
                for ( var i = 0; i < selected.length; i++) {                
                    changedAtoms = true;
                    if (selected[i].clickable || selected[i].hoverable) 
                        selected[i].intersectionShape = {sphere : [], cylinder : [], line : [], triangle : []};                    
                   

                    if(!add) selected[i].style = {};
                    for(s in style) {
                        if(style.hasOwnProperty(s)) {
                            selected[i].style[s]=selected[i].style[s]||{}; //create distinct object for each atom
                            for(var prop in style[s]){
                                selected[i].style[s][prop]=style[s][prop];
                            }
                        }
                    }
                }
            }
            
            var that = this;
            setStyleHelper(atoms);
            for (var i = 0; i < frames.length; i++) {
                setStyleHelper(frames[i]);
            }
            
            if (changedAtoms)
                molObj = null; //force rebuild
            
        };

        /** Set clickable and callback of selected atoms
         * 
         * @function $3Dmol.GLModel#setClickable
         * @param {AtomSelectionSpec} sel - atom selection to apply clickable settings to
         * @param {boolean} clickable - whether click-handling is enabled for the selection
         * @param {function} callback - function called when an atom in the selection is clicked
         * @example
        
              viewer.addCylinder({start:{x:0.0,y:0.0,z:0.0},
                                  end:{x:10.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  fromCap:1,
                                  toCap:2,
                                  color:'red',
                                  hoverable:true,
                                  clickable:true,
                                  callback:function(){ this.color.setHex(0x00FFFF00);viewer.render();},
                                  hover_callback: function(){ viewer.render();},
                                  unhover_callback: function(){ this.color.setHex(0xFF000000);viewer.render();}
                                 });
              viewer.addCylinder({start:{x:0.0,y:2.0,z:0.0},
                                  end:{x:0.0,y:10.0,z:0.0},
                                  radius:0.5,
                                  fromCap:false,
                                  toCap:true,
                                  color:'teal'});
              viewer.addCylinder({start:{x:15.0,y:0.0,z:0.0},
                                  end:{x:20.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  color:'black',
                                  fromCap:false,
                                  toCap:false});
              viewer.render();
         */
        this.setClickable = function(sel, clickable, callback) {           

            // report to console if this is not a valid selector
            var s;
            for (s in sel) {
                if (validAtomSelectionSpecs.indexOf(s) === -1) {
                    console.log('Unknown selector ' + s);
                }
            }

            // make sure clickable is a boolean
            clickable = !!clickable;

            // report to console if callback is not a valid function
            if (callback && typeof callback != "function") {
                console.log("Callback is not a function");
                return;
            }

            var i;
            var selected = this.selectedAtoms(sel, atoms);
            var len = selected.length;
            for (i = 0; i < len; i++) {                

                selected[i].intersectionShape = {sphere : [], cylinder : [], line : [], triangle : []};
                selected[i].clickable = clickable;
                if (callback) selected[i].callback = callback;

            }

            if (len > 0) molObj = null; // force rebuild to get correct intersection shapes         
        };
         /** Set hoverable and callback of selected atoms
         * 
         * @function $3Dmol.GLModel#setHoverable
         * @param {AtomSelectionSpec} sel - atom selection to apply hoverable settings to
         * @param {boolean} hoverable - whether hover-handling is enabled for the selection
         * @param {function} hover_callback - function called when an atom in the selection is hovered over
         * @param {function} unhover_callback - function called when the mouse moves out of the hover area
         * @example
         
              viewer.addCylinder({start:{x:0.0,y:0.0,z:0.0},
                                  end:{x:10.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  fromCap:1,
                                  toCap:2,
                                  color:'red',
                                  hoverable:true,
                                  clickable:true,
                                  callback:function(){ this.color.setHex(0x00FFFF00);viewer.render();},
                                  hover_callback: function(){ viewer.render();},
                                  unhover_callback: function(){ this.color.setHex(0xFF000000);viewer.render();}
                                 });
              viewer.addCylinder({start:{x:0.0,y:2.0,z:0.0},
                                  end:{x:0.0,y:10.0,z:0.0},
                                  radius:0.5,
                                  fromCap:false,
                                  toCap:true,
                                  color:'teal'});
              viewer.addCylinder({start:{x:15.0,y:0.0,z:0.0},
                                  end:{x:20.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  color:'black',
                                  fromCap:false,
                                  toCap:false});
              viewer.render();
         */
        this.setHoverable = function(sel, hoverable, hover_callback,unhover_callback){
            var s;
            for (s in sel) {
                if (validAtomSelectionSpecs.indexOf(s) === -1) {
                    console.log('Unknown selector ' + s);
                }
            }

            // make sure hoverable is a boolean
            hoverable = !!hoverable;

            // report to console if hover_callback is not a valid function
            if (hover_callback && typeof hover_callback != "function") {
                console.log("Hover_callback is not a function");
                return;
            }
            // report to console if unhover_callback is not a valid function
            if (unhover_callback && typeof unhover_callback != "function") {
                console.log("Unhover_callback is not a function");
                return;
            }

            var i;
            var selected = this.selectedAtoms(sel, atoms);
            var len = selected.length;
            for (i = 0; i < len; i++) {                

                selected[i].intersectionShape = {sphere : [], cylinder : [], line : [], triangle : []};
                selected[i].hoverable= hoverable;
                if (hover_callback) selected[i].hover_callback = hover_callback;
                if (unhover_callback) selected[i].unhover_callback = unhover_callback;

            }

            if (len > 0) molObj = null; // force rebuild to get correct intersection shapes         
        }
        /** given a mapping from element to color, set atom colors
         * 
         * @function $3Dmol.GLModel#setColorByElement
         * @param {type} sel
         * @param {type} colors
         */
        this.setColorByElement = function(sel, colors) {
            
            if(molObj !== null && sameObj(colors,lastColors))
                return; // don't recompute
            lastColors = colors;
            var atoms = this.selectedAtoms(sel, atoms);
            if(atoms.length > 0)
                molObj = null; // force rebuild
            for ( var i = 0; i < atoms.length; i++) {
                var a = atoms[i];
                if(typeof(colors[a.elem]) !== "undefined") {
                    a.color = colors[a.elem];
                }
            }
        };
        
        /**
         * @function $3Dmol.GLModel.setColorByProperty
         * @param {type} sel
         * @param {type} prop
         * @param {type} gradient
         */
        this.setColorByProperty = function(sel, prop, scheme, range) {
            var i, a;
            var atoms = this.selectedAtoms(sel, atoms);
            lastColors = null; // don't bother memoizing
            if(atoms.length > 0)
                molObj = null; // force rebuild

            if(typeof($3Dmol.Gradient.builtinGradients[scheme]) != "undefined") {
                scheme = new $3Dmol.Gradient.builtinGradients[scheme]();
            }
            
            if(!range) { //no explicit range, get from scheme
                range = scheme.range();
            }
            
            if(!range) { //no range in scheme, compute the range for this model
                range = $3Dmol.getPropertyRange(atoms, prop);
            }
            // now apply colors using scheme
            for (i = 0; i < atoms.length; i++) {
                a = atoms[i];
                var val = $3Dmol.getAtomProperty(a, prop);
                if(val != null) {
                    a.color = scheme.valueToHex(parseFloat(a.properties[prop]), range);
                }                    
            }
        };
        
        /**
         * @function $3Dmol.GLModel#setColorByFunction
         * @deprecated use setStyle and colorfunc attribute
         * @param {type} sel - selection object
         * @param {type} func - function to be used to set the color
         @example
          $3Dmol.download("pdb:4UAA",viewer,{},function(){
                  viewer.setBackgroundColor(0xffffffff);
                  var colorAsSnake = function(atom) {
                    return atom.resi % 2 ? 'white': 'green'
                  };

                  viewer.setStyle( {}, { cartoon: {colorfunc: colorAsSnake }});

                  viewer.render();
              });
        
         */
        this.setColorByFunction = function(sel, colorfun) {
            var atoms = this.selectedAtoms(sel, atoms);
            if(typeof(colorfun)!=='function')
                return
            lastColors = null; // don't bother memoizing
            if(atoms.length > 0)
                molObj = null; // force rebuild
            
            // now apply colorfun
            for (i = 0; i < atoms.length; i++) {
                a = atoms[i];
                a.color = colorfun(a);
            }
        };

        /** Convert the model into an object in the format of a ChemDoodle JSON model.
         *
         * @function $3Dmol.GLModel#toCDObject
         * @param {boolean} whether or not to include style information. Defaults to false.
         * @return {Object}
         */
        this.toCDObject = function(includeStyles) {
            var out = { a:[], b:[] };
            if (includeStyles) {
                out.s = [];
            }
            for (var i = 0; i < atoms.length; i++) {
                var atomJSON = {};
                var atom = atoms[i];
                atomJSON.x = atom.x;
                atomJSON.y = atom.y;
                atomJSON.z = atom.z;
                if (atom.elem != "C") {
                    atomJSON.l = atom.elem;
                }
                if (includeStyles) {
                    var s = 0;
                    while (s < out.s.length &&
                          (JSON.stringify(atom.style) !== JSON.stringify(out.s[s]))) {
                        s++;
                    }
                    if (s === out.s.length) {
                        out.s.push(atom.style);
                    }
                    if (s !== 0) {
                        atomJSON.s = s;
                    }
                }
                
                out.a.push(atomJSON);

                for (var b = 0; b < atom.bonds.length; b++) {
                    var firstAtom = i;
                    var secondAtom = atom.bonds[b];
                    if (firstAtom >= secondAtom)
                        continue;
                    var bond = {
                        b: firstAtom,
                        e: secondAtom
                    };
                    var bondOrder =  atom.bondOrder[b];
                    if (bondOrder != 1) {
                        bond.o = bondOrder;
                    }
                    out.b.push(bond);
                }
            }
            return out;
        }


        /** manage the globj for this model in the possed modelGroup - if it has to be regenerated, remove and add
         * 
         * @function $3Dmol.GLModel#globj
         * @param {$3Dmol.Object3D} group
         * @param Object options
         */
        this.globj = function(group, options) {
            var time = new Date();
            if(molObj === null) { // have to regenerate
                molObj = createMolObj(atoms, options);
                var time2 = new Date();
                //console.log("object creation time: " + (time2 - time));
                if(renderedMolObj) { // previously rendered, remove
                    group.remove(renderedMolObj);
                    renderedMolObj = null;
                }
                renderedMolObj = molObj.clone();
                if(hidden) {
                    renderedMolObj.setVisible(false);
                    molObj.setVisible(false);
                }
                group.add(renderedMolObj);              
            }
        };
        
        /** Remove any renderable mol object from scene
         * 
         * @function $3Dmol.GLModel#removegl
         * @param {$3Dmol.Object3D} group
         */
        this.removegl = function(group) {
            if(renderedMolObj) {
                //dispose of geos and materials
                if (renderedMolObj.geometry !== undefined) renderedMolObj.geometry.dispose();             
                if (renderedMolObj.material !== undefined) renderedMolObj.material.dispose();
                group.remove(renderedMolObj);
                renderedMolObj = null;
            }
            molObj = null;
        };
        
        /**@function hide
             Don't show this model is future renderings.  Keep all styles and state
         * so it can be efficiencly shown again.
         * @example
         var element=$('#gldiv');
         var viewer = $3Dmol.createViewer(element);
            var m = viewer.addModel();
            m.hide();
            viewer.render(callback);

         * @function $3Dmol.GLModel#hide
         */
        this.hide = function() {
            hidden = true;
            if(renderedMolObj) renderedMolObj.setVisible(false);
            if(molObj) molObj.setVisible(false);
        }
        
        this.show = function() {
            hidden = false;
            if(renderedMolObj) renderedMolObj.setVisible(true);
            if(molObj) molObj.setVisible(true);
        }
        
        /** Create labels for residues of selected atoms.
         * Will create a single label at the center of mass of all atoms
         * with the same chain,resn, and resi.
         * @function $3Dmol.GLModel#addResLabels
         * 
         * @param {AtomSelectionSpec} sel
         * @param {$3Dmol.GLViewer} viewer
         */
        this.addResLabels = function(sel, viewer, style) {
            var atoms = this.selectedAtoms(sel, atoms);
            var bylabel = {}
            //collect by chain:resn:resi
            for(var i = 0; i < atoms.length; i++) {
                var a = atoms[i];
                var c = a.chain;
                var resn = a.resn;
                var resi = a.resi;
                var label =  resn + '' + resi;
                if(!bylabel[c]) bylabel[c] = {};
                if(!bylabel[c][label]) bylabel[c][label] = []
                bylabel[c][label].push(a);
            }
            
            var mystyle = $.extend(true, {}, style);
            //now compute centers of mass
            for(var c in bylabel) {
                if(bylabel.hasOwnProperty(c)) {
                    var labels = bylabel[c];
                    for(var label in labels) {
                        if(labels.hasOwnProperty(label)) {
                            var atoms = labels[label];
                            var sum = new $3Dmol.Vector3(0,0,0);
                            for(var i = 0; i < atoms.length; i++) {
                                var a = atoms[i];
                                sum.x += a.x;
                                sum.y += a.y;
                                sum.z += a.z;
                            }
                            sum.divideScalar(atoms.length);
                            mystyle.position = sum;
                            viewer.addLabel(label, mystyle);
                        }                        
                    }
                }
            }
        }

    /**
    * Set coordinates for the atoms parsed from the prmtop file. 
    * @function $3Dmol.GLModel#setCoordinates
    * @param {string} str - contains the data of the file
    * @param {string} format - contains the format of the file
    * @param {function} callback - function called when a inpcrd or a mdcrd file is uploaded
    */

        this.setCoordinates = function(str, format) {
            format = format || "";
            if (!str)
                return []; // leave an empty model

            if (/\.gz$/.test(format)) {
                // unzip gzipped files
                format = format.replace(/\.gz$/, '');
                try {
                    str = pako.inflate(str, {
                        to : 'string'
                    });
                } catch (err) {
                    console.log(err);
                }
            }
            if (format == "mdcrd" || format == "inpcrd" || format == "pdb") {
                frames = [];
                var atomCount = atoms.length;
                var values = GLModel.parseCrd(str, format);
                var count = 0;
                while (count < values.length) {
                    var temp = [];
                    for (var i = 0; i < atomCount; i++) {
                        var newAtom = {};
                        for (var k in atoms[i]) {
                            newAtom[k] = atoms[i][k];
                        }
                        temp[i] = newAtom;
                        temp[i].x = values[count++];
                        temp[i].y = values[count++];
                        temp[i].z = values[count++];
                    }

                    frames.push(temp);
                }
                atoms = frames[0];
                return frames;
            }
            return [];
        }

       /**
        * add atomSpecs to validAtomSelectionSpecs
        * @function $3Dmol.GLModel#addAtomSpecs
        * @param {Array} customAtomSpecs - array of strings that can be used as atomSelectionSpecs
        * this is to prevent the 'Unknown Selector x' message on the console for the strings passed
        * 
        */

        this.addAtomSpecs = function(customAtomSpecs) {
            for (var i = 0; i < customAtomSpecs.length; i++) {
                if (validAtomSelectionSpecs.indexOf(customAtomSpecs[i]) == -1) {
                    validAtomSelectionSpecs.push(customAtomSpecs[i]);
                }
            }
        }
    }

    GLModel.parseCrd = function(data, format) {
        var values = []; // this will contain the all the float values in the
                            // file.
        var counter = 0;
        if (format == "pdb") {
            var index = data.indexOf("\nATOM");
            while (index != -1) {
                while (data.slice(index, index + 5) == "\nATOM"
                        || data.slice(index, index + 7) == "\nHETATM") {
                    values[counter++] = parseFloat(data.slice(index + 31,
                            index + 39));
                    values[counter++] = parseFloat(data.slice(index + 39,
                            index + 47));
                    values[counter++] = parseFloat(data.slice(index + 47,
                            index + 55));
                    index = data.indexOf("\n", index + 54);
                    if (data.slice(index, index + 4) == "\nTER")
                        index = data.indexOf("\n", index + 5);
                }
                index = data.indexOf("\nATOM", index);
            }
            return values;
        } else {
            var index = data.indexOf("\n"); // remove the first line containing title
            if(format == 'inpcrd') {
                index = data.indexOf("\n",index+1); //remove second line w/#atoms
            }                

            data = data.slice(index + 1);
            values = data.match(/\S+/g).map(parseFloat);
            return values;
        }
    }

    GLModel.parseMolData = function(data, format, options) {
        format = format || "";

        if (!data)
            return []; //leave an empty model

        if(/\.gz$/.test(format)) {
            //unzip gzipped files
            format = format.replace(/\.gz$/,'');
            try {
                data = pako.inflate(data, {to: 'string'});
            } catch(err) {
                console.log(err);
            }
        }

        if (typeof ($3Dmol.Parsers[format]) == "undefined") {
            // let someone provide a file name and get format from extension
            format = format.split('.').pop();
            if (typeof ($3Dmol.Parsers[format]) == "undefined") {
                console.log("Unknown format: " + format);
                // try to guess correct format from data contents
                if (data.match(/^@<TRIPOS>MOLECULE/gm)) {
                    format = "mol2";
                } else if (data.match(/^HETATM/gm) || data.match(/^ATOM/gm)) {
                    format = "pdb";
                } else if (data.match(/^.*\n.*\n.\s*(\d+)\s+(\d+)/gm)) {
                    format = "sdf"; // could look at line 3 
                } else if (data.match(/^%VERSION\s+\VERSION_STAMP/gm)) {
                    format = "prmtop";
                } else {
                    format = "xyz";
                }
                console.log("Best guess: " + format);
            }
        }
        var parse = $3Dmol.Parsers[format];
        var parsedAtoms = parse(data, options);

        return parsedAtoms;
    };


    // set default style and colors for atoms
    GLModel.setAtomDefaults = function(atoms, id) {
        for ( var i = 0; i < atoms.length; i++) {
            var atom = atoms[i];
            if (atom) {
                atom.style = atom.style || defaultAtomStyle;
                atom.color = atom.color || ElementColors[atom.elem] || defaultColor;
                atom.model = id;
                if (atom.clickable || atom.hoverable)
                    atom.intersectionShape = {sphere : [], cylinder : [], line : [], triangle : []};
            }
        }
    };

    return GLModel;
    
})();
/**
 * A GLShape is a collection of user specified shapes.
 * 
 * @constructor $3Dmol.GLShape
 * @extends {ShapeSpec}
 * @param {number} sid - Unique identifier
 * @param {ShapeSpec} stylespec - shape style specification
 */

 

$3Dmol.GLShape = (function() {

    // Marching cube, to match with protein surface generation
    var ISDONE = 2;

    
    var finalizeGeo = function(geo) {
        //to avoid creating a bunch of geometries, we leave geoGroup untruncated
        //until render is called, at which point we truncate; 
        //successive called up updateGeo will return a new geometry
        var geoGroup = geo.updateGeoGroup(0);
        if(geoGroup.vertices > 0) {
            geoGroup.truncateArrayBuffers(true, true);
        }
    };
    
    /**
     * 
     * @param {$3Dmol.Geometry}
     *            geo
     * @param {$3Dmol.Color |
     *            colorlike} color
     */
    var updateColor = function(geo, color) {

        var C = color || $3Dmol.CC.color(color);
        geo.colorsNeedUpdate = true;
        
        var r,g,b;
        if(! (color.constructor === Array)) {
            r = color.r;
            g = color.g;
            b = color.b;
        }


        for ( var gg in geo.geometryGroups) {

            var geoGroup = geo.geometryGroups[gg];
            var colorArr = geoGroup.colorArray;

            for (var i = 0, il = geoGroup.vertices; i < il; ++i) {
            
                if( color.constructor === Array) {
                    var c = color[i];
                    r = c.r;
                    g = c.g;
                    b = c.b;
                }

                colorArr[i * 3] = r;
                colorArr[i * 3 + 1] = g;
                colorArr[i * 3 + 2] = b;
            }
        }

    };


    /**
     * @param {$3Dmol.GLShape}
     *            shape
     * @param {geometryGroup}
     *            geoGroup
     * @param {ArrowSpec}
     *            spec
     */
    var drawArrow = function(shape, geo, spec) {

        var from = spec.start, end = spec.end, radius = spec.radius, radiusRatio = spec.radiusRatio, mid = spec.mid;

        if (!(from && end))
            return;

        var geoGroup = geo.updateGeoGroup(51);

        // vertices

        var dir = end.clone();
        dir.sub(from).multiplyScalar(mid);
        var to = from.clone().add(dir);
        var negDir = dir.clone().negate();

        shape.intersectionShape.cylinder.push(new $3Dmol.Cylinder(from.clone(),
                to.clone(), radius));
        shape.intersectionShape.sphere.push(new $3Dmol.Sphere(from.clone(),
                radius));

        // get orthonormal vector
        var nvecs = [];
        nvecs[0] = dir.clone();
        if (Math.abs(nvecs[0].x) > 0.0001)
            nvecs[0].y += 1;
        else
            nvecs[0].x += 1;
        nvecs[0].cross(dir);
        nvecs[0].normalize();

        nvecs[0] = nvecs[0];
        // another orth vector
        nvecs[4] = nvecs[0].clone();
        nvecs[4].crossVectors(nvecs[0], dir);
        nvecs[4].normalize();
        nvecs[8] = nvecs[0].clone().negate();
        nvecs[12] = nvecs[4].clone().negate();

        // now quarter positions
        nvecs[2] = nvecs[0].clone().add(nvecs[4]).normalize();
        nvecs[6] = nvecs[4].clone().add(nvecs[8]).normalize();
        nvecs[10] = nvecs[8].clone().add(nvecs[12]).normalize();
        nvecs[14] = nvecs[12].clone().add(nvecs[0]).normalize();

        // eights
        nvecs[1] = nvecs[0].clone().add(nvecs[2]).normalize();
        nvecs[3] = nvecs[2].clone().add(nvecs[4]).normalize();
        nvecs[5] = nvecs[4].clone().add(nvecs[6]).normalize();
        nvecs[7] = nvecs[6].clone().add(nvecs[8]).normalize();
        nvecs[9] = nvecs[8].clone().add(nvecs[10]).normalize();
        nvecs[11] = nvecs[10].clone().add(nvecs[12]).normalize();
        nvecs[13] = nvecs[12].clone().add(nvecs[14]).normalize();
        nvecs[15] = nvecs[14].clone().add(nvecs[0]).normalize();

        var start = geoGroup.vertices;
        var vertexArray = geoGroup.vertexArray;
        var colorArray = geoGroup.colorArray;
        var faceArray = geoGroup.faceArray;
        var normalArray = geoGroup.normalArray;
        var lineArray = geoGroup.lineArray;

        var offset, i, n;
        // add vertices, opposing vertices paired together
        for (i = 0, n = nvecs.length; i < n; ++i) {
            offset = 3 * (start + 3 * i);
            var bottom = nvecs[i].clone().multiplyScalar(radius).add(from);
            var top = nvecs[i].clone().multiplyScalar(radius).add(to);
            var conebase = nvecs[i].clone()
                    .multiplyScalar(radius * radiusRatio).add(to);

            vertexArray[offset] = bottom.x;
            vertexArray[offset + 1] = bottom.y;
            vertexArray[offset + 2] = bottom.z;

            vertexArray[offset + 3] = top.x;
            vertexArray[offset + 4] = top.y;
            vertexArray[offset + 5] = top.z;

            vertexArray[offset + 6] = conebase.x;
            vertexArray[offset + 7] = conebase.y;
            vertexArray[offset + 8] = conebase.z;

            if (i > 0) {
                var prev_x = vertexArray[offset - 3];
                var prev_y = vertexArray[offset - 2];
                var prev_z = vertexArray[offset - 1];

                var c = new $3Dmol.Vector3(prev_x, prev_y, prev_z);
                var b = end.clone(), b2 = to.clone();
                var a = new $3Dmol.Vector3(conebase.x, conebase.y, conebase.z);

                shape.intersectionShape.triangle.push(new $3Dmol.Triangle(a, b,
                        c));
                shape.intersectionShape.triangle.push(new $3Dmol.Triangle(c
                        .clone(), b2, a.clone()));
            }
        }

        geoGroup.vertices += 48;
        offset = geoGroup.vertices * 3;

        // caps
        vertexArray[offset] = from.x;
        vertexArray[offset + 1] = from.y;
        vertexArray[offset + 2] = from.z;

        vertexArray[offset + 3] = to.x;
        vertexArray[offset + 4] = to.y;
        vertexArray[offset + 5] = to.z;

        vertexArray[offset + 6] = end.x;
        vertexArray[offset + 7] = end.y;
        vertexArray[offset + 8] = end.z;

        geoGroup.vertices += 3;

        // now faces
        var face, norm, faceoffset, lineoffset;
        var t1, t2, t2b, t3, t3b, t4, t1offset, t2offset, t2boffset, t3offset, t3boffset, t4offset;
        var n1, n2, n3, n4;
        var n_vertices = 0;
        var fromi = geoGroup.vertices - 3, toi = geoGroup.vertices - 2, endi = geoGroup.vertices - 1;
        var fromoffset = fromi * 3, tooffset = toi * 3, endoffset = endi * 3;
        for (i = 0, n = nvecs.length - 1; i < n; ++i) {

            var ti = start + 3 * i;
            offset = ti * 3;
            faceoffset = geoGroup.faceidx;
            lineoffset = geoGroup.lineidx;

            t1 = ti;
            t1offset = t1 * 3;
            t2 = ti + 1;
            t2offset = t2 * 3;
            t2b = ti + 2;
            t2boffset = t2b * 3;
            t3 = ti + 4;
            t3offset = t3 * 3;
            t3b = ti + 5;
            t3boffset = t3b * 3;
            t4 = ti + 3;
            t4offset = t4 * 3;

            // face = [t1, t2, t4], [t2, t3, t4];
            // face = [t1, t2, t3, t4];

            norm = [ nvecs[i], nvecs[i], nvecs[i + 1], nvecs[i + 1] ];

            n1 = n2 = nvecs[i];
            n3 = n4 = nvecs[i + 1];

            normalArray[t1offset] = n1.x;
            normalArray[t2offset] = n2.x;
            normalArray[t4offset] = n4.x;
            normalArray[t1offset + 1] = n1.y;
            normalArray[t2offset + 1] = n2.y;
            normalArray[t4offset + 1] = n4.y;
            normalArray[t1offset + 2] = n1.z;
            normalArray[t2offset + 2] = n2.z;
            normalArray[t4offset + 2] = n4.z;

            normalArray[t2offset] = n2.x;
            normalArray[t3offset] = n3.x;
            normalArray[t4offset] = n4.x;
            normalArray[t2offset + 1] = n2.y;
            normalArray[t3offset + 1] = n3.y;
            normalArray[t4offset + 1] = n4.y;
            normalArray[t2offset + 2] = n2.z;
            normalArray[t3offset + 2] = n3.z;
            normalArray[t4offset + 2] = n4.z;

            normalArray[t2boffset] = n2.x;
            normalArray[t3boffset] = n3.x;
            normalArray[t2boffset + 1] = n2.y;
            normalArray[t3boffset + 1] = n3.y;
            normalArray[t2boffset + 2] = n2.z;
            normalArray[t3boffset + 2] = n3.z;

            // sides
            faceArray[faceoffset] = t1;
            faceArray[faceoffset + 1] = t2;
            faceArray[faceoffset + 2] = t4;
            faceArray[faceoffset + 3] = t2;
            faceArray[faceoffset + 4] = t3;
            faceArray[faceoffset + 5] = t4;
            // caps
            faceArray[faceoffset + 6] = t1;
            faceArray[faceoffset + 7] = t4;
            faceArray[faceoffset + 8] = fromi;
            faceArray[faceoffset + 9] = t2b;
            faceArray[faceoffset + 10] = toi;
            faceArray[faceoffset + 11] = t3b;
            // arrowhead
            faceArray[faceoffset + 12] = t2b;
            faceArray[faceoffset + 13] = endi;
            faceArray[faceoffset + 14] = t3b;

            // sides
            lineArray[lineoffset] = t1;
            lineArray[lineoffset + 1] = t2;
            lineArray[lineoffset + 2] = t1;
            lineArray[lineoffset + 3] = t4;
            // lineArray[lineoffset+4] = t2, lineArray[lineoffset+5] = t3;
            lineArray[lineoffset + 4] = t3;
            lineArray[lineoffset + 5] = t4;
            // caps
            lineArray[lineoffset + 6] = t1;
            lineArray[lineoffset + 7] = t4;
            // lineArray[lineoffset+10] = t1, lineArray[lineoffset+11] = fromi;
            // lineArray[lineoffset+12] = t4, lineArray[lineoffset+13] = fromi;

            lineArray[lineoffset + 8] = t2b;
            lineArray[lineoffset + 9] = t2; // toi
            lineArray[lineoffset + 10] = t2b;
            lineArray[lineoffset + 11] = t3b;
            lineArray[lineoffset + 12] = t3;
            lineArray[lineoffset + 13] = t3b; // toi
            // arrowhead
            lineArray[lineoffset + 14] = t2b;
            lineArray[lineoffset + 15] = endi;
            lineArray[lineoffset + 16] = t2b;
            lineArray[lineoffset + 17] = t3b;
            lineArray[lineoffset + 18] = endi;
            lineArray[lineoffset + 19] = t3b;

            geoGroup.faceidx += 15;
            geoGroup.lineidx += 20;

        }
        // final face

        face = [ start + 45, start + 46, start + 1, start, start + 47,
                start + 2 ];
        norm = [ nvecs[15], nvecs[15], nvecs[0], nvecs[0] ];

        faceoffset = geoGroup.faceidx;
        lineoffset = geoGroup.lineidx;

        t1 = face[0];
        t1offset = t1 * 3;
        t2 = face[1];
        t2offset = t2 * 3;
        t2b = face[4];
        t2boffset = t2b * 3;
        t3 = face[2];
        t3offset = t3 * 3;
        t3b = face[5];
        t3boffset = t3b * 3;
        t4 = face[3];
        t4offset = t4 * 3;

        n1 = n2 = nvecs[15];
        n3 = n4 = nvecs[0];

        normalArray[t1offset] = n1.x;
        normalArray[t2offset] = n2.x;
        normalArray[t4offset] = n4.x;
        normalArray[t1offset + 1] = n1.y;
        normalArray[t2offset + 1] = n2.y;
        normalArray[t4offset + 1] = n4.y;
        normalArray[t1offset + 2] = n1.z;
        normalArray[t2offset + 2] = n2.z;
        normalArray[t4offset + 2] = n4.z;

        normalArray[t2offset] = n2.x;
        normalArray[t3offset] = n3.x;
        normalArray[t4offset] = n4.x;
        normalArray[t2offset + 1] = n2.y;
        normalArray[t3offset + 1] = n3.y;
        normalArray[t4offset + 1] = n4.y;
        normalArray[t2offset + 2] = n2.z;
        normalArray[t3offset + 2] = n3.z;
        normalArray[t4offset + 2] = n4.z;

        normalArray[t2boffset] = n2.x;
        normalArray[t3boffset] = n3.x;
        normalArray[t2boffset + 1] = n2.y;
        normalArray[t3boffset + 1] = n3.y;
        normalArray[t2boffset + 2] = n2.z;
        normalArray[t3boffset + 2] = n3.z;

        // Cap normals
        dir.normalize();
        negDir.normalize();
        normalArray[fromoffset] = negDir.x;
        normalArray[tooffset] = normalArray[endoffset] = dir.x;
        normalArray[fromoffset + 1] = negDir.y;
        normalArray[tooffset + 1] = normalArray[endoffset + 1] = dir.y;
        normalArray[fromoffset + 2] = negDir.z;
        normalArray[tooffset + 2] = normalArray[endoffset + 2] = dir.z;

        // Final side
        faceArray[faceoffset] = t1;
        faceArray[faceoffset + 1] = t2;
        faceArray[faceoffset + 2] = t4;
        faceArray[faceoffset + 3] = t2;
        faceArray[faceoffset + 4] = t3;
        faceArray[faceoffset + 5] = t4;
        // final caps
        faceArray[faceoffset + 6] = t1;
        faceArray[faceoffset + 7] = t4;
        faceArray[faceoffset + 8] = fromi;
        faceArray[faceoffset + 9] = t2b;
        faceArray[faceoffset + 10] = toi;
        faceArray[faceoffset + 11] = t3b;
        // final arrowhead
        faceArray[faceoffset + 12] = t2b;
        faceArray[faceoffset + 13] = endi;
        faceArray[faceoffset + 14] = t3b;

        // sides
        lineArray[lineoffset] = t1;
        lineArray[lineoffset + 1] = t2;
        lineArray[lineoffset + 2] = t1;
        lineArray[lineoffset + 3] = t4;
        // lineArray[lineoffset+4] = t2, lineArray[lineoffset+5] = t3;
        lineArray[lineoffset + 4] = t3;
        lineArray[lineoffset + 5] = t4;
        // caps
        lineArray[lineoffset + 6] = t1;
        lineArray[lineoffset + 7] = t4;
        // lineArray[lineoffset+10] = t1, lineArray[lineoffset+11] = fromi;
        // lineArray[lineoffset+12] = t4, lineArray[lineoffset+13] = fromi;

        lineArray[lineoffset + 8] = t2b;
        lineArray[lineoffset + 9] = t2; // toi
        lineArray[lineoffset + 10] = t2b;
        lineArray[lineoffset + 11] = t3b;
        lineArray[lineoffset + 12] = t3;
        lineArray[lineoffset + 13] = t3b; // toi
        // arrowhead
        lineArray[lineoffset + 14] = t2b;
        lineArray[lineoffset + 15] = endi;
        lineArray[lineoffset + 16] = t2b;
        lineArray[lineoffset + 17] = t3b;
        lineArray[lineoffset + 18] = endi;
        lineArray[lineoffset + 19] = t3b;

        geoGroup.faceidx += 15;
        geoGroup.lineidx += 20;

    };

    //helper function for adding an appropriately sized mesh
    var addCustomGeo = function(shape, geo, mesh, color, clickable) {
        var geoGroup = geo.addGeoGroup();
        var vertexArr = mesh.vertexArr, normalArr = mesh.normalArr, 
            faceArr = mesh.faceArr;

        geoGroup.vertices = vertexArr.length;
        geoGroup.faceidx = faceArr.length;

        var offset, v, a, b, c, i, il;
        var vertexArray = geoGroup.vertexArray;
        var colorArray = geoGroup.colorArray;
        
        if(! (color.constructor === Array)) {
            var r = color.r;
            var g = color.g;
            var b = color.b;
        }
        for (i = 0, il = geoGroup.vertices; i < il; ++i) {
            offset = i * 3;
            v = vertexArr[i];
            vertexArray[offset] = v.x;
            vertexArray[offset + 1] = v.y;
            vertexArray[offset + 2] = v.z;
            
            if( color.constructor === Array) {
                var c = color[i];
                var r = c.r;
                var g = c.g;
                var b = c.b;
            }
            
            colorArray[offset] = r;
            colorArray[offset + 1] = g;
            colorArray[offset + 2] = b;
        }
        
        if(clickable) {
            for (i = 0, il = geoGroup.faceidx / 3; i < il; ++i) {
                offset = i * 3;
                a = faceArr[offset];
                b = faceArr[offset + 1];
                c = faceArr[offset + 2];
                var vA = new $3Dmol.Vector3(), vB = new $3Dmol.Vector3(), vC = new $3Dmol.Vector3();
                shape.intersectionShape.triangle.push(new $3Dmol.Triangle(vA
                        .copy(vertexArr[a]), vB.copy(vertexArr[b]), vC
                        .copy(vertexArr[c])));
            }
        }
        
        if(clickable) {
            
            var center = new $3Dmol.Vector3(0,0,0);
            var cnt = 0;
            for(var g = 0; g < geo.geometryGroups.length; g++) {
                center.add(geo.geometryGroups[g].getCentroid());
                cnt++;
            }
            center.divideScalar(cnt);
            
            
            updateBoundingFromPoints(shape.boundingSphere, {centroid: center}, vertexArray);
        }

        geoGroup.faceArray = new Uint16Array(faceArr);

        geoGroup.truncateArrayBuffers(true, true);

        if (normalArr.length < geoGroup.vertices)
            geoGroup.setNormals();
        else {

            var normalArray = geoGroup.normalArray = new Float32Array(geoGroup.vertices * 3);
            var n;
            for (i = 0, il = geoGroup.vertices; i < il; ++i) {
                offset = i * 3;
                n = normalArr[i];
                normalArray[offset] = n.x;
                normalArray[offset + 1] = n.y;
                normalArray[offset + 2] = n.z;
            }
        }
        
        geoGroup.setLineIndices();
        geoGroup.lineidx = geoGroup.lineArray.length;
    };
    

    
    // handles custom shape generation from user supplied arrays
    // May need to generate normal and/or line indices
    /**
     * @param {$3Dmol.GLShape}
     *            shape
     * @param {geometry}
     *            geo
     * @param {CustomSpec}
     *            customSpec
     */
    var drawCustom = function(shape, geo, customSpec) {
        var mesh = customSpec;
        var vertexArr = mesh.vertexArr, normalArr = mesh.normalArr, 
        faceArr = mesh.faceArr;
        if (vertexArr.length === 0 || faceArr.length === 0) {
            console
                    .warn("Error adding custom shape component: No vertices and/or face indices supplied!");
        }

        var color = customSpec.color;
        if(typeof(color) == 'undefined') {
            color = shape.color;
        }
        color =  $3Dmol.CC.color(color);

        //var firstgeo = geo.geometryGroups.length;
        var splits = $3Dmol.splitMesh(mesh);
        for(var i = 0, n = splits.length; i < n; i++) {
            addCustomGeo(shape, geo, splits[i], splits[i].colorArr ? splits[i].colorArr : color, customSpec.clickable);
        } 
    }; 

    // Update a bounding sphere's position and radius
    // from list of centroids and new points
    /**
     * @param {$3Dmol.Sphere}
     *            sphere
     * @param {Object}
     *            components
     * @param {Array}
     *            points
     */
    var updateBoundingFromPoints = function(sphere, components, points) {

        sphere.center.set(0, 0, 0);

        var i, il;

        if (components.length > 0) {

            for (i = 0, il = components.length; i < il; ++i) {
                var centroid = components[i].centroid;
                sphere.center.add(centroid);
            }

            sphere.center.divideScalar(components.length);
        }

        var maxRadiusSq = sphere.radius * sphere.radius;

        for (i = 0, il = points.length / 3; i < il; i++) {
            var x = points[i * 3], y = points[i * 3 + 1], z = points[i * 3 + 2];
            var radiusSq = sphere.center.distanceToSquared({
                x : x,
                y : y,
                z : z
            });
            maxRadiusSq = Math.max(maxRadiusSq, radiusSq);
        }

        sphere.radius = Math.sqrt(maxRadiusSq);

    };

    /**
     * 
     * @param {$3Dmol.GLShape}
     *            shape
     * @param {ShapeSpec}
     *            stylespec
     * @returns {undefined}
     */
    var updateFromStyle = function(shape, stylespec) {
        if(typeof(stylespec.color) != 'undefined') {
            shape.color = stylespec.color || new $3Dmol.Color();
            if(! (stylespec.color instanceof $3Dmol.Color))
                shape.color = $3Dmol.CC.color(stylespec.color);
        } else {
            shape.color = $3Dmol.CC.color(0);
        }
        shape.wireframe = stylespec.wireframe ? true : false;
        //opacity is the preferred nomenclature, support alpha for backwards compat
        shape.opacity = stylespec.alpha ? $3Dmol.Math.clamp(stylespec.alpha, 0.0,
                1.0) : 1.0;
        if(typeof(stylespec.opacity) != 'undefined') {
            shape.opacity = $3Dmol.Math.clamp(stylespec.opacity, 0.0, 1.0);
        }
        shape.side = (stylespec.side !== undefined) ? stylespec.side
                : $3Dmol.DoubleSide;

        shape.linewidth = typeof(stylespec.linewidth) == 'undefined' ? 1 : stylespec.linewidth;
        // Click handling
        shape.clickable = stylespec.clickable ? true : false;
        shape.callback = typeof (stylespec.callback) === "function" ? stylespec.callback
                : null;

        shape.hoverable = stylespec.hoverable ? true : false;
        shape.hover_callback = typeof (stylespec.hover_callback) === "function" ? stylespec.hover_callback
                : null;

        shape.unhover_callback = typeof (stylespec.unhover_callback) === "function" ? stylespec.unhover_callback
                : null;

        shape.hidden = stylespec.hidden;
    };

    /**
     * Custom renderable shape
     * 
     * @constructor $3Dmol.GLShape
     * 
     * @param {Object}
     *            stylespec
     * @returns {$3Dmol.GLShape}
     */
    function GLShape(stylespec) {

        stylespec = stylespec || {};
        $3Dmol.ShapeIDCount++;

        this.boundingSphere = new $3Dmol.Sphere();
        /** @type {IntersectionShapes} */
        this.intersectionShape = {
            sphere : [],
            cylinder : [],
            line : [],
            triangle : []
        };

        updateFromStyle(this, stylespec);

        // Keep track of shape components and their centroids
        var components = [];
        var shapeObj = null;
        var renderedShapeObj = null;

        var geo = new $3Dmol.Geometry(true);
        var linegeo = new $3Dmol.Geometry(true);

        /** Update shape with new style specification
	 * @function $3Dmol.GLShape#updateStyle
         * @param {ShapeSpec} newspec
         * @return {$3Dmol.GLShape}
         */
        this.updateStyle = function(newspec) {

            for ( var prop in newspec) {
                stylespec[prop] = newspec[prop];
            }

            updateFromStyle(this, stylespec);
        };

        /**
         * Creates a custom shape from supplied vertex and face arrays
         * @function $3Dmol.GLShape#addCustom
         * @param {CustomShapeSpec} customSpec
         * @return {$3Dmol.GLShape}
         
         */
        this.addCustom = function(customSpec) {

            customSpec.vertexArr = customSpec.vertexArr || [];
            customSpec.faceArr = customSpec.faceArr || [];
            customSpec.normalArr = customSpec.normalArr || [];

            var firstgeo = geo.geometryGroups.length;
            // will split mesh as needed
            drawCustom(this, geo, customSpec);
        };

        /**
         * Creates a sphere shape
         * @function $3Dmol.GLShape#addSphere
         * @param {SphereSpec} sphereSpec
         * @return {$3Dmol.GLShape}
         @example 
         viewer.addSphere({center:{x:0,y:0,z:0},radius:10.0,color:'red'});
         
         viewer.render();
         */
        this.addSphere = function(sphereSpec) {

            sphereSpec.center = sphereSpec.center || {
                x : 0,
                y : 0,
                z : 0
            };
            sphereSpec.radius = sphereSpec.radius ? $3Dmol.Math.clamp(
                    sphereSpec.radius, 0, Infinity) : 1.5;
            sphereSpec.color = $3Dmol.CC.color(sphereSpec.color);
            
            this.intersectionShape.sphere.push(new $3Dmol.Sphere(
                    sphereSpec.center, sphereSpec.radius));

            $3Dmol.GLDraw.drawSphere(geo, sphereSpec.center,
                    sphereSpec.radius, sphereSpec.color);

            components.push({
                centroid : new $3Dmol.Vector3(sphereSpec.center.x,
                        sphereSpec.center.y, sphereSpec.center.z)
            });
            var geoGroup = geo.updateGeoGroup(0);
            
            updateBoundingFromPoints(this.boundingSphere, components,
                    geoGroup.vertexArray);
        };

        /**
         * Creates a cylinder shape
         * @function $3Dmol.GLShape#addCylinder
         * @param {CylinderSpec} cylinderSpec
         * @return {$3Dmol.GLShape}
         @example
              viewer.addCylinder({start:{x:0.0,y:0.0,z:0.0},
                                  end:{x:10.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  fromCap:1,
                                  toCap:2,
                                  color:'red',
                                  hoverable:true,
                                  clickable:true,
                                  callback:function(){ this.color.setHex(0x00FFFF00);viewer.render();},
                                  hover_callback: function(){ viewer.render();},
                                  unhover_callback: function(){ this.color.setHex(0xFF000000);viewer.render();}
                                 });
              viewer.addCylinder({start:{x:0.0,y:2.0,z:0.0},
                                  end:{x:0.0,y:10.0,z:0.0},
                                  radius:0.5,
                                  fromCap:false,
                                  toCap:true,
                                  color:'teal'});
              viewer.addCylinder({start:{x:15.0,y:0.0,z:0.0},
                                  end:{x:20.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  color:'black',
                                  fromCap:false,
                                  toCap:false});
              viewer.render();
         */
        this.addCylinder = function(cylinderSpec) {

            cylinderSpec.start = cylinderSpec.start || {};
            cylinderSpec.end = cylinderSpec.end || {};


            var start = new $3Dmol.Vector3(cylinderSpec.start.x || 0,
                    cylinderSpec.start.y || 0, cylinderSpec.start.z || 0);
            var end = new $3Dmol.Vector3(cylinderSpec.end.x,
                    cylinderSpec.end.y || 0, cylinderSpec.end.z || 0);
        	if(typeof(end.x) == 'undefined') end.x = 3; //show something even if undefined

            var radius = cylinderSpec.radius || 0.1;
            var color = $3Dmol.CC.color(cylinderSpec.color);
            
            this.intersectionShape.cylinder.push(new $3Dmol.Cylinder(start, end, radius));

            $3Dmol.GLDraw.drawCylinder(geo, start, end, radius, color, cylinderSpec.fromCap, cylinderSpec.toCap);            
           
            var centroid = new $3Dmol.Vector3();
            components.push({
                centroid : centroid.addVectors(start,end).multiplyScalar(0.5)
            });
            var geoGroup = geo.updateGeoGroup(0);
            updateBoundingFromPoints(this.boundingSphere, components,
                    geoGroup.vertexArray);

        };

        this.addDashedCylinder = function(cylinderSpec){
            console.log("addDashedCylinder");
            cylinderSpec.start = cylinderSpec.start || {};
            cylinderSpec.end = cylinderSpec.end || {};
            cylinderSpec.dashLength=cylinderSpec.dashLength || .25;
            cylinderSpec.gapLength=cylinderSpec.gapLength || .25;

            var start = new $3Dmol.Vector3(cylinderSpec.start.x || 0,
                    cylinderSpec.start.y || 0, cylinderSpec.start.z || 0);
            var end = new $3Dmol.Vector3(cylinderSpec.end.x,
                    cylinderSpec.end.y || 0, cylinderSpec.end.z || 0);
            if(typeof(end.x) == 'undefined') end.x = 3; //show something even if undefined

            var radius = cylinderSpec.radius || 0.1;
            var color = $3Dmol.CC.color(cylinderSpec.color);

            var cylinderLength = Math.sqrt(Math.pow((start.x-end.x),2)+Math.pow((start.y-end.y),2)+Math.pow((start.z-end.z),2));

            var count = cylinderLength/(cylinderSpec.gapLength+cylinderSpec.dashLength);

            var new_start = new $3Dmol.Vector3(cylinderSpec.start.x || 0,
                    cylinderSpec.start.y || 0, cylinderSpec.start.z || 0);
            var new_end = new $3Dmol.Vector3(cylinderSpec.end.x,
                    cylinderSpec.end.y || 0, cylinderSpec.end.z || 0);

            var gapVector = new $3Dmol.Vector3((end.x-start.x)/(cylinderLength/cylinderSpec.gapLength),(end.y-start.y)/(cylinderLength/cylinderSpec.gapLength),(end.z-start.z)/(cylinderLength/cylinderSpec.gapLength));
            var dashVector = new $3Dmol.Vector3((end.x-start.x)/(cylinderLength/cylinderSpec.dashLength),(end.y-start.y)/(cylinderLength/cylinderSpec.dashLength),(end.z-start.z)/(cylinderLength/cylinderSpec.dashLength));

            for(var place=0; place < count;place++){
                new_end = new $3Dmol.Vector3(new_start.x+dashVector.x,new_start.y+dashVector.y,new_start.z+dashVector.z);

                this.intersectionShape.cylinder.push(new $3Dmol.Cylinder(new_start, new_end, radius));

                $3Dmol.GLDraw.drawCylinder(geo, new_start, new_end, radius, color, cylinderSpec.fromCap, cylinderSpec.toCap); 

                new_start = new $3Dmol.Vector3(new_end.x+gapVector.x,new_end.y+gapVector.y,new_end.z+gapVector.z);
           
            }
            var centroid = new $3Dmol.Vector3();
            components.push({
                centroid : centroid.addVectors(start,end).multiplyScalar(0.5)
            });
            var geoGroup = geo.updateGeoGroup(0);
            updateBoundingFromPoints(this.boundingSphere, components,
                    geoGroup.vertexArray);
        }

        /**
         * Creates a line shape
         * @function $3Dmol.GLShape#addLine         
         * @param {LineSpec} lineSpec
         * @return {$3Dmol.GLShape}
         @example
         $3Dmol.download("pdb:2ABJ",viewer,{},function(){
                  viewer.addLine({dashed:true,start:{x:0,y:0,z:0},end:{x:100,y:100,z:100}});
                  viewer.render(callback);
              });

         */
        this.addLine = function(lineSpec) {
            lineSpec.start = lineSpec.start || {};
            lineSpec.end = lineSpec.end || {};

            var start = new $3Dmol.Vector3(lineSpec.start.x || 0,
                    lineSpec.start.y || 0, lineSpec.start.z || 0);
            var end = new $3Dmol.Vector3(lineSpec.end.x,
                    lineSpec.end.y || 0, lineSpec.end.z || 0);            
            if(typeof(end.x) == 'undefined') end.x = 3; //show something even if undefined

            var geoGroup = geo.updateGeoGroup(2);

            //make line from start to end
            //for consistency with rest of shapes, uses vertices and lines rather
            //than a separate line geometry
            var vstart = geoGroup.vertices;
            var i = vstart*3;
            var vertexArray = geoGroup.vertexArray;
            vertexArray[i] = start.x;
            vertexArray[i+1] = start.y;
            vertexArray[i+2] = start.z;
            vertexArray[i+3] = end.x;
            vertexArray[i+4] = end.y;
            vertexArray[i+5] = end.z;
            geoGroup.vertices += 2;
            
            var lineArray = geoGroup.lineArray;
            var li =  geoGroup.lineidx;
            lineArray[li] = vstart;
            lineArray[li+1] = vstart+1;
            geoGroup.lineidx += 2;
            
        }
        /**
         * Creates an arrow shape
         * @function $3Dmol.GLShape#addArrow        
         * @param {ArrowSpec} arrowSpec
         * @return {$3Dmol.GLShape}
         @example
          $3Dmol.download("pdb:4DM7",viewer,{},function(){
                  viewer.setBackgroundColor(0xffffffff);
                  viewer.addArrow({
                      start: {x:-10.0, y:0.0, z:0.0},
                      end: {x:0.0, y:-10.0, z:0.0},
                      radius: 1.0,
                      radiusRadio:1.0,
                      mid:1.0,
                      clickable:true,
                      callback:function(){
                          this.color.setHex(0xFF0000FF);
                          viewer.render();
                      }
                  });
                  viewer.render();
                });
         */
        this.addArrow = function(arrowSpec) {

            arrowSpec.start = arrowSpec.start || {};
            arrowSpec.end = arrowSpec.end || {};

            arrowSpec.start = new $3Dmol.Vector3(arrowSpec.start.x || 0,
                    arrowSpec.start.y || 0, arrowSpec.start.z || 0);

            if (arrowSpec.dir instanceof $3Dmol.Vector3
                    && arrowSpec.length instanceof number) {
                var end = arrowSpec.dir.clone().multiplyScalar(arrowSpec.length).add(
                        start);
                arrowSpec.end = end;
            }

            else {
                arrowSpec.end = new $3Dmol.Vector3(arrowSpec.end.x,
                        arrowSpec.end.y || 0, arrowSpec.end.z || 0);
            	if(typeof(arrowSpec.end.x) == 'undefined') arrowSpec.end.x = 3; //show something even if undefined
            }

            arrowSpec.radius = arrowSpec.radius || 0.1;

            arrowSpec.radiusRatio = arrowSpec.radiusRatio || 1.618034;
            arrowSpec.mid = (0 < arrowSpec.mid && arrowSpec.mid < 1) ? arrowSpec.mid
                    : 0.618034;


            drawArrow(this, geo, arrowSpec);

            var centroid = new $3Dmol.Vector3();
            components.push({
                centroid : centroid.addVectors(arrowSpec.start, arrowSpec.end)
                        .multiplyScalar(0.5)
            });
            var geoGroup = geo.updateGeoGroup(0);
            updateBoundingFromPoints(this.boundingSphere, components,
                    geoGroup.vertexArray);

        };

        
        /**
         * Create isosurface from voluemetric data.
         * @function $3Dmol.GLShape#addIsosurface         
         * @param {$3Dmol.VolumeData} data - volumetric input data
         * @param {IsoSurfaceSpec} isoSpec - volumetric data shape specification
         * @example //the user can specify a selected region for the isosurface 
         $.get('../test_structs/benzene-homo.cube', function(data){
                  var voldata = new $3Dmol.VolumeData(data, "cube");
                  viewer.addIsosurface(voldata, {isoval: 0.01,
                                                 color: "blue",
                                                 alpha: 0.5,
                                                 smoothness: 10});
                  viewer.addIsosurface(voldata, {isoval: -0.01,
                                                 color: "red",
                                                 smoothness: 5,
                                                 opacity:0.5,
                                                 wireframe:true,
                                                 linewidth:0.1,
                                                 clickable:true,
                                                 callback:
                                                 function() {
                                                     this.opacity = 0.0;
                                                     viewer.render(callback);
                                                 }});
                  viewer.setStyle({}, {stick:{}});
                  viewer.zoomTo();
                  viewer.render(callback);
                });
         //this specific example selects every atom in the
         */
        this.addIsosurface = function(data, volSpec, callback) {//may want to cache the arrays geneerated when selectedRegion ==true
           
            var isoval = (volSpec.isoval !== undefined && typeof (volSpec.isoval) === "number") ? volSpec.isoval
                    : 0.0;
            var voxel = (volSpec.voxel) ? true : false;
            var smoothness = (volSpec.smoothness === undefined) ? 1 : volSpec.smoothness;

            var nX = data.size.x;
            var nY = data.size.y;
            var nZ = data.size.z;
            var vertnums = new Int16Array(nX * nY * nZ);
            var vals = data.data;

            var i, il;

            for (i = 0, il = vertnums.length; i < il; ++i)
                vertnums[i] = -1;

            var bitdata = new Uint8Array(nX * nY * nZ);
           
            //mark locations partitioned by isoval
            for (i = 0, il = vals.length; i < il; ++i) {
                var val = (isoval >= 0) ? vals[i] - isoval : isoval - vals[i];
                if (val > 0)
                    bitdata[i] |= ISDONE;

            }
               
            var verts = [], faces = [];

            $3Dmol.MarchingCube.march(bitdata, verts, faces, {
                fulltable : true,
                voxel : voxel,
                unitCube : data.unit,
                origin : data.origin,
                matrix: data.matrix,
                nX : nX,
                nY : nY,
                nZ : nZ
            });
            
            if (!voxel && smoothness > 0)
                $3Dmol.MarchingCube.laplacianSmooth(smoothness, verts, faces);
            var vertexmapping= [];
            var newvertices= [];
            var newfaces=[];

            if (volSpec.selectedRegion !== undefined) {

                var xmax = volSpec.selectedRegion[0], ymax = volSpec.selectedRegion[0], zmax = volSpec.selectedRegion[0], xmin = volSpec.selectedRegion[0], ymin = volSpec.selectedRegion[0], zmin = volSpec.selectedRegion[0];

                for (var i = 0; i < volSpec.selectedRegion.length; i++) {
                    if (volSpec.selectedRegion[i].x > xmax.x)
                        xmax = volSpec.selectedRegion[i];
                    else if (volSpec.selectedRegion[i].x < xmin.x)
                        xmin = volSpec.selectedRegion[i];
                    if (volSpec.selectedRegion[i].y > ymax.y)
                        ymax = volSpec.selectedRegion[i];
                    else if (volSpec.selectedRegion[i].y < ymin.y)
                        ymin = volSpec.selectedRegion[i];
                    if (volSpec.selectedRegion[i].z > zmax.z)
                        zmax = volSpec.selectedRegion[i];
                    else if (volSpec.selectedRegion[i].z < zmin.z)
                        zmin = volSpec.selectedRegion[i];
                }

                var rad = volSpec.radius;
                xmax.x = xmax.x + rad;
                xmin.x = xmin.x - rad;
                ymin.y = ymin.y - rad;
                ymax.y = ymax.y + rad;
                zmin.z = zmin.z - rad;
                zmax.z = zmax.z + rad;

                // accounts for radius
                for (var i = 0; i < verts.length; i++) {
                    if (verts[i].x > xmin.x
                            && verts[i].x < xmax.x
                            && verts[i].y > ymin.y
                            && verts[i].y < ymax.y
                            && verts[i].z > zmin.z
                            && verts[i].z < zmax.z
                            && inSelectedRegion(verts[i],
                                    volSpec.selectedRegion,
                                    volSpec.selectedOffset, volSpec.radius)) {
                        vertexmapping.push(newvertices.length);
                        newvertices.push(verts[i]);

                    } else {
                        vertexmapping.push(-1);
                    }

                }
                for (var i = 0; i + 2 < faces.length; i += 3) {
                    if (vertexmapping[faces[i]] !== -1
                            && vertexmapping[faces[i + 1]] !== -1
                            && vertexmapping[faces[i + 2]] !== -1) {
                        newfaces.push(faces[i]
                                - (faces[i] - vertexmapping[faces[i]]));
                        newfaces.push(faces[i + 1]
                                - (faces[i + 1] - vertexmapping[faces[i + 1]]));
                        newfaces.push(faces[i + 2]
                                - (faces[i + 2] - vertexmapping[faces[i + 2]]));
                    }
                }
                verts = newvertices;
                faces = newfaces;
            }
           
            drawCustom(this, geo, {
                vertexArr : verts,
                faceArr : faces,
                normalArr : [],
                clickable : volSpec.clickable,
                hoverable : volSpec.hoverable
            });
            
            this.updateStyle(volSpec);
            
            //computing bounding sphere from vertices
            var origin = new $3Dmol.Vector3(data.origin.x, data.origin.y, data.origin.z);
            var size = new $3Dmol.Vector3(data.size.x*data.unit.x, data.size.y*data.unit.y, data.size.z*data.unit.z);            

            var total = new $3Dmol.Vector3(0,0,0);
            var maxv = origin.clone();
            var minv = origin.clone().add(size);
            for(var i = 0; i < verts.length; i++) {
                total.add(verts[i]);
                maxv.max(verts[i]);
                minv.min(verts[i]);
            }
            total.divideScalar(verts.length);
            var len1 = total.distanceTo(minv);
            var len2 = total.distanceTo(maxv);
            this.boundingSphere.center = total;
            this.boundingSphere.radius = Math.max(len1,len2);
            if(typeof callback =="function")
                callback();
          }
        var inSelectedRegion=function(coordinate,selectedRegion,offset,radius){
            
            for(var i=0;i<selectedRegion.length;i++){
                if(distance_from(selectedRegion[i],coordinate)<=radius)
                    return true;
            }
            return false;
        }
        var distance_from= function(c1,c2){
            return Math.sqrt(Math.pow((c1.x-c2.x),2)+Math.pow((c1.y-c2.y),2)+Math.pow((c1.z-c2.z),2));
        }
        /**
         * @deprecated unnecesary

        */
        var convert=function(i,j,k,data){
            var pt;
            if(data.matrix) {
                pt = new $3Dmol.Vector3(i,j,k);
                pt = pt.applyMatrix4(data.matrix);
                pt = {x: pt.x, y: pt.y, z: pt.z}; //remove vector gunk

            } else {
                pt.x = data.origin.x+data.unit.x*i;
                pt.y = data.origin.y+data.unit.y*j;
                pt.z = data.origin.z+data.unit.z*k;
            }
            return pt;
        }
        /** 
         * @deprecated Use addIsosurface instead
         * Creates custom shape from volumetric data 
         * @param {string} data - Volumetric input data 
         * @param {string} fmt - Input data format (e.g. 'cube' for cube file format)
         * @param {IsoSurfaceSpec} isoSpec - Volumetric data shape specification
         * @return {$3Dmol.GLShape}
         */
        this.addVolumetricData = function(data, fmt, volSpec) {
            var data = new $3Dmol.VolumeData(data, fmt);
            this.addIsosurface(data, volSpec);
        };

        /**
         * Initialize webgl objects for rendering
         * @param {$3Dmol.Object3D} group
         * 
         */  
        this.globj = function(group) {

            if (renderedShapeObj) {
                group.remove(renderedShapeObj);
                renderedShapeObj = null;
            }
            
            if(this.hidden)
                return;
            finalizeGeo(geo);
            geo.initTypedArrays();

            if(typeof(this.color) != 'undefined')
                updateColor(geo, this.color);

            shapeObj = new $3Dmol.Object3D();
            var material = null;
            if(this.side == $3Dmol.DoubleSide) {
                var material = new $3Dmol.MeshDoubleLambertMaterial({
                    wireframe : this.wireframe,
                    side : this.side,
                    transparent : (this.opacity < 1) ? true : false,
                    opacity : this.opacity,
                    wireframeLinewidth: this.linewidth
                });
            } else {
                var material = new $3Dmol.MeshLambertMaterial({
                    wireframe : this.wireframe,
                    side : this.side,
                    transparent : (this.opacity < 1) ? true : false,
                    opacity : this.opacity,
                    wireframeLinewidth: this.linewidth
                });
            }
            
            var mesh = new $3Dmol.Mesh(geo, material);

            shapeObj.add(mesh);
            
            var lineMaterial = new $3Dmol.LineBasicMaterial({
                linewidth : this.linewidth,
                color: this.color
            });
            var line = new $3Dmol.Line(linegeo, lineMaterial,
                    $3Dmol.LinePieces);
            shapeObj.add(line);

            renderedShapeObj = shapeObj.clone();
            group.add(renderedShapeObj);

        };

        this.removegl = function(group) {
            if (renderedShapeObj) {
                // dispose of geos and materials
                if (renderedShapeObj.geometry !== undefined)
                    renderedShapeObj.geometry.dispose();
                if (renderedShapeObj.material !== undefined)
                    renderedShapeObj.material.dispose();
                group.remove(renderedShapeObj);
                renderedShapeObj = null;
            }
            shapeObj = null;
        };

    };

    Object.defineProperty(GLShape.prototype, "position", {

        get : function() {
            return this.boundingSphere.center;
        }

    });

    Object.defineProperty(GLShape.prototype, "x", {

        get : function() {
            return this.boundingSphere.center.x;
        }

    });

    Object.defineProperty(GLShape.prototype, "y", {

        get : function() {
            return this.boundingSphere.center.y;
        }

    });

    Object.defineProperty(GLShape.prototype, "z", {

        get : function() {
            return this.boundingSphere.center.z;
        }

    });

    return GLShape;

}());

$3Dmol.ShapeIDCount = 0;


$3Dmol.splitMesh = function(mesh) {
	    var MAXVERT = 64000; //webgl only supports 2^16 elements, leave a little breathing room (require at least 2)
    //peel off 64k vertices rsvh into their own mesh
    //duplicating vertices and normals as necessary to preserve faces and lines
	
        if(mesh.vertexArr.length < MAXVERT) return [mesh]; //typical case
        
        var nverts = mesh.vertexArr.length;
        var slices = [{vertexArr: [], normalArr: [], faceArr: []}];
        if(mesh.colorArr) slices.colorArr = [];
        var vertSlice = []; //indexed by original vertex to get current slice
        var vertIndex =[]; //indexed by original vertex to get index within slice
        var currentSlice = 0;
        
        //for each face, make sure all three vertices (or copies) are in the same slice
        var faces = mesh.faceArr;
        var vs = [0,0,0];
        for(var i = 0, nf = faces.length; i < nf; i += 3) {
            var slice = slices[currentSlice];
            for(var j = 0; j < 3; j++) {
                //process each vertex to make sure it is assigned a slice
                //all vertices of a face must belong to the same slice
                var v = faces[i+j];
                if(vertSlice[v] !== currentSlice) { //true if undefined
                    vertSlice[v] = currentSlice;
                    vertIndex[v] = slice.vertexArr.length;
                    slice.vertexArr.push(mesh.vertexArr[v]);
                    if(mesh.normalArr && mesh.normalArr[v]) slice.normalArr.push(mesh.normalArr[v]);
                    if(mesh.colorArr && mesh.colorArr[v]) slice.colorArr.push(mesh.colorArr[v]);
                }
                slice.faceArr.push(vertIndex[v]);
            }
            
            if(slice.vertexArr.length >= MAXVERT) {
                //new slice
                slices.push({vertexArr: [], normalArr: [], faceArr: []});
                if(mesh.colorArr) slices.colorArr = [];
                currentSlice++;
            }
        }
        return slices;
    }

//a molecular viewer based on GLMol



/**
 * WebGL-based 3Dmol.js viewer
 * Note: The preferred method of instantiating a GLViewer is through {@link $3Dmol.createViewer} 
 * 
 * @constructor 
 * @param {Object} element HTML element within which to create viewer
 * @param {function} callback - Callback function to be immediately executed on this viewer
 * @param {Object} defaultcolors - Object defining default atom colors as atom => color property value pairs for all models within this viewer
 */
$3Dmol.GLViewer = (function() {
    // private class variables
    var numWorkers = 4; // number of threads for surface generation
    var maxVolume = 64000; // how much to break up surface calculations

    // private class helper functions

    function GLViewer(element, config) { 
        // set variables
        config = config || {};
        var callback = config.callback;
        var defaultcolors = config.defaultcolors;       
        if(!defaultcolors)
            defaultcolors = $3Dmol.elementColors.defaultColors;
        var nomouse = config.nomouse;
        var bgColor = 0;
        config.backgroundColor = config.backgroundColor || "#ffffff";
       //config.disableFog= config.disableFog || false;
        if(typeof(config.backgroundColor) != undefined) {
            bgColor = $3Dmol.CC.color(config.backgroundColor).getHex();
        }

        var camerax = 0;
        if(typeof(config.camerax) != undefined) {
            camerax = parseFloat(config.camerax);
        }
        var _viewer = this;
        var container = element;
        var id = container.id;
        var glDOM = null;

        var models = []; // atomistic molecular models
        var surfaces = {};
        var shapes = []; // Generic shapes
        var labels = [];
        var fixed_labels = [];
        var clickables = []; //things you can click on
        var hoverables = []; //things you can hover over
        var popups = [];
        var current_hover = null;
        var hoverDuration = 500;
        if(typeof(config.hoverDuration) != undefined) {
            hoverDuration = config.hoverDuration;
        }
        var WIDTH = container.width();
        var HEIGHT = container.height();

        // set dimensions
        // $(container).width(WIDTH);
        // $(container).height(HEIGHT);

        var ASPECT = WIDTH / HEIGHT;
        var NEAR = 1, FAR = 800;
        var CAMERA_Z = 150;
        var fov = 20;

        var linkedViewers = [];

        var renderer = new $3Dmol.Renderer({
            antialias : true,
            preserveDrawingBuffer: true, //so we can export images
            premultipliedAlpha : false,/* more traditional compositing with background */
            id:config.id
        });
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.padding = "0";
        renderer.domElement.style.position = "absolute"; //TODO: get rid of this
        renderer.domElement.style.top = "0px";
        renderer.domElement.style.left = "0px";
        renderer.domElement.style.zIndex = "0";

        var camera = new $3Dmol.Camera(fov, ASPECT, NEAR, FAR, config.orthographic);
        camera.position = new $3Dmol.Vector3(camerax, 0, CAMERA_Z);
        var lookingAt = new $3Dmol.Vector3();
        camera.lookAt(lookingAt);

        var raycaster = new $3Dmol.Raycaster(new $3Dmol.Vector3(0, 0, 0),
                new $3Dmol.Vector3(0, 0, 0));
        var projector = new $3Dmol.Projector();
        var mouseVector = new $3Dmol.Vector3(0, 0, 0);

        var scene = null;
        var rotationGroup = null; // which contains modelGroup
        var modelGroup = null;

        var fogStart = 0.4;
        var slabNear = -50; // relative to the center of rotationGroup
        var slabFar = 50;

        // UI variables
        var cq = new $3Dmol.Quaternion(0, 0, 0, 1);
        var dq = new $3Dmol.Quaternion(0, 0, 0, 1);
        var animated = false;
        var isDragging = false;
        var mouseStartX = 0;
        var mouseStartY = 0;
        var touchDistanceStart = 0;
        var currentModelPos = 0;
        var cz = 0;
        var cslabNear = 0;
        var cslabFar = 0;      
        
        var nextSurfID = function() {
            //compute the next highest surface id directly from surfaces
            //this is necessary to support linking of model data
            var max = 0;
            for (var i in surfaces) { // this is an object with possible holes
                if(!surfaces.hasOwnProperty(i)) continue;
                if(i > max) max = i;
            }
            return max+1;
        };

        var setSlabAndFog = function() {
            
            var center = camera.position.z - rotationGroup.position.z;
            if (center < 1)
                center = 1;
            camera.near = center + slabNear;
            if (camera.near < 1)
                camera.near = 1;
            camera.far = center + slabFar;
            if (camera.near + 1 > camera.far)
                camera.far = camera.near + 1;

            camera.fov = fov;
            camera.right = center * Math.tan(Math.PI / 180 * fov);
            camera.left = -camera.right;
            camera.top = camera.right / ASPECT;
            camera.bottom = -camera.top;
            
            camera.updateProjectionMatrix();

            scene.fog.near = camera.near + fogStart
                    * (camera.far - camera.near);
            // if (scene.fog.near > center) scene.fog.near = center;
            scene.fog.far = camera.far;
            
            if(config.disableFog){
                scene.fog.near=scene.fog.far;
            }
        };

        // display scene
        //if nolink is set/true, don't propagate changes to linked viewers
        var show = function(nolink) {
            if (!scene)
                return;
            // var time = new Date();
            setSlabAndFog();
            renderer.render(scene, camera);
            // console.log("rendered in " + (+new Date() - time) + "ms");
            
            if(!nolink && linkedViewers.length > 0) {                var view = _viewer.getView();
                for(var i = 0; i < linkedViewers.length; i++) {
                    var other = linkedViewers[i];
                    other.setView(view, true);
                }
            }
        };

        var initializeScene = function() {

            scene = new $3Dmol.Scene();
            scene.fog = new $3Dmol.Fog(bgColor, 100, 200);

            modelGroup = new $3Dmol.Object3D();
            rotationGroup = new $3Dmol.Object3D();
            rotationGroup.useQuaternion = true;
            rotationGroup.quaternion = new $3Dmol.Quaternion(0, 0, 0, 1);
            rotationGroup.add(modelGroup);

            scene.add(rotationGroup);

            // setup lights
            var directionalLight = new $3Dmol.Light(0xFFFFFF);
            directionalLight.position = new $3Dmol.Vector3(0.2, 0.2, 1)
                    .normalize();
            directionalLight.intensity = 1.0;
            scene.add(directionalLight);
        };

        initializeScene();

        renderer.setClearColorHex(bgColor, 1.0);
        scene.fog.color = $3Dmol.CC.color(bgColor);

        var clickedAtom = null;

        // enable mouse support

        //regenerate the list of clickables
        //also updates hoverables
        var updateClickables = function() {
            clickables.splice(0,clickables.length);
            hoverables.splice(0,hoverables.length);
            var i, il;
            
            for (i = 0, il = models.length; i < il; i++) {
                var model = models[i];
                if(model) {
                    var atoms = model.selectedAtoms({
                        clickable : true
                    });
                    
                    var hoverable_atoms = model.selectedAtoms({
                        hoverable : true
                    });
                    Array.prototype.push.apply(hoverables,hoverable_atoms);

                    Array.prototype.push.apply(clickables, atoms); //add atoms into clickables
                    
                }
            }
            for (i = 0, il = shapes.length; i < il; i++) {

                var shape = shapes[i];
                if (shape && shape.clickable) {
                    clickables.push(shape);
                }
                if( shape && shape.hoverable){
                    hoverables.push(shape);
                }
            }
        };
        // Checks for selection intersects on mousedown
        var handleClickSelection = function(mouseX, mouseY, event) {

            if(clickables.length == 0) return;
            var mouse = {
                x : mouseX,
                y : mouseY,
                z : -1.0
            };
            mouseVector.set(mouse.x, mouse.y, mouse.z);
            projector.unprojectVector(mouseVector, camera);
            mouseVector.sub(camera.position).normalize();

            raycaster.set(camera.position, mouseVector);

            var intersects = [];

            intersects = raycaster.intersectObjects(modelGroup, clickables);
            if (intersects.length) {
                var selected = intersects[0].clickable;
                if (selected.callback !== undefined
                        && typeof (selected.callback) === "function") {
                    selected.callback(selected, _viewer, event, container);
                }
            }
        };
        //checks for selection intersects on hover
        var handleHoverSelection = function(mouseX, mouseY, event){
            if(hoverables.length == 0) return;
            var mouse = {
                x : mouseX,
                y : mouseY,
                z : -1.0
            };
            mouseVector.set(mouse.x, mouse.y, mouse.z);
            projector.unprojectVector(mouseVector, camera);
            mouseVector.sub(camera.position).normalize();

            raycaster.set(camera.position, mouseVector);

            var intersects = [];
            intersects = raycaster.intersectObjects(modelGroup, hoverables);
            if (intersects.length) {
                var selected = intersects[0].clickable;
                current_hover=selected;
                if (selected.hover_callback !== undefined
                        && typeof (selected.hover_callback) === "function") {
                    selected.hover_callback(selected, _viewer, event, container);
                }
            }
            else{
                current_hover=null;
            }
        }
        //sees if the mouse is still on the object that invoked a hover event and if not then the unhover callback is called
        var handleHoverContinue = function(mouseX,mouseY,event){
            var mouse = {
                x : mouseX,
                y : mouseY,
                z : -1.0
            };

            mouseVector.set(mouse.x, mouse.y, mouse.z);
            projector.unprojectVector(mouseVector, camera);
            mouseVector.sub(camera.position).normalize();

            raycaster.set(camera.position, mouseVector);

            var intersects = [];
            intersects = raycaster.intersectObjects(modelGroup, hoverables);
            if(intersects[0] === undefined){                
                current_hover.unhover_callback(current_hover, _viewer, event, container);
                current_hover=null;
            }
            if(intersects[0]!== undefined)
            if(intersects[0].clickable !== current_hover){
                current_hover.unhover_callback(current_hover, _viewer, event, container);
                current_hover=null;
            }
        }


        var calcTouchDistance = function(ev) { // distance between first two
                                                // fingers
            var xdiff = ev.originalEvent.targetTouches[0].pageX
                    - ev.originalEvent.targetTouches[1].pageX;
            var ydiff = ev.originalEvent.targetTouches[0].pageY
                    - ev.originalEvent.targetTouches[1].pageY;
            return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
        }
        
        //check targetTouches as well
        var getXY = function(ev) {
            var x = ev.pageX, y = ev.pageY;
            if (ev.originalEvent.targetTouches
                    && ev.originalEvent.targetTouches[0]) {
                x = ev.originalEvent.targetTouches[0].pageX;
                y = ev.originalEvent.targetTouches[0].pageY;
            }
            else if (ev.originalEvent.changedTouches
                    && ev.originalEvent.changedTouches[0]) {
                x = ev.originalEvent.changedTouches[0].pageX;
                y = ev.originalEvent.changedTouches[0].pageY;
            }            
            return [x,y];
        };

        //for a given screen (x,y) displacement return model displacement 
        var screenXY2model = function(x,y) {
            var dx = x/WIDTH;
            var dy = y/HEIGHT;
            var zpos = rotationGroup.position.z; 
            var q = rotationGroup.quaternion;                        
            var t = new $3Dmol.Vector3(0,0,zpos);
            projector.projectVector(t, camera);
            t.x += dx*2;
            t.y -= dy*2;
            projector.unprojectVector(t, camera);
            t.z = 0;                            
            t.applyQuaternion(q);
            return t;
        }

        // this event is bound to the body element, not the container,
        // so no need to put it inside initContainer()
        $('body').bind('mouseup touchend', function(ev) {
            // handle selection
            if(isDragging && scene) { //saw mousedown, haven't moved
                var xy = getXY(ev);
                var x = xy[0];
                var y = xy[1];
                if(x == mouseStartX && y == mouseStartY) {
                    var offset = $('canvas',container).offset();
                    var mouseX = ((x - offset.left) / WIDTH) * 2 - 1;
                    var mouseY = -((y - offset.top) / HEIGHT) * 2 + 1;
                    handleClickSelection(mouseX, mouseY, ev, container);
                }
            }
            
            isDragging = false;

        });

        var mouseButton;
        var _handleMouseDown = this._handleMouseDown = function(ev) {
            ev.preventDefault();
            if (!scene)
                return;
            var xy = getXY(ev);
            var x = xy[0];
            var y = xy[1];
            if (x === undefined)
                return;
            isDragging = true;
            clickedAtom = null;
            mouseButton = ev.which;
            mouseStartX = x;
            mouseStartY = y;
            touchDistanceStart = 0;
            if (ev.originalEvent.targetTouches
                    && ev.originalEvent.targetTouches.length == 2) {
                touchDistanceStart = calcTouchDistance(ev);
            }
            cq = rotationGroup.quaternion;
            cz = rotationGroup.position.z;
            currentModelPos = modelGroup.position.clone();
            cslabNear = slabNear;
            cslabFar = slabFar;
        };
        
        var _handleMouseScroll  = this._handleMouseScroll = function(ev) { // Zoom
            ev.preventDefault();
            if (!scene)
                return;
            var scaleFactor = (CAMERA_Z - rotationGroup.position.z) * 0.85;
            var mult = 1.0;
            if(ev.originalEvent.ctrlKey) {
                mult = -1.0; //this is a pinch event turned into a wheel event (or they're just holding down the ctrl)
            }
            if (ev.originalEvent.detail) { // Webkit
                rotationGroup.position.z += mult * scaleFactor
                        * ev.originalEvent.detail / 10;
            } else if (ev.originalEvent.wheelDelta) { // Firefox
                rotationGroup.position.z -= mult * scaleFactor
                        * ev.originalEvent.wheelDelta / 400;
            }
            if(rotationGroup.position.z > CAMERA_Z) rotationGroup.position.z = CAMERA_Z*0.999; //avoid getting stuck

            show();
        };
        
        /**
         * Return image URI of viewer contents (base64 encoded).
         * @function $3Dmol.GLViewer#pngURI
         * 
         */
        this.pngURI = function() {
            return $('canvas',container)[0].toDataURL('image/png');
        }
    /**
         * Set the duration of the hover delay
         * 
         * @function $3Dmol.GLViewer#setHoverDuration
         * @param {number}
         *            [hoverDuration] - an optional parameter that denotes
         *            the duration of the hover delay (in milliseconds) before the hover action is called
         * 
     */
        this.setHoverDuration = function(duration) {
            hoverDuration = duration;
        }
        var hoverTimeout;
        var _handleMouseMove = this._handleMouseMove = function(ev) { // touchmove

            clearTimeout(hoverTimeout);

            
            var offset = $('canvas',container).offset();
            var mouseX = ((getXY(ev)[0] - offset.left) / WIDTH) * 2 - 1;
            var mouseY = -((getXY(ev)[1] - offset.top) / HEIGHT) * 2 + 1;
            if(current_hover !== null)
                handleHoverContinue(mouseX,mouseY,ev);
            hoverTimeout=setTimeout(
                function(){
                    handleHoverSelection(mouseX,mouseY,ev);
                }
                ,hoverDuration);

            WIDTH = container.width();
            HEIGHT = container.height();
            ev.preventDefault();
            if (!scene)
                return;
            if (!isDragging)
                return;
            var mode = 0;

            var xy = getXY(ev);
            var x = xy[0];
            var y = xy[1];
            if (x === undefined)
                return;
            //hover timeout

            var dx = (x - mouseStartX) / WIDTH;
            var dy = (y - mouseStartY) / HEIGHT;
            // check for pinch
            if (touchDistanceStart != 0
                    && ev.originalEvent.targetTouches
                    && ev.originalEvent.targetTouches.length == 2) {
                var newdist = calcTouchDistance(ev);
                // change to zoom
                mode = 2;
                dy = (newdist - touchDistanceStart) * 2
                        / (WIDTH + HEIGHT);
                console.log("pinch "+touchDistanceStart+" dy "+dy);
            } else if (ev.originalEvent.targetTouches
                    && ev.originalEvent.targetTouches.length == 3) {
                // translate
                mode = 1;
            }

            var r = Math.sqrt(dx * dx + dy * dy);
            var scaleFactor;
            if (mode == 3
                    || (mouseButton == 3 && ev.ctrlKey)) { // Slab
                slabNear = cslabNear + dx * 100;
                slabFar = cslabFar + dy * 100;
            } else if (mode == 2 || mouseButton == 3
                    || ev.shiftKey) { // Zoom
                scaleFactor = (CAMERA_Z - rotationGroup.position.z) * 0.85;
                if (scaleFactor < 80)
                    scaleFactor = 80;
                rotationGroup.position.z = cz + dy * scaleFactor;
                if(rotationGroup.position.z > CAMERA_Z) rotationGroup.position.z = CAMERA_Z*0.999; //avoid getting stuck
            } else if (mode == 1 || mouseButton == 2
                    || ev.ctrlKey) { // Translate
                var t = screenXY2model(x-mouseStartX, y-mouseStartY);
                modelGroup.position.addVectors(currentModelPos,t);
                
            } else if ((mode === 0 || mouseButton == 1)
                    && r !== 0) { // Rotate
                var rs = Math.sin(r * Math.PI) / r;
                dq.x = Math.cos(r * Math.PI);
                dq.y = 0;
                dq.z = rs * dx;
                dq.w = -rs * dy;
                rotationGroup.quaternion = new $3Dmol.Quaternion(
                        1, 0, 0, 0);
                rotationGroup.quaternion.multiply(dq);
                rotationGroup.quaternion.multiply(cq);
            }
            show();
        };
        
        var initContainer = function(element) {
            container = element;
            WIDTH = container.width();
            HEIGHT = container.height();
            ASPECT = WIDTH / HEIGHT;
            renderer.setSize(WIDTH, HEIGHT);
            container.append(renderer.domElement);
            glDOM = $(renderer.domElement);

            if (!nomouse) {
                // user can request that the mouse handlers not be installed
                glDOM.bind('mousedown touchstart', _handleMouseDown);
                glDOM.bind('DOMMouseScroll mousewheel', _handleMouseScroll);
                glDOM.bind('mousemove touchmove', _handleMouseMove);
                
                glDOM.bind("contextmenu", function(ev) {
                    ev.preventDefault();
                });
            }
        };
        initContainer(container);

        // public methods
        /**
         * Change the viewer's container element 
         * Also useful if the original container element was removed from the DOM.
         * 
         * @function $3Dmol.GLViewer#resetContainer
         *
         * @param {Object | string} element
         *            Either HTML element or string identifier. Defaults to the element used to initialize the viewer.

         */
        this.setContainer = function(element) {
            if($.type(element) === "string")
                element = $("#"+element);
            if(!element) {
                element = container
            };
            initContainer(element);
            return this;
        };
        
        /**
         * Set the background color (default white)
         * 
         * @function $3Dmol.GLViewer#setBackgroundColor
         * @param {number}
         *            hex Hexcode specified background color, or standard color spec
         * @param {number}
         *            a Alpha level (default 1.0)
         * 
         * @example
         * 
         * viewer.setBackgroundColor(0x00000000);


         * 
         */
        this.setBackgroundColor = function(hex, a) {
            if(typeof(a) == "undefined") {
                a = 1.0;
            }
            else if(a < 0 || a > 1.0) {
                a = 1.0;
            }
            var c = $3Dmol.CC.color(hex);
            scene.fog.color = c;
            bgColor = c.getHex();
            renderer.setClearColorHex(c.getHex(), a);
            show();
            return this;
        };
        
        /**
         * Set view projection scheme.  Either orthographic or perspective.  
         * Default is perspective.  Orthographic can also be enabled on viewer creation
         * by setting orthographic to true in the config object.
         * 
         * @function $3Dmol.GLViewer#setProjection
         * 
         * @example
         viewer.setViewStyle({style:"outline"});
              $.get('volData/1fas.pqr', function(data){
                  viewer.addModel(data, "pqr");
                  $.get("volData/1fas.cube",function(volumedata){
                      viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.85,voldata: new $3Dmol.VolumeData(volumedata, "cube"), volscheme: new $3Dmol.Gradient.RWB(-10,10)},{});
                  });
                  viewer.zoomTo();

                  viewer.setProjection("orthographic");
                  viewer.render(callback);
              });
         * 
         */
        this.setProjection = function(proj) {
            camera.ortho = (proj === "orthographic");
            setSlabAndFog();            
        };
        
        /**
         * Set global view styles.  
         * @function $3Dmol.GLViewer#setViewStyle
         * 
         * @example
         *   viewer.setViewStyle({style:"outline"});
              $.get('volData/1fas.pqr', function(data){
                  viewer.addModel(data, "pqr");
                  $.get("volData/1fas.cube",function(volumedata){
                      viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.85,voldata: new $3Dmol.VolumeData(volumedata, "cube"), volscheme: new $3Dmol.Gradient.RWB(-10,10)},{});
                  });
                  viewer.zoomTo();
                  viewer.render(callback);
              });
         * 
         */
         this.setViewStyle = function(parameters) {
            if (parameters["style"] === "outline") {
                var params = {};
                if(parameters.color) params.color =  $3Dmol.CC.color(parameters.color);
                if(parameters.width) params.width = parameters.width;
                renderer.enableOutline(params);
            } else {
                renderer.disableOutline();
            }           
            return this;
        }
         
        if(config.style) { //enable setting style in constructor
             this.setViewStyle(config);
        }

        /**
         * Set viewer width
         * 
         * @function $3Dmol.GLViewer#setWidth
         * @param {number}
         *            w Width in pixels
         */
        this.setWidth = function(w) {
            WIDTH = w || WIDTH;
            renderer.setSize(WIDTH, HEIGHT);
            return this;
        };

        /**
         * Set viewer height
         * 
         * @function $3Dmol.GLViewer#setHeight
         * @param {number}
         *            h Height in pixels
         */
        this.setHeight = function(h) {
            HEIGHT = h || HEIGHT;
            renderer.setSize(WIDTH, HEIGHT);
            return this;
        };

        /**
         * Resize viewer according to containing HTML element's dimensions
         * 
         * @function $3Dmol.GLViewer#resize
         */
        this.resize = function() {
            WIDTH = container.width();
            HEIGHT = container.height();
            ASPECT = WIDTH / HEIGHT;
            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = ASPECT;
            camera.updateProjectionMatrix();
            show();
            return this;
        };

        $(window).resize(this.resize);

        /**
         * Return specified model
         * 
         * @function $3Dmol.GLViewer#getModel
         * @param {number}
         *            [id=last model id] - Retrieve model with specified id
         * @default Returns last model added to viewer or null if there are no models
         * @return {GLModel}
         * 
         * @example // Retrieve reference to first GLModel added var m =
         *      $.get('volData/4csv.pdb', function(data) {
      viewer.addModel(data,'pdb');
      viewer.setStyle({cartoon:{},stick:{}});
      viewer.getModel(0);
      viewer.zoomTo();
      viewer.render(callback);

    });
    
    //can't use jquery with binary data
    var req = new XMLHttpRequest();
    req.open('GET', 'volData/4csv.ccp4.gz', true);
    req.responseType = "arraybuffer";
    req.onload = function (aEvt) {      
       var voldata = new $3Dmol.VolumeData(req.response, 'ccp4.gz');
                          
      viewer.render(callback);
    };
         */
        this.getModel = function(id) {
            if(!(id in models)) {
                if(models.length == 0) 
                    return null;
                else
                    return models[models.length-1]; //get last model if no (or invalid) id specified
            }
            return models[id];
        };


        /**
         * Rotate scene by angle degrees around axis
         * 
         * @function $3Dmol.GLViewer#rotate
         * @param {number}
         *            [angle] - Angle, in degrees, to rotate by.
         * @param {string}
         *            [axis] - Axis ("x", "y", or "z") to rotate around.
         *            Default "y"
         * @param {number}
         *            [animationDuration] - an optional parameter that denotes
         *            the duration of a zoom animation
         * @param {boolean} [fixedPath] - if true animation is constrained to 
         *      requested motion, overriding updates that happen during the animation         *            
         * @example     $.get('volData/4csv.pdb', function(data) {
      viewer.addModel(data,'pdb');
      viewer.setStyle({cartoon:{},stick:{}});
      viewer.zoomTo();
      viewer.render(callback);
    });
    
    //can't use jquery with binary data
    var req = new XMLHttpRequest();
    req.open('GET', 'volData/4csv.ccp4.gz', true);
    req.responseType = "arraybuffer";
    req.onload = function (aEvt) {      
       var voldata = new $3Dmol.VolumeData(req.response, 'ccp4.gz');
                          
      //viewer.translate(10,10);         
      //viewer.zoomTo({resn:'STI'});
      //viewer.zoom(10);
      viewer.rotate(90,"y");
      viewer.render(callback);
    };
         *  
         */
        this.rotate = function(angle, axis, animationDuration, fixedPath) {
            animationDuration = animationDuration!==undefined ? animationDuration : 0;

            if (typeof (axis) === "undefined") {
                axis = "y";
            }
            
            var qFromAngle = function(rangle) {
                var s = Math.sin(rangle / 2.0);
                var c = Math.cos(rangle / 2.0);
                var i = 0, j = 0, k = 0;

                if (axis == "x")
                    i = s;
                if (axis == "y")
                    j = s;
                if (axis == "z")
                    k = s;

                return new $3Dmol.Quaternion(i, j, k, c).normalize();
            }
            

            var wait_time = 20;
            var rangle = Math.PI * angle / 180.0;
            var q = qFromAngle(rangle);
            
            if(animationDuration ){
                var final = new $3Dmol.Quaternion().copy(rotationGroup.quaternion).multiply(q);//final
                animateMotion(animationDuration,fixedPath,
                        modelGroup.position,
                        rotationGroup.position.z, 
                        final,
                        lookingAt);              
            } else { //not animated
                rotationGroup.quaternion.multiply(q);
                show();
            }
            return this;

        };

        this.surfacesFinished= function() {
              for(var key in surfaces){
                if(!surfaces[key][0].done){
                    return false;
                }
            }
            return true;


        };

        /** Returns an array representing the current viewpoint.
         * Translation, zoom, and rotation quaternion. 
         * @function $3Dmol.GLViewer#getView
         * @returns {Array.<number>} arg
         *  */
        this.getView = function() {
            if (!modelGroup)
                return [ 0, 0, 0, 0, 0, 0, 0, 1 ];
            var pos = modelGroup.position;
            var q = rotationGroup.quaternion;
            return [ pos.x, pos.y, pos.z, rotationGroup.position.z, q.x, q.y,
                    q.z, q.w ];
        };

        /** Sets the view to the specified translation, zoom, and rotation.
         * 
         * @function $3Dmol.GLViewer#setView
         * @param {Array.<number>} arg Array formatted identically to the return value of getView */
        this.setView = function(arg, nolink) {

            if (arg === undefined
                    || !(arg instanceof Array || arg.length !== 8))
                return this;

            if (!modelGroup || !rotationGroup)
                return this;
            modelGroup.position.x = arg[0];
            modelGroup.position.y = arg[1];
            modelGroup.position.z = arg[2];
            rotationGroup.position.z = arg[3];
            rotationGroup.quaternion.x = arg[4];
            rotationGroup.quaternion.y = arg[5];
            rotationGroup.quaternion.z = arg[6];
            rotationGroup.quaternion.w = arg[7];
            if(typeof(arg[8]) != "undefined") {
                rotationGroup.position.x = arg[8];
                rotationGroup.position.y = arg[9];
            }
            show(nolink);
            return this;
        };

        // apply styles, models, etc in viewer
        /**
         * Render current state of viewer, after 
         * adding/removing models, applying styles, etc.
         * 
         * @function $3Dmol.GLViewer#render
         */
        this.render = function(callback) {
            var time1 = new Date();
            updateClickables(); //must render for clickable styles to take effect
            var view = this.getView();
            
            var i, n;
            var exts = renderer.supportedExtensions();
            for (i = 0; i < models.length; i++) {
                if (models[i]) {
                    models[i].globj(modelGroup, exts);
                }
            }

            for (i = 0; i < shapes.length; i++) {
                if (shapes[i]) {
                    shapes[i].globj(modelGroup, exts);
                }
            }
            
            for (i in surfaces) { // this is an object with possible holes
                if(!surfaces.hasOwnProperty(i)) continue;
                var surfArr = surfaces[i];
                for (n = 0; n < surfArr.length; n++) {
                    if (surfArr.hasOwnProperty(n)) {
                        var geo = surfArr[n].geo;
                        // async surface generation can cause
                        // the geometry to be webgl initialized before it is fully
                        // formed; force various recalculations until full surface
                        // is
                        // available
                        if (!surfArr[n].finished) {
                            geo.verticesNeedUpdate = true;
                            geo.elementsNeedUpdate = true;
                            geo.normalsNeedUpdate = true;
                            geo.colorsNeedUpdate = true;
                            geo.buffersNeedUpdate = true;
                            geo.boundingSphere = null;

                            if (surfArr[n].done)
                                surfArr[n].finished = true;

                            // remove partially rendered surface
                            if (surfArr[n].lastGL)
                                modelGroup.remove(surfArr[n].lastGL);

                            // create new surface
                            var smesh = null;

                            if(surfArr[n].mat instanceof $3Dmol.LineBasicMaterial) {
                                //special case line meshes
                                smesh = new $3Dmol.Line(geo, surfArr[n].mat);
                            }
                            else {
                                smesh = new $3Dmol.Mesh(geo, surfArr[n].mat);
                            }
                            if(surfArr[n].mat.transparent && surfArr[n].mat.opacity == 0) {
                                //don't bother with hidden surfaces
                                smesh.visible = false;
                            } else {
                                smesh.visible = true;
                            }
                            if (surfArr[n].symmetries.length > 1 || 
                            (surfArr[n].symmetries.length == 1 && 
                            !(surfArr[n].symmetries[n].isIdentity()))) {
                                var j;
                                var tmeshes = new $3Dmol.Object3D(); //transformed meshes
                                for (j = 0; j < surfArr[n].symmetries.length; j++) {
                                    var tmesh = smesh.clone();
                                    tmesh.matrix = surfArr[n].symmetries[j];
                                    tmesh.matrixAutoUpdate = false;
                                    tmeshes.add(tmesh);
                                }
                                surfArr[n].lastGL = tmeshes;
                                modelGroup.add(tmeshes);
                            }
                            else {
                                surfArr[n].lastGL = smesh;
                                modelGroup.add(smesh);
                            }
                        } // else final surface already there
                    }
                }
            }
            
            this.setView(view); // Calls show() => renderer render
            var time2 = new Date();
            //console.log("render time: " + (time2 - time1));
            if(typeof callback ==='function'){
                callback();
               // console.log("render time: " + (time2 - time1));
            }
            return this;
        };

        /**
         * 
         * @param {AtomSelectionSpec}
         *            sel
         * @return {AtomSpec[]}
         */
        function getAtomsFromSel(sel) {
            var atoms = [];
            if (typeof (sel) === "undefined")
                sel = {};

            var ms = [];
            var i;

            if (typeof sel.model === "undefined") {
                for (i = 0; i < models.length; i++) {
                    if (models[i])
                        ms.push(models[i]);
                }
            } else { // specific to some models
                ms = sel.model;
                if (!$.isArray(ms))
                    ms = [ ms ];
            }

            for (i = 0; i < ms.length; i++) {
                atoms = atoms.concat(ms[i].selectedAtoms(sel));
            }

            return atoms;
        }

        /**
         * 
         * @param {AtomSpec}
         *            atom
         * @param {AtomSpec}
         *            sel
         * @return {boolean}
         */
        function atomIsSelected(atom, sel) {
            if (typeof (sel) === "undefined")
                sel = {};

            var ms = [];
            var i;

            if (typeof sel.model === "undefined") {
                for (i = 0; i < models.length; i++) {
                    if (models[i])
                        ms.push(models[i]);
                }
            } else { // specific to some models
                ms = sel.model;
                if (!$.isArray(ms))
                    ms = [ ms ];
            }

            for (i = 0; i < ms.length; i++) {
                if (ms[i].atomIsSelected(atom, sel))
                    return true;
            }

            return false;
        }

        
        this.autoload = function(callback,viewer){
            $3Dmol.autoload(callback,viewer);
        }

        /** return list of atoms selected by sel
         * 
         * @function $3Dmol.GLViewer#selectedAtoms
         * @param {AtomSelectionSpec} sel
         * @return {Array.<Object>}
         */
        this.selectedAtoms = function(sel) {
            return getAtomsFromSel(sel);
        };
        
        /**
         * Return pdb output of selected atoms (if atoms from pdb input)
         * 
         * @function $3Dmol.GLViewer#pdbData  
         * @param {Object=} [sel] - Selection specification specifying model and atom properties to select.  Default: all atoms in viewer
         * @return {string} PDB string of selected atoms
         */
        this.pdbData = function(sel) {
            var atoms = getAtomsFromSel(sel);
            var ret = "";
            for (var i = 0, n = atoms.length; i < n; ++i) {
                ret += atoms[i].pdbline + "\n";
            }
            return ret;
        };

        //interpolate between two normalized quaternions (t between 0 and 1)
        //https://en.wikipedia.org/wiki/Slerp
        var slerp = function(v0, v1, t) {
            // Compute the cosine of the angle between the two vectors.
            //dot product
            if(t == 1) return v1;
            else if(t == 0) return v0;
            var dot = v0.x*v1.x+v0.y*v1.y+v0.z*v1.z+v0.w*v1.w;
            if (dot > 0.9995) {
                // If the inputs are too close for comfort, linearly interpolate
                // and normalize the result.
                var result = new $3Dmol.Quaternion(
                        v0.x+t*(v1.x-v0.x),
                        v0.y+t*(v1.y-v0.y),
                        v0.z+t*(v1.z-v0.z),
                        v0.w+t*(v1.w-v0.w));
                        
                result.normalize();
                return result;
            }

            // If the dot product is negative, the quaternions
            // have opposite handed-ness and slerp won't take
            // the shorted path. Fix by reversing one quaternion.
            if (dot < 0.0) {
                v1 = v1.clone().multiplyScalar(-1);
                dot = -dot;
            }  

            if(dot > 1) dot = 1.0;
            else if(dot < -1) dot = -1.0;

            var theta_0 = Math.acos(dot);  // theta_0 = angle between input vectors
            var theta = theta_0*t;    // theta = angle between v0 and result 

            var v2 = v1.clone();
            v2.sub(v0.clone().multiplyScalar(dot));
            v2.normalize();              // { v0, v2 } is now an orthonormal basis

            var c = Math.cos(theta);
            var s = Math.sin(theta);
            var ret = new $3Dmol.Quaternion(
                    v0.x*c+v2.x*s,
                    v0.y*c+v2.y*s,
                    v0.z*c+v2.z*s,
                    v0.w*c+v2.w*s
            );
            ret.normalize();
            return ret;
        };
        
        //animate motion between current position and passed position
        // can set some parameters to null
        //if fixed is true will enforce the request animation, otherwise
        //does relative updates
        //positions objects have modelggroup position, rotation group position.z,
        //and rotationgroup quaternion
        //return array includes final position, but not current 
        //the returned array includes an animate method
        var animateMotion = function(duration, fixed, mpos, rz, rot, cam) {
            var interval = 20;
            var steps = Math.ceil(duration/interval);
            if(steps < 1) steps = 1;
            
            var curr = {mpos:modelGroup.position.clone(),
                    rz: rotationGroup.position.z,
                    rot: rotationGroup.quaternion.clone(),
                    cam: lookingAt.clone()};
            
            if(fixed) { //precompute path and stick to it
                var steps = new Array(steps);
                var n = steps.length;
                for(var i = 0; i < n; i++) {
                    var frac = (i+1)/n;
                    var next = {mpos: curr.mpos, rz:curr.rz, rot:curr.rot};
                    if(mpos) {
                        next.mpos = mpos.clone().sub(curr.mpos).multiplyScalar(frac).add(curr.mpos);
                    }
                    if(typeof(rz) != 'undefined' && rz != null) {
                        next.rz = curr.rz+frac*(rz-curr.rz);
                    }
                    if(rot) {
                        next.rot = slerp(curr.rot,rot,frac);
                    }
                    if(cam) {
                        next.cam = cam.clone().sub(curr.cam).multiplyScalar(frac).add(curr.cam);
                    }
                    
                    steps[i] = next;
                }
                
                var step = 0;
                var callback = function() {
                    var p = steps[step];
                    step += 1;
                    if(p.mpos) {
                        modelGroup.position = p.mpos;
                    }
                    if(p.rz) {
                        rotationGroup.position.z = p.rz;
                    }
                    if(p.rot) {
                        rotationGroup.quaternion = p.rot;
                    }
                    if(p.cam) {
                        camera.lookAt(p.cam);
                    }
                    
                    if(step < steps.length) {
                        setTimeout(callback, interval);
                    }
                    show();
                }
                setTimeout(callback, interval);
               
            } else { //relative update
                var delta = {};
                var frac = 1.0/steps;
                if(mpos) {
                    delta.mpos = mpos.clone().sub(curr.mpos).multiplyScalar(frac);
                }
                if(typeof(rz) != 'undefined' && rz != null) {
                    delta.rz = frac*(rz-curr.rz);
                }
                if(rot) {
                    var next = slerp(curr.rot,rot,frac);
                    //comptute step delta rotation
                    delta.rot = curr.rot.clone().inverse().multiply(next);
                }
                if(cam) {
                    delta.cam = cam.clone().sub(curr.cam).multiplyScalar(frac);
                }
                var step = 0.0;
                var callback = function() {
                    step += 1;
                    if(delta.mpos) {
                        modelGroup.position.add(delta.mpos);
                    }
                    if(delta.rz) {
                        rotationGroup.position.z += delta.rz;
                    }
                    if(delta.rot) {
                        rotationGroup.quaternion.multiply(delta.rot);
                    }
                    if(delta.cam) {
                        lookingAt.add(delta.cam);
                        camera.lookAt(lookingAt);
                    }
                    
                    if(step < steps) {
                        setTimeout(callback, interval);
                    }
                    show();
                }
                setTimeout(callback, interval);
            }
        }
        /**
         * Zoom current view by a constant factor
         * 
         * @function $3Dmol.GLViewer#zoom
         * @param {number}
         *            [factor] - Magnification factor. Values greater than 1
         *            will zoom in, less than one will zoom out. Default 2.
         * @param {number}
         *            [animationDuration] - an optional parameter that denotes
         *            the duration of a zoom animation
         * @param {Boolean} [fixedPath] - if true animation is constrained to 
         *      requested motion, overriding updates that happen during the animation
         * @example   
    $.get('volData/4csv.pdb', function(data) {
      viewer.addModel(data,'pdb');
      viewer.setStyle({cartoon:{},stick:{}});
      viewer.zoomTo();
      viewer.render(callback);
    });
    
    //can't use jquery with binary data
    var req = new XMLHttpRequest();
    req.open('GET', 'volData/4csv.ccp4.gz', true);
    req.responseType = "arraybuffer";
    req.onload = function (aEvt) {      
       var voldata = new $3Dmol.VolumeData(req.response, 'ccp4.gz');
                          
      viewer.zoom(10);
      viewer.render(callback);
    };
         */
        this.zoom = function(factor,animationDuration,fixedPath) {
            var factor = factor || 2;
            var animationDuration = animationDuration!==undefined ? animationDuration : 0;
            var scale = (CAMERA_Z - rotationGroup.position.z) / factor;
            var final_z = CAMERA_Z - scale;

            if(animationDuration>0){
                animateMotion(animationDuration,fixedPath,
                        modelGroup.position, 
                        final_z, 
                        rotationGroup.quaternion,
                        lookingAt);
            } else { //no animation
                rotationGroup.position.z = final_z;
                show();
            }
            return this;
        };
        
        /**
         * Translate current view by x,y screen coordinates
         * This pans the camera rather than translating the model.
         * 
         * @function $3Dmol.GLViewer#translate
         * @param {number} x
         * @param {number} y
         * @param {number}
         *            [animationDuration] - an optional parameter that denotes
         *            the duration of a zoom animation
         * @param {Boolean} [fixedPath] - if true animation is constrained to 
         *      requested motion, overriding updates that happen during the animation         *            
         * @example     $.get('volData/4csv.pdb', function(data) {
      viewer.addModel(data,'pdb');
      viewer.setStyle({cartoon:{},stick:{}});
      viewer.zoomTo();
      viewer.render(callback);
    });
    
    //can't use jquery with binary data
    var req = new XMLHttpRequest();
    req.open('GET', 'volData/4csv.ccp4.gz', true);
    req.responseType = "arraybuffer";
    req.onload = function (aEvt) {      
       var voldata = new $3Dmol.VolumeData(req.response, 'ccp4.gz');
                          
      viewer.translate(10,10);         
      //viewer.zoomTo({resn:'STI'});
      //viewer.zoom(10);
      //viewer.rotate(90,"y");
      viewer.render(callback);
    };
         */
        this.translate = function(x, y, animationDuration, fixedPath) {
            var animationDuration = animationDuration!==undefined ? animationDuration : 0;
            var dx = x/WIDTH;
            var dy = y/HEIGHT;
            var v = new $3Dmol.Vector3(0,0,-CAMERA_Z);
            
            projector.projectVector(v, camera);
            v.x -= dx;
            v.y -= dy;
            projector.unprojectVector(v, camera);
            v.z = 0;            

            var final_position=lookingAt.clone().add(v);
            if(animationDuration>0){
                animateMotion(animationDuration,fixedPath,
                        modelGroup.position,
                        rotationGroup.position.z, 
                        rotationGroup.quaternion,
                        final_position);
            } else { //no animation
                lookingAt = final_position;
                camera.lookAt(lookingAt);
                show();
            }
            return this;
        };
        

        /**
         * Adjust slab to fully enclose selection (default everything).
         * 
         * @function $3Dmol.GLViewer#center
         * @param {Object}
         *            [sel] - Selection specification specifying model and atom
         *            properties to select. Default: all atoms in viewer
         */
        this.fitSlab = function(sel) {
            sel = sel || {};
            var atoms = getAtomsFromSel(sel);
            var tmp = $3Dmol.getExtent(atoms);

            // fit to bounding box
            var x = tmp[1][0] - tmp[0][0], 
                y = tmp[1][1] - tmp[0][1], 
                z = tmp[1][2] - tmp[0][2];

            var maxD = Math.sqrt(x * x + y * y + z * z);
            if (maxD < 5)
                maxD = 5;

            // use full bounding box for slab/fog
            slabNear = -maxD / 1.9;
            slabFar = maxD / 2;

            return this;
        };        
        
        /**
         * Re-center the viewer around the provided selection (unlike zoomTo, does not zoom).
         * 
         * @function $3Dmol.GLViewer#center
         * @param {Object}
         *            [sel] - Selection specification specifying model and atom
         *            properties to select. Default: all atoms in viewer
         * @param {number}
         *            [animationDuration] - an optional parameter that denotes
         *            the duration of a zoom animation
         * @param {Boolean} [fixedPath] - if true animation is constrained to 
         *      requested motion, overriding updates that happen during the animation         *            
         * @example // if the user were to pass the animationDuration value to 
         *           // the function like so viewer.zoomTo({resn:'STI'},1000);
         *         //   the program would center on resn 'STI' over the course 
         *         //   of 1 second(1000 milleseconds).
         *  // Reposition to centroid of all atoms of all models in this
         * //viewer glviewer.center();
    $.get('volData/4csv.pdb', function(data) {
      viewer.addModel(data,'pdb');
      viewer.setStyle({cartoon:{},stick:{}});
      viewer.zoomTo();
      viewer.render(callback);
    });
    
    //can't use jquery with binary data
    var req = new XMLHttpRequest();
    req.open('GET', 'volData/4csv.ccp4.gz', true);
    req.responseType = "arraybuffer";
    req.onload = function (aEvt) {      
       var voldata = new $3Dmol.VolumeData(req.response, 'ccp4.gz');
                          
      //viewer.translate(10,10);         
      //viewer.zoomTo({resn:'STI'});
      //viewer.zoom(10);
      //viewer.rotate(90,"y");
      viewer.center();
      viewer.render(callback);
    };
         */
        this.center = function(sel,animationDuration,fixedPath){
             animationDuration=animationDuration!==undefined ? animationDuration : 0;
            var allatoms, alltmp;
            sel = sel || {};
            var atoms = getAtomsFromSel(sel);
            var tmp = $3Dmol.getExtent(atoms);

            if($.isEmptyObject(sel)) {
                //include shapes when zooming to full scene
                //TODO: figure out a good way to specify shapes as part of a selection
                $.each(shapes, function(i, shape) {
                    if(shape && shape.boundingSphere && shape.boundingSphere.center) {
                        var c = shape.boundingSphere.center;
                        var r = shape.boundingSphere.radius;
                        if(r > 0) {
                            //make sure full shape is visible
                            atoms.push(new $3Dmol.Vector3(c.x+r,c.y,c.z));
                            atoms.push(new $3Dmol.Vector3(c.x-r,c.y,c.z));
                            atoms.push(new $3Dmol.Vector3(c.x,c.y+r,c.z));
                            atoms.push(new $3Dmol.Vector3(c.x,c.y-r,c.z));
                            atoms.push(new $3Dmol.Vector3(c.x,c.y,c.z+r));
                            atoms.push(new $3Dmol.Vector3(c.x,c.y,c.z-r));
                        } else {
                            atoms.push(c);
                        }
                    }
                });
                tmp = $3Dmol.getExtent(atoms);
                allatoms = atoms;
                alltmp = tmp;

            }
            else {
                allatoms = getAtomsFromSel({});
                alltmp = $3Dmol.getExtent(allatoms);
            }

            // use selection for center
            var center = new $3Dmol.Vector3(tmp[2][0], tmp[2][1], tmp[2][2]);

            // but all for bounding box
            var x = alltmp[1][0] - alltmp[0][0], y = alltmp[1][1]
                    - alltmp[0][1], z = alltmp[1][2] - alltmp[0][2];

            var maxD = Math.sqrt(x * x + y * y + z * z);
            if (maxD < 5)
                maxD = 5;

            // use full bounding box for slab/fog
            slabNear = -maxD / 1.9;
            slabFar = maxD / 2;

            // for zoom, use selection box
            x = tmp[1][0] - tmp[0][0];
            y = tmp[1][1] - tmp[0][1];
            z = tmp[1][2] - tmp[0][2];
            maxD = Math.sqrt(x * x + y * y + z * z);
            if (maxD < 5)
                maxD = 5;
            
            //find the farthest atom from center to get max distance needed for view
            var maxDsq = 25;
            for (var i = 0; i < atoms.length; i++) {
                if(atoms[i]) {
                    var dsq = center.distanceToSquared(atoms[i]);
                    if(dsq > maxDsq)
                        maxDsq = dsq;
                }
            }
            
            var maxD = Math.sqrt(maxDsq)*2;
            var finalpos = center.clone().multiplyScalar(-1);
            if(animationDuration>0){
                animateMotion(animationDuration,fixedPath,
                        finalpos, 
                        rotationGroup.position.z, 
                        rotationGroup.quaternion,
                        lookingAt);
            } else { //no animation 
                modelGroup.position = finalpos;
                show();
            }
            return this;
        };
        
        /**
         * Zoom to center of atom selection
         * 
         * @function $3Dmol.GLViewer#zoomTo
         * @param {Object}
         *            [sel] - Selection specification specifying model and atom
         *            properties to select. Default: all atoms in viewer
         * @param {number}
         *            [animationDuration] - an optional parameter that denotes
         *            the duration of a zoom animation
         * @param {Boolean} [fixedPath] - if true animation is constrained to 
         *      requested motion, overriding updates that happen during the animation         *            
          * @example   
    

              $.get('volData/1fas.pqr', function(data){
                  viewer.addModel(data, "pqr");
                  $.get("volData/1fas.cube",function(volumedata){
                      viewer.addSurface($3Dmol.SurfaceType.VDW, {
                          opacity:0.85,
                          voldata: new $3Dmol.VolumeData(volumedata, "cube"),
                          volscheme: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'charge'))
                      },{});
                      
                  viewer.render();
                  });
                  viewer.zoomTo();
                });
         */
        this.zoomTo = function(sel, animationDuration,fixedPath) {
            animationDuration=animationDuration!==undefined ? animationDuration : 0;
            var allatoms, alltmp;
            sel = sel || {};
            var atoms = getAtomsFromSel(sel);
            var tmp = $3Dmol.getExtent(atoms);

            if($.isEmptyObject(sel)) {
                //include shapes when zooming to full scene
                //TODO: figure out a good way to specify shapes as part of a selection
                $.each(shapes, function(i, shape) {
                if(shape && shape.boundingSphere && shape.boundingSphere.center) {
                    var c = shape.boundingSphere.center;
                    var r = shape.boundingSphere.radius;
                    if(r > 0) {
                        //make sure full shape is visible
                            atoms.push(new $3Dmol.Vector3(c.x+r,c.y,c.z));
                            atoms.push(new $3Dmol.Vector3(c.x-r,c.y,c.z));
                            atoms.push(new $3Dmol.Vector3(c.x,c.y+r,c.z));
                            atoms.push(new $3Dmol.Vector3(c.x,c.y-r,c.z));
                            atoms.push(new $3Dmol.Vector3(c.x,c.y,c.z+r));
                            atoms.push(new $3Dmol.Vector3(c.x,c.y,c.z-r));
                    } else {
                            atoms.push(c);
                    }
                  }
                });
                tmp = $3Dmol.getExtent(atoms);
                allatoms = atoms;
                alltmp = tmp;

            }
            else {
                allatoms = getAtomsFromSel({});
                alltmp = $3Dmol.getExtent(allatoms);
            }

            // use selection for center
            var center = new $3Dmol.Vector3(tmp[2][0], tmp[2][1], tmp[2][2]);

            
            // but all for bounding box
            var x = alltmp[1][0] - alltmp[0][0], y = alltmp[1][1]
                    - alltmp[0][1], z = alltmp[1][2] - alltmp[0][2];

            var maxD = Math.sqrt(x * x + y * y + z * z);
            if (maxD < 5)
                maxD = 5;

            // use full bounding box for slab/fog
            slabNear = -maxD / 1.9;
            slabFar = maxD / 2;

            // for zoom, use selection box
            x = tmp[1][0] - tmp[0][0];
            y = tmp[1][1] - tmp[0][1];
            z = tmp[1][2] - tmp[0][2];
            maxD = Math.sqrt(x * x + y * y + z * z);
            if (maxD < 5)
                maxD = 5;
            
            //find the farthest atom from center to get max distance needed for view
            var maxDsq = 25;
            for (var i = 0; i < atoms.length; i++) {
                if(atoms[i]) {
                    var dsq = center.distanceToSquared(atoms[i]);
                    if(dsq > maxDsq)
                        maxDsq = dsq;
                }
            }
            
            var maxD = Math.sqrt(maxDsq)*2;
            var finalpos = center.clone().multiplyScalar(-1);
            var finalz =  -(maxD * 0.5
                    / Math.tan(Math.PI / 180.0 * camera.fov / 2) - CAMERA_Z);
            if(animationDuration>0){
                animateMotion(animationDuration,fixedPath,
                        finalpos,
                        finalz, 
                        rotationGroup.quaternion,
                        lookingAt);                
            } else {
                modelGroup.position = finalpos;
                rotationGroup.position.z = finalz;
                show();
            }
            return this;
        
        };

        /**
         * Set slab of view (contents outside of slab are clipped). M
         * Must call render to update.
         * 
         * @function $3Dmol.GLViewer#setSlab
         * @param {near}
         * @param {far}
         */
        this.setSlab = function(near, far) {
            slabNear = near;
            slabFar = far;
        };
        
        /**
         * Get slab of view (contents outside of slab are clipped).
         * 
         * @function $3Dmol.GLViewer#setSlab
         * @return {Object} near/far
         */
        this.getSlab = function(sel) {
            return {near: slabNear, far: slabFar};
        };
                
        /**
         * Add label to viewer
         * 
         * @function $3Dmol.GLViewer#addLabel
         * @param {string}
         *            text - Label text
         * @param {LabelSpec}
         *            options - Label style specification
          @param {AtomSelection}
         *            sel - Set position of label to center of this selection
         * @return {$3Dmol.Label}
         * 
         * @example
         *  $3Dmol.download("pdb:2EJ0",viewer,{},function(){
                  
                  viewer.addLabel("Aromatic", {position: {x:-6.89, y:0.75, z:0.35}, backgroundColor: 0x800080, backgroundOpacity: 0.8});
                  viewer.addLabel("Label",{font:'sans-serif',fontSize:18,fontColor:'white',fontOpacity:1,borderThickness:1.0,
                                           borderColor:'red',borderOpacity:0.5,backgroundColor:'black',backgroundOpacity:0.5,
                                           position:{x:50.0,y:0.0,z:0.0},inFront:true,showBackground:true});
                  viewer.setStyle({chain:'A'},{cross:{hidden:true}});
                  viewer.setStyle({chain:'B'},{cross:{hidden:false,
                                                      linewidth:1.0,
                                                      colorscheme:'greenCarbon'}});
                  viewer.setStyle({chain:'C'},{cross:{hidden:false,
                                                      linewidth:1.0,
                                                      radius:0.5}});
                  viewer.setStyle({chain:'D'},{cross:{hidden:false,
                                                      linewidth:10.0}});
                  viewer.setStyle({chain:'E'},{cross:{hidden:false,
                                                      linewidth:1.0,
                                                      color:'black'}});
                  
                  viewer.render();

                  
                });
            
         */
        this.addLabel = function(text, options, sel) {
            options = options || {};
            if(sel) {
                var extent = $3Dmol.getExtent(getAtomsFromSel(sel));
                options.position = {x: extent[2][0], y: extent[2][1], z: extent[2][2]};
            }
            var label = new $3Dmol.Label(text, options);
            label.setContext();
            modelGroup.add(label.sprite);
            if(options.fixed)
                fixed_labels.push(labels.length);
            labels.push(label);
            show();
            return label;
        };
        


        /** Add residue labels.  This will generate one label per a
         * residue within the selected atoms.  The label will be at the
         * centroid of the atoms and styled according to the passed style.
         * The label text will be [resn][resi]
         * 
         * @param {Object} sel
         * @param {Object} style
         */
        this.addResLabels = function(sel, style) {
            applyToModels("addResLabels", sel, this, style);
            return this;
        }

        /**
         * Remove label from viewer
         * 
         * @function $3Dmol.GLViewer#removeLabel
         * @param {$3Dmol.Label}
         *            label - $3Dmol label
         * 
         * @example // Remove labels created in 
         $3Dmol.download("pdb:2EJ0",viewer,{},function(){
         *    viewer.addLabel("Aromatic", {position: {x:-6.89, y:0.75, z:0.35}, backgroundColor: 0x800080, backgroundOpacity: 0.8});
                  viewer.addLabel("Label",{font:'sans-serif',fontSize:18,fontColor:'white',fontOpacity:1,borderThickness:1.0,
                                           borderColor:'red',borderOpacity:0.5,backgroundColor:'black',backgroundOpacity:0.5,
                                           position:{x:50.0,y:0.0,z:0.0},inFront:true,showBackground:true});
                  viewer.remove
                  viewer.render();

                  
                });

         */
        this.removeLabel = function(label) {
            //todo: don't do the linear search
            for(var i = 0; i < labels.length; i++) {
                if(labels[i] == label) {
                    labels.splice(i,1);
                    label.dispose();
                    modelGroup.remove(label.sprite);
                    break;
                }
            }
            return this;
        };



        /**
         * Remove all labels from viewer
         * 
         * @function $3Dmol.GLViewer#removeAllLabels
         */
        this.removeAllLabels = function() {
            for (var i = 0; i < labels.length; i++) {
                modelGroup.remove(labels[i].sprite);
            }
            labels.splice(0,labels.length); //don't overwrite in case linked
            return this;
        };
        
        // Modify label style
        /**
         * Modify existing label's style
         * 
         * @function $3Dmol.GLViewer#setLabelStyle
         * @param {$3Dmol.Label}
         *            label - $3Dmol label
         * @param {Object}
         *            stylespec - Label style specification
         * @return {$3Dmol.Label}
         */
        this.setLabelStyle = function(label, stylespec) {
            modelGroup.remove(label.sprite);
            label.dispose();
            label.stylespec = stylespec;
            label.setContext();
            modelGroup.add(label.sprite);
            show();
            return label;

        };

        // Change label text
        /**
         * Modify existing label's text
         * 
         * @function $3Dmol.GLViewer#setLabelText
         * @param {$3Dmol.Label}
         *            label - $3Dmol label
         * @param {String}
         *            text - Label text
         * @return {$3Dmol.Label}
         */
        this.setLabelText = function(label, text) {
            modelGroup.remove(label.sprite);
            label.dispose();
            label.text = text;
            label.setContext();
            modelGroup.add(label.sprite);
            show();
            return label;

        };

        var scale_labels= function(factor){

        }

        /**
         * Add shape object to viewer 
         * @see {@link $3Dmol.GLShape}
         * 
         * @function $3Dmol.GLViewer#addShape
         * @param {ShapeSpec} shapeSpec - style specification for label
         * @return {$3Dmol.GLShape}
         */
        this.addShape = function(shapeSpec) {
            shapeSpec = shapeSpec || {};
            var shape = new $3Dmol.GLShape(shapeSpec);
            shape.shapePosition = shapes.length;
            shapes.push(shape);

            return shape;

        };

        /**
         * Remove shape object from viewer
         *
         * @function $3Dmol.GLViewer#removeShape
         * @param {$3Dmol.GLShape} shape - Reference to shape object to remove
         */
        this.removeShape = function(shape) {
            if (!shape)
                return this;
            shape.removegl(modelGroup);
            delete shapes[shape.shapePosition];
            // clear off back of model array
            while (shapes.length > 0
                    && typeof (shapes[shapes.length - 1]) === "undefined")
                shapes.pop();
            return this;
        };
        
        /**
         * Remove all shape objects from viewer
         * @function $3Dmol.GLViewer#removeAllShapes
         */
        this.removeAllShapes = function() {
            for (var i = 0; i < shapes.length; i++) {
                var shape = shapes[i];
                shape.removegl(modelGroup);
            }
            shapes.splice(0,shapes.length);
            return this;
        }

        /**
         * Create and add sphere shape. This method provides a shorthand 
         * way to create a spherical shape object
         * 
         * @function $3Dmol.GLViewer#addSphere
         * @param {SphereSpec} spec - Sphere shape style specification
         * @return {$3Dmol.GLShape}
         @example
         
         viewer.addSphere({center:{x:0,y:0,z:0},radius:10.0,color:'red'});
         
         viewer.render();
         */
        this.addSphere = function(spec) {
            spec = spec || {};
            var s = new $3Dmol.GLShape(spec);
            s.shapePosition = shapes.length;
            s.addSphere(spec);
            shapes.push(s);

            return s;
        };

        /**
         * Create and add arrow shape
         * 
         * @function $3Dmol.GLViewer#addArrow
         * @param {ArrowSpec} spec - Style specification
         * @return {$3Dmol.GLShape}
         @example
        $3Dmol.download("pdb:4DM7",viewer,{},function(){
                  viewer.setBackgroundColor(0xffffffff);
                  viewer.addArrow({
                      start: {x:-10.0, y:0.0, z:0.0},
                      end: {x:0.0, y:-10.0, z:0.0},
                      radius: 1.0,
                      radiusRadio:1.0,
                      mid:1.0,
                      clickable:true,
                      callback:function(){
                          this.color.setHex(0xFF0000FF);
                          viewer.render();
                      }
                  });
                  viewer.render();
                });
         */
        this.addArrow = function(spec) {
            spec = spec || {};
            var s = new $3Dmol.GLShape(spec);
            s.shapePosition = shapes.length;
            s.addArrow(spec);
            shapes.push(s);

            return s;
        };
        
        /**
         * Create and add cylinder shape
         * 
         * @function $3Dmol.GLViewer#addCylinder
         * @param {CylinderSpec} spec - Style specification
         * @return {$3Dmol.GLShape}

          @example
         viewer.setBackgroundColor(0xffffffff);
              viewer.addCylinder({start:{x:0.0,y:0.0,z:0.0},
                                  end:{x:10.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  fromCap:1,
                                  toCap:2,
                                  color:'red',
                                  hoverable:true,
                                  clickable:true,
                                  callback:function(){ this.color.setHex(0x00FFFF00);viewer.render();},
                                  hover_callback: function(){ viewer.render();},
                                  unhover_callback: function(){ this.color.setHex(0xFF000000);viewer.render();}
                                 });
              viewer.addCylinder({start:{x:0.0,y:2.0,z:0.0},
                                  end:{x:0.0,y:10.0,z:0.0},
                                  radius:0.5,
                                  fromCap:false,
                                  toCap:true,
                                  color:'teal'});
              viewer.addCylinder({start:{x:15.0,y:0.0,z:0.0},
                                  end:{x:20.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  color:'black',
                                  fromCap:false,
                                  toCap:false});
              viewer.render();
         */
        this.addCylinder = function(spec) {
            spec = spec || {};
            var s = new $3Dmol.GLShape(spec);
            s.shapePosition = shapes.length;
            if(spec.dashed)
                s.addDashedCylinder(spec);
            else
                s.addCylinder(spec);
            shapes.push(s);

            return s;
        };


        /**
         * Create and add line shape
         * 
         * @function $3Dmol.GLViewer#addLine
         * @param {LineSpec} spec - Style specification, can specify dashed, dashLength, and gapLength
         * @return {$3Dmol.GLShape}
         @example
         $3Dmol.download("pdb:2ABJ",viewer,{},function(){
                  
                  viewer.setViewStyle({style:"outline"});
                  viewer.setStyle({chain:'A'},{sphere:{hidden:true}});
                  viewer.setStyle({chain:'D'},{sphere:{radius:3.0}});
                  viewer.setStyle({chain:'G'},{sphere:{colorscheme:'greenCarbon'}});
                  viewer.setStyle({chain:'J'},{sphere:{color:'blue'}});
                  viewer.addLine({dashed:true,start:{x:0,y:0,z:0},end:{x:100,y:100,z:100}});
                  viewer.render();
              });

         */
        this.addLine = function(spec) {
            spec = spec || {};
            spec.wireframe = true;
            var s = new $3Dmol.GLShape(spec);
            s.shapePosition = shapes.length;
            if (spec.dashed)
                s = addLineDashed(spec, s);
            else
                s.addLine(spec);
            shapes.push(s);

            return s;
        };
        
        
        /**
         * Create and add unit cell
         *
         * @function $3Dmol.GLViewer#addUnitCell
         * @param {GLModel} Model with unit cell information (e.g., pdb derived).
         * @return {$3Dmol.GLShape}  Line shape delineating unit cell.
         */
        this.addUnitCell = function(model) {

            var s = new $3Dmol.GLShape({'wireframe' : true});
            s.shapePosition = shapes.length;
            var data = model.getCrystData();
            if (data) {

                if (data.matrix) {
                    var matrix = data.matrix
                } else {
                    var a = data.a, b = data.b, c = data.c, alpha = data.alpha, beta = data.beta, gamma = data.gamma;
                    alpha = alpha * Math.PI/180.0;
                    beta = beta * Math.PI/180.0;
                    gamma = gamma * Math.PI/180.0;
            
                    var u, v, w;
            
                    u = Math.cos(beta);
                    v = (Math.cos(alpha) - Math.cos(beta)*Math.cos(gamma))/Math.sin(gamma);
                    w = Math.sqrt(Math.max(0, 1-u*u-v*v));
            
                    var matrix = new $3Dmol.Matrix4(a, b*Math.cos(gamma), c*u, 0, 
                                                    0, b*Math.sin(gamma), c*v, 0,
                                                    0, 0,                 c*w, 0,
                                                    0, 0,                 0,   1); 
                }  
         
                var points = [  new $3Dmol.Vector3(0, 0, 0),
                                new $3Dmol.Vector3(1, 0, 0),
                                new $3Dmol.Vector3(0, 1, 0),
                                new $3Dmol.Vector3(0, 0, 1),
                                new $3Dmol.Vector3(1, 1, 0),
                                new $3Dmol.Vector3(0, 1, 1),
                                new $3Dmol.Vector3(1, 0, 1),
                                new $3Dmol.Vector3(1, 1, 1)  ];
                            
                for (var i = 0; i < points.length; i++) {
                    points[i] = points[i].applyMatrix4(matrix);
                }
            
                s.addLine({start: points[0], end: points[1]});
                s.addLine({start: points[0], end: points[2]});
                s.addLine({start: points[1], end: points[4]});
                s.addLine({start: points[2], end: points[4]});
            
                s.addLine({start: points[0], end: points[3]});
                s.addLine({start: points[3], end: points[5]});
                s.addLine({start: points[2], end: points[5]});
            
                s.addLine({start: points[1], end: points[6]});
                s.addLine({start: points[4], end: points[7]});
                s.addLine({start: points[6], end: points[7]});
            
                s.addLine({start: points[3], end: points[6]});
                s.addLine({start: points[5], end: points[7]});
            }
            
            shapes.push(s);
            return s;
        };

        function addLineDashed(spec, s) {
            spec.dashLength = spec.dashLength || 0.5;
            spec.gapLength = spec.gapLength || 0.5;
            spec.start = spec.start || {};
            spec.end = spec.end || {};
            
            var p1 = new $3Dmol.Vector3(spec.start.x || 0,
                    spec.start.y || 0, spec.start.z || 0)
            var p2 = new $3Dmol.Vector3(spec.end.x,
                    spec.end.y || 0, spec.end.z || 0);
                    
            var dir = new $3Dmol.Vector3();
            var dash = new $3Dmol.Vector3();
            var gap = new $3Dmol.Vector3();
            var length, dashAmt, gapAmt;
            var temp = p1.clone();
            var drawn = 0;

            dir.subVectors(p2, p1);
            length = dir.length();
            dir.normalize();
            dash = dir.clone();
            gap = dir.clone();
            dash.multiplyScalar(spec.dashLength);
            gap.multiplyScalar(spec.gapLength);
            dashAmt = dash.length();
            gapAmt = gap.length();

            while (drawn < length) {
                if ((drawn + dashAmt) > length) { 
                    spec.start = p1;
                    spec.end = p2;
                    s.addLine(spec);
                    break;
                }
                temp.addVectors(p1, dash); 
                spec.start = p1;
                spec.end = temp;
                s.addLine(spec);
                p1 = temp.clone();
                drawn += dashAmt;

                temp.addVectors(p1, gap);
                p1 = temp.clone();   
                drawn += gapAmt;
            }
                    
            return s;
        }

        

        /**
         * Add custom shape component from user supplied function
         * 
         * @function $3Dmol.GLViewer#addCustom
         * @param {CustomSpec} spec - Style specification
         * @return {$3Dmol.GLShape}
         @example
         function triangle(viewer) {
    var vertices = [];
    var normals = [];
    var colors = [];
    var r = 20;
    //triangle
    vertices.push(new $3Dmol.Vector3(0,0,0));
    vertices.push(new $3Dmol.Vector3(r,0,0));
    vertices.push(new $3Dmol.Vector3(0,r,0));
    
    normals.push(new $3Dmol.Vector3(0,0,1));
    normals.push(new $3Dmol.Vector3(0,0,1));
    normals.push(new $3Dmol.Vector3(0,0,1));
    
    colors.push({r:1,g:0,b:0});
    colors.push({r:0,g:1,b:0});
    colors.push({r:0,g:0,b:1});

    var faces = [ 0,1,2 ];
    
    var spec = {vertexArr:vertices, normalArr: normals, faceArr:faces,color:colors};
    viewer.addCustom(spec);
}
            triangle(viewer);
            viewer.render();
         */
        this.addCustom = function(spec) {
            spec = spec || {};
            var s = new $3Dmol.GLShape(spec);
            s.shapePosition = shapes.length;
            s.addCustom(spec);
            shapes.push(s);

            return s;
        };

        /**
         * Construct isosurface from volumetric data in gaussian cube format
         * @deprecated
         * @function $3Dmol.GLViewer#addVolumetricData
         * @param {String} data - Input file contents 
         * @param {String} format - Input file format (currently only supports "cube")
         * @param {IsoSurfaceSpec} spec - Shape style specification
         * @return {$3Dmol.GLShape}
         * 
         * @example

    
    $.get('volData/bohr.cube', function(data) {
      
      viewer.addVolumetricData(data, "cube", {isoval: -0.01, color: "red", opacity: 0.95}); 
      viewer.setStyle({cartoon:{},stick:{}});
      viewer.zoomTo();
      viewer.render();
    });

                
         */
        this.addVolumetricData = function(data, format, spec) {
            spec = spec || {};
            var s = new $3Dmol.GLShape(spec);
            s.shapePosition = shapes.length;
            s.addVolumetricData(data, format, spec);
            shapes.push(s);

            return s;
        };
        
        /**
         * Construct isosurface from volumetric data
         * @function $3Dmol.GLViewer#addIsosurface
         * @param {$3Dmol.VolumeData} data - volumetric data
         * @param {IsoSurfaceSpec} spec - Shape style specification
         * @return {$3Dmol.GLShape}
         * 
         @example 
         $.get('../test_structs/benzene-homo.cube', function(data){
                  var voldata = new $3Dmol.VolumeData(data, "cube");
                  viewer.addIsosurface(voldata, {isoval: 0.01,
                                                 color: "blue",
                                                 alpha: 0.5,
                                                 smoothness: 10});
                  viewer.addIsosurface(voldata, {isoval: -0.01,
                                                 color: "red",
                                                 smoothness: 5,
                                                 opacity:0.5,
                                                 wireframe:true,
                                                 linewidth:0.1,
                                                 clickable:true,
                                                 callback:
                                                 function() {
                                                     this.opacity = 0.0;
                                                     viewer.render(callback);
                                                 }});
                  viewer.setStyle({}, {stick:{}});
                  viewer.zoomTo();
                  viewer.render();
                });
         */
        this.addIsosurface = function(data,  spec,callback) {
            spec = spec || {};
            var s = new $3Dmol.GLShape(spec);
            s.shapePosition = shapes.length;
            s.addIsosurface(data, spec, callback);
            shapes.push(s);
            return s;
        };
        
        this.enableFog = function(fog){
            if(fog){
                scene.fog=new $3Dmol.Fog(bgColor, 100, 200);
            }else{
                config.disableFog=true;
                show();
            }

        }

        /**
         * Sets the atomlists of all models in the viewer to specified frame
         * Sets to last frame if framenum out of range
         * 
         * @function $3Dmol.GLViewer#setFrame
         * @param {number} framenum - each model in viewer has their atoms set to this index in frames list
         */
        this.setFrame = function(framenum) {
            for (var i = 0; i < models.length; i++) {
                models[i].setFrame(framenum);
            }
            return this;
        };
        
        /**
         * Returns the number of frames that the model with the most frames in the viewer has
         * 
         * @function $3Dmol.GLViewer#getFrames
         * @return {number}
         */
        this.getFrames = function() {
            var mostFrames = 0;
            var modelNum = 0;
            for (var i = 0; i < models.length; i++) {
                if (models[i].getFrames().length > mostFrames) {
                    modelNum = i;
                    mostFrames = models[i].getFrames().length;
                }
            }
            return mostFrames;
        };
        

        /**
         * Animate all models in viewer from their respective frames
         * @function $3Dmol.GLViewer#animate
         * @param {Object} options - can specify interval (speed of animation), loop (direction
         * of looping, 'backward', 'forward' or 'backAndForth') and reps (numer of repetitions, 0 indicates infinite loop)
         *      
         */
         
        this.animate = function(options) {
            animated = true;
            var interval = 100;
            var loop = "forward";
            var reps = 0;
            options = options || {};
            if (options.interval) {
                interval = options.interval;
            }
            if (options.loop) {
                loop = options.loop;
            }
            if (options.reps) {
                reps = options.reps;
            }
            var mostFrames = this.getFrames();
            var that = this;
            var currFrame = 0;
            var inc = 1;
            var displayCount = 0;
            var displayMax = mostFrames * reps;
            var display = function(direction) {
                if (direction == "forward") {
                    that.setFrame(currFrame);
                    currFrame = (currFrame + inc) % mostFrames;
                }
                else if (direction == "backward") {
                    that.setFrame((mostFrames-1) - currFrame);
                    currFrame = (currFrame + inc) % mostFrames;
                }
                else { //back and forth
                    that.setFrame(currFrame);
                    currFrame += inc;
                    inc *= (((currFrame % (mostFrames-1)) == 0) ? -1 : 1);
                }
                that.render();
                if (++displayCount == displayMax || !that.isAnimated()) {
                    clearInterval(intervalID);
                }
            };
            var intervalID = setInterval( function() { display(loop); }, interval);
            return this;
        };
        
        /**
         * Stop animation of all models in viewer
         * @function $3Dmol.GLViewer#stopAnimate
         */
        this.stopAnimate = function() {
            animated = false;
            return this;
        };
        
        /**
         * Return true if viewer is currently being animated, false otherwise
         * @function $3Dmol.GLViewer#isAnimated
         * @return {boolean}
         */
        this.isAnimated = function() {
            return animated;
        };
        

        /**
         * Create and add model to viewer, given molecular data and its format 
         * 
         * @function $3Dmol.GLViewer#addModel
         * @param {string} data - Input data
         * @param {string} format - Input format ('pdb', 'sdf', 'xyz', 'pqr', or 'mol2')
         * @param {ParserOptionsSpec} options - format dependent options. Attributes depend on the input file format.
         * @example
         

              viewer.setViewStyle({style:"outline"});
              $.get('volData/1fas.pqr', function(data){
                  viewer.addModel(data, "pqr");
                  $.get("volData/1fas.cube",function(volumedata){
                      viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.85,voldata: new $3Dmol.VolumeData(volumedata, "cube"), volscheme: new $3Dmol.Gradient.RWB(-10,10)},{});
                      
                  viewer.render();
                  });
                  viewer.zoomTo();
              });
         *
         * @return {$3Dmol.GLModel} 
         */
        this.addModel =  function(data, format, options) {
            var m = new $3Dmol.GLModel(models.length, defaultcolors);
            m.addMolData(data, format, options);
            models.push(m);

            return m;
        };
        
        /**
         * Given multimodel file and its format, add atom data to the viewer as separate models
         * and return list of these models
         * 
         * @function $3Dmol.GLViewer#addModels
         * @param {string} data - Input data
         * @param {string} format - Input format (see {@link FileFormats})
         * @return {Array<$3Dmol.GLModel>}
         */
        this.addModels = function(data, format, options) {
            options = options || {};
            options.multimodel = true;
            options.frames = true;

            var modelatoms = $3Dmol.GLModel.parseMolData(data, format, options);

            for (var i = 0; i < modelatoms.length; i++) {
                var newModel = new $3Dmol.GLModel(models.length, defaultcolors);
                newModel.setAtomDefaults(modelatoms[i]);
                newModel.addFrame(modelatoms[i]);
                newModel.setFrame(0);
                if(modelatoms.modelData)
                    newModel.setModelData(modelatoms.modelData[i]);
                newModel.setDontDuplicateAtoms(!options.duplicateAssemblyAtoms);
                models.push(newModel);
            }
            
            return models;
        };
        
        /**
         * Create and add model to viewer. Given multimodel file and its format, 
         * different atomlists are stored in model's frame
         * property and model's atoms are set to the 0th frame
         * 
         * @function $3Dmol.GLViewer#addModelsAsFrames
         * @param {string} data - Input data
         * @param {string} format - Input format (see {@link FileFormats})
         * @return {$3Dmol.GLModel}
         */
        this.addModelsAsFrames = function(data, format, options) {
            options = options || {};
            options.multimodel = true;
            options.frames = true;
            var m = new $3Dmol.GLModel(models.length, defaultcolors);
            m.addMolData(data, format, options);
            models.push(m);

            return m;
        };
        
        /**
         * Create and add model to viewer. Given multimodel file and its format,
         * all atoms are added to one model
         * 
         * @function $3Dmol.GLViewer#addAsOneMolecule
         * @param {string} data - Input data
         * @param {string} format - Input format (see {@link FileFormats})
         * @return {$3Dmol.GLModel}
         @example
          

              $.get('../test_structs/multiple.sdf', function(data){
                  viewer.addAsOneMolecule(data, "sdf");
                  viewer.zoomTo();
                  viewer.render();
              });
         */
        this.addAsOneMolecule = function(data, format, options) {
            options = options || {};
            options.multimodel = true;
            options.onemol = true;
            var m = new $3Dmol.GLModel(models.length, defaultcolors);
            m.addMolData(data, format, options);
            models.push(m);
            
            return m;
        };
        

        /**
         * Delete specified model from viewer
         * 
         * @function $3Dmol.GLViewer#removeModel
         * @param {$3Dmol.GLModel} model
         */
        this.removeModel = function(model) {
            if (!model)
                return;
            model.removegl(modelGroup);
            delete models[model.getID()];
            // clear off back of model array
            while (models.length > 0
                    && typeof (models[models.length - 1]) === "undefined")
                models.pop();
            return this;
        };

        /** 
         * Delete all existing models
         * @function $3Dmol.GLViewer#removeAllModels
         */
        this.removeAllModels = function() {
            for (var i = 0; i < models.length; i++) {
                var model = models[i];
                model.removegl(modelGroup);

            }
            models.splice(0,models.length); //don't simply overwrite array in case linked
            return this;
        };

        /**
         * Export one or all of the loaded models into ChemDoodle compatible JSON.
         * @function $3Dmol.GLViewer#exportJSON
         * @param {boolean} includeStyles - Whether or not to include style information.
         * @param {number} modelID - Optional parameter for which model to export. If left out, export all of them.
         * @return {string}
         */
        this.exportJSON = function(includeStyles, modelID) {
            var object = {};
            if (modelID === undefined) {
                object.m = models.map(function(model) {
                    return model.toCDObject(includeStyles);
                });
            } else {
                object.m = [ model[modelID].toCDObject() ];
            }
            return JSON.stringify(object);
        }

        /**
         * Create a new model from atoms specified by sel.
         * If extract, removes selected atoms from existing models 
         * 
         * @function $3Dmol.GLViewer#createModelFrom
         * @param {Object} sel - Atom selection specification
         * @param {boolean=} extract - If true, remove selected atoms from existing models
         * @return {$3Dmol.GLModel}
         */
        this.createModelFrom = function(sel, extract) {
            var m = new $3Dmol.GLModel(models.length, defaultcolors);
            for (var i = 0; i < models.length; i++) {
                if (models[i]) {
                    var atoms = models[i].selectedAtoms(sel);
                    m.addAtoms(atoms);
                    if (extract)
                        models[i].removeAtoms(atoms);
                }
            }
            models.push(m);
            return m;
        };

        function applyToModels(func, sel, value1, value2, value3) {
            
            //apply func to all models that are selected by sel with value1 and 2
            var ms = []
            if (typeof sel.model === "undefined") {
                for (i = 0; i < models.length; i++) {
                    if (models[i])
                        ms.push(models[i]);
                }
            } else { // specific to some models
                ms = sel.model;
                if (!$.isArray(ms))
                    ms = [ ms ];
            }
            
            
            for (var i = 0; i < ms.length; i++) {
                if (ms[i]) {
                    //allow referencing models by order of creation
                    if(typeof ms[i] === 'number') {
                        models[ms[i]][func](sel, value1, value2, value3);
                    } else { //assume model object
                        ms[i][func](sel, value1, value2, value3);
                    }
                }
            }
        }

        /**
         * Set style properties to all selected atoms
         * 
         * @function $3Dmol.GLViewer#setStyle
         * @param {AtomSelectionSpec} sel - Atom selection specification
         * @param {AtomStyleSpec} style - Style spec to apply to specified atoms
         * 
         * @example
         viewer.setBackgroundColor(0xffffffff);
       $3Dmol.download('pdb:5IRE',viewer,{doAssembly: false},function(m) {
        m.setStyle({chain:'A'},{'cartoon':{color:'spectrum'}});
        m.setStyle({chain:'C'},{'cartoon':{style:'trace',color:'blue'}});
        m.setStyle({chain:'E'},{'cartoon':{tubes:true,arrows:true,color:'green',opacity:0.75}});
        m.setStyle({chain:'B'},{'cartoon':{color:'red',opacity:0.5}});
        m.setStyle({chain:'D'},{'cartoon':{style:'trace',color:'grey',opacity:0.75}});
        m.setStyle({chain:'F'},{'cartoon':{arrows:true,color:'white'}});
       // viewer.addStyle({chain:'B'},{line:{}});
       viewer.zoomTo();
       viewer.render();
    });
         */
        this.setStyle = function(sel, style) {
            if(typeof(style) === 'undefined') {
                //if a single argument is provided, assume it is a style and select all
                style = sel;
                sel = {};
            }
            
            applyToModels("setStyle", sel, style, false);
            return this;
        };

        /**
         * Add style properties to all selected atoms
         * 
         * @function $3Dmol.GLViewer#addStyle
         * @param {AtomSelectionSpec} sel - Atom selection specification
         * @param {AtomStyleSpec} style - style spec to add to specified atoms
         @example
         
       $3Dmol.download('pdb:5IRE',viewer,{doAssembly: false},function(m) {
       viewer.addStyle({chain:'B'},{line:{}});
       viewer.zoomTo();
       viewer.render();
       });
         */
        this.addStyle = function(sel, style) {
            if(typeof(style) === 'undefined') {
                //if a single argument is provided, assume it is a style and select all
                style = sel;
                sel = {};
            }
            applyToModels("setStyle", sel, style, true);
            return this;
        };


        /**
         * Set click-handling properties to all selected atomsthis.
         * 
         * @function $3Dmol.GLViewer#setClickable
         * @param {AtomSelectionSpec} sel - atom selection to apply clickable settings to
         * @param {boolean} clickable - whether click-handling is enabled for the selection
         * @param {function} callback - function called when an atom in the selection is clicked
         * 
         * @example
         *   viewer.addCylinder({start:{x:0.0,y:0.0,z:0.0},
                                  end:{x:10.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  fromCap:1,
                                  toCap:2,
                                  color:'red',
                                  hoverable:true,
                                  clickable:true,
                                  callback:function(){ this.color.setHex(0x00FFFF00);viewer.render();},
                                  hover_callback: function(){ viewer.render();},
                                  unhover_callback: function(){ this.color.setHex(0xFF000000);viewer.render();}
                                 });
              viewer.addCylinder({start:{x:0.0,y:2.0,z:0.0},
                                  end:{x:0.0,y:10.0,z:0.0},
                                  radius:0.5,
                                  fromCap:false,
                                  toCap:true,
                                  color:'teal'});
              viewer.addCylinder({start:{x:15.0,y:0.0,z:0.0},
                                  end:{x:20.0,y:0.0,z:0.0},
                                  radius:1.0,
                                  color:'black',
                                  fromCap:false,
                                  toCap:false});
              viewer.render();


         */
        this.setClickable = function(sel, clickable, callback) {
            applyToModels("setClickable", sel, clickable, callback);
            return this;
        };

        this.setHoverable = function(sel,hoverable,hover_callback,unhover_callback){
            applyToModels("setHoverable", sel,hoverable, hover_callback,unhover_callback);
            return this;
        }
        
        /**
         * If  atoms have dx, dy, dz properties (in some xyz files), vibrate populates each model's frame property based on parameters.
         * Models can then be animated
         * 
         * @function $3Dmol.GLViewer#vibrate
         * @param {number} numFrames - number of frames to be created, default to 10
         * @param {number} amplitude - amplitude of distortion, default to 1 (full)
         */
        this.vibrate = function(numFrames, amplitude) {
            applyToModels("vibrate", numFrames, amplitude);
            return this;
        }
        /**
         * @function $3Dmol.GLViewer#setColorByProperty
         * @param {AtomSelectionSpec} sel
         * @param {type} prop
         * @param {type} scheme
         */
        this.setColorByProperty = function(sel, prop, scheme, range) {
            applyToModels("setColorByProperty", sel, prop, scheme, range);
            return this;
        };

        /**
         * @function $3Dmol.GLViewer#setColorByElement
         * @param {AtomSelectionSpec} sel
         * @param {type} colors
         */
        this.setColorByElement = function(sel, colors) {
            applyToModels("setColorByElement", sel, colors);
            return this;
        };

        /**
         * 
         * @param {AtomSpec[]} atomlist
         * @param {Array}
         *            extent
         * @return {Array}
         */
        var getAtomsWithin = function(atomlist, extent) {
            var ret = [];

            for (var i = 0; i < atomlist.length; i++) {
                var atom = atomlist[i];
                if (typeof (atom) == "undefined")
                    continue;

                if (atom.x < extent[0][0] || atom.x > extent[1][0])
                    continue;
                if (atom.y < extent[0][1] || atom.y > extent[1][1])
                    continue;
                if (atom.z < extent[0][2] || atom.z > extent[1][2])
                    continue;
                ret.push(atom);
            }
            return ret;
        };

        // return volume of extent
        var volume = function(extent) {
            var w = extent[1][0] - extent[0][0];
            var h = extent[1][1] - extent[0][1];
            var d = extent[1][2] - extent[0][2];
            return w * h * d;
        }; // volume
        /*
         * Break up bounding box/atoms into smaller pieces so we can parallelize
         * with webworkers and also limit the size of the working memory Returns
         * a list of bounding boxes with the corresponding atoms. These extents
         * are expanded by 4 angstroms on each side.
         */
        /**
         * 
         * @param {Array}
         *            extent
         * @param {AtomSpec[]} atomlist
         * @param {AtomSpec[]} atomstoshow
         * @return {Array}
         */
        var carveUpExtent = function(extent, atomlist, atomstoshow) {
            var ret = [];

            var index2atomlist = {}; //map from atom.index to position in atomlist
            for(var i = 0, n = atomlist.length; i < n; i++) {
                index2atomlist[atomlist[i].index] = i;
            }
            
            var atomsToListIndex = function(atoms) {
            //return a list of indices into atomlist
                var ret = [];
                for(var i = 0, n = atoms.length; i < n; i++) {
                    if(atoms[i].index in index2atomlist)
                        ret.push(index2atomlist[atoms[i].index])
                }
                return ret;
            }
            var copyExtent = function(extent) {
                // copy just the dimensions
                var ret = [];
                ret[0] = [ extent[0][0], extent[0][1], extent[0][2] ];
                ret[1] = [ extent[1][0], extent[1][1], extent[1][2] ];
                return ret;
            }; // copyExtent
            var splitExtentR = function(extent) {
                // recursively split until volume is below maxVol
                if (volume(extent) < maxVolume) {
                    return [ extent ];
                } else {
                    // find longest edge
                    var w = extent[1][0] - extent[0][0];
                    var h = extent[1][1] - extent[0][1];
                    var d = extent[1][2] - extent[0][2];

                    var index;

                    if (w > h && w > d) {
                        index = 0;
                    } else if (h > w && h > d) {
                        index = 1;
                    } else {
                        index = 2;
                    }

                    // create two halves, splitting at index
                    var a = copyExtent(extent);
                    var b = copyExtent(extent);
                    var mid = (extent[1][index] - extent[0][index]) / 2
                            + extent[0][index];
                    a[1][index] = mid;
                    b[0][index] = mid;

                    var alist = splitExtentR(a);
                    var blist = splitExtentR(b);
                    return alist.concat(blist);
                }
            }; // splitExtentR

            // divide up extent
            var splits = splitExtentR(extent);
            // now compute atoms within expanded (this could be more efficient)
            var off = 6; // enough for water and 2*r, also depends on scale
            // factor
            for (var i = 0, n = splits.length; i < n; i++) {
                var e = copyExtent(splits[i]);
                e[0][0] -= off;
                e[0][1] -= off;
                e[0][2] -= off;
                e[1][0] += off;
                e[1][1] += off;
                e[1][2] += off;

                var atoms = getAtomsWithin(atomlist, e);
                var toshow = getAtomsWithin(atomstoshow, splits[i]);

                // ultimately, divide up by atom for best meshing
                ret.push({
                    extent : splits[i],
                    atoms : atomsToListIndex(atoms),
                    toshow : atomsToListIndex(toshow)
                });
            }

            return ret;
        };

        // create a mesh defined from the passed vertices and faces and material
        // Just create a single geometry chunk - broken up whether sync or not
        /**
         * 
         * @param {AtomSpec[]} atoms
         * @param {{vertices:number,faces:number}}
         *            VandF
         * @param {$3Dmol.MeshLambertMaterial}
         *            mat
         * @return {$3Dmol.Mesh}
         */
        var generateSurfaceMesh = function(atoms, VandF, mat) {
            var geo = new $3Dmol.Geometry(true);
            // Only one group per call to generate surface mesh (addSurface
            // should split up mesh render)
            var geoGroup = geo.updateGeoGroup(0);

            // set colors for vertices
            var colors = [];
            for (i = 0, il = atoms.length; i < il; i++) {
                var atom = atoms[i];
                if (atom) {
                    if (typeof (atom.surfaceColor) != "undefined") {
                        colors[i] = atom.surfaceColor;
                    } else if (atom.color) // map from atom
                        colors[i] = $3Dmol.CC.color(atom.color);
                }
            }
            
            var vertexArray = geoGroup.vertexArray;

            // reconstruct vertices and faces
            var v = VandF['vertices'];
            var offset;
            var i, il;
            for (i = 0, il = v.length; i < il; i++) {
                offset = geoGroup.vertices * 3;
                vertexArray[offset] = v[i].x;
                vertexArray[offset + 1] = v[i].y;
                vertexArray[offset + 2] = v[i].z;
                geoGroup.vertices++;                
            }

            //set colorArray of there are per-atom colors
            var colorArray = geoGroup.colorArray;
            
            if(mat.voldata && mat.volscheme) {
                //convert volumetric data into colors
                var scheme = mat.volscheme;
                var voldata = mat.voldata;
                var range = scheme.range() || [-1,1];
                for (i = 0, il = v.length; i < il; i++) {
                    var val = voldata.getVal(v[i].x,v[i].y,v[i].z);
                    var col =  $3Dmol.CC.color(scheme.valueToHex(val, range));
                    var offset = i * 3;
                    colorArray[offset] = col.r;
                    colorArray[offset + 1] = col.g;
                    colorArray[offset + 2] = col.b;
                }
            }
            else if(colors.length > 0) { //have atom colors
                for (i = 0, il = v.length; i < il; i++) {
                    var A = v[i].atomid;
                    var offsetA = i * 3;

                    colorArray[offsetA] = colors[A].r;
                    colorArray[offsetA + 1] = colors[A].g;
                    colorArray[offsetA + 2] = colors[A].b;
                }
            }
            
            var faces = VandF['faces'];
            geoGroup.faceidx = faces.length;// *3;
            geo.initTypedArrays();

            var verts = geoGroup.vertexArray;
            var normalArray = geoGroup.normalArray;
            var vA, vB, vC, norm;

            // Setup colors, faces, and normals
            for (i = 0, il = faces.length; i < il; i += 3) {

                // var a = faces[i].a, b = faces[i].b, c = faces[i].c;
                var a = faces[i], b = faces[i + 1], c = faces[i + 2];
                var A = v[a]['atomid'];
                var B = v[b]['atomid'];
                var C = v[c]['atomid'];

                var offsetA = a * 3, offsetB = b * 3, offsetC = c * 3;

                // setup Normals
                // todo - calculate normals in parallel code
                vA = new $3Dmol.Vector3(verts[offsetA], verts[offsetA + 1],
                        verts[offsetA + 2]);
                vB = new $3Dmol.Vector3(verts[offsetB], verts[offsetB + 1],
                        verts[offsetB + 2]);
                vC = new $3Dmol.Vector3(verts[offsetC], verts[offsetC + 1],
                        verts[offsetC + 2]);

                vC.subVectors(vC, vB);
                vA.subVectors(vA, vB);
                vC.cross(vA);

                // face normal
                norm = vC;
                norm.normalize();

                normalArray[offsetA] += norm.x;
                normalArray[offsetB] += norm.x;
                normalArray[offsetC] += norm.x;
                normalArray[offsetA + 1] += norm.y;
                normalArray[offsetB + 1] += norm.y;
                normalArray[offsetC + 1] += norm.y;
                normalArray[offsetA + 2] += norm.z;
                normalArray[offsetB + 2] += norm.z;
                normalArray[offsetC + 2] += norm.z;

            }
            geoGroup.faceArray = new Uint16Array(faces);
            var mesh = new $3Dmol.Mesh(geo, mat);
            mesh.doubleSided = true;        
            return mesh;
        };

        // do same thing as worker in main thread
        /**
         * 
         * @param {$3Dmol.SurfaceType}
         *            type
         * @param {Array}
         *            expandedExtent
         * @param {Array}
         *            extendedAtoms
         * @param {Array}
         *            atomsToShow
         * @param {AtomSpec[]} atoms
         * @param {number}
         *            vol
         * @return {Object}
         */
        var generateMeshSyncHelper = function(type, expandedExtent,
                extendedAtoms, atomsToShow, atoms, vol) {
            var time = new Date();
            var ps = new $3Dmol.ProteinSurface();
            ps.initparm(expandedExtent, (type === 1) ? false : true, vol);

            var time2 = new Date();
            //console.log("initialize " + (time2 - time) + "ms");

            ps.fillvoxels(atoms, extendedAtoms);

            var time3 = new Date();
            //console.log("fillvoxels " + (time3 - time2) + "  " + (time3 - time) + "ms");

            ps.buildboundary();

            if (type == $3Dmol.SurfaceType.SES || type == $3Dmol.SurfaceType.MS) {
                ps.fastdistancemap();
                ps.boundingatom(false);
                ps.fillvoxelswaals(atoms, extendedAtoms);
            }

            var time4 = new Date();
            //console.log("buildboundaryetc " + (time4 - time3) + "  " + (time4 - time) + "ms");

            ps.marchingcube(type);

            var time5 = new Date();
            //console.log("marching cube " + (time5 - time4) + "  "+ (time5 - time) + "ms");

            return ps.getFacesAndVertices(atomsToShow);
        };

        /**
         * 
         * @param {matSpec}
         *            style
         * @return {$3Dmol.MeshLambertMaterial}
         */
        function getMatWithStyle(style) {
            var mat = new $3Dmol.MeshLambertMaterial();
            mat.vertexColors = $3Dmol.VertexColors;

            for ( var prop in style) {
                if (prop === "color" || prop === "map") {
                    // ignore
                } else if (style.hasOwnProperty(prop))
                    mat[prop] = style[prop];
            }
            if (style.opacity !== undefined) {
                if (style.opacity === 1)
                    mat.transparent = false;
                else
                    mat.transparent = true;
            }

            return mat;
        }

        
        /**
         * Adds an explicit mesh as a surface object.
         * @function $3Dmol.GLViewer#addMesh
         * @param {$3Dmol.Mesh}
         *            mesh
         * @param {Object}
         *            style
         * @returns {Number} surfid
         */
        this.addMesh = function(mesh) {
            var surfobj = {
                geo : mesh.geometry,
                mat : mesh.material,
                done : true,
                finished : false //the rendered finishes surfaces when they are done
            };
            var surfid = nextSurfID();
            surfaces[surfid] = surfobj;
            return surfid;
        }

        //return a shallow copy of list l, e.g., for atoms so we can
        //ignore superficial changes (ie surfacecolor, position) that happen
        //while we're surface building
        var shallowCopy = function(l) {
            var ret = [];
            $.each(l, function(k,v) {
                ret[k] = $.extend({},v);
            });
            return ret;
        }

        var surfaceTypeMap={
            "VDW":$3Dmol.SurfaceType.VDW,
            "MS":$3Dmol.SurfaceType.MS,
            "SAS":$3Dmol.SurfaceType.SAS,
            "SES":$3Dmol.SurfaceType.SES
        }

        /**
         * Add surface representation to atoms
         *  @function $3Dmol.GLViewer#addSurface
         * @param {$3Dmol.SurfaceType|string} type - Surface type (VDW, MS, SAS, or SES)
         * @param {SurfaceStyleSpec} style - optional style specification for surface material (e.g. for different coloring scheme, etc)
         * @param {AtomSelectionSpec} atomsel - Show surface for atoms in this selection
         * @param {AtomSelectionSpec} allsel - Use atoms in this selection to calculate surface; may be larger group than 'atomsel' 
         * @param {AtomSelectionSpec} focus - Optionally begin rendering surface specified atoms
         * 
         * @return {number} surfid - Identifying number for this surface
         */
        this.addSurface = function(type, style, atomsel, allsel, focus, surfacecallback) {
            // type 1: VDW 3: SAS 4: MS 2: SES
            // if sync is true, does all work in main thread, otherwise uses
            // workers
            // with workers, must ensure group is the actual modelgroup since
            // surface
            // will get added asynchronously
            // all atoms in atomlist are used to compute surfaces, but only the
            // surfaces
            // of atomsToShow are displayed (e.g., for showing cavities)
            // if focusSele is specified, will start rending surface around the
            
            //surfacecallback gets called when done
            
            var surfid = nextSurfID();

            if(typeof type =="string"){
                if(surfaceTypeMap[type]!== undefined)
                    type = surfaceTypeMap[type];
                else{
                    console.log("Surface type : " + type + " is not recognized");
                } 
            }
            else if(type===undefined){
                    console.log("Surface type : " + type + " is not recognized");
            }
            // atoms specified by this selection
            var atomlist = null, focusSele = null;
            //TODO: currently generating a shallow copy to avoid problems when atoms are chagned
            //during surface generation - come up with a better solution
            var atomsToShow = shallowCopy(getAtomsFromSel(atomsel));
            if(!allsel) {
                atomlist = atomsToShow;
            }
            else {
                atomlist = shallowCopy(getAtomsFromSel(allsel));
            }
            
            var symmetries = false;
            var n;
            for (n = 0; n < models.length; n++) { 
                if(models[n]) {
                    var symMatrices = models[n].getSymmetries();
                    if (symMatrices.length > 1 || (symMatrices.length == 1 && !(symMatrices[0].isIdentity()))) {
                        symmetries = true;
                        break;
                    }
                }
            }

            var addSurfaceHelper = function addSurfaceHelper(surfobj, atomlist, atomsToShow) {
            
                if(!focus) {
                    focusSele = atomsToShow;
                } else {
                    focusSele = shallowCopy(getAtomsFromSel(focus));
                }

                var atom;
                var time = new Date();
                var extent = $3Dmol.getExtent(atomsToShow, true);

                var i, il;
                if (style['map'] && style['map']['prop']) {
                    // map color space using already set atom properties
                    /** @type {AtomSpec} */
                    var prop = style['map']['prop'];
                    /** @type {Gradient} */
                    var scheme = style['map']['scheme'] || style['map']['gradient'] || new $3Dmol.Gradient.RWB();
                    var range = scheme.range();
                    if (!range) {
                        range = $3Dmol.getPropertyRange(atomsToShow, prop);
                    }
                    style.colorscheme = {prop: prop, gradient: scheme};

                }
                
                //cache surface color on each atom
                for (i = 0, il = atomlist.length; i < il; i++) {
                    atom = atomlist[i];
                    atom.surfaceColor = $3Dmol.getColorFromStyle(atom, style);
                }                

                var totalVol = volume(extent); // used to scale resolution
                var extents = carveUpExtent(extent, atomlist, atomsToShow);

                if (focusSele && focusSele.length && focusSele.length > 0) {
                    var seleExtent = $3Dmol.getExtent(focusSele, true);
                    // sort by how close to center of seleExtent
                    var sortFunc = function(a, b) {
                        var distSq = function(ex, sele) {
                            // distance from e (which has no center of mass) and
                            // sele which does
                            var e = ex.extent;
                            var x = e[1][0] - e[0][0];
                            var y = e[1][1] - e[0][1];
                            var z = e[1][2] - e[0][2];
                            var dx = (x - sele[2][0]);
                            dx *= dx;
                            var dy = (y - sele[2][1]);
                            dy *= dy;
                            var dz = (z - sele[2][2]);
                            dz *= dz;

                            return dx + dy + dz;
                        };
                        var d1 = distSq(a, seleExtent);
                        var d2 = distSq(b, seleExtent);
                        return d1 - d2;
                    };
                    extents.sort(sortFunc);
                }

                //console.log("Extents " + extents.length + "  "+ (+new Date() - time) + "ms");


                var reducedAtoms = [];
                // to reduce amount data transfered, just pass x,y,z,serial and elem
                for (i = 0, il = atomlist.length; i < il; i++) {
                    atom = atomlist[i];
                    reducedAtoms[i] = {
                        x : atom.x,
                        y : atom.y,
                        z : atom.z,
                        serial : i,
                        elem : atom.elem
                    };
                }

                var sync = !!($3Dmol.syncSurface);
                if (sync) { // don't use worker, still break up for memory purposes

                    // to keep the browser from locking up, call through setTimeout
                    var callSyncHelper = function callSyncHelper(i) {
                        if (i >= extents.length) {
                            if(surfacecallback && typeof(surfacecallback) == "function") {
                                surfacecallback(surfid);
                            }
                            return;
                        }

                        var VandF = generateMeshSyncHelper(type, extents[i].extent,
                                extents[i].atoms, extents[i].toshow, reducedAtoms,
                                totalVol);
                        //complicated surfaces sometimes have > 2^16 vertices
                        var VandFs = $3Dmol.splitMesh({vertexArr:VandF.vertices, faceArr:VandF.faces});
                        for(var vi=0,vl=VandFs.length;vi<vl;vi++){
                            var VandF={vertices:VandFs[vi].vertexArr,
                                    faces:VandFs[vi].faceArr};                            
                            var mesh = generateSurfaceMesh(atomlist, VandF, mat);
                            $3Dmol.mergeGeos(surfobj.geo, mesh);
                        }
                        _viewer.render();

                        setTimeout(callSyncHelper, 1, i + 1);
                    }

                    setTimeout(callSyncHelper, 1, 0);

                    // TODO: Asynchronously generate geometryGroups (not separate
                    // meshes) and merge them into a single geometry
                } else { // use worker

                    var workers = [];
                    if (type < 0)
                        type = 0; // negative reserved for atom data
                    for (i = 0, il = numWorkers; i < il; i++) {
                        // var w = new Worker('3Dmol/SurfaceWorker.js');
                        var w = new Worker($3Dmol.SurfaceWorker);
                        workers.push(w);
                        w.postMessage({
                            'type' : -1,
                            'atoms' : reducedAtoms,
                            'volume' : totalVol
                        });
                    }
                    var cnt = 0;

                    var rfunction = function(event) {
                        var VandFs = $3Dmol.splitMesh({vertexArr:event.data.vertices,
                                                       faceArr:event.data.faces});
                        for(var i=0,vl=VandFs.length;i<vl;i++){
                            var VandF={vertices:VandFs[i].vertexArr,
                                       faces:VandFs[i].faceArr};
                            var mesh = generateSurfaceMesh(atomlist, VandF, mat);
                            $3Dmol.mergeGeos(surfobj.geo, mesh);
                        }
                        _viewer.render();

                    //    console.log("async mesh generation " + (+new Date() - time) + "ms");
                        cnt++;
                        if (cnt == extents.length) {
                            surfobj.done = true;
                            if(surfacecallback && typeof(surfacecallback) == "function") {
                                surfacecallback(surfid);
                            }
                        }
                    };

                    var efunction = function(event) {
                        console.log(event.message + " (" + event.filename + ":" + event.lineno + ")");
                    };

                    for (i = 0; i < extents.length; i++) {
                        var worker = workers[i % workers.length];
                        worker.onmessage = rfunction;

                        worker.onerror = efunction;

                        worker.postMessage({
                            'type' : type,
                            'expandedExtent' : extents[i].extent,
                            'extendedAtoms' : extents[i].atoms,
                            'atomsToShow' : extents[i].toshow
                        });
                    }
                }

                // NOTE: This is misleading if 'async' mesh generation - returns
                // immediately
                //console.log("full mesh generation " + (+new Date() - time) + "ms");
                
            }
            
            style = style || {};
            var mat = getMatWithStyle(style);
            var surfobj = [];
            
            if (symmetries) { //do preprocessing
                var modelsAtomList = {};
                var modelsAtomsToShow = {};
                for (n = 0; n < models.length; n++) {
                    modelsAtomList[n] = [];
                    modelsAtomsToShow[n] = [];
                }
                for (n = 0; n < atomlist.length; n++) {
                    modelsAtomList[atomlist[n].model].push(atomlist[n]);
                }
                for (n = 0; n < atomsToShow.length; n++) {
                    modelsAtomsToShow[atomsToShow[n].model].push(atomsToShow[n]);
                }
                for (n = 0; n < models.length; n++) {
                    if(modelsAtomsToShow[n].length > 0) {
                        surfobj.push({
                            geo : new $3Dmol.Geometry(true),
                            mat : mat,
                            done : false,
                            finished : false,
                            symmetries : models[n].getSymmetries()
                        // also webgl initialized
                        });
                        addSurfaceHelper(surfobj[n], modelsAtomList[n], modelsAtomsToShow[n]);
                    }
                }
            }
            else {
                surfobj.push({
                    geo : new $3Dmol.Geometry(true),
                    mat : mat,
                    done : false,
                    finished : false,
                    symmetries : [new $3Dmol.Matrix4()]
                });
                addSurfaceHelper(surfobj[surfobj.length-1], atomlist, atomsToShow);
            } 
            surfaces[surfid] = surfobj;
            
            return surfid;

        };

        /**
         * Set the surface material to something else, must render change
        *  @function $3Dmol.GLViewer#setSurfaceMaterialStyle
         * @param {number} surf - Surface ID to apply changes to
         * @param {SurfaceStyleSpec} style - new material style specification
         */ 
        this.setSurfaceMaterialStyle = function(surf, style) {
            if (surfaces[surf]) {
                var surfArr = surfaces[surf];
                for (var i = 0; i < surfArr.length; i++) {
                    var mat = surfArr[i].mat = getMatWithStyle(style);
                    surfArr[i].mat.side = $3Dmol.FrontSide;
                    if(style.color) {
                        surfArr[i].mat.color = style.color;
                        surfArr[i].geo.colorsNeedUpdate = true;
                        var c = $3Dmol.CC.color(style.color);
                        surfArr[i].geo.setColors(function() { return c;});
                    }
                    else if(mat.voldata && mat.volscheme) {
                        //convert volumetric data into colors
                        var scheme = mat.volscheme;
                        var voldata = mat.voldata;
                        var range = scheme.range() || [-1,1];
                        surfArr[i].geo.setColors(function(x,y,z) {
                            var val = voldata.getVal(x,y,z);
                            var col =  $3Dmol.CC.color(scheme.valueToHex(val, range));
                            return col;
                        });
                    }
                    surfArr[i].finished = false; // trigger redraw
                }
            }
            return this;
        };

        /**
         * Remove surface with given ID
         * @function $3Dmol.GLViewer#removeSurface
         * @param {number} surf - surface id
         */
        this.removeSurface = function(surf) {
            var surfArr = surfaces[surf];
            for (var i = 0; i < surfArr.length; i++) {
                if (surfArr[i] && surfArr[i].lastGL) {
                    if (surfArr[i].geo !== undefined)
                        surfArr[i].geo.dispose();
                    if (surfArr[i].mat !== undefined)
                        surfArr[i].mat.dispose();
                    modelGroup.remove(surfArr[i].lastGL); // remove from scene
                }
            }
            delete surfaces[surf];
            show();
            return this;
        };
        
        /** Remove all surfaces.
         * @function $3Dmol.GLViewer#removeAllSurfaces */
        this.removeAllSurfaces = function() {
            for (var n in  surfaces) {
                if(!surfaces.hasOwnProperty(n)) continue;
                var surfArr = surfaces[n];
                for(var i = 0; i < surfArr.length; i++) {
                    if (surfArr[i] && surfArr[i].lastGL) {
                        if (surfArr[i].geo !== undefined)
                            surfArr[i].geo.dispose();
                        if (surfArr[i].mat !== undefined)
                            surfArr[i].mat.dispose();
                        modelGroup.remove(surfArr[i].lastGL); // remove from scene
                    }
                }
                delete surfaces[n];
            }
            show();
            return this;
        };

        /** return Jmol moveto command to position this scene */
        this.jmolMoveTo = function() {
            var pos = modelGroup.position;
            // center on same position
            var ret = "center { " + (-pos.x) + " " + (-pos.y) + " " + (-pos.z)
                    + " }; ";
            // apply rotation
            var q = rotationGroup.quaternion;
            ret += "moveto .5 quaternion { " + q.x + " " + q.y + " " + q.z
                    + " " + q.w + " };";
            // zoom is tricky.. maybe i would be best to let callee zoom on
            // selection?
            // can either do a bunch of math, or maybe zoom to the center with a
            // fixed
            // but reasonable percentage

            return ret;
        };

        /** Clear scene of all objects 
         * @function $3Dmol.GLViewer#clear
         * */
        this.clear = function() {
            this.removeAllSurfaces();
            this.removeAllModels();
            this.removeAllLabels();
            this.removeAllShapes();
            show();
            return this;
        };

        // props is a list of objects that select certain atoms and enumerate
        // properties for those atoms
        /**
         * @function $3Dmol.GLViewer#mapAtomProperties
         * Add specified properties to all atoms matching input argument
         * @function $3Dmol.GLViewer#mapAtomProperties
         * @param {Object} props, either array of atom selectors with associated props, or function that takes atom and sets its properties
         * @param {AtomSelectionSpec} sel
         */
        this.mapAtomProperties = function(props, sel) {
            sel = sel || {};
            var atoms = getAtomsFromSel(sel);
            
            if(typeof(props) == "function") {
                for (var a = 0, numa = atoms.length; a < numa; a++) {
                    var atom = atoms[a];
                    props(atom);
                }
            }
            else {
                for (var a = 0, numa = atoms.length; a < numa; a++) {
                    var atom = atoms[a];
                    for (var i = 0, n = props.length; i < n; i++) {
                        var prop = props[i];
                        if (prop.props) {
                            for ( var p in prop.props) {
                                if (prop.props.hasOwnProperty(p)) {
                                    // check the atom
                                    if (atomIsSelected(atom, prop)) {
                                        if (!atom.properties)
                                            atom.properties = {};
                                        atom.properties[p] = prop.props[p];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return this;
        };


        /**
         * Synchronize this view matrix of this viewer to the passed viewer.
         * When the viewpoint of this viewer changes, the other viewer will
         * be set to this viewer's view.
         * @function $3Dmol.GLViewer#linkViewer
         * @param {$3Dmol.GLViewer} otherview 
         */
        this.linkViewer = function(otherviewer) {
           linkedViewers.push(otherviewer);
           return this;
        };
        

        try {
            if (typeof (callback) === "function")
                callback(this);
        } catch (e) {
            // errors in callback shouldn't invalidate the viewer
            console.log("error with glviewer callback: " + e);
        }
    }

    return GLViewer;

})();

$3Dmol['glmolViewer'] = $3Dmol.GLViewer;

//color scheme mappings
var $3Dmol = $3Dmol || {};

/** Color mapping gradients
 * @interface
 * @param {number} min
 * @param {number} max
 */
$3Dmol.Gradient = function(min, max) {};

/**
 * Map value to hex color
 * @param {number} val
 * @param {number} range
 * @returns {number}
 */
$3Dmol.Gradient.valueToHex = function(val, range) {};
//return range used for color mapping, null if none set
$3Dmol.Gradient.range = function() {};



/**
 * Color scheme red to white to blue, for charges
 * Reverse gradients are supported when min>max so that the colors are displayed in reverse order.
 * @constructor
 * @implements {$3Dmol.Gradient}
 */
$3Dmol.Gradient.RWB = function(min, max,mid) {

    var mult = 1.0;
    if(typeof(max) == 'undefined' && $.isArray(min) && min.length >= 2) {
        //we were passed a single range
        max = min[1];
        min = min[0];
    }
    //map value to hex color, range is provided
    this.valueToHex = function(val, range) {
        var lo, hi;
        val = mult*val; //reverse if necessary
        if(range) {
            lo = range[0];
            hi = range[1];
        }
        else {
            lo = min;
            hi = max;
        }
    
        if(val === undefined)
            return 0xffffff;
        if(hi>lo){
            if(val < lo) val = lo;
            if(val > hi) val = hi;
        }
        else{
            if(val>lo) val=lo;
            if(val < hi) val = hi;
        }
        var middle = (hi+lo)/2;
        if(range && typeof(range[2]) != "undefined")
            middle = range[2];
        else if(typeof(mid) != 'undefined')
            middle = mid; //allow user to specify midpoint
        else
            middle = (lo+hi)/2;
        var scale, color;
        
        //scale bottom from red to white
        if(lo<hi){
            if(val <= middle) {
                scale = Math.floor(255*Math.sqrt((val-lo)/(middle-lo)));
                color = 0xff0000 + 0x100*scale + scale;
                return color;
            }
            else { //form white to blue
                scale = Math.floor(255*Math.sqrt((1-(val-middle)/(hi-middle))));
                color =  0x10000*scale+0x100*scale+0xff;
                return color;
            }
        }
        else if(lo>hi){
            //val=min-val;
             if(val <= middle) {

                scale = Math.floor(255*Math.sqrt((1-(val-middle)/(hi-middle))));
                color =  0x10000*scale+0x100*scale+0xff;
                return color;
            }
            else { //from white to blue

                scale = Math.floor(255*Math.sqrt((val-lo)/(middle-lo)));
                color = 0xff0000 + 0x100*scale + scale;
                return color;
            }
        }
    };
    

    //return range used for color mapping, null if none set
    this.range = function() {
        if(typeof(min) != "undefined" && typeof(max) != "undefined") {
            return [min,max];
        }
        return null;
    };

};


/**
 * rainbow gradient, but without purple to match jmol
 * Reverse gradients are supported when min>max so that the colors are displayed in reverse order.
 * @constructor
 * @implements {$3Dmol.Gradient}
 */
$3Dmol.Gradient.ROYGB = function(min, max) {
    var mult = 1.0;
    if(typeof(max) == 'undefined' && $.isArray(min) && min.length >= 2) {
        //we were passed a single range
        max = min[1];
        min = min[0];
    }
    
    //map value to hex color, range is provided
    this.valueToHex = function(val, range) {
        var lo, hi;
        val = mult*val;
        if(range) {
            lo = range[0];
            hi = range[1];
        }
        else {
            lo = min;
            hi = max;
        }
    
        if(typeof(val) == "undefined")
            return 0xffffff;
        
        if(hi>lo){
            if(val < lo) val = lo;
            if(val > hi) val = hi;
        }
        else{
            if(val>lo) val=lo;
            if(val < hi) val = hi;
            //flip the meaning of val, lo, hi
            val = lo-val;
            var tmp = lo;
            lo = hi;
            hi = tmp;
        }
        
        var mid = (lo+hi)/2;
        var q1 = (lo+mid)/2;
        var q3 = (mid+hi)/2;
        
        var scale, color;
        if(val < q1) { //scale green up, red up, blue down
            scale = Math.floor(255*Math.sqrt((val-lo)/(q1-lo)));
            color = 0xff0000 + 0x100*scale + 0;
            return color;
        }
        else if(val < mid) { //scale red down, green up, blue down
            scale = Math.floor(255*Math.sqrt((1-(val-q1)/(mid-q1))));
            color =  0x010000*scale+0xff00+0x0;
            return color;
        }
        else if(val < q3) { //scale blue up, red down, green up
            scale = Math.floor(255*Math.sqrt((val-mid)/(q3-mid)));
            color = 0x000000 + 0xff00 + 0x1*scale;
            return color;
        }
        else { //scale green down, blue up, red down
            scale = Math.floor(255*Math.sqrt((1-(val-q3)/(hi-q3))));
            color =  0x000000+0x0100*scale+0xff;
            return color;
        }               
    };
   

    //return range used for color mapping, null if none set
    this.range = function() {
        if(typeof(min) != "undefined" && typeof(max) != "undefined") {
            return [min,max];
        }
        return null;
    };

};

/**
 * rainbow gradient with constant saturation, all the way to purple!
 * Reverse gradients are supported when min>max so that the colors are displayed in reverse order.
 * @constructor
 * @implements {$3Dmol.Gradient}
 */
$3Dmol.Gradient.Sinebow = function(min, max) {
    var mult = 1.0;
    if(typeof(max) == 'undefined' && $.isArray(min) && min.length >= 2) {
        //we were passed a single range
        max = min[1];
        min = min[0];
    }
    if(max < min) { //reverse the order
        mult = -1.0;
        min *= -1.0;
        max *= -1.0;
    }
    //map value to hex color, range is provided
    this.valueToHex = function(val, range) {
        var lo, hi;
        val = mult*val;
        if(range) {
            lo = range[0];
            hi = range[1];
        }
        else {
            lo = min;
            hi = max;
        }
    
        if(typeof(val) == "undefined")
            return 0xffffff;
        if(hi>lo){
            if(val < lo) val = lo;
            if(val > hi) val = hi;
        }
        else{
            if(val>lo) val=lo;
            if(val < hi) val = hi;
        }
        var scale = (val-lo)/(hi-lo);
        var h = (5*scale/6.0+0.5);
        var r = Math.sin(Math.PI*h);
        r *= r*255;
        var g = Math.sin(Math.PI*(h+1/3.0));
        g *= g*255;
        var b = Math.sin(Math.PI*(h+2/3.0));
        b *= b*255;
        
        return 0x10000*Math.floor(r)+0x100*Math.floor(b)+0x1*Math.floor(g);
        
    };
    

    //return range used for color mapping, null if none set
    this.range = function() {
        if(typeof(min) != "undefined" && typeof(max) != "undefined") {
            return [min,max];
        }
        return null;
    };

};

//map from names to gradient constructors
$3Dmol.Gradient.builtinGradients = {
    'rwb': $3Dmol.Gradient.RWB,
    'roygb': $3Dmol.Gradient.ROYGB,
    'sinebow': $3Dmol.Gradient.Sinebow
}
//Adapted from the text sprite example from http://stemkoski.github.io/Three.js/index.html

$3Dmol.LabelCount = 0;

/**
 * Renderable labels
 * @constructor $3Dmol.Label
 * @param {string} tag - Label text
 * @param {LabelSpec} parameters Label style and font specifications
 */
$3Dmol.Label = function(text, parameters) {

    this.id = $3Dmol.LabelCount++;
    this.stylespec = parameters || {};

    this.canvas = document.createElement('canvas');
    //todo: implement resizing canvas..
    this.canvas.width = 134;
    this.canvas.height = 35;
    this.context = this.canvas.getContext('2d');
    this.sprite = new $3Dmol.Sprite();
    this.text = text;

};

$3Dmol.Label.prototype = {

    constructor : $3Dmol.Label,

    getStyle : function () { return this.stylespec; }, 
    
    setContext : function() {
        // function for drawing rounded rectangles - for Label drawing
        var roundRect = function(ctx, x, y, w, h, r, drawBorder) {

            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
            ctx.fill();
            if(drawBorder)
                ctx.stroke();

        };
        
        //do all the checks to figure out what color is desired
        var getColor = function(style, stylealpha, init) {
            var ret = init;
            if(typeof(style) != 'undefined') {
                //convet regular colors
                 if(style instanceof $3Dmol.Color) 
                     ret = style.scaled();
                 else //hex or name
                    ret = $3Dmol.CC.color(style).scaled();                    
            }
            if(typeof(stylealpha) != 'undefined') {
                ret.a = parseFloat(stylealpha);
            }
            return ret;
        }

        /**
         * Label type specification
         * @typedef LabelSpec
         * @struct
         * @prop {string} font - font name, default sans-serif
         * @prop {number} fontSize - height of text, default 18
         * @prop {ColorSpec} fontColor - font color, default white
         * @prop {number} fontOpacity - font opacity, default 1
         * @prop {number} borderThickness - line width of border around label, default 0
         * @prop {ColorSpec} borderColor - color of border, default backgroundColor
         * @prop {string} borderOpacity - color of border
         * @prop {ColorSpec} backgroundColor - color of background, default black
         * @prop {string} backgroundOpacity - opacity of background, default 1
         * @prop {Object} position - x,y,z coordinates for label
         * @prop {boolean} inFront - always put labels in from of model
         * @prop {boolean} showBackground - show background rounded rectangle, default true
         * @prop {boolean} fixed - sets the label to change with the model when zooming
         * @prop {string} alignment - how to orient the label w/respect to position: topLeft (default), topCenter, topRight, centerLeft, center, centerRight, bottomLeft, bottomCenter, bottomRight
         */
        return function() {
            
            var style = this.stylespec;
            var useScreen =  typeof(style.useScreen) == "undefined" ? false : style.useScreen;
            
            var showBackground = style.showBackground;
            if(showBackground === '0' || showBackground === 'false') showBackground = false;
            if(typeof(showBackground) == "undefined") showBackground = true; //default
            var font = style.font ? style.font : "sans-serif";

            var fontSize = parseInt(style.fontSize) ? parseInt(style.fontSize) : 18;

            var fontColor = getColor(style.fontColor, style.fontOpacity,
                     {
                        r : 255,
                        g : 255,
                        b : 255,
                        a : 1.0
                    });

            var padding = style.padding ? style.padding : 4;
            var borderThickness = style.borderThickness ? style.borderThickness
                    : 0;
    
            var backgroundColor = getColor(style.backgroundColor, style.backgroundOpacity, 
                     {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 1.0
                    });
                    
            var borderColor = getColor(style.borderColor, style.borderOpacity, backgroundColor);

                    
            var position = style.position ? style.position
                    : {
                        x : -10,
                        y : 1,
                        z : 1
                    };
                    
            // Should labels always be in front of model?
            var inFront = (style.inFront !== undefined) ? style.inFront    : true;
            if(inFront === 'false' || inFront === '0') inFront = false;

            // clear canvas

            var spriteAlignment = style.alignment || $3Dmol.SpriteAlignment.topLeft;
            if(typeof(spriteAlignment) == 'string' && spriteAlignment in $3Dmol.SpriteAlignment) {
                spriteAlignment = $3Dmol.SpriteAlignment[spriteAlignment];
            }

            var bold = "";
            if(style.bold)
                bold = "bold ";
            this.context.font = bold+fontSize + "px  " + font;

            var metrics = this.context.measureText(this.text);
            var textWidth = metrics.width;
            
            if(!showBackground) borderThickness = 0;
        
            var width = textWidth+2.5*borderThickness +2*padding;
            var height = fontSize*1.25+2*borderThickness+2*padding;            // 1.25 is extra height factor for text below baseline: g,j,p,q.

            
            if(style.backgroundImage) {
                var img = style.backgroundImage;
                var w = style.backgroundWidth ? style.backgroundWidth : img.width;
                var h = style.backgroundHeight ? style.backgroundHeight : img.height;
                if(w > width) width = w;
                if(h > height) height = h;
            }

            this.canvas.width = width;
            this.canvas.height = height;
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            var bold = "";
            if(style.bold)
                bold = "bold ";
            this.context.font = bold+fontSize + "px  " + font;

            // background color
            this.context.fillStyle = "rgba(" + backgroundColor.r + ","
                    + backgroundColor.g + "," + backgroundColor.b
                    + "," + backgroundColor.a + ")";
            // border color
            this.context.strokeStyle = "rgba(" + borderColor.r + ","
                    + borderColor.g + "," + borderColor.b + ","
                    + borderColor.a + ")";

            this.context.lineWidth = borderThickness;
            if(showBackground) {
                roundRect(this.context, borderThickness,borderThickness , width-2*borderThickness,height-2*borderThickness, 6, borderThickness > 0);
            }
            
            if(style.backgroundImage) {
                var img = style.backgroundImage;
                var w = style.backgroundWidth ? style.backgroundWidth : img.width;
                var h = style.backgroundHeight ? style.backgroundHeight : img.height;
                this.context.drawImage(img,0,0, w, h);
            }
            

            // text color
            this.context.fillStyle = "rgba(" + fontColor.r + ","
                    + fontColor.g + "," + fontColor.b + ","
                    + fontColor.a + ")";
            
            this.context.fillText(this.text, borderThickness+padding,
                    fontSize + borderThickness+padding, textWidth);

            // canvas contents will be used for a texture
            var texture = new $3Dmol.Texture(this.canvas);
            texture.needsUpdate = true;
            this.sprite.material = new $3Dmol.SpriteMaterial({
                map : texture,
                useScreenCoordinates : useScreen,
                alignment : spriteAlignment,
                depthTest : !inFront
            });

            this.sprite.scale.set(1,1,1);

            this.sprite.position.set(position.x, position.y, position.z);
        };

    }(),

    // clean up material and texture
    dispose : function() {

        if (this.sprite.material.map !== undefined)
            this.sprite.material.map.dispose();
        if (this.sprite.material !== undefined)
            this.sprite.material.dispose();
    }

};

$3Dmol = $3Dmol || {};
//Encapsulate marching cube algorithm for isosurface generation
// (currently used by protein surface rendering and generic volumetric data reading)
$3Dmol.MarchingCubeInitializer = function() {
    
    //Marching cube algorithm - assume data has been pre-treated so isovalue is 0 
    // (i.e. select points greater than 0)
    //origin -  vector of origin of volumetric data (default is (0,0,0))
    // nX, nY, nZ - specifies number of voxels in each dimension
    // scale - cube diagonal unit vector scale (3Dmol vector) (specifying distance between data points); diagonal of cube
    // - default is 1 - assumes unit cube (1,1,1) diag)
    // fulltable - if true, use full marching cubes and tritables - else use trimmed table (e.g. surf render)
    // voxel - if true, draws with a blocky voxel style (default false)
    // verts, faces - vertex and face arrays to fill up
    
    //to match with protein surface...
    var ISDONE = 2;
    var my = {};
    
    my.march = function(data, verts, faces, spec) {

        var fulltable = !!(spec.fulltable);
        var origin = (spec.hasOwnProperty('origin') && spec.origin.hasOwnProperty('x')) ? spec.origin : {x:0, y:0, z:0};
        var voxel = !!(spec.voxel);
        var transform = spec.matrix; //if this is set, it overrides origin and unitCube
        
        var nX = spec.nX || 0;
        var nY = spec.nY || 0;
        var nZ = spec.nZ || 0;
        
        var scale = spec.scale || 1.0;
        var unitCube = null;
        if(spec.unitCube) {
            unitCube = spec.unitCube;
        } else {
            unitCube = {x:scale,y:scale,z:scale};
        }
        
        //keep track of calculated vertices to avoid repeats
        var vertnums = new Int32Array(nX*nY*nZ);
        
        var i, il;
        
        for (i = 0, il = vertnums.length; i < il; ++i)
            vertnums[i] = -1;

        // create (or retrieve) a vertex at the appropriate point for
        // the edge (p1,p2)
        
        var getVertex = function(i, j, k, code, p1, p2) {
            var pt = {x:0,y:0,z:0};
            var val1 = !!(code & (1 << p1));
            var val2 = !!(code & (1 << p2));
             
            // p1 if they are the same or if !val1
            var p = p1;
            if (!val1 && val2)
                p = p2;
            
            // adjust i,j,k by p
            if (p & 1)
                k++;
            if (p & 2)
                j++;
            if (p & 4)
                i++;

            if(transform) {
                pt = new $3Dmol.Vector3(i,j,k);
                pt = pt.applyMatrix4(transform);
                pt = {x: pt.x, y: pt.y, z: pt.z}; //remove vector gunk
            } else {
                pt.x = origin.x+unitCube.x*i;
                pt.y = origin.y+unitCube.y*j;
                pt.z = origin.z+unitCube.z*k;
            }
            
            var index = ((nY * i) + j) * nZ + k;
            
            //Have to add option to do voxels
            if (!voxel) {
            
                if (vertnums[index] < 0) // not created yet
                {
                    vertnums[index] = verts.length;
                    verts.push( pt );
                }
                return vertnums[index];
            
            }
            
            else {
                verts.push(pt);
                return verts.length - 1;
            }
            
        };
            
        var intersects = new Int32Array(12);
        
        var etable = (fulltable) ? edgeTable2 : edgeTable;
        var tritable = (fulltable) ? triTable2 : triTable;
                
        //Run marching cubes algorithm
        for (i = 0; i < nX-1; ++i) {
            
            for (var j = 0; j < nY-1; ++j){
                
                for (var k = 0; k < nZ-1; ++k){
                    
                    var code = 0;
                    
                    for (var p = 0; p < 8; ++p) {
                        var index = ((nY * (i + ((p & 4) >> 2))) + j + ((p & 2) >> 1)) *
                                        nZ + k + (p & 1);

                        //TODO: Need to fix vpBits in protein surface for this to work
                        var val = !!(data[index] & ISDONE);
                        //var val = !!(data[index] > 0);   
                        
                        code |= val << p;                        
                    }
                    
                    if (code === 0 || code === 255)
                        continue;
                    
                    var ecode = etable[code];
                    
                    if (ecode === 0)
                        continue;
                        
                    var ttable = tritable[code];                        
                    
                    if (ecode & 1)
                        intersects[0] = getVertex(i, j, k, code, 0, 1);
                    if (ecode & 2)
                        intersects[1] = getVertex(i, j, k, code, 1, 3);
                    if (ecode & 4)
                        intersects[2] = getVertex(i, j, k, code, 3, 2);
                    if (ecode & 8)
                        intersects[3] = getVertex(i, j, k, code, 2, 0);
                    if (ecode & 16)
                        intersects[4] = getVertex(i, j, k, code, 4, 5);
                    if (ecode & 32)
                        intersects[5] = getVertex(i, j, k, code, 5, 7);
                    if (ecode & 64)
                        intersects[6] = getVertex(i, j, k, code, 7, 6);
                    if (ecode & 128)
                        intersects[7] = getVertex(i, j, k, code, 6, 4);
                    if (ecode & 256)
                        intersects[8] = getVertex(i, j, k, code, 0, 4);
                    if (ecode & 512)
                        intersects[9] = getVertex(i, j, k, code, 1, 5);
                    if (ecode & 1024)
                        intersects[10] = getVertex(i, j, k, code, 3, 7);
                    if (ecode & 2048)
                        intersects[11] = getVertex(i, j, k, code, 2, 6);       

                    for (var t = 0; t < ttable.length; t += 3) {
                        
                        var a = intersects[ttable[t]],
                            b = intersects[ttable[t+1]],
                            c = intersects[ttable[t+2]];         
                                           
                        if (voxel && t >= 3) {
                            verts.push(verts[a]); a = verts.length - 1;
                            verts.push(verts[b]); b = verts.length - 1;
                            verts.push(verts[c]); c = verts.length - 1;
                        }

                        
                        faces.push(a); faces.push(b); faces.push(c);                               
                    }              
                    
                }
                
            }
            
        }
             
        
    };

    my.laplacianSmooth = function(numiter, verts, faces) {
            var tps = new Array(verts.length);
            var i, il, j, jl, k, kl;
            for (i = 0, il = verts.length; i < il; i++)
                    tps[i] = {
                        x : 0,
                        y : 0,
                        z : 0
                    };
            var vertdeg = new Array(20);
            var flagvert;
            for (i = 0; i < 20; i++)
                    vertdeg[i] = new Array(verts.length);
            for (i = 0, il = verts.length; i < il; i++)
                    vertdeg[0][i] = 0;
            for (i = 0, il = faces.length / 3; i < il; i++) {
                var aoffset = i*3, boffset = i*3 + 1, coffset = i*3 + 2;
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[aoffset]]; j < jl; j++) {
                    if (faces[boffset] == vertdeg[j + 1][faces[aoffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[aoffset]]++;
                    vertdeg[vertdeg[0][faces[aoffset]]][faces[aoffset]] = faces[boffset];
                }
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[aoffset]]; j < jl; j++) {
                    if (faces[coffset] == vertdeg[j + 1][faces[aoffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[aoffset]]++;
                    vertdeg[vertdeg[0][faces[aoffset]]][faces[aoffset]] = faces[coffset];
                }
                // b
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[boffset]]; j < jl; j++) {
                    if (faces[aoffset] == vertdeg[j + 1][faces[boffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[boffset]]++;
                    vertdeg[vertdeg[0][faces[boffset]]][faces[boffset]] = faces[aoffset];
                }
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[boffset]]; j < jl; j++) {
                    if (faces[coffset] == vertdeg[j + 1][faces[boffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[boffset]]++;
                    vertdeg[vertdeg[0][faces[boffset]]][faces[boffset]] = faces[coffset];
                }
                // c
                flagvert = true;
                for (j = 0; j < vertdeg[0][faces[coffset]]; j++) {
                    if (faces[aoffset] == vertdeg[j + 1][faces[coffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[coffset]]++;
                    vertdeg[vertdeg[0][faces[coffset]]][faces[coffset]] = faces[aoffset];
                }
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[coffset]]; j < jl; j++) {
                    if (faces[boffset] == vertdeg[j + 1][faces[coffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[coffset]]++;
                    vertdeg[vertdeg[0][faces[coffset]]][faces[coffset]] = faces[boffset];
                }
            }

            var wt = 1.00;
            var wt2 = 0.50;
            var ssign;
            var scaleFactor = 1;
            var outwt = 0.75 / (scaleFactor + 3.5); // area-preserving
            for (k = 0; k < numiter; k++) {
                    for (i = 0, il = verts.length; i < il; i++) {
                            if (vertdeg[0][i] < 3) {
                                    tps[i].x = verts[i].x;
                                    tps[i].y = verts[i].y;
                                    tps[i].z = verts[i].z;
                            } else if (vertdeg[0][i] == 3 || vertdeg[0][i] == 4) {
                                    tps[i].x = 0;
                                    tps[i].y = 0;
                                    tps[i].z = 0;
                                    for (j = 0, jl = vertdeg[0][i]; j < jl; j++) {
                                            tps[i].x += verts[vertdeg[j + 1][i]].x;
                                            tps[i].y += verts[vertdeg[j + 1][i]].y;
                                            tps[i].z += verts[vertdeg[j + 1][i]].z;
                                    }
                                    tps[i].x += wt2 * verts[i].x;
                                    tps[i].y += wt2 * verts[i].y;
                                    tps[i].z += wt2 * verts[i].z;
                                    tps[i].x /= wt2 + vertdeg[0][i];
                                    tps[i].y /= wt2 + vertdeg[0][i];
                                    tps[i].z /= wt2 + vertdeg[0][i];
                            } else {
                                    tps[i].x = 0;
                                    tps[i].y = 0;
                                    tps[i].z = 0;
                                    for (j = 0, jl = vertdeg[0][i]; j < jl; j++) {
                                            tps[i].x += verts[vertdeg[j + 1][i]].x;
                                            tps[i].y += verts[vertdeg[j + 1][i]].y;
                                            tps[i].z += verts[vertdeg[j + 1][i]].z;
                                    }
                                    tps[i].x += wt * verts[i].x;
                                    tps[i].y += wt * verts[i].y;
                                    tps[i].z += wt * verts[i].z;
                                    tps[i].x /= wt + vertdeg[0][i];
                                    tps[i].y /= wt + vertdeg[0][i];
                                    tps[i].z /= wt + vertdeg[0][i];
                            }
                    }
                    for (i = 0, il = verts.length; i < il; i++) {
                            verts[i].x = tps[i].x;
                            verts[i].y = tps[i].y;
                            verts[i].z = tps[i].z;
                    }
                    /*
                     * computenorm(); for (var i = 0; i < vertnumber; i++) { if
                     * (verts[i].inout) ssign = 1; else ssign = -1; verts[i].x += ssign *
                     * outwt * verts[i].pn.x; verts[i].y += ssign * outwt *
                     * verts[i].pn.y; verts[i].z += ssign * outwt * verts[i].pn.z; }
                     */
            }
    };


    /*
     * These tables are based off those by Paul Bourke and Geoffrey Heller:
     * http://paulbourke.net/geometry/polygonise/
     * http://paulbourke.net/geometry/polygonise/table2.txt
     * 
     * However, they have been substantially modified to reflect a more 
     * sensible corner numbering scheme and the discrete nature of our voxel data
     * (resulting in fewer faces).
     */
    my.edgeTable = [ 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
            0xb00, 0x0, 0x0, 0x0, 0x700, 0x0, 0xd00, 0xe00, 0xf00, 0x0, 0x0, 0x0,
            0x8a, 0x0, 0x15, 0x0, 0x86, 0x0, 0x0, 0x0, 0x28c, 0x0, 0x813, 0xf19,
            0xe10, 0x0, 0x0, 0x0, 0x2a, 0x0, 0x0, 0x0, 0x126, 0x0, 0x0, 0x15, 0x1c,
            0x0, 0xf23, 0x419, 0xd20, 0x0, 0xa8, 0xa2, 0xaa, 0x0, 0x285, 0x9ab,
            0x8a2, 0x0, 0x2af, 0x125, 0xac, 0xfaa, 0xea3, 0xda9, 0xca0, 0x0, 0x0,
            0x0, 0x0, 0x0, 0x45, 0x0, 0x384, 0x0, 0x0, 0x0, 0x700, 0x8a, 0x83,
            0x648, 0x780, 0x0, 0x51, 0x0, 0x81a, 0x54, 0x55, 0x54, 0x56, 0x0, 0x51,
            0x0, 0xe5c, 0x14a, 0x451, 0x759, 0x650, 0x0, 0x0, 0x0, 0x2a, 0x0, 0x45,
            0x0, 0x1f6, 0x0, 0x0, 0x15, 0xdfc, 0x8a, 0x7f3, 0x4f9, 0x5f0, 0xb00,
            0x68, 0x921, 0x6a, 0x348, 0x245, 0x16f, 0x66, 0xb00, 0xe6f, 0xd65,
            0xc6c, 0x76a, 0x663, 0x569, 0x460, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
            0xf46, 0x0, 0x0, 0x45, 0x24c, 0x2a, 0x823, 0x29, 0xb40, 0x0, 0x0, 0x0,
            0x6ba, 0x0, 0x8f5, 0xfff, 0xef6, 0x0, 0xff, 0x2f5, 0x2fc, 0x9ea, 0x8f3,
            0xbf9, 0xaf0, 0x0, 0x0, 0x51, 0x152, 0x0, 0xf55, 0x45f, 0xd56, 0x54,
            0x357, 0x55, 0x154, 0x852, 0xb53, 0x59, 0x950, 0x700, 0x2c8, 0xc2,
            0x48a, 0xfc4, 0xec5, 0xdcf, 0xcc6, 0x2c4, 0x2cf, 0xc5, 0xcc, 0xbca,
            0xac3, 0x9c9, 0x8c0, 0x0, 0x0, 0x0, 0x0, 0xa8, 0x1a4, 0xa8, 0x7a6,
            0xa2, 0xa2, 0x2a4, 0xbac, 0xaa, 0xa3, 0x2a8, 0x3a0, 0xd00, 0xc18,
            0xd00, 0xe3a, 0x34, 0x35, 0x73f, 0x636, 0x924, 0x83f, 0xb35, 0xa3c,
            0x12a, 0x33, 0x339, 0x230, 0xe00, 0xe00, 0xc12, 0xd9a, 0x684, 0x795,
            0x49f, 0x596, 0x92, 0xb9f, 0x815, 0x99c, 0x9a, 0x393, 0x99, 0x190,
            0xf00, 0xe08, 0xd01, 0xc0a, 0x704, 0x605, 0x50f, 0x406, 0xb02, 0xa0f,
            0x905, 0x80c, 0x30a, 0x203, 0x109, 0x0 ];
    
    var edgeTable = new Uint32Array(my.edgeTable);
    
    var triTable = my.triTable = [ [], [], [], [], [], [], [], [ 11, 9, 8 ], [], [], [],
            [ 8, 10, 9 ], [], [ 10, 8, 11 ], [ 9, 11, 10 ],
            [ 8, 10, 9, 8, 11, 10 ], [], [], [], [ 1, 7, 3 ], [], [ 4, 2, 0 ], [],
            [ 2, 1, 7 ], [], [], [], [ 2, 7, 3, 2, 9, 7 ], [],
            [ 1, 4, 11, 1, 0, 4 ], [ 3, 8, 0, 11, 9, 4, 11, 10, 9 ],
            [ 4, 11, 9, 11, 10, 9 ], [], [], [], [ 5, 3, 1 ], [], [], [],
            [ 2, 5, 8, 2, 1, 5 ], [], [], [ 2, 4, 0 ], [ 3, 2, 4 ], [],
            [ 0, 9, 1, 8, 10, 5, 8, 11, 10 ], [ 3, 4, 0, 3, 10, 4 ],
            [ 5, 8, 10, 8, 11, 10 ], [], [ 3, 5, 7 ], [ 7, 1, 5 ],
            [ 1, 7, 3, 1, 5, 7 ], [], [ 9, 2, 0, 9, 7, 2 ],
            [ 0, 3, 8, 1, 7, 11, 1, 5, 7 ], [ 11, 1, 7, 1, 5, 7 ], [],
            [ 9, 1, 0, 5, 3, 2, 5, 7, 3 ], [ 8, 2, 5, 8, 0, 2 ],
            [ 2, 5, 3, 5, 7, 3 ], [ 3, 9, 1, 3, 8, 9, 7, 11, 10, 7, 10, 5 ],
            [ 9, 1, 0, 10, 7, 11, 10, 5, 7 ], [ 3, 8, 0, 7, 10, 5, 7, 11, 10 ],
            [ 11, 5, 7, 11, 10, 5 ], [], [], [], [], [], [ 0, 6, 2 ], [],
            [ 7, 2, 9, 7, 9, 8 ], [], [], [], [ 8, 10, 9 ], [ 7, 1, 3 ],
            [ 7, 1, 0 ], [ 6, 9, 3, 6, 10, 9 ], [ 7, 10, 8, 10, 9, 8 ], [],
            [ 6, 0, 4 ], [], [ 11, 1, 4, 11, 3, 1 ], [ 2, 4, 6 ],
            [ 2, 0, 4, 2, 4, 6 ], [ 2, 4, 6 ], [ 1, 4, 2, 4, 6, 2 ], [],
            [ 6, 0, 4 ], [], [ 2, 11, 3, 6, 9, 4, 6, 10, 9 ], [ 8, 6, 1, 8, 1, 3 ],
            [ 10, 0, 6, 0, 4, 6 ], [ 8, 0, 3, 9, 6, 10, 9, 4, 6 ],
            [ 10, 4, 6, 10, 9, 4 ], [], [], [], [ 5, 3, 1 ], [], [ 0, 6, 2 ], [],
            [ 7, 4, 8, 5, 2, 1, 5, 6, 2 ], [], [], [ 2, 4, 0 ],
            [ 7, 4, 8, 2, 11, 3, 10, 5, 6 ], [ 7, 1, 3 ],
            [ 5, 6, 10, 0, 9, 1, 8, 7, 4 ], [ 5, 6, 10, 7, 0, 3, 7, 4, 0 ],
            [ 10, 5, 6, 4, 8, 7 ], [ 9, 11, 8 ], [ 3, 5, 6 ],
            [ 0, 5, 11, 0, 11, 8 ], [ 6, 3, 5, 3, 1, 5 ], [ 3, 9, 6, 3, 8, 9 ],
            [ 9, 6, 0, 6, 2, 0 ], [ 0, 3, 8, 2, 5, 6, 2, 1, 5 ],
            [ 1, 6, 2, 1, 5, 6 ], [ 9, 11, 8 ], [ 1, 0, 9, 6, 10, 5, 11, 3, 2 ],
            [ 6, 10, 5, 2, 8, 0, 2, 11, 8 ], [ 3, 2, 11, 10, 5, 6 ],
            [ 10, 5, 6, 9, 3, 8, 9, 1, 3 ], [ 0, 9, 1, 5, 6, 10 ],
            [ 8, 0, 3, 10, 5, 6 ], [ 10, 5, 6 ], [], [], [], [], [], [], [],
            [ 1, 10, 2, 9, 11, 6, 9, 8, 11 ], [], [], [ 6, 0, 2 ],
            [ 3, 6, 9, 3, 2, 6 ], [ 3, 5, 1 ], [ 0, 5, 1, 0, 11, 5 ], [ 0, 3, 5 ],
            [ 6, 9, 11, 9, 8, 11 ], [], [], [], [ 4, 5, 9, 7, 1, 10, 7, 3, 1 ], [],
            [ 11, 6, 7, 2, 4, 5, 2, 0, 4 ],
            [ 11, 6, 7, 8, 0, 3, 1, 10, 2, 9, 4, 5 ],
            [ 6, 7, 11, 1, 10, 2, 9, 4, 5 ], [],
            [ 4, 1, 0, 4, 5, 1, 6, 7, 3, 6, 3, 2 ], [ 9, 4, 5, 0, 6, 7, 0, 2, 6 ],
            [ 4, 5, 9, 6, 3, 2, 6, 7, 3 ], [ 6, 7, 11, 5, 3, 8, 5, 1, 3 ],
            [ 6, 7, 11, 4, 1, 0, 4, 5, 1 ], [ 4, 5, 9, 3, 8, 0, 11, 6, 7 ],
            [ 9, 4, 5, 7, 11, 6 ], [], [], [ 0, 6, 4 ], [ 8, 6, 4, 8, 1, 6 ], [],
            [ 0, 10, 2, 0, 9, 10, 4, 8, 11, 4, 11, 6 ],
            [ 10, 2, 1, 6, 0, 3, 6, 4, 0 ], [ 10, 2, 1, 11, 4, 8, 11, 6, 4 ],
            [ 4, 2, 6 ], [ 1, 0, 9, 2, 4, 8, 2, 6, 4 ], [ 2, 4, 0, 2, 6, 4 ],
            [ 8, 2, 4, 2, 6, 4 ], [ 11, 4, 1, 11, 6, 4 ],
            [ 0, 9, 1, 4, 11, 6, 4, 8, 11 ], [ 3, 6, 0, 6, 4, 0 ],
            [ 8, 6, 4, 8, 11, 6 ], [ 10, 8, 9 ], [ 6, 3, 9, 6, 7, 3 ], [ 6, 7, 1 ],
            [ 10, 7, 1, 7, 3, 1 ], [ 7, 11, 6, 8, 10, 2, 8, 9, 10 ],
            [ 11, 6, 7, 10, 0, 9, 10, 2, 0 ], [ 2, 1, 10, 7, 11, 6, 8, 0, 3 ],
            [ 1, 10, 2, 6, 7, 11 ], [ 7, 2, 6, 7, 9, 2 ],
            [ 1, 0, 9, 3, 6, 7, 3, 2, 6 ], [ 7, 0, 6, 0, 2, 6 ],
            [ 2, 7, 3, 2, 6, 7 ], [ 7, 11, 6, 3, 9, 1, 3, 8, 9 ],
            [ 9, 1, 0, 11, 6, 7 ], [ 0, 3, 8, 11, 6, 7 ], [ 11, 6, 7 ], [], [], [],
            [], [ 5, 3, 7 ], [ 8, 5, 2, 8, 7, 5 ], [ 5, 3, 7 ],
            [ 1, 10, 2, 5, 8, 7, 5, 9, 8 ], [ 1, 7, 5 ], [ 1, 7, 5 ],
            [ 9, 2, 7, 9, 7, 5 ], [ 11, 3, 2, 8, 5, 9, 8, 7, 5 ],
            [ 1, 3, 7, 1, 7, 5 ], [ 0, 7, 1, 7, 5, 1 ], [ 9, 3, 5, 3, 7, 5 ],
            [ 9, 7, 5, 9, 8, 7 ], [ 8, 10, 11 ], [ 3, 4, 10, 3, 10, 11 ],
            [ 8, 10, 11 ], [ 5, 9, 4, 1, 11, 3, 1, 10, 11 ], [ 2, 4, 5 ],
            [ 5, 2, 4, 2, 0, 4 ], [ 0, 3, 8, 5, 9, 4, 10, 2, 1 ],
            [ 2, 1, 10, 9, 4, 5 ], [ 2, 8, 5, 2, 11, 8 ],
            [ 3, 2, 11, 1, 4, 5, 1, 0, 4 ], [ 9, 4, 5, 8, 2, 11, 8, 0, 2 ],
            [ 11, 3, 2, 9, 4, 5 ], [ 8, 5, 3, 5, 1, 3 ], [ 5, 0, 4, 5, 1, 0 ],
            [ 3, 8, 0, 4, 5, 9 ], [ 9, 4, 5 ], [ 11, 9, 10 ], [ 11, 9, 10 ],
            [ 1, 11, 4, 1, 10, 11 ], [ 8, 7, 4, 11, 1, 10, 11, 3, 1 ],
            [ 2, 7, 9, 2, 9, 10 ], [ 4, 8, 7, 0, 10, 2, 0, 9, 10 ],
            [ 2, 1, 10, 0, 7, 4, 0, 3, 7 ], [ 10, 2, 1, 8, 7, 4 ], [ 1, 7, 4 ],
            [ 3, 2, 11, 4, 8, 7, 9, 1, 0 ], [ 11, 4, 2, 4, 0, 2 ],
            [ 2, 11, 3, 7, 4, 8 ], [ 4, 1, 7, 1, 3, 7 ], [ 1, 0, 9, 8, 7, 4 ],
            [ 3, 4, 0, 3, 7, 4 ], [ 8, 7, 4 ], [ 8, 9, 10, 8, 10, 11 ],
            [ 3, 9, 11, 9, 10, 11 ], [ 0, 10, 8, 10, 11, 8 ],
            [ 10, 3, 1, 10, 11, 3 ], [ 2, 8, 10, 8, 9, 10 ], [ 9, 2, 0, 9, 10, 2 ],
            [ 8, 0, 3, 1, 10, 2 ], [ 10, 2, 1 ], [ 1, 11, 9, 11, 8, 9 ],
            [ 11, 3, 2, 0, 9, 1 ], [ 11, 0, 2, 11, 8, 0 ], [ 11, 3, 2 ],
            [ 8, 1, 3, 8, 9, 1 ], [ 9, 1, 0 ], [ 8, 0, 3 ], [] ];
     
    var edgeTable2 = [ 0x0, 0x109, 0x203, 0x30a, 0x80c, 0x905, 0xa0f,
            0xb06, 0x406, 0x50f, 0x605, 0x70c, 0xc0a, 0xd03, 0xe09, 0xf00, 0x190,
            0x99, 0x393, 0x29a, 0x99c, 0x895, 0xb9f, 0xa96, 0x596, 0x49f, 0x795,
            0x69c, 0xd9a, 0xc93, 0xf99, 0xe90, 0x230, 0x339, 0x33, 0x13a, 0xa3c,
            0xb35, 0x83f, 0x936, 0x636, 0x73f, 0x435, 0x53c, 0xe3a, 0xf33, 0xc39,
            0xd30, 0x3a0, 0x2a9, 0x1a3, 0xaa, 0xbac, 0xaa5, 0x9af, 0x8a6, 0x7a6,
            0x6af, 0x5a5, 0x4ac, 0xfaa, 0xea3, 0xda9, 0xca0, 0x8c0, 0x9c9, 0xac3,
            0xbca, 0xcc, 0x1c5, 0x2cf, 0x3c6, 0xcc6, 0xdcf, 0xec5, 0xfcc, 0x4ca,
            0x5c3, 0x6c9, 0x7c0, 0x950, 0x859, 0xb53, 0xa5a, 0x15c, 0x55, 0x35f,
            0x256, 0xd56, 0xc5f, 0xf55, 0xe5c, 0x55a, 0x453, 0x759, 0x650, 0xaf0,
            0xbf9, 0x8f3, 0x9fa, 0x2fc, 0x3f5, 0xff, 0x1f6, 0xef6, 0xfff, 0xcf5,
            0xdfc, 0x6fa, 0x7f3, 0x4f9, 0x5f0, 0xb60, 0xa69, 0x963, 0x86a, 0x36c,
            0x265, 0x16f, 0x66, 0xf66, 0xe6f, 0xd65, 0xc6c, 0x76a, 0x663, 0x569,
            0x460, 0x460, 0x569, 0x663, 0x76a, 0xc6c, 0xd65, 0xe6f, 0xf66, 0x66,
            0x16f, 0x265, 0x36c, 0x86a, 0x963, 0xa69, 0xb60, 0x5f0, 0x4f9, 0x7f3,
            0x6fa, 0xdfc, 0xcf5, 0xfff, 0xef6, 0x1f6, 0xff, 0x3f5, 0x2fc, 0x9fa,
            0x8f3, 0xbf9, 0xaf0, 0x650, 0x759, 0x453, 0x55a, 0xe5c, 0xf55, 0xc5f,
            0xd56, 0x256, 0x35f, 0x55, 0x15c, 0xa5a, 0xb53, 0x859, 0x950, 0x7c0,
            0x6c9, 0x5c3, 0x4ca, 0xfcc, 0xec5, 0xdcf, 0xcc6, 0x3c6, 0x2cf, 0x1c5,
            0xcc, 0xbca, 0xac3, 0x9c9, 0x8c0, 0xca0, 0xda9, 0xea3, 0xfaa, 0x4ac,
            0x5a5, 0x6af, 0x7a6, 0x8a6, 0x9af, 0xaa5, 0xbac, 0xaa, 0x1a3, 0x2a9,
            0x3a0, 0xd30, 0xc39, 0xf33, 0xe3a, 0x53c, 0x435, 0x73f, 0x636, 0x936,
            0x83f, 0xb35, 0xa3c, 0x13a, 0x33, 0x339, 0x230, 0xe90, 0xf99, 0xc93,
            0xd9a, 0x69c, 0x795, 0x49f, 0x596, 0xa96, 0xb9f, 0x895, 0x99c, 0x29a,
            0x393, 0x99, 0x190, 0xf00, 0xe09, 0xd03, 0xc0a, 0x70c, 0x605, 0x50f,
            0x406, 0xb06, 0xa0f, 0x905, 0x80c, 0x30a, 0x203, 0x109, 0x0 ];
     
    var triTable2 = [ [], [ 8, 3, 0 ], [ 9, 0, 1 ], [ 8, 3, 1, 8, 1, 9 ],
            [ 11, 2, 3 ], [ 11, 2, 0, 11, 0, 8 ], [ 11, 2, 3, 0, 1, 9 ],
            [ 2, 1, 11, 1, 9, 11, 11, 9, 8 ], [ 10, 1, 2 ], [ 8, 3, 0, 1, 2, 10 ],
            [ 9, 0, 2, 9, 2, 10 ], [ 3, 2, 8, 2, 10, 8, 8, 10, 9 ],
            [ 10, 1, 3, 10, 3, 11 ], [ 1, 0, 10, 0, 8, 10, 10, 8, 11 ],
            [ 0, 3, 9, 3, 11, 9, 9, 11, 10 ], [ 8, 10, 9, 8, 11, 10 ], [ 8, 4, 7 ],
            [ 3, 0, 4, 3, 4, 7 ], [ 1, 9, 0, 8, 4, 7 ],
            [ 9, 4, 1, 4, 7, 1, 1, 7, 3 ], [ 2, 3, 11, 7, 8, 4 ],
            [ 7, 11, 4, 11, 2, 4, 4, 2, 0 ], [ 3, 11, 2, 4, 7, 8, 9, 0, 1 ],
            [ 2, 7, 11, 2, 1, 7, 1, 4, 7, 1, 9, 4 ], [ 10, 1, 2, 8, 4, 7 ],
            [ 2, 10, 1, 0, 4, 7, 0, 7, 3 ], [ 4, 7, 8, 0, 2, 10, 0, 10, 9 ],
            [ 2, 7, 3, 2, 9, 7, 7, 9, 4, 2, 10, 9 ],
            [ 8, 4, 7, 11, 10, 1, 11, 1, 3 ],
            [ 11, 4, 7, 1, 4, 11, 1, 11, 10, 1, 0, 4 ],
            [ 3, 8, 0, 7, 11, 4, 11, 9, 4, 11, 10, 9 ],
            [ 7, 11, 4, 4, 11, 9, 11, 10, 9 ], [ 9, 5, 4 ], [ 3, 0, 8, 4, 9, 5 ],
            [ 5, 4, 0, 5, 0, 1 ], [ 4, 8, 5, 8, 3, 5, 5, 3, 1 ],
            [ 11, 2, 3, 9, 5, 4 ], [ 9, 5, 4, 8, 11, 2, 8, 2, 0 ],
            [ 3, 11, 2, 1, 5, 4, 1, 4, 0 ],
            [ 8, 5, 4, 2, 5, 8, 2, 8, 11, 2, 1, 5 ], [ 2, 10, 1, 9, 5, 4 ],
            [ 0, 8, 3, 5, 4, 9, 10, 1, 2 ], [ 10, 5, 2, 5, 4, 2, 2, 4, 0 ],
            [ 3, 4, 8, 3, 2, 4, 2, 5, 4, 2, 10, 5 ],
            [ 5, 4, 9, 1, 3, 11, 1, 11, 10 ],
            [ 0, 9, 1, 4, 8, 5, 8, 10, 5, 8, 11, 10 ],
            [ 3, 4, 0, 3, 10, 4, 4, 10, 5, 3, 11, 10 ],
            [ 4, 8, 5, 5, 8, 10, 8, 11, 10 ], [ 9, 5, 7, 9, 7, 8 ],
            [ 0, 9, 3, 9, 5, 3, 3, 5, 7 ], [ 8, 0, 7, 0, 1, 7, 7, 1, 5 ],
            [ 1, 7, 3, 1, 5, 7 ], [ 11, 2, 3, 8, 9, 5, 8, 5, 7 ],
            [ 9, 2, 0, 9, 7, 2, 2, 7, 11, 9, 5, 7 ],
            [ 0, 3, 8, 2, 1, 11, 1, 7, 11, 1, 5, 7 ],
            [ 2, 1, 11, 11, 1, 7, 1, 5, 7 ], [ 1, 2, 10, 5, 7, 8, 5, 8, 9 ],
            [ 9, 1, 0, 10, 5, 2, 5, 3, 2, 5, 7, 3 ],
            [ 5, 2, 10, 8, 2, 5, 8, 5, 7, 8, 0, 2 ],
            [ 10, 5, 2, 2, 5, 3, 5, 7, 3 ],
            [ 3, 9, 1, 3, 8, 9, 7, 11, 10, 7, 10, 5 ],
            [ 9, 1, 0, 10, 7, 11, 10, 5, 7 ], [ 3, 8, 0, 7, 10, 5, 7, 11, 10 ],
            [ 11, 5, 7, 11, 10, 5 ], [ 11, 7, 6 ], [ 0, 8, 3, 11, 7, 6 ],
            [ 9, 0, 1, 11, 7, 6 ], [ 7, 6, 11, 3, 1, 9, 3, 9, 8 ],
            [ 2, 3, 7, 2, 7, 6 ], [ 8, 7, 0, 7, 6, 0, 0, 6, 2 ],
            [ 1, 9, 0, 3, 7, 6, 3, 6, 2 ], [ 7, 6, 2, 7, 2, 9, 2, 1, 9, 7, 9, 8 ],
            [ 1, 2, 10, 6, 11, 7 ], [ 2, 10, 1, 7, 6, 11, 8, 3, 0 ],
            [ 11, 7, 6, 10, 9, 0, 10, 0, 2 ],
            [ 7, 6, 11, 3, 2, 8, 8, 2, 10, 8, 10, 9 ],
            [ 6, 10, 7, 10, 1, 7, 7, 1, 3 ],
            [ 6, 10, 1, 6, 1, 7, 7, 1, 0, 7, 0, 8 ],
            [ 9, 0, 3, 6, 9, 3, 6, 10, 9, 6, 3, 7 ],
            [ 6, 10, 7, 7, 10, 8, 10, 9, 8 ], [ 8, 4, 6, 8, 6, 11 ],
            [ 11, 3, 6, 3, 0, 6, 6, 0, 4 ], [ 0, 1, 9, 4, 6, 11, 4, 11, 8 ],
            [ 1, 9, 4, 11, 1, 4, 11, 3, 1, 11, 4, 6 ],
            [ 3, 8, 2, 8, 4, 2, 2, 4, 6 ], [ 2, 0, 4, 2, 4, 6 ],
            [ 1, 9, 0, 3, 8, 2, 2, 8, 4, 2, 4, 6 ], [ 9, 4, 1, 1, 4, 2, 4, 6, 2 ],
            [ 10, 1, 2, 11, 8, 4, 11, 4, 6 ],
            [ 10, 1, 2, 11, 3, 6, 6, 3, 0, 6, 0, 4 ],
            [ 0, 2, 10, 0, 10, 9, 4, 11, 8, 4, 6, 11 ],
            [ 2, 11, 3, 6, 9, 4, 6, 10, 9 ],
            [ 8, 4, 6, 8, 6, 1, 6, 10, 1, 8, 1, 3 ],
            [ 1, 0, 10, 10, 0, 6, 0, 4, 6 ], [ 8, 0, 3, 9, 6, 10, 9, 4, 6 ],
            [ 10, 4, 6, 10, 9, 4 ], [ 9, 5, 4, 7, 6, 11 ],
            [ 4, 9, 5, 3, 0, 8, 11, 7, 6 ], [ 6, 11, 7, 4, 0, 1, 4, 1, 5 ],
            [ 6, 11, 7, 4, 8, 5, 5, 8, 3, 5, 3, 1 ], [ 4, 9, 5, 6, 2, 3, 6, 3, 7 ],
            [ 9, 5, 4, 8, 7, 0, 0, 7, 6, 0, 6, 2 ],
            [ 4, 0, 1, 4, 1, 5, 6, 3, 7, 6, 2, 3 ], [ 7, 4, 8, 5, 2, 1, 5, 6, 2 ],
            [ 6, 11, 7, 1, 2, 10, 9, 5, 4 ],
            [ 11, 7, 6, 8, 3, 0, 1, 2, 10, 9, 5, 4 ],
            [ 11, 7, 6, 10, 5, 2, 2, 5, 4, 2, 4, 0 ],
            [ 7, 4, 8, 2, 11, 3, 10, 5, 6 ],
            [ 4, 9, 5, 6, 10, 7, 7, 10, 1, 7, 1, 3 ],
            [ 5, 6, 10, 0, 9, 1, 8, 7, 4 ], [ 5, 6, 10, 7, 0, 3, 7, 4, 0 ],
            [ 10, 5, 6, 4, 8, 7 ], [ 5, 6, 9, 6, 11, 9, 9, 11, 8 ],
            [ 0, 9, 5, 0, 5, 3, 3, 5, 6, 3, 6, 11 ],
            [ 0, 1, 5, 0, 5, 11, 5, 6, 11, 0, 11, 8 ],
            [ 11, 3, 6, 6, 3, 5, 3, 1, 5 ], [ 9, 5, 6, 3, 9, 6, 3, 8, 9, 3, 6, 2 ],
            [ 5, 6, 9, 9, 6, 0, 6, 2, 0 ], [ 0, 3, 8, 2, 5, 6, 2, 1, 5 ],
            [ 1, 6, 2, 1, 5, 6 ], [ 1, 2, 10, 5, 6, 9, 9, 6, 11, 9, 11, 8 ],
            [ 1, 0, 9, 6, 10, 5, 11, 3, 2 ], [ 6, 10, 5, 2, 8, 0, 2, 11, 8 ],
            [ 3, 2, 11, 10, 5, 6 ], [ 10, 5, 6, 9, 3, 8, 9, 1, 3 ],
            [ 0, 9, 1, 5, 6, 10 ], [ 8, 0, 3, 10, 5, 6 ], [ 10, 5, 6 ],
            [ 10, 6, 5 ], [ 8, 3, 0, 10, 6, 5 ], [ 0, 1, 9, 5, 10, 6 ],
            [ 10, 6, 5, 9, 8, 3, 9, 3, 1 ], [ 3, 11, 2, 10, 6, 5 ],
            [ 6, 5, 10, 2, 0, 8, 2, 8, 11 ], [ 1, 9, 0, 6, 5, 10, 11, 2, 3 ],
            [ 1, 10, 2, 5, 9, 6, 9, 11, 6, 9, 8, 11 ], [ 1, 2, 6, 1, 6, 5 ],
            [ 0, 8, 3, 2, 6, 5, 2, 5, 1 ], [ 5, 9, 6, 9, 0, 6, 6, 0, 2 ],
            [ 9, 6, 5, 3, 6, 9, 3, 9, 8, 3, 2, 6 ], [ 11, 6, 3, 6, 5, 3, 3, 5, 1 ],
            [ 0, 5, 1, 0, 11, 5, 5, 11, 6, 0, 8, 11 ],
            [ 0, 5, 9, 0, 3, 5, 3, 6, 5, 3, 11, 6 ],
            [ 5, 9, 6, 6, 9, 11, 9, 8, 11 ], [ 10, 6, 5, 4, 7, 8 ],
            [ 5, 10, 6, 7, 3, 0, 7, 0, 4 ], [ 5, 10, 6, 0, 1, 9, 8, 4, 7 ],
            [ 4, 5, 9, 6, 7, 10, 7, 1, 10, 7, 3, 1 ],
            [ 7, 8, 4, 2, 3, 11, 10, 6, 5 ],
            [ 11, 6, 7, 10, 2, 5, 2, 4, 5, 2, 0, 4 ],
            [ 11, 6, 7, 8, 0, 3, 1, 10, 2, 9, 4, 5 ],
            [ 6, 7, 11, 1, 10, 2, 9, 4, 5 ], [ 7, 8, 4, 5, 1, 2, 5, 2, 6 ],
            [ 4, 1, 0, 4, 5, 1, 6, 7, 3, 6, 3, 2 ],
            [ 9, 4, 5, 8, 0, 7, 0, 6, 7, 0, 2, 6 ], [ 4, 5, 9, 6, 3, 2, 6, 7, 3 ],
            [ 6, 7, 11, 4, 5, 8, 5, 3, 8, 5, 1, 3 ],
            [ 6, 7, 11, 4, 1, 0, 4, 5, 1 ], [ 4, 5, 9, 3, 8, 0, 11, 6, 7 ],
            [ 9, 4, 5, 7, 11, 6 ], [ 10, 6, 4, 10, 4, 9 ],
            [ 8, 3, 0, 9, 10, 6, 9, 6, 4 ], [ 1, 10, 0, 10, 6, 0, 0, 6, 4 ],
            [ 8, 6, 4, 8, 1, 6, 6, 1, 10, 8, 3, 1 ],
            [ 2, 3, 11, 6, 4, 9, 6, 9, 10 ],
            [ 0, 10, 2, 0, 9, 10, 4, 8, 11, 4, 11, 6 ],
            [ 10, 2, 1, 11, 6, 3, 6, 0, 3, 6, 4, 0 ],
            [ 10, 2, 1, 11, 4, 8, 11, 6, 4 ], [ 9, 1, 4, 1, 2, 4, 4, 2, 6 ],
            [ 1, 0, 9, 3, 2, 8, 2, 4, 8, 2, 6, 4 ], [ 2, 4, 0, 2, 6, 4 ],
            [ 3, 2, 8, 8, 2, 4, 2, 6, 4 ],
            [ 1, 4, 9, 11, 4, 1, 11, 1, 3, 11, 6, 4 ],
            [ 0, 9, 1, 4, 11, 6, 4, 8, 11 ], [ 11, 6, 3, 3, 6, 0, 6, 4, 0 ],
            [ 8, 6, 4, 8, 11, 6 ], [ 6, 7, 10, 7, 8, 10, 10, 8, 9 ],
            [ 9, 3, 0, 6, 3, 9, 6, 9, 10, 6, 7, 3 ],
            [ 6, 1, 10, 6, 7, 1, 7, 0, 1, 7, 8, 0 ],
            [ 6, 7, 10, 10, 7, 1, 7, 3, 1 ],
            [ 7, 11, 6, 3, 8, 2, 8, 10, 2, 8, 9, 10 ],
            [ 11, 6, 7, 10, 0, 9, 10, 2, 0 ], [ 2, 1, 10, 7, 11, 6, 8, 0, 3 ],
            [ 1, 10, 2, 6, 7, 11 ], [ 7, 2, 6, 7, 9, 2, 2, 9, 1, 7, 8, 9 ],
            [ 1, 0, 9, 3, 6, 7, 3, 2, 6 ], [ 8, 0, 7, 7, 0, 6, 0, 2, 6 ],
            [ 2, 7, 3, 2, 6, 7 ], [ 7, 11, 6, 3, 9, 1, 3, 8, 9 ],
            [ 9, 1, 0, 11, 6, 7 ], [ 0, 3, 8, 11, 6, 7 ], [ 11, 6, 7 ],
            [ 11, 7, 5, 11, 5, 10 ], [ 3, 0, 8, 7, 5, 10, 7, 10, 11 ],
            [ 9, 0, 1, 10, 11, 7, 10, 7, 5 ],
            [ 3, 1, 9, 3, 9, 8, 7, 10, 11, 7, 5, 10 ],
            [ 10, 2, 5, 2, 3, 5, 5, 3, 7 ],
            [ 5, 10, 2, 8, 5, 2, 8, 7, 5, 8, 2, 0 ],
            [ 9, 0, 1, 10, 2, 5, 5, 2, 3, 5, 3, 7 ],
            [ 1, 10, 2, 5, 8, 7, 5, 9, 8 ], [ 2, 11, 1, 11, 7, 1, 1, 7, 5 ],
            [ 0, 8, 3, 2, 11, 1, 1, 11, 7, 1, 7, 5 ],
            [ 9, 0, 2, 9, 2, 7, 2, 11, 7, 9, 7, 5 ],
            [ 11, 3, 2, 8, 5, 9, 8, 7, 5 ], [ 1, 3, 7, 1, 7, 5 ],
            [ 8, 7, 0, 0, 7, 1, 7, 5, 1 ], [ 0, 3, 9, 9, 3, 5, 3, 7, 5 ],
            [ 9, 7, 5, 9, 8, 7 ], [ 4, 5, 8, 5, 10, 8, 8, 10, 11 ],
            [ 3, 0, 4, 3, 4, 10, 4, 5, 10, 3, 10, 11 ],
            [ 0, 1, 9, 4, 5, 8, 8, 5, 10, 8, 10, 11 ],
            [ 5, 9, 4, 1, 11, 3, 1, 10, 11 ],
            [ 3, 8, 4, 3, 4, 2, 2, 4, 5, 2, 5, 10 ],
            [ 10, 2, 5, 5, 2, 4, 2, 0, 4 ], [ 0, 3, 8, 5, 9, 4, 10, 2, 1 ],
            [ 2, 1, 10, 9, 4, 5 ], [ 8, 4, 5, 2, 8, 5, 2, 11, 8, 2, 5, 1 ],
            [ 3, 2, 11, 1, 4, 5, 1, 0, 4 ], [ 9, 4, 5, 8, 2, 11, 8, 0, 2 ],
            [ 11, 3, 2, 9, 4, 5 ], [ 4, 5, 8, 8, 5, 3, 5, 1, 3 ],
            [ 5, 0, 4, 5, 1, 0 ], [ 3, 8, 0, 4, 5, 9 ], [ 9, 4, 5 ],
            [ 7, 4, 11, 4, 9, 11, 11, 9, 10 ],
            [ 3, 0, 8, 7, 4, 11, 11, 4, 9, 11, 9, 10 ],
            [ 11, 7, 4, 1, 11, 4, 1, 10, 11, 1, 4, 0 ],
            [ 8, 7, 4, 11, 1, 10, 11, 3, 1 ],
            [ 2, 3, 7, 2, 7, 9, 7, 4, 9, 2, 9, 10 ],
            [ 4, 8, 7, 0, 10, 2, 0, 9, 10 ], [ 2, 1, 10, 0, 7, 4, 0, 3, 7 ],
            [ 10, 2, 1, 8, 7, 4 ], [ 2, 11, 7, 2, 7, 1, 1, 7, 4, 1, 4, 9 ],
            [ 3, 2, 11, 4, 8, 7, 9, 1, 0 ], [ 7, 4, 11, 11, 4, 2, 4, 0, 2 ],
            [ 2, 11, 3, 7, 4, 8 ], [ 9, 1, 4, 4, 1, 7, 1, 3, 7 ],
            [ 1, 0, 9, 8, 7, 4 ], [ 3, 4, 0, 3, 7, 4 ], [ 8, 7, 4 ],
            [ 8, 9, 10, 8, 10, 11 ], [ 0, 9, 3, 3, 9, 11, 9, 10, 11 ],
            [ 1, 10, 0, 0, 10, 8, 10, 11, 8 ], [ 10, 3, 1, 10, 11, 3 ],
            [ 3, 8, 2, 2, 8, 10, 8, 9, 10 ], [ 9, 2, 0, 9, 10, 2 ],
            [ 8, 0, 3, 1, 10, 2 ], [ 10, 2, 1 ], [ 2, 11, 1, 1, 11, 9, 11, 8, 9 ],
            [ 11, 3, 2, 0, 9, 1 ], [ 11, 0, 2, 11, 8, 0 ], [ 11, 3, 2 ],
            [ 8, 1, 3, 8, 9, 1 ], [ 9, 1, 0 ], [ 8, 0, 3 ], [] ];
            
            return my;
};

//each webworker needs its own marching cube object
$3Dmol.MarchingCube  = $3Dmol.MarchingCubeInitializer();    



/**
 * $3Dmol.Parsers stores functions for parsing molecular data. They all take a string of molecular data
 * and options. The default behavior is to only read the first model in the case of multimodel files, and
 * all parsers return a list of atom list(s)
 * 
 * $3Dmol.Parsers.<ext> corresponds to the parsers for files with extension ext
 */
$3Dmol.Parsers = (function() {
    var parsers = {};

    /**
     * @param {AtomSpec[]}
     *            atomsarray
     */
    var assignBonds = function(atoms) {
        // assign bonds - yuck, can't count on connect records

        for (var i = 0, n = atoms.length; i < n; i++) {
            // Don't reindex if atoms are already indexed
            if (!atoms[i].index)
                atoms[i].index = i;
        }

        var grid = {};
        var MAX_BOND_LENGTH = 4.95; // (largest bond length, Cs) 2.25 * 2 * 1.1 (fudge factor)

        for (var index = 0; index < atoms.length; index++) {
            var atom = atoms[index];
            var x = Math.floor(atom.x / MAX_BOND_LENGTH);
            var y = Math.floor(atom.y / MAX_BOND_LENGTH);
            var z = Math.floor(atom.z / MAX_BOND_LENGTH);
            if (!grid[x]) {
                grid[x] = {};
            }
            if (!grid[x][y]) {
                grid[x][y] = {};
            }
            if (!grid[x][y][z]) {
                grid[x][y][z] = [];
            }

            grid[x][y][z].push(atom);
        }

        var findConnections = function(points, otherPoints) {
            for (var i = 0; i < points.length; i++) {
                var atom1 = points[i];
                for (var j = 0; j < otherPoints.length; j++) {
                    var atom2 = otherPoints[j];

                    if (areConnected(atom1, atom2)) {
                        //gracefully handle one-sided bonds
                        var a2i = atom1.bonds.indexOf(atom2.index);
                        var a1i = atom2.bonds.indexOf(atom1.index);
                        if (a2i == -1 && a1i == -1) {
                            atom1.bonds.push(atom2.index);
                            atom1.bondOrder.push(1);
                            atom2.bonds.push(atom1.index);
                            atom2.bondOrder.push(1);
                        } else if (a2i == -1) {
                            atom1.bonds.push(atom2.index);
                            atom1.bondOrder.push(atom2.bondOrder[a1i])
                        } else if (a1i == -1) {
                            atom2.bonds.push(atom1.index);
                            atom2.bondOrder.push(atom1.bondOrder[a2i])                            
                        }
                            
                    }
                }
            }
        }


        /*const*/ var OFFSETS = [
            {x: 0, y: 0, z: 1},
            {x: 0, y: 1, z:-1},
            {x: 0, y: 1, z: 0},
            {x: 0, y: 1, z: 1},
            {x: 1, y:-1, z:-1},
            {x: 1, y:-1, z: 0},
            {x: 1, y:-1, z: 1},
            {x: 1, y: 0, z:-1},
            {x: 1, y: 0, z: 0},
            {x: 1, y: 0, z: 1},
            {x: 1, y: 1, z:-1},
            {x: 1, y: 1, z: 0},
            {x: 1, y: 1, z: 1}
        ];
        for (var x in grid) {
            x = parseInt(x);
            for (var y in grid[x]) {
                y = parseInt(y);
                for (var z in grid[x][y]) {
                    z = parseInt(z);
                    var points = grid[x][y][z];

                    for (var i = 0; i < points.length; i++) {
                        var atom1 = points[i];
                        for (var j = i + 1; j < points.length; j++) {
                            var atom2 = points[j];
                            if (areConnected(atom1, atom2)) {
                                if (atom1.bonds.indexOf(atom2.index) == -1) {
                                    atom1.bonds.push(atom2.index);
                                    atom1.bondOrder.push(1);
                                    atom2.bonds.push(atom1.index);
                                    atom2.bondOrder.push(1);
                                }
                            }
                        }
                    }

                    for (var o = 0; o < OFFSETS.length; o++) {
                        var offset = OFFSETS[o];
                        if (!grid[x+offset.x]
                            || !grid[x+offset.x][y+offset.y]
                            || !grid[x+offset.x][y+offset.y][z+offset.z]) continue;

                        var otherPoints = grid[x + offset.x][y + offset.y][z + offset.z];
                        findConnections(points, otherPoints);
                    }
                }
            }
        }
    };

    // this is optimized for proteins where it is assumed connected
    // atoms are on the same or next residue
    /**
     * @param {AtomSpec[]}
     *            atomsarray
     */
    var assignPDBBonds = function(atomsarray) {
        // assign bonds - yuck, can't count on connect records
        var protatoms = [];
        var hetatoms = [];
        var i, n;
        for (i = 0, n = atomsarray.length; i < n; i++) {
            var atom = atomsarray[i];
            atom.index = i;
            if (atom.hetflag)
                hetatoms.push(atom);
            else
                protatoms.push(atom);
        }

        assignBonds(hetatoms);

        // sort by resid
        protatoms.sort(function(a, b) {
            if (a.chain != b.chain)
                return a.chain < b.chain ? -1 : 1;
            return a.resi - b.resi;
        });

        // for identifying connected residues
        var currentResi = -1;
        var reschain = -1;
        var lastResConnected;

        for (i = 0, n = protatoms.length; i < n; i++) {
            var ai = protatoms[i];

            if (ai.resi !== currentResi) {
                currentResi = ai.resi;
                if (!lastResConnected)
                    reschain++;

                lastResConnected = false;
            }

            ai.reschain = reschain;

            for (var j = i + 1; j < protatoms.length; j++) {
                var aj = protatoms[j];
                if (aj.chain != ai.chain)
                    break;
                if (aj.resi - ai.resi > 1) // can't be connected
                    break;
                if (areConnected(ai, aj)) {
                    if (ai.bonds.indexOf(aj.index) === -1) {
                        // only add if not already there
                        ai.bonds.push(aj.index);
                        ai.bondOrder.push(1);
                        aj.bonds.push(ai.index);
                        aj.bondOrder.push(1);
                    }

                    if (ai.resi !== aj.resi)
                        lastResConnected = true;

                }
            }
        }

    };

    // this will identify all hydrogen bonds between backbone
    // atoms; assume atom names are correct, only identifies
    // single closest hbond
    var assignBackboneHBonds = function(atomsarray) {
        var maxlength = 3.2;
        var maxlengthSq = 10.24;
        var atoms = [];
        var i, j, n;
        for (i = 0, n = atomsarray.length; i < n; i++) {
            atomsarray[i].index = i;
            // only consider 'N' and 'O'
            var atom = atomsarray[i];
            if (!atom.hetflag && (atom.atom === "N" || atom.atom === "O")) {
                atoms.push(atom);
                atom.hbondOther = null;
                atom.hbondDistanceSq = Number.POSITIVE_INFINITY;
            }
        }

        atoms.sort(function(a, b) {
            return a.z - b.z;
        });
        for (i = 0, n = atoms.length; i < n; i++) {
            var ai = atoms[i];

            for (j = i + 1; j < n; j++) {
                var aj = atoms[j];
                var zdiff = aj.z - ai.z;
                if (zdiff > maxlength) // can't be connected
                    break;
                if (aj.atom == ai.atom)
                    continue; // can't be connected, but later might be
                var ydiff = Math.abs(aj.y - ai.y);
                if (ydiff > maxlength)
                    continue;
                var xdiff = Math.abs(aj.x - ai.x);
                if (xdiff > maxlength)
                    continue;
                var dist = xdiff * xdiff + ydiff * ydiff + zdiff * zdiff;
                if (dist > maxlengthSq)
                    continue;

                if (aj.chain == ai.chain && Math.abs(aj.resi - ai.resi) < 4)
                    continue; // ignore bonds between too close residues
                // select closest hbond
                if (dist < ai.hbondDistanceSq) {
                    ai.hbondOther = aj;
                    ai.hbondDistanceSq = dist;
                }
                if (dist < aj.hbondDistanceSq) {
                    aj.hbondOther = ai;
                    aj.hbondDistanceSq = dist;
                }
            }
        }
    };

    var computeSecondaryStructure = function(atomsarray) {
        assignBackboneHBonds(atomsarray);

        // compute, per residue, what the secondary structure is
        var chres = {}; // lookup by chain and resid
        var i, il, c, r;
        var atom, val;

        //identify helices first
        for (i = 0, il = atomsarray.length; i < il; i++) {
            atom = atomsarray[i];

            if (typeof (chres[atom.chain]) === "undefined")
                chres[atom.chain] = [];
            
            if (isFinite(atom.hbondDistanceSq)) {
                var other = atom.hbondOther;
                if (typeof (chres[other.chain]) === "undefined")
                    chres[other.chain] = [];
                
                if (Math.abs(other.resi - atom.resi) === 4) {
                    // helix
                    chres[atom.chain][atom.resi] = 'h';
                } 
            }
        }
        
        // plug gaps in helices
        for (c in chres) {
            for (r = 1; r < chres[c].length - 1; r++) {
                var valbefore = chres[c][r - 1];
                var valafter = chres[c][r + 1];
                val = chres[c][r];
                if (valbefore == 'h' && valbefore == valafter && val != valbefore) {
                    chres[c][r] = valbefore;
                }
            }
        }
        
        //now potential sheets - but only if mate not part of helix
        for (i = 0, il = atomsarray.length; i < il; i++) {
            atom = atomsarray[i];

            if (isFinite(atom.hbondDistanceSq) && chres[atom.chain][atom.resi] != 'h' && atom.ss != 'h') {
                chres[atom.chain][atom.resi] = 'maybesheet';
            }
        }
        
        
        //sheets must bond to other sheets
        for (i = 0, il = atomsarray.length; i < il; i++) {
            atom = atomsarray[i];

            if (isFinite(atom.hbondDistanceSq) && chres[atom.chain][atom.resi] == 'maybesheet') {
                var other = atom.hbondOther;
                var otherval = chres[other.chain][other.resi];
                if (otherval == 'maybesheet' || otherval == 's') {
                    // true sheet
                    chres[atom.chain][atom.resi] = 's';
                    chres[other.chain][other.resi] = 's';
                }
            }
        }
        
        // plug gaps in sheets and remove singletons
        for (c in chres) {
            for (r = 1; r < chres[c].length - 1; r++) {
                var valbefore = chres[c][r - 1];
                var valafter = chres[c][r + 1];
                val = chres[c][r];
                if (valbefore == 's' && valbefore == valafter && val != valbefore) {
                    chres[c][r] = valbefore;
                }
            }
            for (r = 0; r < chres[c].length; r++) {
                val = chres[c][r];
                if (val == 'h' || val == 's') {
                    if (chres[c][r - 1] != val && chres[c][r + 1] != val)
                        delete chres[c][r];
                }
            }
        }

        
        // assign to all atoms in residue, keep track of start
        var curres = null;
        for (i = 0, il = atomsarray.length; i < il; i++) {
            atom = atomsarray[i];
            val = chres[atom.chain][atom.resi];
            if (typeof (val) == "undefined" || val == 'maybesheet')
                continue;
            atom.ss = val;
            if (chres[atom.chain][atom.resi - 1] != val)
                atom.ssbegin = true;
            if (chres[atom.chain][atom.resi + 1] != val)
                atom.ssend = true;
        }
    };
    
    
    //make sure bonds are actually two way
    var validateBonds = function(atomsarray, serialToIndex) {
        for (var i = 0, n = atomsarray.length; i < n; i++) {
            var atom = atomsarray[i];
            for(var b = 0; b < atom.bonds.length; b++) {
                var a2i = atom.bonds[b];
                var atom2 = atomsarray[a2i];
                var atomi = serialToIndex[atom.serial];
                if(atom2 && atomi) {
                    var a1i = atom2.bonds.indexOf(atomi);
                    if(a1i < 0) {
                        atom2.bonds.push(atomi);
                        atom2.bondOrder.push(atom.bondOrder[b]);
                    }
                }
            }
        }
    };
        

    /**
     * @param {string}
     *            str
     * @param {ParserOptionsSpec}
     *            options
     */
    parsers.vasp = parsers.VASP = function (str, options) {
      var atoms = [[]];
      var lattice = {};

      var lines = str.replace(/^\s+/, "").split(/[\n\r]/);

      if (lines.length < 3){
        return atoms;
      }

      if (lines[1].match(/\d+/)) {
        lattice.length = parseFloat(lines[1]);
      } else {
        console.log("Warning: second line of the vasp structure file must be a number");
        return atoms;
      }

      if (lattice.length<0) {
        console.log("Warning: Vasp implementation for negative lattice lengths is not yet available");
        return atoms;
      }

      lattice.xVec = new Float32Array(lines[2].replace(/^\s+/, "").split(/\s+/));
      lattice.yVec = new Float32Array(lines[3].replace(/^\s+/, "").split(/\s+/));
      lattice.zVec = new Float32Array(lines[4].replace(/^\s+/, "").split(/\s+/));

      var matrix = new $3Dmol.Matrix4(lattice.xVec[0], lattice.xVec[1], lattice.xVec[2], 0, 
                                      lattice.yVec[0], lattice.yVec[1], lattice.yVec[2], 0,
                                      lattice.zVec[0], lattice.zVec[1], lattice.zVec[2], 0,
                                      0,                             0,               0, 1);
      
	  matrix.multiplyScalar(lattice.length)

      var modelData = atoms.modelData = [{symmetries:[], cryst:{matrix:matrix}}];
	  
      var atomSymbols=lines[5].replace(/\s+/, "").replace(/\s+$/,"").split(/\s+/);
      var atomSpeciesNumber=new Int16Array(lines[6].replace(/^\s+/, "").split(/\s+/));
      var vaspMode=lines[7].replace(/\s+/, "");


      if (vaspMode.match(/C/)) {
        vaspMode = "cartesian";
      }else if (vaspMode.match(/D/)){
        vaspMode="direct";
      } else {
        console.log("Warning: Unknown vasp mode in POSCAR file: mode must be either C(artesian) or D(irect)");
        return atoms;
      }

      if (atomSymbols.length != atomSpeciesNumber.length) {
        console.log("Warning: declaration of atomary species wrong:");
        console.log(atomSymbols);
        console.log(atomSpeciesNumber);
        return atoms;
      }

      lines.splice(0,8);

      var atomCounter = 0;

      for (var i = 0, len = atomSymbols.length; i < len; i++) {
        var atomSymbol = atomSymbols[i];
       for (var j = 0, atomLen = atomSpeciesNumber[i]; j < atomLen; j++) {

        var coords = new Float32Array(lines[atomCounter + j].replace(/^\s+/, "").split(/\s+/));

        atom={};
        atom.elem = atomSymbol;
        if (vaspMode == "cartesian") {
          atom.x = lattice.length*coords[0];
          atom.y = lattice.length*coords[1];
          atom.z = lattice.length*coords[2];
        } else {
          atom.x = lattice.length*(coords[0]*lattice.xVec[0] + coords[1]*lattice.yVec[0] + coords[2]*lattice.zVec[0]);
          atom.y = lattice.length*(coords[0]*lattice.xVec[1] + coords[1]*lattice.yVec[1] + coords[2]*lattice.zVec[1]);
          atom.z = lattice.length*(coords[0]*lattice.xVec[2] + coords[1]*lattice.yVec[2] + coords[2]*lattice.zVec[2]);
        }

        atom.bonds=[];

        atoms[0].push(atom);
       }
        atomCounter += atomSpeciesNumber[i];
      }

      return atoms;


    }

    /**
     * @param {string}
     *            str
     * @param {ParserOptionsSpec}
     *            options
     */
    parsers.cube = parsers.CUBE = function(str, options) {
        var atoms = [[]];
        var lines = str.replace(/^\s+/, "").split(/\n\r|\r+/);

        if (lines.length < 6)
            return atoms;

        var lineArr = lines[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(
                " ");

        var natoms = Math.abs(parseFloat(lineArr[0]));

        lineArr = lines[3].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

        // might have to convert from bohr units to angstroms
        var convFactor = (parseFloat(lineArr[0]) > 0) ? 0.529177 : 1;

        // Extract atom portion; send to new GLModel...
        lines = lines.splice(6, natoms);

        var start = atoms[atoms.length-1].length;
        var end = start + lines.length;

        for (var i = start; i < end; ++i) {
            var atom = {};
            atom.serial = i;
            var line = lines[i - start];
            var tokens = line.replace(/^\s+/, "").replace(/\s+/g, " ").split(
                    " ");

            if (tokens[0] == 6)
                atom.elem = "C";

            else if (tokens[0] == 1)
                atom.elem = "H";

            else if (tokens[0] == 8)
                atom.elem = "O";

            else if (tokens[0] == 17)
                atom.elem = "Cl";

            atom.x = parseFloat(tokens[2]) * convFactor;
            atom.y = parseFloat(tokens[3]) * convFactor;
            atom.z = parseFloat(tokens[4]) * convFactor;

            atom.hetflag = true;
            atom.bonds = [];
            atom.bondOrder = [];
            atom.properties = {};
            atoms[atoms.length-1].push(atom);

        }
        for (var i = 0; i < atoms.length; i++)
            assignBonds(atoms[i]);

        return atoms;
    };

    // read an XYZ file from str and return result
    /**
     * @param {string}
     *            str
     * @param {ParserOptionsSpec}
     *            options
     */
    parsers.xyz = parsers.XYZ = function(str, options) {
        
        var atoms = [[]];
        var lines = str.split(/\r?\n|\r/);
        while (lines.length > 0) {
            if (lines.length < 3)
                break;
            var atomCount = parseInt(lines[0]);
            if (isNaN(atomCount) || atomCount <= 0)
                break;
            if (lines.length < atomCount + 2)
                break;
            var offset = 2;
            var start = atoms[atoms.length-1].length;
            var end = start + atomCount;
            for (var i = start; i < end; i++) {
                var line = lines[offset++];
                var tokens = line.replace(/^\s+/, "").replace(/\s+/g, " ").split(
                        " ");
                var atom = {};
                atom.serial = i;
                var elem = tokens[0];
                atom.atom = atom.elem = elem[0].toUpperCase() + elem.substr(1).toLowerCase();
                atom.x = parseFloat(tokens[1]);
                atom.y = parseFloat(tokens[2]);
                atom.z = parseFloat(tokens[3]);
                atom.hetflag = true;
                atom.bonds = [];
                atom.bondOrder = [];
                atom.properties = {};
                atoms[atoms.length-1][i] = atom;
                if (tokens.length >= 7) {
                    atom.dx = parseFloat(tokens[4]);
                    atom.dy = parseFloat(tokens[5]);
                    atom.dz = parseFloat(tokens[6]);
                }
            }

            if (options.multimodel) {
                atoms.push([]);
                lines.splice(0, offset);
            }
            else {
                break;
            }
        }
        
        for (var i = 0; i < atoms.length; i++) {
            assignBonds(atoms[i]);
        }
        
        if (options.onemol) {
            var temp = atoms;
            atoms = [];
            atoms.push(temp[0]);
            for (var i = 1; i < temp.length; i++) {
                var offset = atoms[0].length;
                for (var j = 0; j < temp[i].length; j++) {
                    var a = temp[i][j];
                    for (var k = 0; k < a.bonds.length; k++) {
                        a.bonds[k] = a.bonds[k] + offset;
                    }
                    a.index = atoms[0].length;
                    a.serial = atoms[0].length;
                    atoms[0].push(a);
                }
            }
        }

         return atoms;
    };

    // put atoms specified in sdf fromat in str into atoms
    // adds to atoms, does not replace
    /**
     * @param {string}
     *            str
     * @param {ParserOptionsSpec}
     *            options
     */
    parsers.sdf = parsers.SDF = function(str, options) {

        var atoms = [[]];
        var noH = false;
        if (typeof options.keepH !== "undefined")
            noH = !options.keepH;
        var lines = str.split(/\r?\n|\r/);
        
        while(lines.length > 0) { 
            if (lines.length < 4)
                break;
            var atomCount = parseInt(lines[3].substr(0, 3));
            if (isNaN(atomCount) || atomCount <= 0)
                break;
            var bondCount = parseInt(lines[3].substr(3, 3));
            var offset = 4;
            if (lines.length < 4 + atomCount + bondCount)
                break;

            // serial is atom's index in file; index is atoms index in 'atoms'
            var serialToIndex = [];
            var start = atoms[atoms.length-1].length;
            var end = start + atomCount;
            var i, line;
            for (i = start; i < end; i++,offset++) {
                line = lines[offset];
                var atom = {};
                var elem = line.substr(31, 3).replace(/ /g, "");
                atom.atom = atom.elem = elem[0].toUpperCase() + elem.substr(1).toLowerCase();

                if (atom.elem != 'H' || !noH) {
                    atom.serial = i;
                    serialToIndex[i] = atoms[atoms.length-1].length;
                    atom.x = parseFloat(line.substr(0, 10));
                    atom.y = parseFloat(line.substr(10, 10));
                    atom.z = parseFloat(line.substr(20, 10));
                    atom.hetflag = true;
                    atom.bonds = [];
                    atom.bondOrder = [];
                    atom.properties = {};
                    atom.index = atoms[atoms.length-1].length;
                    atoms[atoms.length-1].push(atom);
                }
            }

            for (i = 0; i < bondCount; i++,offset++) {
                line = lines[offset];
                var from = serialToIndex[parseInt(line.substr(0, 3)) - 1 + start];
                var to = serialToIndex[parseInt(line.substr(3, 3)) - 1 + start];
                var order = parseInt(line.substr(6, 3));
                if (typeof (from) != 'undefined' && typeof (to) != 'undefined') {
                    atoms[atoms.length-1][from].bonds.push(to);
                    atoms[atoms.length-1][from].bondOrder.push(order);
                    atoms[atoms.length-1][to].bonds.push(from);
                    atoms[atoms.length-1][to].bondOrder.push(order);
                }
            }
            if (options.multimodel) {
                if (!options.onemol)
                    atoms.push([]);
                while (lines[offset] != "$$$$")
                    offset++
                lines.splice(0, ++offset);
            }
            else {
                break;
            }
        }

        return atoms;
    };

    // This parses the ChemDoodle json file format. Although this is registered
    // for the json file extension, other chemical json file formats exist that
    // this can not parse. Check which one you have and do not assume that
    // .json can be parsed
    parsers.cdjson = parsers.json = function(str, options) {
        var atoms = [[]];
        if (typeof str === "string") { // Str is usually automatically parsed by JQuery
            str = JSON.parse(str);
        }
        var molecules = str.m;
        var atomsInFile = molecules[0].a; // Assumes there is at least one
        var bondsInFile = molecules[0].b; // molecule and ignores any more
                                          // Ignores any shapes
        var styles = molecules[0].s;
        var parseStyle = options !== undefined && options.parseStyle !== undefined ? options.parseStyle : styles !== undefined;
        
        var offset = atoms[atoms.length-1].length; // When adding atoms their index will be
                                   // Offset by the number of existing atoms
        
        for (var i = 0; i < atomsInFile.length; i++) {
            var currentAtom = atomsInFile[i];
            var atom = {};
            atom.id = currentAtom.i; // Probably won't exist. Doesn't seem to
                                     // break anything.
            atom.x = currentAtom.x;
            atom.y = currentAtom.y;
            atom.z = currentAtom.z || 0; // Default value if file is 2D

            atom.bonds = [];
            atom.bondOrder = [];
            
            var elem = currentAtom.l || 'C';
            atom.elem = elem[0].toUpperCase() + elem.substr(1).toLowerCase();

            atom.serial = atoms[atoms.length-1].length;
            if (parseStyle) {
                atom.style = styles[currentAtom.s || 0];
            }
            atoms[atoms.length-1].push(atom);
        }
        for (var i = 0; i < bondsInFile.length; i++) {
            var currentBond = bondsInFile[i];
            var beginIndex = currentBond.b + offset;
            var endIndex = currentBond.e + offset;
            var bondOrder = currentBond.o || 1;
            
            var firstAtom = atoms[atoms.length-1][beginIndex];
            var secondAtom = atoms[atoms.length-1][endIndex];

            firstAtom.bonds.push(endIndex);
            firstAtom.bondOrder.push(bondOrder);
            secondAtom.bonds.push(beginIndex);
            secondAtom.bondOrder.push(bondOrder);
        }
        return atoms;
    }

    // puts atoms specified in mmCIF fromat in str into atoms
    /**
     * @param {string}
     *            str
     * @param {ParserOptionsSpec}
     *            options
     */
    parsers.mcif = parsers.cif = function(str, options) {
        var atoms = [];
        var noAssembly = !options.doAssembly; // don't assemble by default
        var copyMatrix = !options.duplicateAssemblyAtoms;
        var modelData = atoms.modelData = [];

        // Used to handle quotes correctly
        function splitRespectingQuotes(string, separator) {
            var sections = [];
            var sectionStart = 0;
            var sectionEnd = 0;
            while (sectionEnd < string.length) {
                while (string.substr(sectionEnd, separator.length) !== separator
                        && sectionEnd < string.length) {
                    // currently does not support escaping quotes
                    if (string[sectionEnd] === "'") {
                        sectionEnd++;
                        while (sectionEnd < string.length
                                && string[sectionEnd] !== "'") {
                            sectionEnd++;
                        }
                    } else if (string[sectionEnd] === '"') {
                        sectionEnd++;
                        while (sectionEnd < string.length
                                && string[sectionEnd] !== '"') {
                            sectionEnd++;
                        }
                    }
                    sectionEnd++;

                }
                sections.push(string.substr(sectionStart, sectionEnd
                        - sectionStart));
                sectionStart = sectionEnd = sectionEnd + separator.length;
            }
            return sections;
        }


        var lines = str.split(/\r?\n|\r/);
        // Filter text to remove comments, trailing spaces, and empty lines
        var linesFiltered = [];
        var trimDisabled = false;
        for (var lineNum = 0; lineNum < lines.length; lineNum++) {
            // first remove comments
            // incorrect if #'s are allowed in strings
            // comments might only be allowed at beginning of line, not sure
            var line = lines[lineNum].split('#')[0];

            // inside data blocks, the string must be left verbatim
            // datablocks are started with a ';' at the beginning of a line
            // and ended with a ';' on its own line.
            if (trimDisabled) {
                if (line[0] === ';') {
                    trimDisabled = false;
                }
            } else {
                if (line[0] === ';') {
                    trimDisabled = true;
                }
            }

            if (trimDisabled || line !== "") {
                if (!trimDisabled) {
                    line = line.trim();
                    if (line[0] === '_') {
                        // Replace dot separating category from data item with underscore. Dots aren't guarenteed, to makes
                        // files consistent.
                        var dot = line.split(/\s/)[0].indexOf('.');
                        if (dot > -1) {
                            line[dot] = '_';
                            line = line.substr(0,dot) + '_' + line.substr(dot + 1)
                        }
                    }
                }
                linesFiltered.push(line);
            }
        }

        var lineNum = 0;
        while (lineNum < linesFiltered.length) {
            while (! linesFiltered[lineNum].startsWith("data_") ||
                   linesFiltered[lineNum] === "data_global") {
                lineNum++;
            }
            lineNum++;

            // Process the lines and puts all of the data into an object.
            var mmCIF = {};
            while (lineNum < linesFiltered.length &&
                   ! linesFiltered[lineNum].startsWith("data_")) {
                if (linesFiltered[lineNum][0] === undefined) {
                    lineNum++;
                } else if (linesFiltered[lineNum][0] === '_') {
                    var dataItemName = (linesFiltered[lineNum].split(/\s/)[0]).toLowerCase();
                    var dataItem = (mmCIF[dataItemName] = mmCIF[dataItemName] || []);

                    // if nothing left on the line go to the next one
                    var restOfLine = linesFiltered[lineNum]
                        .substr(linesFiltered[lineNum].indexOf(dataItemName)
                                + dataItemName.length);
                    if (restOfLine === "") {
                        lineNum++;
                        if (linesFiltered[lineNum][0] === ';') {
                            var dataBlock = linesFiltered[lineNum].substr(1);
                            lineNum++;
                            while (linesFiltered[lineNum] !== ';') {
                                dataBlock = dataBlock + '\n'
                                            + linesFiltered[lineNum];
                                lineNum++;
                            }
                            dataItem.push(dataBlock);
                        } else {
                            dataItem.push(linesFiltered[lineNum]);
                        }
                    } else {
                        dataItem.push(restOfLine.trim());
                    }
                    lineNum++;
                } else if (linesFiltered[lineNum].substr(0, 5) === "loop_") {
                    lineNum++;
                    var dataItems = [];
                    while (linesFiltered[lineNum] === ""
                           || linesFiltered[lineNum][0] === '_') {
                        if (linesFiltered[lineNum] !== "") {
                            var dataItemName = (linesFiltered[lineNum].split(/\s/)[0]).toLowerCase();
                            var dataItem = (mmCIF[dataItemName] = mmCIF[dataItemName] || []);
                            dataItems.push(dataItem);
                        }
                        lineNum++;
                    }

                    var currentDataItem = 0;
                    while (lineNum < linesFiltered.length
                           && linesFiltered[lineNum][0] !== '_'
                           && !linesFiltered[lineNum].startsWith("loop_")
                           && !linesFiltered[lineNum].startsWith("data_")) {
                        var line = splitRespectingQuotes(linesFiltered[lineNum], " ");
                        for (var field = 0; field < line.length; field++) {
                            if (line[field] !== "") {
                                dataItems[currentDataItem].push(line[field]);
                                currentDataItem = (currentDataItem + 1) % dataItems.length;
                            }
                        }
                        lineNum++;
                    }
                } else {
                    lineNum++;
                }
            }

            modelData.push({symmetries:[]});

            // Pulls atom information out of the data
            atoms.push([]);
            var currentIndex = 0;
            var atomCount = mmCIF._atom_site_id !== undefined ? mmCIF._atom_site_id.length
                : mmCIF._atom_site_label.length;
            function sqr(n) {
                return n*n;
            }
            var conversionMatrix;
            if (mmCIF._cell_length_a !== undefined) {
                var a = parseFloat(mmCIF._cell_length_a);
                var b = parseFloat(mmCIF._cell_length_b);
                var c = parseFloat(mmCIF._cell_length_c);
                var alpha_deg = parseFloat(mmCIF._cell_angle_alpha) || 90;
                var beta_deg = parseFloat(mmCIF._cell_angle_beta) || 90;
                var gamma_deg = parseFloat(mmCIF._cell_angle_gamma) || 90;
                var alpha = alpha_deg * Math.PI / 180;
                var beta = beta_deg * Math.PI / 180;
                var gamma = gamma_deg * Math.PI / 180;
                var cos_alpha = Math.cos(alpha);
                var cos_beta = Math.cos(beta);
                var cos_gamma = Math.cos(gamma);
                var sin_gamma = Math.sin(gamma);
                conversionMatrix = [
                    [a, b*cos_gamma, c*cos_beta],
                    [0, b*sin_gamma, c*(cos_alpha-cos_beta*cos_gamma)/sin_gamma],
                    [0, 0, c*Math.sqrt(1-sqr(cos_alpha)-sqr(cos_beta)-sqr(cos_gamma)+2*cos_alpha*cos_beta*cos_gamma)/sin_gamma]
                ];
                modelData[modelData.length-1].cryst = {'a' : a, 'b' : b, 'c' : c, 'alpha' : alpha_deg, 'beta' : beta_deg, 'gamma' : gamma_deg};
            }
            function fractionalToCartesian(a, b, c) {
                var x = conversionMatrix[0][0]*a + conversionMatrix[0][1]*b + conversionMatrix[0][2]*c;
                var y = conversionMatrix[1][0]*a + conversionMatrix[1][1]*b + conversionMatrix[1][2]*c;
                var z = conversionMatrix[2][0]*a + conversionMatrix[2][1]*b + conversionMatrix[2][2]*c;
                return {x:x, y:y, z:z};
            }
            for (var i = 0; i < atomCount; i++) {
                if (mmCIF._atom_site_group_pdb !== undefined && mmCIF._atom_site_group_pdb[i] === "TER")
                    continue;
                var atom = {};
                if (mmCIF._atom_site_cartn_x !== undefined) {
                    atom.x = parseFloat(mmCIF._atom_site_cartn_x[i]);
                    atom.y = parseFloat(mmCIF._atom_site_cartn_y[i]);
                    atom.z = parseFloat(mmCIF._atom_site_cartn_z[i]);
                }
                else {
                    var coords = fractionalToCartesian(
                        parseFloat(mmCIF._atom_site_fract_x[i]),
                        parseFloat(mmCIF._atom_site_fract_y[i]),
                        parseFloat(mmCIF._atom_site_fract_z[i]));
                    atom.x = coords.x;
                    atom.y = coords.y;
                    atom.z = coords.z;
                }
                atom.chain = mmCIF._atom_site_auth_asym_id ? mmCIF._atom_site_auth_asym_id[i] : undefined;
                atom.resi = mmCIF._atom_site_auth_seq_id ? parseInt(mmCIF._atom_site_auth_seq_id[i]) : undefined;
                atom.resn = mmCIF._atom_site_auth_comp_id ? mmCIF._atom_site_auth_comp_id[i].trim() : undefined;
                atom.atom = mmCIF._atom_site_auth_atom_id ? mmCIF._atom_site_auth_atom_id[i].replace(/"/gm,'')  : undefined; //"primed" names are in quotes
                atom.hetflag = !mmCIF._atom_site_group_pdb || mmCIF._atom_site_group_pdb[i] === "HETA" || mmCIF._atom_site_group_pdb[i] === "HETATM";
                var elem = mmCIF._atom_site_type_symbol[i];
                atom.elem = elem[0].toUpperCase() + elem.substr(1).toLowerCase();
                atom.bonds = [];
                atom.ss = 'c';
                atom.serial = i;
                atom.bondOrder = [];
                atom.properties = {};
                atoms[atoms.length-1].push(atom);
            }

            if (mmCIF._pdbx_struct_oper_list_id !== undefined && !noAssembly) {
                for (var i = 0; i < mmCIF._pdbx_struct_oper_list_id.length; i++) {
                    var matrix11 = parseFloat(mmCIF['_pdbx_struct_oper_list_matrix[1][1]'][i]);
                    var matrix12 = parseFloat(mmCIF['_pdbx_struct_oper_list_matrix[1][2]'][i]);
                    var matrix13 = parseFloat(mmCIF['_pdbx_struct_oper_list_matrix[1][3]'][i]);
                    var vector1 = parseFloat(mmCIF['_pdbx_struct_oper_list_vector[1]'][i]);
                    var matrix21 = parseFloat(mmCIF['_pdbx_struct_oper_list_matrix[2][1]'][i]);
                    var matrix22 = parseFloat(mmCIF['_pdbx_struct_oper_list_matrix[2][2]'][i]);
                    var matrix23 = parseFloat(mmCIF['_pdbx_struct_oper_list_matrix[2][3]'][i]);
                    var vector2 = parseFloat(mmCIF['_pdbx_struct_oper_list_vector[2]'][i]);
	            var matrix31 = parseFloat(mmCIF['_pdbx_struct_oper_list_matrix[3][1]'][i]);
                    var matrix32 = parseFloat(mmCIF['_pdbx_struct_oper_list_matrix[3][2]'][i]);
                    var matrix33 = parseFloat(mmCIF['_pdbx_struct_oper_list_matrix[3][3]'][i]);
                    var vector3 = parseFloat(mmCIF['_pdbx_struct_oper_list_vector[3]'][i]);

                    var matrix = new $3Dmol.Matrix4(matrix11, matrix12, matrix13, vector1,
                                                    matrix21, matrix22, matrix23, vector2,
                                                    matrix31, matrix32, matrix33, vector3);
                    modelData[modelData.length-1].symmetries.push(matrix);
                }
                for (var i = 0; i < atoms.length; i++) {
                    processSymmetries(modelData[modelData.length-1].symmetries, copyMatrix, atoms[i]);
                }
            }
            function parseTerm(term){
                var negative = term.match('-');
                term = term.replace(/[-xyz]/g, "");
                var fractionParts = term.split('/');

                var numerator, denominator;
                if (fractionParts[1] === undefined) {
                    denominator = 1;
                }
                else {
                    denominator = parseInt(fractionParts[1]);
                }
                if (fractionParts[0] === "") {
                    numerator = 1;
                }
                else {
                    numerator = parseInt(fractionParts[0]);
                }
                return numerator / denominator * (negative ? -1 : 1);
            }
            if (mmCIF._symmetry_equiv_pos_as_xyz !== undefined) {
                for (var sym = 0; sym < mmCIF._symmetry_equiv_pos_as_xyz.length; sym++) {
                    var transform = mmCIF._symmetry_equiv_pos_as_xyz[sym].replace(/["' ]/g,"");
                    var componentStrings = transform.split(',').map(
                        function(val){
                            return val.replace(/-/g,"+-");
                        });
                    var matrix = new $3Dmol.Matrix4(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1);
                    for (var coord = 0; coord < 3; coord++) {
                        var terms = componentStrings[coord].split('+');
                        var constant = 0, xTerm = 0, yTerm = 0, zTerm = 0;
                        for (var t = 0; t < terms.length; t++) {
                            var term = terms[t];
                            if (term === "")
                                continue;
                            var coefficient = parseTerm(term);
                            if (term.match('x')) {
                                matrix.elements[coord + 0] = coefficient;
                            }
                            else if (term.match('y')) {
                                matrix.elements[coord + 4] = coefficient;
                            }
                            else if (term.match('z')) {
                                matrix.elements[coord + 8] = coefficient;
                            }
                            else {
                                matrix.elements[coord + 12] = coefficient;
                            }
                        }
                    }
                    var conversionMatrix4 = new $3Dmol.Matrix4(
                        conversionMatrix[0][0], conversionMatrix[0][1], conversionMatrix[0][2], 0,
                        conversionMatrix[1][0], conversionMatrix[1][1], conversionMatrix[1][2], 0,
                        conversionMatrix[2][0], conversionMatrix[2][1], conversionMatrix[2][2], 0);
                    var conversionInverse = (new $3Dmol.Matrix4()).getInverse(conversionMatrix4, true);
                    matrix = (new $3Dmol.Matrix4()).multiplyMatrices(matrix, conversionInverse);
                    matrix = (new $3Dmol.Matrix4()).multiplyMatrices(conversionMatrix4, matrix);
                    modelData[modelData.length-1].symmetries.push(matrix);
                }
            }
        }
        for (var i = 0; i < atoms.length; i++) {
            assignBonds(atoms[i]);
            computeSecondaryStructure(atoms[i]);
            processSymmetries(modelData[i].symmetries, copyMatrix, atoms[i]);
        }

        return atoms;
    }

    // parse SYBYL mol2 file from string - assumed to only contain one molecule
    // tag
    /**
     * @param {string}
     *            str
     * @param {ParserOptionsSpec}
     *            options
     */
    parsers.mol2 = parsers.MOL2 = function(str, options) {

        var atoms = [[]];
        var noH = false;
        if (typeof options.keepH !== "undefined")
            noH = !options.keepH;

        // assert (mol_pos < atom_pos), "Unexpected formatting of mol2 file
        // (expected 'molecule' section before 'atom' section)";

        var lines = str.substr(mol_pos, str.length).split(/\r?\n|\r/);
        
        while(lines.length > 0) { 
        
            // Note: these regex's work, though they don't match '<TRIPOS>'
            // correctly - something to do with angle brackets
            var mol_pos = str.search(/@<TRIPOS>MOLECULE/);
            var atom_pos = str.search(/@<TRIPOS>ATOM/);

            // Assuming both Molecule and Atom sections exist
            if (mol_pos == -1 || atom_pos == -1)
                break;
        
            // serial is atom's index in file; index is atoms index in 'atoms'
            var serialToIndex = []; 
            var tokens = lines[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(
                    " ");
            var natoms = parseInt(tokens[0]);
            var nbonds = 0;

            if (tokens.length > 1)
                nbonds = parseInt(tokens[1]);

            var offset = 4;
            var i;
            // Continue until 'Atom' section
            for (i = 3; i < lines.length; i++) {
                if (lines[i] == "@<TRIPOS>ATOM") {
                    offset = i + 1;
                    break;
                }
            }
        
            var start = atoms[atoms.length-1].length;
            var end = start + natoms;
            var line;
            // Process ATOMS
            for (i = start; i < end; i++) {
                line = lines[offset++];
                tokens = line.replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
                var atom = {};
                // get element
                var elem = tokens[5].split('.')[0];
                atom.atom = atom.elem = elem[0].toUpperCase() + elem.substr(1).toLowerCase();
                if (atom.elem == 'H' && noH) {
                    // ignore
                } else {
                    // 'index' is this atom's index in 'atoms'; 'serial' is this
                    // atom's
                    // serial id in mol2 file
                    var index = atoms[atoms.length-1].length;
                    var serial = parseInt(tokens[0]);
                    atom.serial = serial;
                    // atom.serial = i;

                    atom.x = parseFloat(tokens[2]);
                    atom.y = parseFloat(tokens[3]);
                    atom.z = parseFloat(tokens[4]);
                    atom.atom = tokens[5];
                    var charge = parseFloat(tokens[8]);
                    
                    atom.index = index;
                    atom.bonds = [];
                    atom.bondOrder = [];
                    atom.properties = {
                        'charge' : charge,
                        'partialCharge' : charge
                    };
                    serialToIndex[serial] = index;

                    atoms[atoms.length-1].push(atom);
                }
            }

            // Process BONDS
            var bonds_found = false;
            while (offset < lines.length) {
                if (lines[offset++] == "@<TRIPOS>BOND") {
                    bonds_found = true;
                    break;
                }
            }

            if (bonds_found && nbonds) {
                for (i = 0; i < nbonds; i++) {
                    line = lines[offset++];

                    tokens = line.replace(/^\s+/, "").replace(/\s+/g, " ").split(
                            " ");
                    var from = parseInt(tokens[1]);
                    fromAtom = atoms[atoms.length-1][serialToIndex[from]];
                    var to = parseInt(tokens[2]);
                    toAtom = atoms[atoms.length-1][serialToIndex[to]];

                    // Won't be able to read aromatic bonds correctly...
                    var order = parseInt(tokens[3]);
                    if (isNaN(order))
                        order = 1;

                    if (fromAtom !== undefined && toAtom !== undefined) {
                        fromAtom.bonds.push(serialToIndex[to]);
                        fromAtom.bondOrder.push(order);
                        toAtom.bonds.push(serialToIndex[from]);
                        toAtom.bondOrder.push(order);
                    }

                }
            }
            if (options.multimodel) {
                if (!options.onemol)
                    atoms.push([])
                lines.splice(0, offset);
                str = lines.join("\n"); //update for str.search
                continue;
            }
            else {
                break;
            }
        }
        return atoms;

    };

    var bondTable = {
            H :0.37,                                                                                                                                He:0.32,
            Li:1.34,Be:0.90,                                                                                B :0.82,C :0.77,N :0.75,O :0.73,F :0.71,Ne:0.69,
            Na:1.54,Mg:1.30,                                                                                Al:1.18,Si:1.11,P :1.06,S :1.02,Cl:0.99,Ar:0.97,
            K :1.96,Ca:1.74,Sc:1.44,Ti:1.56,V :1.25,/* Cr */Mn:1.39,Fe:1.25,Co:1.26,Ni:1.21,Cu:1.38,Zn:1.31,Ga:1.26,Ge:1.22,/* As */Se:1.16,Br:1.14,Kr:1.10,
            Rb:2.11,Sr:1.92,Y :1.62,Zr:1.48,Nb:1.37,Mo:1.45,Tc:1.56,Ru:1.26,Rh:1.35,Pd:1.31,Ag:1.53,Cd:1.48,In:1.44,Sn:1.41,Sb:1.38,Te:1.35,I :1.33,Xe:1.30,
            Cs:2.25,Ba:1.98,Lu:1.60,Hf:1.50,Ta:1.38,W :1.46,Re:1.59,Os:1.44,Ir:1.37,Pt:1.28,Au:1.44,Hg:1.49,Tl:1.48,Pb:1.47,Bi:1.46,/* Po *//* At */Rn:1.45,

            // None of the boottom row or any of the Lanthanides have bond lengths
    }
    var bondLength = function(elem) {
        return bondTable[elem] || 1.6;
    }
    // return true if atom1 and atom2 are probably bonded to each other
    // based on distance alone
    var areConnected = function(atom1, atom2) {
        var maxsq = bondLength(atom1.elem) + bondLength(atom2.elem);
        maxsq += 0.25;// fudge factor, especially important for md frames, also see 1i3d
        maxsq *= maxsq;

        var xdiff = atom1.x - atom2.x;
        xdiff *= xdiff;
        if (xdiff > maxsq)
            return false;
        var ydiff = atom1.y - atom2.y;
        ydiff *= ydiff;
        if (ydiff > maxsq)
            return false;
        var zdiff = atom1.z - atom2.z;
        zdiff *= zdiff;
        if (zdiff > maxsq)
            return false;

        var distSquared = xdiff + ydiff + zdiff;

        if (isNaN(distSquared))
            return false;
        else if (distSquared < 0.5)
            return false; // maybe duplicate position.
        else if (distSquared > maxsq)
            return false;
        else if(atom1.altLoc != atom2.altLoc && atom1.altLoc != ' ' && atom2.altLoc != ' ')
            return false; // don't connect across alternate locations
        else
            return true;
    };

    //adds symmetry info to either duplicate and rotate/translate biological unit later or add extra atoms now
    var processSymmetries = function(copyMatrices, copyMatrix, atoms) {
        var end = atoms.length;
        var offset = end;
        var t, l, n;
        if (!copyMatrix) { // do full assembly
            for (t = 0; t < copyMatrices.length; t++) {
                if (!copyMatrices[t].isIdentity()) {
                    var xyz = new $3Dmol.Vector3();
                    for (n = 0; n < end; n++) {
                        var bondsArr = [];
                        for (l = 0; l < atoms[n].bonds.length; l++) {
                            bondsArr.push(atoms[n].bonds[l] + offset);
                        }
                        xyz.set(atoms[n].x, atoms[n].y, atoms[n].z);
                        xyz.applyMatrix4(copyMatrices[t]);
                        var newAtom = {};
                        for (var i in atoms[n]) {
                            newAtom[i] = atoms[n][i];
                        }
                        newAtom.x = xyz.x;
                        newAtom.y = xyz.y;
                        newAtom.z = xyz.z;
                        newAtom.bonds = bondsArr;
                        atoms.push(newAtom);
                    }
                    offset = atoms.length;
                }
            }
        }
        else if(copyMatrices.length > 1) {
            for (t = 0; t < atoms.length; t++) {
                var symmetries = [];
                for (l = 0; l < copyMatrices.length; l++) {
                    if (!copyMatrices[l].isIdentity()) {
                        var newXYZ = new $3Dmol.Vector3();
                        newXYZ.set(atoms[t].x, atoms[t].y, atoms[t].z);
                        newXYZ.applyMatrix4(copyMatrices[l]);
                        symmetries.push(newXYZ);
                    }
                }
                atoms[t].symmetries = symmetries;
            }
        }
    }

    var isEmpty = function( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    };

    //return one model worth of pdb, returns atoms, modelData, and remaining lines
    var getSinglePDB = function(lines, options, sslookup) {
        var atoms = [];
        var noH = !options.keepH; // suppress hydrogens by default
        var ignoreStruct = !!options.noSecondaryStructure; 
        var computeStruct = !options.noComputeSecondaryStructure;
        var noAssembly = !options.doAssembly; // don't assemble by default
        var copyMatrix = !options.duplicateAssemblyAtoms; //default true
        var selAltLoc = options.altLoc ? options.altLoc : 'A'; //default alternate location to select if present
        var modelData  = {symmetries:[]};
        var atom;
        var remainingLines = [];

        var hasStruct = false;
        var serialToIndex = []; // map from pdb serial to index in atoms
        var i, j, k, line;
        var seenbonds = {}; //sometimes connect records are duplicated as an unofficial means of relaying bond orders
        
        for (i = 0; i < lines.length; i++) {
            line = lines[i].replace(/^\s*/, ''); // remove indent
            var recordName = line.substr(0, 6);
            var startChain, startResi, endChain, endResi;
            
            if(recordName.indexOf("END") == 0) {
                remainingLines = lines.slice(i+1);
                if(recordName == "END") { //ass opposed to ENDMDL
                    //reset secondary structure
                    for (var prop in sslookup) {
                        if (sslookup.hasOwnProperty(prop)) {
                            delete sslookup[prop];
                        }
                    }
                }
                break;
            }
            else if (recordName == 'ATOM  ' || recordName == 'HETATM') {
                var resn, chain, resi, icode, x, y, z, hetflag, elem, serial, altLoc, b;
                altLoc = line.substr(16, 1);
                if (altLoc != ' ' && altLoc != selAltLoc && selAltLoc != '*')
                    continue; 
                serial = parseInt(line.substr(6, 5));
                atom = line.substr(12, 4).replace(/ /g, "");
                resn = line.substr(17, 3).replace(/ /g, "");
                chain = line.substr(21, 1);
                resi = parseInt(line.substr(22, 4));
                icode = line.substr(26, 1);
                x = parseFloat(line.substr(30, 8));
                y = parseFloat(line.substr(38, 8));
                z = parseFloat(line.substr(46, 8));
                b = parseFloat(line.substr(60, 8));
                elem = line.substr(76, 2).replace(/ /g, "");
                if (elem === '' || typeof(bondTable[elem]) === 'undefined') { // for some incorrect PDB files
                    elem = line.substr(12, 2).replace(/ /g, "");
                    if(elem.length > 0 && elem[0] == 'H' && elem != 'Hg') {
                        elem = 'H'; //workaround weird hydrogen names from MD, note mercury must use lowercase
                    }
                    if(elem.length > 1) {
                        elem = elem[0].toUpperCase() + elem.substr(1).toLowerCase();   
                        if(typeof(bondTable[elem]) === 'undefined') {
                            //not a known element, probably should just use first letter
                            elem = elem[0];
                        } else if(line[0] == 'A' && elem == 'Ca') { //alpha carbon, not calcium
                            elem = "C";
                        }
                    }
                } else {
                    elem = elem[0].toUpperCase() + elem.substr(1).toLowerCase();                    
                }

                if(elem == 'H' && noH)
                    continue;
                if (recordName[0] == 'H')
                    hetflag = true;
                else
                    hetflag = false;
                serialToIndex[serial] = atoms.length;
                atoms.push({
                    'resn' : resn,
                    'x' : x,
                    'y' : y,
                    'z' : z,
                    'elem' : elem,
                    'hetflag' : hetflag,
                    'altLoc' : altLoc,
                    'chain' : chain,
                    'resi' : resi,
                    'icode' : icode,
                    'rescode' : resi + (icode != ' ' ? "^" + icode : ""), // combo
                    // resi
                    // and
                    // icode
                    'serial' : serial,
                    'atom' : atom,
                    'bonds' : [],
                    'ss' : 'c',
                    'bondOrder' : [],
                    'properties' : {},
                    'b' : b,
                    'pdbline' : line
                });
            } else if (recordName == 'SHEET ') {
                hasStruct = true;
                startChain = line.substr(21, 1);
                startResi = parseInt(line.substr(22, 4));
                endChain = line.substr(32, 1);
                endResi = parseInt(line.substr(33, 4));
                if(!(startChain in sslookup)) {
                    sslookup[startChain] = {};
                }
                //mark start and end with additional character
                sslookup[startChain][startResi] = 's1';
                for(var res = startResi+1; res < endResi; res++) {
                    sslookup[startChain][res] = 's';
                }
                sslookup[startChain][endResi] = 's2';

            } else if (recordName == 'CONECT') {
                // MEMO: We don't have to parse SSBOND, LINK because both are
                // also
                // described in CONECT. But what about 2JYT???
                var from = parseInt(line.substr(6, 5));
                var fromindex = serialToIndex[from];
                var fromAtom = atoms[fromindex];
                var coffsets = [ 11, 16, 21, 26 ];
                for (j = 0; j < 4; j++) {
                    var to = parseInt(line.substr(coffsets[j], 5));
                    var toindex = serialToIndex[to];
                    var toAtom = atoms[toindex];
                    if (fromAtom !== undefined && toAtom !== undefined) {
                        // duplicated conect records indicate bond order
                        if(!seenbonds[ [fromindex,toindex] ]) {
                            seenbonds[ [fromindex,toindex] ] = 1;
                            if (fromAtom.bonds.length == 0 || fromAtom.bonds[fromAtom.bonds.length - 1] != toindex) {
                                fromAtom.bonds.push(toindex);
                                fromAtom.bondOrder.push(1);
                            }
                        } else { //update bond order
                            seenbonds[ [fromindex,toindex] ] += 1;
                            
                            for(var bi = 0; bi < fromAtom.bonds.length; bi++) {
                                if(fromAtom.bonds[bi] == toindex) {
                                    var newbo = seenbonds[ [fromindex,toindex] ];
                                    if(newbo >= 4) { //aromatic
                                        fromAtom.bondOrder[bi] = 1;
                                    } else {
                                        fromAtom.bondOrder[bi] = newbo;
                                    }
                                }
                            }
                        }
                    }
                }
            } else if (recordName == 'HELIX ') {
                hasStruct = true;
                startChain = line.substr(19, 1);
                startResi = parseInt(line.substr(21, 4));
                endChain = line.substr(31, 1);
                endResi = parseInt(line.substr(33, 4));
                if(!(startChain in sslookup)) {
                    sslookup[startChain] = {};
                }
                sslookup[startChain][startResi] = 'h1';
                for(var res = startResi+1; res < endResi; res++) {
                    sslookup[startChain][res] = 'h';
                }
                sslookup[startChain][endResi] = 'h2';

            } else if ((!noAssembly) && (recordName == 'REMARK')
                    && (line.substr(13, 5) == 'BIOMT')) {
                var n;
                var matrix = new $3Dmol.Matrix4(); 
                for (n = 1; n <= 3; n++) {
                    line = lines[i].replace(/^\s*/, '');
                    if (parseInt(line.substr(18, 1)) == n) { // check for all
                                                                // three lines
                                                                // by matching #
                                                                // @ end of
                                                                // "BIOMT" to n
                        matrix.elements[(n - 1)] = parseFloat(line.substr(23,
                                10));
                        matrix.elements[(n - 1) + 4] = parseFloat(line.substr(
                                33, 10));
                        matrix.elements[(n - 1) + 8] = parseFloat(line.substr(
                                43, 10));
                        matrix.elements[(n - 1) + 12] = parseFloat(line
                                .substr(53));
                        i++;
                    } else {
                        while (line.substr(13, 5) == 'BIOMT') {
                            i++;
                            line = lines[i].replace(/^\s*/, '');
                        }
                    }
                }
                matrix.elements[3] = 0;
                matrix.elements[7] = 0;
                matrix.elements[11] = 0;
                matrix.elements[15] = 1;
                modelData.symmetries.push(matrix);
                i--; // set i back
            } else if (recordName == 'CRYST1') {
                var a, b, c, alpha, beta, gamma;
                a = parseFloat(line.substr(7, 8));
                b = parseFloat(line.substr(16, 8));
                c = parseFloat(line.substr(25, 8));
                alpha = parseFloat(line.substr(34, 6));
                beta = parseFloat(line.substr(41, 6));
                gamma = parseFloat(line.substr(48, 6));
                modelData.cryst = {'a' : a, 'b' : b, 'c' : c, 'alpha' : alpha, 'beta' : beta, 'gamma' : gamma};
            } else if (recordName == 'ANISOU') {
                var serial = parseInt(line.substr(6, 5));
                var anisouAtomIndex = serialToIndex[serial];
                var anisouAtom = atoms[anisouAtomIndex];
                if(anisouAtom) {
                    var vals = line.substr(30).trim().split(/\s+/);
                    var uMat = {u11:parseInt(vals[0]), u22:parseInt(vals[1]), u33:parseInt(vals[2]), 
                        u12:parseInt(vals[3]), u13:parseInt(vals[4]), u23:parseInt(vals[5])};
    
                    anisouAtom["uMat"] = uMat;
                }
            }
        }

        var starttime = (new Date()).getTime();
        
        //fix any "one-way" bonds in CONECT records
        validateBonds(atoms, serialToIndex);
        // assign bonds - yuck, can't count on connect records
        assignPDBBonds(atoms);
       // console.log("bond connecting " + ((new Date()).getTime() -starttime));

        if (!noAssembly)
            processSymmetries(modelData.symmetries, copyMatrix, atoms);

        if (computeStruct  && !ignoreStruct) {
            starttime = (new Date()).getTime();
            computeSecondaryStructure(atoms);
           // console.log("secondary structure " + ((new Date()).getTime() - starttime));
        }
        starttime = (new Date()).getTime();

        // Assign secondary structures from pdb file
        if(!isEmpty(sslookup)) {
            for (i = 0; i < atoms.length; i++) {
                atom = atoms[i];
                if (atom === undefined)
                    continue;
                if(atom.chain in sslookup &&
                    atom.resi in sslookup[atom.chain]) {
                    var code = sslookup[atom.chain][atom.resi];
                    atom.ss = code[0];
                    if(code.length > 1) {
                        if(code[1] == '1') atom.ssbegin = true;
                        else if(code[1] == '2') atom.ssend = true;
                    }
                }
            }
        }
    //console.log("assign structure " + ((new Date()).getTime() - starttime));
        
        return [atoms,modelData,remainingLines];
    };


    // parse pdb file from str and create atoms
    // if computeStruct is true will always perform secondary structure
    // analysis,
    // otherwise only do analysis of SHEET/HELIX comments are missing
    /**
     * @param {string}
     *            str
     * @param {ParserOptionsSpec}
     *            options - keepH (do not strip hydrogens), noSecondaryStructure
     *            (do not compute ss), altLoc (which alternate location to select, if present; '*' to load all)
     */
    parsers.pdb = parsers.PDB = parsers.pdbqt = parsers.PDBQT = function(str, options) {

        var atoms = []; //a separate list for each model
        var sslookup = {}; //stores SHEET and HELIX info, which is shared across models
        atoms.modelData = [];
        var lines = str.split(/\r?\n|\r/);
        while(lines.length > 0) {
            var pdbinfo = getSinglePDB(lines, options, sslookup);
            var modelatoms = pdbinfo[0];
            var modelData = pdbinfo[1];
            lines = pdbinfo[2];
            
            if(modelatoms.length == 0) {
                continue; //happens when there are blank lines
            }
            if(options.multimodel && options.onemol && atoms.length > 0) {
                //merge into existing atoms
                var inc = atoms[0].length;
                for(var i = 0; i < modelatoms.length; i++) {
                    //renumber
                    var atom = modelatoms[i];
                    atom.index = i;
                    for(var b = 0; b < atom.bonds.length; b++) {
                        atom.bonds[b] += inc;
                    }
                    atoms[0].push(atom);
                }
            } else  {
                atoms.modelData.push(modelData);
                atoms.push(modelatoms);
            }
            
            if(!options.multimodel) {
                break;
            }
        }
        
        return atoms;
    };

    /**
     * Parse a pqr file from str and create atoms. A pqr file is assumed to be a
     * whitespace delimited PDB with charge and radius fields.
     *
     * @param {string}
     *            str
     * @param {ParserOptionsSpec}
     *            options - noSecondaryStructure (do not compute ss)
     */
    parsers.pqr = parsers.PQR = function(str, options) {

        var atoms = [[]];
        var atoms_cnt = 0;
        var start = atoms[atoms.length-1].length;
        var atom;
        var computeStruct = !options.noSecondaryStructure;
        var noAssembly = !options.doAssembly; // don't assemble by default
        var copyMatrix = !options.duplicateAssemblyAtoms; //default true
        var modelData = atoms.modelData = [{symmetries:[]}];
        
        var serialToIndex = []; // map from pdb serial to index in atoms
        var lines = str.split(/\r?\n|\r/);
        var i, j, k, line;
        for (i = 0; i < lines.length; i++) {
            line = lines[i].replace(/^\s*/, ''); // remove indent
            var recordName = line.substr(0, 6);
            var startChain, startResi, endChain, endResi;
            
            if (recordName.indexOf("END") == 0) {
                if (options.multimodel) {
                    if (!options.onemol)
                        atoms.push([]);
                    continue;
                }
                else {
                    break;
                }
            }
            else if (recordName == 'ATOM  ' || recordName == 'HETATM') {
                // I would have liked to split based solely on whitespace, but
                // it seems that there is no guarantee that all the fields will
                // be filled out (e.g. the chain) so this doesn't work
                var hetflag;
                var serial = parseInt(line.substr(6, 5));
                var atom = line.substr(12, 4).replace(/ /g, "");
                var resn = line.substr(17, 3);
                var chain = line.substr(21, 1);
                var resi = parseInt(line.substr(22, 4));
                // however let's split the coordinates, charge and radius by
                // whitespace
                // to support extra precision
                var vals = line.substr(30).trim().split(/\s+/);
                var x = parseFloat(vals[0]);
                var y = parseFloat(vals[1]);
                var z = parseFloat(vals[2]);
                var charge = parseFloat(vals[3]);
                var radius = parseFloat(vals[4]);

                var elem = atom[0];
                if (atom.length > 1 && atom[1].toUpperCase() != atom[1]) {
                    // slight hack - identify two character elements by the
                    // second character in the atom name being lowercase
                    elem = atom.substr(0, 2);
                }

                if (line[0] == 'H')
                    hetflag = true;
                else
                    hetflag = false;
                serialToIndex[serial] = atoms[atoms.length-1].length;
                atoms[atoms.length-1].push({
                    'resn' : resn,
                    'x' : x,
                    'y' : y,
                    'z' : z,
                    'elem' : elem,
                    'hetflag' : hetflag,
                    'chain' : chain,
                    'resi' : resi,
                    'serial' : serial,
                    'atom' : atom,
                    'bonds' : [],
                    'ss' : 'c',
                    'bondOrder' : [],
                    'properties' : {
                        'charge' : charge,
                        'partialCharge' : charge,
                        'radius' : radius
                    },
                    'pdbline' : line
                });
            } else if (recordName == 'CONECT') {
                // MEMO: We don't have to parse SSBOND, LINK because both are
                // also
                // described in CONECT. But what about 2JYT???
                var from = parseInt(line.substr(6, 5));
                var fromAtom = atoms[atoms.length-1][serialToIndex[from]];
                for (j = 0; j < 4; j++) {
                    var to = parseInt(line.substr([ 11, 16, 21, 26 ][j], 5));
                    var toAtom = atoms[atoms.length-1][serialToIndex[to]];
                    if (fromAtom !== undefined && toAtom !== undefined) {
                        fromAtom.bonds.push(serialToIndex[to]);
                        fromAtom.bondOrder.push(1);
                    }
                }
            }
        }

        // assign bonds - yuck, can't count on connect records
        for (var i = 0; i < atoms.length; i++) {
            assignPDBBonds(atoms[i]);
            if (computeStruct)
                computeSecondaryStructure(atoms[i]);
        }
        
        return atoms;
    };
    
    var fromCharCode = function( charCodeArray ){
        return String.fromCharCode.apply( null, charCodeArray ).replace(/\0/g, '');
    };
    
    var convertSS = function(val) {
      //convert mmtf code to 3dmol code
        if(val == 2) return 'h';
        if(val == 3) return 's';
        return 'c';
    };

    
    //mmtf shoul be passed as a binary UInt8Array buffer
    parsers.mmtf = parsers.MMTF = function(bindata, options) {
        
        var noH = !options.keepH; // suppress hydrogens by default
        var selAltLoc = options.altLoc ? options.altLoc : 'A'; //default alternate location to select if present
        var ignoreStruct = !!options.noSecondaryStructure; 
        var computeStruct = !options.noComputeSecondaryStructure;
        //extract symmetries - only take first assembly, apply to all models (ignoring changes for now)
        var noAssembly = !options.doAssembly; // don't assemble by default
        var copyMatrix = !options.duplicateAssemblyAtoms; //default true
        var assemblyIndex = options.assemblyIndex ? options.assemblyIndex : 0; 
        
        var mmtfData = MMTF.decode( bindata );
        var atoms = [[]];
        var modelData = atoms.modelData = [];
        
        // setup index counters
        var modelIndex = 0;
        var chainIndex = 0;
        var groupIndex = 0;
        var atomIndex = 0;

        // setup optional fields
        var chainNameList = mmtfData.chainNameList;
        var secStructList = mmtfData.secStructList;
        var insCodeList = mmtfData.insCodeList;
        var sequenceIndexList = mmtfData.sequenceIndexList;
        var bFactorList = mmtfData.bFactorList;
        var altLocList = mmtfData.altLocList;
        var occupancyList = mmtfData.occupancyList;
        var bondAtomList = mmtfData.bondAtomList;
        var bondOrderList = mmtfData.bondOrderList;
        
        var numModels = mmtfData.numModels;
        if (numModels == 0) return atoms;
        if (!options.multimodel) numModels = 1; //first only
        // hoisted loop variables
        var i, j, k, kl, m, n;
        

        
        var symmetries = [];
        if(!noAssembly && mmtfData.bioAssemblyList && mmtfData.bioAssemblyList.length > 0) {
            var transforms = mmtfData.bioAssemblyList[assemblyIndex].transformList;
            for(i = 0, n = transforms.length; i < n; i++) {
                var matrix = new $3Dmol.Matrix4(transforms[i].matrix);
                matrix.transpose();
                symmetries.push(matrix);
            }
        }

        var bondAtomListStart = 0; //for current model
        //loop over models, 
        for (m = 0; m < numModels; m++ ) {
            var modelChainCount = mmtfData.chainsPerModel[m];
            var matoms = atoms[atoms.length-1];
            var serialToIndex = []; // map to matoms index, needed for noh

            modelData.push({symmetries:symmetries});
            for( i = 0; i < modelChainCount; ++i ){

                var chainGroupCount = mmtfData.groupsPerChain[ chainIndex ];
                var chainId = fromCharCode(
                    mmtfData.chainIdList.subarray( chainIndex * 4, chainIndex * 4 + 4 )
                );
                if(mmtfData.chainNameList) {
                    chainId = fromCharCode(
                            mmtfData.chainNameList.subarray( chainIndex * 4, chainIndex * 4 + 4 )
                    );
                }

                var startGroup = groupIndex;
                var prevSS = '';
                for( j = 0; j < chainGroupCount; ++j ){ //over residues (groups)

                    var groupData = mmtfData.groupList[ mmtfData.groupTypeList[ groupIndex ] ];
                    var groupAtomCount = groupData.atomNameList.length;
                    var secStruct = 0;
                    var secStructBegin = false;
                    var secStructEnd = false;
                    
                    if( secStructList ){
                        secStruct = secStructList[ groupIndex ];
                        var sscode = convertSS(secStruct)
                        if(groupIndex  == 0 || sscode != prevSS) {
                            secStructBegin = true;
                        }
                        prevSS = sscode;
                        var nextgroup = groupIndex+1;
                        if(nextgroup >= secStructList.length || convertSS(secStructList[nextgroup] != sscode)) {
                            secStructEnd = true;
                        }
                    }
                    var insCode = null;
                    if( mmtfData.insCodeList ){
                        insCode = String.fromCharCode( insCodeList[ groupIndex ] );
                    }
                    var sequenceIndex = null;
                    if( sequenceIndexList ){
                        sequenceIndex = sequenceIndexList[ groupIndex ];
                    }

                    var groupId = mmtfData.groupIdList[ groupIndex ];
                    var groupName = groupData.groupName;
                    var startAtom = atomIndex;
                    
                    for( k = 0; k < groupAtomCount; ++k ){

                        var element = groupData.elementList[ k ];
                        if(noH && element == 'H') {
                            atomIndex += 1;
                            continue;
                        }
                        
                        var bFactor = '';
                        if( bFactorList ){
                            bFactor = bFactorList[ atomIndex ];
                        }
                        var altLoc = '';
                        if( altLocList && altLocList[ atomIndex ]){ //not zero
                            altLoc = String.fromCharCode( altLocList[ atomIndex ] );
                        }
                        var occupancy = '';
                        if( occupancyList ){
                            occupancy = occupancyList[ atomIndex ];
                        }

                        if (altLoc != '' && altLoc != selAltLoc && selAltLoc != '*') {
                            atomIndex += 1;
                            continue; 
                        }
                        
                        var atomId = mmtfData.atomIdList[ atomIndex ];
                        var atomName = groupData.atomNameList[ k ];
                        var atomCharge = 0;
                        if(groupData.atomChargeList) atomCharge = groupData.atomChargeList[ k ];
                        var xCoord = mmtfData.xCoordList[ atomIndex ];
                        var yCoord = mmtfData.yCoordList[ atomIndex ];
                        var zCoord = mmtfData.zCoordList[ atomIndex ];
                            
                        serialToIndex[atomIndex] = matoms.length;
                        matoms.push({
                            'resn' : groupName,
                            'x' : xCoord,
                            'y' : yCoord,
                            'z' : zCoord,
                            'elem' : element,
                            'hetflag' : secStruct < 0,
                            'chain' : chainId,
                            'resi' : groupId,
                            'icode' : altLoc,
                            'rescode' : groupId + (altLoc != ' ' ? "^" + altLoc : ""), // combo
                            // resi
                            // and
                            // icode
                            'serial' : atomId,
                            'altLoc' : altLoc,
                            'index' : atomIndex,
                            'atom' : atomName,
                            'bonds' : [],
                            'ss' : convertSS(secStruct),
                            'ssbegin' : secStructBegin,
                            'ssend' : secStructEnd,
                            'bondOrder' : [],
                            'properties' : {charge: atomCharge, occupancy:occupancy},
                            'b' : bFactor,
                        });

                        atomIndex += 1;
                    }
                    
                    // intra group bonds
                    var groupBondAtomList = groupData.bondAtomList;
                    for( k = 0, kl = groupData.bondOrderList.length; k < kl; ++k ){
                        var atomIndex1 = startAtom + groupBondAtomList[ k * 2 ];
                        var atomIndex2 = startAtom + groupBondAtomList[ k * 2 + 1 ];
                        var bondOrder = groupData.bondOrderList[ k ];
                        
                        //I assume bonds are only recorded once
                        var i1 = serialToIndex[atomIndex1];
                        var i2 = serialToIndex[atomIndex2];
                        var a1 = matoms[i1];
                        var a2 = matoms[i2];
                        if(a1 && a2) {
                            a1.bonds.push(i2)
                            a1.bondOrder.push(bondOrder);
                            a2.bonds.push(i1);
                            a2.bondOrder.push(bondOrder);         
                        }
                    }
                    
                    groupIndex += 1;
                }
                
                //reset for bonds
                groupIndex = startGroup;
                for( j = 0; j < chainGroupCount; ++j ){ //over residues (groups)
                    
                    groupIndex += 1;

                }

                chainIndex += 1;
            }

            
            // inter group bonds
            if( bondAtomList ){
                for( k = bondAtomListStart, kl = bondAtomList.length; k < kl; k += 2 ){
                     var atomIndex1 = bondAtomList[ k ];
                     var atomIndex2 = bondAtomList[ k + 1 ];
                     var bondOrder = bondOrderList ? bondOrderList[ k / 2 ] : 1;
                     
                     if(atomIndex1 >= atomIndex) {
                         bondAtomListStart = k;
                         break; //on next model
                     }
                     //I assume bonds are only recorded once
                     var i1 = serialToIndex[atomIndex1];
                     var i2 = serialToIndex[atomIndex2];
                     var a1 = matoms[i1];
                     var a2 = matoms[i2];
                     if(a1 && a2) {
                         a1.bonds.push(i2)
                         a1.bondOrder.push(bondOrder);
                         a2.bonds.push(i1);
                         a2.bondOrder.push(bondOrder);   
                     }
                }
            }
            
            if (options.multimodel) {
                if (!options.onemol) atoms.push([]);
            }

            if(!noAssembly) {
                for (var n = 0; n < atoms.length; n++) {        
                        processSymmetries(modelData[modelIndex].symmetries, copyMatrix, atoms[n]);
                }
            }
            modelIndex += 1;
        } 
                
        
        if (computeStruct  && !ignoreStruct) {
            computeSecondaryStructure(atoms);
        }       
        
        return atoms;
    };
    
    /**
     * Parse a prmtop file from str and create atoms
     */
    parsers.prmtop = parsers.PRMTOP = function(str, options) {
	var atoms = [];
	var count = 0;
        var lines = str.split(/\r?\n|\r/);
	if(lines.length > 0 && lines[0].includes("VERSION")){
	    var sectionList = lines.filter(function (line){	//store the relevant section lists
		return line.includes("POINTERS") || line.includes("ATOM_NAME") ||
		line.includes("CHARGE") || line.includes("RADII") || line.includes("BONDS_INC_HYDROGEN") ||
		line.includes("BONDS_WITHOUT_HYDROGEN");
	    });
	    var index = getIndex("POINTERS");
	    if (index == -1)
		return [];
	    var col = getColEleSize(index);
	    var atomCount = parseInt(lines[index+1].slice(0,col[1]));
            if (isNaN(atomCount) || atomCount <= 0)
                return [];
	    index = getIndex("ATOM_NAME");
	    if (index == -1)
		return [];
	    col = getColEleSize(index);
	    var noOfCol = col[0];
	    for (i = 0; i < atomCount/col[0]; i++){
		if (i == parseInt(atomCount/col[0]))
		    noOfCol = atomCount % col[0]; 
		for(j=0; j < noOfCol; j++){
		    var atom = {};
		    var properties = {"charge":"", "radii":""};
	    	    atom.serial = count;
		    atom.x = 0;
		    atom.y = 0;
		    atom.z = 0;
		    atom.atom = lines[index+1].slice(col[1]*j, col[1]*(j+1));
		    atom.elem = lines[index+1].slice(col[1]*j, col[1]*j+1);
		    atom.properties = properties;
		    atom.bonds = [];
		    atom.bondOrder = [];
		    atoms.push(atom);
		    count++;
		}
		index++;
	    }
	    index = getIndex("CHARGE");
	    if (index != -1){
	        col = getColEleSize(index);
	        count = 0;
		noOfCol = col[0];
	        for (i = 0; i < atomCount/col[0]; i++){
		    if (i == parseInt(atomCount/col[0]))
			noOfCol = atomCount % col[0];
		    for(j = 0; j < noOfCol; j++){
		       atoms[count].properties["charge"] = lines[index+1].slice(col[1]*j, col[1]*(j+1));	
		        count++;
		    }
		    index++;
	        }
	    }
	    index = getIndex("RADII");
	    if (index != -1){
		col = getColEleSize(index);
		count = 0;
		noOfCol = col[0];
		for (i = 0; i < atomCount/col[0]; i++){
		    if (i == parseInt(atomCount/col[0]))
			noOfCol = atomCount % col[0];
		    for(j = 0; j < noOfCol; j++){
			atoms[count].properties.radii = lines[index+1].slice(col[1]*j, col[1]*(j+1));
			count++;
		    }
		    index++;
		}
	    }
	    index = getIndex("BONDS_WITHOUT_HYDROGEN");
	    if (index != -1){
		col = getColEleSize(index);
		count = 0;
		noOfCol = col[0];
		var atomIndex;
		for (i = 0; i < atomCount/col[0]; i++){
		    if (i == parseInt(atomCount/col[0]))
			noOfCol = atomCount % col[0];	
		    for (j = 0; j < noOfCol; j++){
			if (count%3 == 0){
			    atomIndex = parseInt(lines[index+1].slice(col[1]*j, col[1]*(j+1))/3 + 1);
			}
			if (count%3 == 1){
			    atoms[atomIndex].bonds.push(parseInt(lines[index+1].slice(col[1]*j, col[1]*(j+1))/3 + 1));
			}
		    count++;
		    }
		index++;
		}
	    }
	    index = getIndex("BONDS_INC_HYDROGEN");
	    if (index != -1){
		col = getColEleSize(index);
		count = 0;
		noOfCol = col[0];
		var atomIndex;
		for (i = 0; i < atomCount/col[0]; i++){
		    if (i == parseInt(atomCount/col[0]))
			noOfCol = atomCount % col[0];	
		    for (j = 0; j < noOfCol; j++){
			if (count%3 == 0){
			    atomIndex = parseInt(lines[index+1].slice(col[1]*j, col[1]*(j+1))/3 + 1);
			}
			if (count%3 == 1){
			    atoms[atomIndex].bonds.push(parseInt(lines[index+1].slice(col[1]*j, col[1]*(j+1))/3 + 1));
			}
		    count++;
		    }
		index++;
		}
	    }
	}
	else{
	    return [];
	}
	function getIndex(section){
	    var index = lines.indexOf(sectionList.filter(function (line){
		return line.includes(section);
	    })[0]);	//returns the index of the line containing FLAG POINTERS
	    if (Number.isInteger(index) && index > 0){
		while(!lines[index].includes("FORMAT"))  //doing this so as to take comments into consideration
		    index++;
	    	return index;
	    }
	    else{
		return -1;
	    }
	}
	function getColEleSize(i){
	    var numberOfCol = lines[i].match(/\((\d*)\S*/); // stores the number of columns
	    var elementSize = lines[i].match(/[a-zA-Z](\d*)\)\s*/);
	    if(elementSize == null){
		elementSize = lines[i].match(/[a-zA-Z](\d*)\.\d*\)\s*/); //stores the element size
	    }
	    return [numberOfCol[1], elementSize[1]];	
	}       
        return [atoms];
    };

    /**
     * Parse a gro file from str and create atoms
     */
    parsers.gro = parsers.GRO = function(str, options) {
	var atoms = [];
        var lines = str.split(/\r?\n|\r/);
        while (lines.length > 0) {
            if (lines.length < 3)
                break;
            var atomCount = parseInt(lines[1]);
            if (isNaN(atomCount) || atomCount <= 0)
                break;
            if (lines.length < atomCount + 3)
                break;
	    atoms.push([]);
            var offset = 2;
            var start = atoms[atoms.length-1].length;
            var end = start + atomCount;
            for (var i = start; i < end; i++) {
                var line = lines[offset++];
                var atom = {};
                atom.serial = i;
                atom.atom = line.slice(10,15).trim();
		if(atom.atom.charCodeAt(1) >= 97 && atom.atom.charCodeAt(1) <= 122)
		    atom.elem = atom.atom.slice(0,2);
		else
		    atom.elem = atom.atom[0];
                atom.x = parseFloat(line.slice(20,28));
                atom.y = parseFloat(line.slice(28,36));
                atom.z = parseFloat(line.slice(36,44));
		atom.resi = line.slice(5,10);
                atom.bonds = [];
                atom.bondOrder = [];
                atom.properties = {};
		if (line.length > 44){
                    atom.dx = parseFloat(line.slice(44,52));
                    atom.dy = parseFloat(line.slice(52,60));
                    atom.dz = parseFloat(line.slice(60,68));
		}
                atoms[atoms.length-1][i] = atom;
            }
	    lines.splice(0, ++offset);
        }
	for (var i=0; i<atoms.length; i++){
	    assignBonds(atoms[i]);
	}
        return atoms;
    }
    return parsers;
})();
var $3Dmol = $3Dmol || {};

//properties for mapping

/* partial charges for proteins */
$3Dmol.partialCharges = {
"ALA:N": -0.15,
"ALA:CA": 0.10,
"ALA:CB": 0.00,
"ALA:C": 0.60,
"ALA:O": -0.55,
"ARG:N": -0.15,
"ARG:CA": 0.10,
"ARG:CB": 0.00,
"ARG:CG": 0.00,
"ARG:CD": 0.10,
"ARG:NE": -0.10,
"ARG:CZ": 0.50,
"ARG:NH1": 0.25,
"ARG:NH2": 0.25,
"ARG:C": 0.60,
"ARG:O": -0.55,
"ASN:N": -0.15,
"ASN:CA": 0.10,
"ASN:CB": 0.00,
"ASN:CG": 0.55,
"ASN:OD1": -0.55,
"ASN:ND2": 0.00,
"ASN:C": 0.60,
"ASN:O": -0.55,
"ASP:N": -0.15,
"ASP:CA": 0.10,
"ASP:CB": 0.00,
"ASP:CG": 0.14,
"ASP:OD1": -0.57,
"ASP:OD2": -0.57,
"ASP:C": 0.60,
"ASP:O": -0.55,
"CYS:N": -0.15,
"CYS:CA": 0.10,
"CYS:CB": 0.19,
"CYS:SG": -0.19,
"CYS:C": 0.60,
"CYS:O": -0.55,
"GLN:N": -0.15,
"GLN:CA": 0.10,
"GLN:CB": 0.00,
"GLN:CG": 0.00,
"GLN:CD": 0.55,
"GLN:OE1": -0.55,
"GLN:NE2": 0.00,
"GLN:C": 0.60,
"GLN:O": -0.55,
"GLU:N": -0.15,
"GLU:CA": 0.10,
"GLU:CB": 0.00,
"GLU:CG": 0.00,
"GLU:CD": 0.14,
"GLU:OE1": -0.57,
"GLU:OE2": -0.57,
"GLU:C": 0.60,
"GLU:O": -0.55,
"GLY:N": -0.15,
"GLY:CA": 0.10,
"GLY:C": 0.60,
"GLY:O": -0.55,
"HIS:N": -0.15,
"HIS:CA": 0.10,
"HIS:CB": 0.00,
"HIS:CG": 0.10,
"HIS:ND1": -0.10,
"HIS:CD2": 0.10,
"HIS:NE2": -0.40,
"HIS:CE1": 0.30,
"HIS:C": 0.60,
"HIS:O": -0.55,
"ILE:N": -0.15,
"ILE:CA": 0.10,
"ILE:CB": 0.00,
"ILE:CG2": 0.00,
"ILE:CG1": 0.00,
"ILE:CD": 0.00,
"ILE:C": 0.60,
"ILE:O": -0.55,
"LEU:N": -0.15,
"LEU:CA": 0.10,
"LEU:CB": 0.00,
"LEU:CG": 0.00,
"LEU:CD1": 0.00,
"LEU:CD2": 0.00,
"LEU:C": 0.60,
"LEU:O": -0.55,
"LYS:N": -0.15,
"LYS:CA": 0.10,
"LYS:CB": 0.00,
"LYS:CG": 0.00,
"LYS:CD": 0.00,
"LYS:CE": 0.25,
"LYS:NZ": 0.75,
"LYS:C": 0.60,
"LYS:O": -0.55,
"MET:N": -0.15,
"MET:CA": 0.10,
"MET:CB": 0.00,
"MET:CG": 0.06,
"MET:SD": -0.12,
"MET:CE": 0.06,
"MET:C": 0.60,
"MET:O": -0.55,
"PHE:N": -0.15,
"PHE:CA": 0.10,
"PHE:CB": 0.00,
"PHE:CG": 0.00,
"PHE:CD1": 0.00,
"PHE:CD2": 0.00,
"PHE:CE1": 0.00,
"PHE:CE2": 0.00,
"PHE:CZ": 0.00,
"PHE:C": 0.60,
"PHE:O": -0.55,
"PRO:N": -0.25,
"PRO:CD": 0.10,
"PRO:CA": 0.10,
"PRO:CB": 0.00,
"PRO:CG": 0.00,
"PRO:C": 0.60,
"PRO:O": -0.55,
"SER:N": -0.15,
"SER:CA": 0.10,
"SER:CB": 0.25,
"SER:OG": -0.25,
"SER:C": 0.60,
"SER:O": -0.55,
"THR:N": -0.15,
"THR:CA": 0.10,
"THR:CB": 0.25,
"THR:OG1": -0.25,
"THR:CG2": 0.00,
"THR:C": 0.60,
"THR:O": -0.55,
"TRP:N": -0.15,
"TRP:CA": 0.10,
"TRP:CB": 0.00,
"TRP:CG": -0.03,
"TRP:CD2": 0.10,
"TRP:CE2": -0.04,
"TRP:CE3": -0.03,
"TRP:CD1": 0.06,
"TRP:NE1": -0.06,
"TRP:CZ2": 0.00,
"TRP:CZ3": 0.00,
"TRP:CH2": 0.00,
"TRP:C": 0.60,
"TRP:O": -0.55,
"TYR:N": -0.15,
"TYR:CA": 0.10,
"TYR:CB": 0.00,
"TYR:CG": 0.00,
"TYR:CD1": 0.00,
"TYR:CE1": 0.00,
"TYR:CD2": 0.00,
"TYR:CE2": 0.00,
"TYR:CZ": 0.25,
"TYR:OH": -0.25,
"TYR:C": 0.60,
"TYR:O": -0.55,
"VAL:N": -0.15,
"VAL:CA": 0.10,
"VAL:CB": 0.00,
"VAL:CG1": 0.00,
"VAL:CG2": 0.00,
"VAL:C": 0.60,
"VAL:O": -0.55
};
    
//this can be supplied to mapAtomProperties
$3Dmol.applyPartialCharges = function(atom, keepexisting) {
    if(!keepexisting || typeof(atom.partialCharge) === "undefined") {
        if(atom.resn && atom.atom) {
            var key = atom.resn+":"+atom.atom;
            atom.properties['partialCharge'] = $3Dmol.partialCharges[key];
        }
    }
};// Specifications for various object types used in 3Dmol.js
// This is primarily for documentation 
(function() {
/**
 * GLViewer input specification
 * @typedef ViewerSpec
 * @prop {Object} defaultcolors - map of elements to colors
 * @prop {boolean} nomouse - if true, disable handling of mouse events
 * @prop {ColorSpec} backgroundColor - color of background
 */

/**
 * Atom representation. Depending on the input file format, not all fields may be defined.
 * @typedef AtomSpec
 * @prop {string} resn - Parent residue name
 * @prop {number} x - Atom's x coordinate
 * @prop {number} y - Atom's y coordinate
 * @prop {number} z - Atom's z coordinate
 * @prop {ColorSpec} color - Atom's color, as hex code or built-in color string
 * @prop {ColorSpec} surfaceColor - Hex code for color to be used for surface patch over this atom
 * @prop {string} elem - Element abbreviation (e.g. 'H', 'Ca', etc)
 * @prop {boolean} hetflag - Set to true if atom is a heteroatom
 * @prop {string} chain - Chain this atom belongs to, if specified in input file (e.g 'A' for chain A)
 * @prop {number} resi - Residue number 
 * @prop {number} icode
 * @prop {number} rescode
 * @prop {number} serial - Atom's serial id number
 * @prop {string} atom - Atom name; may be more specific than 'elem' (e.g 'CA' for alpha carbon)
 * @prop {Array.<number>} bonds - Array of atom ids this atom is bonded to
 * @prop {string} ss - Secondary structure identifier (for cartoon render; e.g. 'h' for helix) 
 * @prop {boolean} singleBonds - true if this atom forms only single bonds or no bonds at all
 * @prop {Array.<number>} bondOrder - Array of this atom's bond orders, corresponding to bonds identfied by 'bonds'
 * @prop {Object} properties - Optional mapping of additional properties
 * @prop {number} b - Atom b factor data
 * @prop {string} pdbline - If applicable, this atom's record entry from the input PDB file (used to output new PDB from models)
 * @prop {boolean} clickable - Set this flag to true to enable click selection handling for this atom
 * @prop {function(this, $3Dmol.GLViewer)} callback - Callback click handler function to be executed on this atom and its parent viewer
 * @prop {boolean} invert - for selection, inverts the meaning of the selection
 */

 /**
  * Parser options specification. Used to specify the options of a GLModel.  Depending on the input file format, not all fields may be defined.
  * @typedef ParserOptionsSpec
  * @prop {boolean} duplicateAssemblyAtoms- Set to true if you wish to diplicate assembly atoms otherwise false ; supported by all
  * @prop {boolean} frames - true if you want to add to a new frame and false otherwise ; supported by all
  * @prop {object} vibrate - object specifying the vibration behavior ; supported by all
  * @prop {number} vibrate.frames - number of frames to be created, default to 10 ; supported by all
  * @prop {number} vibrate.amplitude -amplitude of distortion, default to 1 (full) ; supported by all
  * @prop {boolean} multimodel - specifies weather or not multiple models are being defined ; supported by xyz,sdf, or mol2
  * @prop {boolean} onemol -specifies weather or not the model is of one molecule ; Supported by xyz , sdf , mol2
  * @prop {boolean} keepH - do not strip hydrogens ; supported by sdf,mol2
  * @prop {object} parseStyle - used to define ChemDoodle styles ; upported by cdjson
  * @prop {boolean} doAssembly - boolean dictating weather or not to do assembly ; supported by mcif
  * @prop {boolean} noSecondaryStructure - boolean dictating the presence of a secondary structure ; supported by pdb
  * @prob {boolean} noComputeSecondaryStructure - do not compute ss ; supported by pdb
  * @prob {string} altLoc -which alternate location to select, if present; '*' to load all ; supported by pdb
  * @prob {number} assemblyIndex - index of the assembly in symmetry ; supported by mmtf
  */

/**
*3 dimensional vector 
*@typedef Vector3
*@prop {number} x - x coordinate
*@prop {number} y - y coordinate
*@prop {number} z - z coordinate


*/

/**
 * Atom selection object. Used to specify what atoms should be selected.  Can include
 * any field from {@link AtomSpec} in which case atoms must equal the specified value.  
 * All fields must match for the selection to hold. If values
 * are provided as a list, then only one value of the list must match.
 * 
 * @typedef AtomSelectionSpec
 * @prop {AtomSpec} ... - any field from {@link AtomSpec}, values may be singletons or lists
 * @prop {GLModel} model - a single model or list of models from which atoms should be selected
 * @prop {number} bonds - overloaded to select number of bonds, e.g. {bonds: 0} will select all nonbonded atoms
 * @prop {function} predicate - user supplied function that gets passed an {AtomSpec} and should return true if the atom should be selected
 * @prop {boolean} invert - if set, inverts the meaning of the selection
 * @prop {boolean} byres - if set, expands the selection to include all atoms of any residue that has any atom selected
 * @prop {number} expand - expands the selection to include all atoms within a given distance from the selection
 * @prop {WithinSelectionSpec} within - intersects the selection with the set of atoms within a given distance from another selection
 * @example
 * $3Dmol.download("pdb:2EJ0",viewer,{},function(){
                  
                  viewer.addLabel("Aromatic", {position: {x:-6.89, y:0.75, z:0.35}, backgroundColor: 0x800080, backgroundOpacity: 0.8});
                  viewer.addLabel("Label",{font:'sans-serif',fontSize:18,fontColor:'white',fontOpacity:1,borderThickness:1.0,
                                           borderColor:'red',borderOpacity:0.5,backgroundColor:'black',backgroundOpacity:0.5,
                                           position:{x:50.0,y:0.0,z:0.0},inFront:true,showBackground:true});
                  viewer.setStyle({chain:'A'},{cross:{hidden:true}});
                  viewer.setStyle({chain:'B'},{cross:{hidden:false,
                                                      colorscheme:'greenCarbon'}});
                  viewer.setStyle({chain:'C'},{cross:{hidden:false,
                                                      radius:.5}});
                  viewer.setStyle({chain:'D'},{cross:{hidden:false}});
                  viewer.setStyle({chain:'E'},{cross:{hidden:false,
                                                      color:'black'}});
                  
                  viewer.render();

                  
                });
 */

/**
 * Within selection object. Used to find the subset of an atom selection that is within
 * some distance from another atom selection. When added as a field of an {@link AtomSelectionSpec},
 * intersects the set of atoms in that selection with the set of atoms within a given
 * distance from the given {@link AtomSelectionSpec}.
 
 * @typedef WithinSelectionSpec
 * @example
 $3Dmol.download("pdb:2EJ0",viewer,{},function(){
                  
                  viewer.addLabel("Aromatic", {position: {x:-6.89, y:0.75, z:0.35}, backgroundColor: 0x800080, backgroundOpacity: 0.8});
                  viewer.addLabel("Label",{font:'sans-serif',fontSize:18,fontColor:'white',fontOpacity:1,borderThickness:1.0,
                                           borderColor:'red',borderOpacity:0.5,backgroundColor:'black',backgroundOpacity:0.5,
                                           position:{x:50.0,y:0.0,z:0.0},inFront:true,showBackground:true});
            
 * viewer.setStyle({chain: 'A', within:{distance: 10, sel:{chain: 'B'}}}, {sphere:{}}); 
                  
                  viewer.render();

                  
                });// stylizes atoms in chain A that are within 10 angstroms of an atom in chain B
 *
 * @prop {number} distance - the distance in angstroms away from the atom selection to include atoms in the parent selection
*  @prop {boolean} invert - if set, selects atoms not within distance range for intersection
 * @prop {AtomSelectionSpec} sel - the selection of atoms against which to measure the distance from the parent atom selection
 */



/** 
 * @typedef AtomStyleSpec
 * @prop {LineStyleSpec} line - draw bonds as lines
 * @prop {CrossStyleSpec} cross - draw atoms as crossed lines (aka stars)
 * @prop {StickStyleSpec} stick  - draw bonds as capped cylinders
 * @prop {SphereStyleSpec} sphere - draw atoms as spheres
 * @prop {CartoonStyleSpec} cartoon - draw cartoon representation of secondary structure
 */

/** 
 * @typedef SurfaceStyleSpec
 * @prop {number} opacity - sets the transparency: 0 to hide, 1 for fully opaque
 * @prop {ColorschemeSpec} colorscheme - element based coloring
 * @prop {ColorSpec} color - fixed coloring, overrides colorscheme
 * @prop {$3Dmol.VolumeData} voldata - volumetric data for vertex coloring
 * @prop {$3Dmol.Gradient} volscheme - coloring scheme for mapping volumetric data to vertex color
 * @prop {Object} map - specifies a numeric atom property (prop) and color mapping (scheme) such as {@link $3Dmol.Gradient.RWB}.  Deprecated, use colorscheme instead.
 * 
 * @example
 * var setStyles = function(volumedata){
                    var data = new $3Dmol.VolumeData(volumedata, "cube");
                    viewer.addSurface("VDW", {opacity:0.85, voldata: data, volscheme: new $3Dmol.Gradient.RWB(-10,10)},{chain:'A'});
                    viewer.mapAtomProperties($3Dmol.applyPartialCharges);
                    viewer.addSurface($3Dmol.SurfaceType.SAS, {map:{prop:'partialCharge',scheme:new $3Dmol.Gradient.RWB(-.05,.05)}, opacity:1.0},{chain:'B'});
                    viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.85,voldata: data, color:'red'},{chain:'C'});
                    viewer.addSurface($3Dmol.SurfaceType.SAS, {opacity:0.85,voldata: data, colorscheme:'greenCarbon'},{chain:'D'});
                 
              viewer.render();
              };
              $3Dmol.download("pdb:4DLN",viewer,{},function(){
                  
                  $.get("volData/1fas.cube",setStyles);
                });

 */

/** 
 * Isosurface style specification
 * @typedef IsoSurfaceSpec
 * @prop {number} isoval - specifies the isovalue to draw surface at
 * @propr {boolean} voxel - if true uses voxel style rendering
 * @prop {ColorSpec} color - solid color
 * @prop {number} opacity - transparency, between 0 and 1
 * @prop {boolean} wireframe - draw as wireframe, not surface
 * @prop {number} linewidth - width of line for wireframe rendering **No longer supported by most browsers**
 * @prop {number} smoothness - amount to smooth surface (default 1)
 * @prop {AtomSelectionSpec} sel - selection around which to show data
 * @prop {list} coords - coordinates around which to include data
 * @prop {number} seldist - distance around selection/coords to include data [default = 2.0]
 * @prop {boolean} clickable - if true, user can click on object to trigger callback
 * @prop {function} callback - function to call on click 
 */

/** 
 * GLShape style specification
 * @typedef ShapeSpec
 * @prop {ColorSpec} color - solid color
 * @prop {number} alpha - transparency
 * @prop {boolean} wireframe - draw as wireframe, not surface
 * @prop {number} linewidth - width of line for wireframe rendering **No longer supported by most browsers**
 * @prop {boolean} clickable - if true, user can click on object to trigger callback
 * @prop {function} callback - function to call on click 
 */


/**
 * Specification for adding custom shape. Extends {@link ShapeSpec}.
 * @typedef CustomShapeSpec
 * @augments ShapeSpec
 * @prop {Array.<$3Dmol.Vector3>} vertexArr - List of vertex positions
 * @prop {Array.<$3Dmol.Vector3>} normalArr - List of normal vectors for each vertex
 * @prop {Array.<number>} faceArr - List of triangles to build the custom shape. Each triangle is defined by the indices of 3 vertices in vertexArr, so the array length should be 3 times the number of faces.
 * @prop {ColorSpec | Array.<ColorSpec>} color - Either a single color for the whole object or an array specifying the color at each vertex.
 */

/**
 * Sphere shape specification. Extends {@link ShapeSpec}  
 * 
 * @typedef SphereSpec   
 * @prop {$3Dmol.Vector3} center
 * @prop {number} radius
 * 
 */


/**
 * Arrow shape specification.  Extends {@link ShapeSpec}  
 * @typedef ArrowSpec
 * @prop {$3Dmol.Vector3} start
 * @prop {$3Dmol.Vector3} end
 * @prop {number} radius
 * @prop {number} radiusRatio - ratio of arrow base to cylinder (1.618034 default)
 * @prop {number} mid - relative position of arrow base (0.618034 default)
 */


/**
 * Cylinder shape specification.  Extends {@link ShapeSpec}  
 * @typedef CylinderSpec
 * @prop {$3Dmol.Vector3} start
 * @prop {$3Dmol.Vector3} end
 * @prop {number} radius
 * @prop {boolean} fromCap
 * @prop {boolean} toCap
 */

/**
 * Line shape specification.  Extends {@link ShapeSpec}  (but defaults to wireframe)
 * @typedef LineSpec
 * @prop {$3Dmol.Vector3} start
 * @prop {$3Dmol.Vector3} end
 */


/**
* File formats supported by 3Dmol.js
* @typedef FileFormats
* @prop cdjson,json  Chemical JSON format
* @prop cube Gaussian cube format
* @prop gro  Gromacs topology format, need to add coordinates to resulting model.
* @prop mcif,cif Crystallographic Information File, the successor to PDB that makes you miss the PDB file format
* @prop mmtf Macromolecular Transmission Format, the successor to PDB that is totally awesome
* @prop mol2 Sybyl Mol2 format 
* @prop pdb The venerable Protein Data Bank format
* @prop pqr Like PDB but with partial charges which are read into the partialcharge atom property
* @prop prmtop Amber topology file, must add coordinates
* @prop sdf MDL MOL format, supports muliple models and meta data
* @prop vasp VASP format (CONTCAR, POSCAR)
* @prop xyz XYZ cartesian coordinates format
*/
	
});
/**
 * $3Dmol.VolumeData stores volumetric data. This includes file parsing
 * functionality.
 * 
 * @class
 * @param {string} str - volumetric data
 * @param {string} format - format of supplied data (cube, dx, vasp); append .gz if compressed
 * @param {Object} options - normalize (zero mean, unit variance), negate
 */
$3Dmol.VolumeData = function(str, format, options) {

    this.unit = {
        x : 1,
        y : 1,
        z : 1
    }; // scale of each voxel
    this.origin = {
        x : 0,
        y : 0,
        z : 0
    }; // origin (bottom "left", not center)
    this.size = {
        x : 0,
        y : 0,
        z : 0
    }; // number of voxels in each direction
    this.data = new Float32Array([]); // actual floating point data, arranged
                                        // x->y->z

    this.matrix = null; //if set must transform data
    format = format.toLowerCase();
    
    if(/\.gz$/.test(format)) {
        //unzip gzipped files
        format = format.replace(/\.gz$/,'');
        try {
            if(this[format] && this[format].isbinary) {
                str = pako.inflate(str);
            }
            else {
                str = new TextDecoder("utf-8").decode(pako.inflate(str));
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    if (this[format]) {
        this[format](str);
    }
    
    if(options) {
        if(options.negate) {
            for(var i = 0, n = this.data.length; i < n; i++) {
                this.data[i] = -this.data[i];
            }
        }
        if(options.normalize) {
            var total = 0.0;
            for(var i = 0, n = this.data.length; i < n; i++) {
                total += this.data[i];
            }
            var mean = total/this.data.length;
            console.log("computed mean: "+mean);
            total = 0;
            for(var i = 0, n = this.data.length; i < n; i++) {
                var diff = this.data[i]-mean;
                total += diff*diff; //variance is ave of squared difference with mean
            }
            var variance = total/this.data.length;
            console.log("Computed variance: "+variance);
            //now normalize
            for(var i = 0, n = this.data.length; i < n; i++) {
                this.data[i] = (this.data[i]-mean)/variance;
            }
        }
    }
};

/**
 * @function $3Dmol.VolumeData.getVal
 * @param {number} x,y,z - the coordinates
 * @returns - value closest to provided coordinate; zero if coordinate invalid
 */
$3Dmol.VolumeData.prototype.getVal = function(x,y,z) {
    x -= this.origin.x;
    y -= this.origin.y;
    z -= this.origin.z;
    
    x /= this.unit.x;
    y /= this.unit.y;
    z /= this.unit.z;
    
    x = Math.round(x);
    y = Math.round(y);
    z = Math.round(z);
    
    if(x < 0 || x >= this.size.x) return 0;
    if(y < 0 || y >= this.size.y) return 0;
    if(z < 0 || z >= this.size.z) return 0;
    
    return this.data[x*this.size.y*this.size.z + y*this.size.z + z];
};

$3Dmol.VolumeData.prototype.getCoordinates = function(index){
    
    var x = index/(this.size.y*this.size.z);
    var y = index % (this.size.y*this.size.z);
    var z = index % this.size.z;

    x *= this.unit.x;
    y *= this.unit.y;
    z *= this.unit.z;

    x += this.origin.x;
    y += this.origin.y;
    z += this.origin.z;
    //console.log("getCoordinates : "+x+" , "+y+" , "+z);
    //console.log("val : "+data.getVal(x,y,z));
    //console.log("actual : "+data.data[index]);
    return {x:x,y:y,z:z};
    /*
    Y = (int)(index / Width)
    X = index - (Y * Width)
    */
}

/*
 * parse vasp data
 * Essentially this parser converts the CHGCAR data into
 * cube data. It has been adapted from 'chg2cube.pl' found in
 * http://theory.cm.utexas.edu/vtsttools/
 */
$3Dmol.VolumeData.prototype.vasp = function(str) {

    var lines = str.replace(/^\s+/, "").split(/[\n\r]/);

    var atomicData = $3Dmol.Parsers.vasp(str)[0];
    var natoms = atomicData.length;

    if (natoms == 0) {
      console.log("No good formating of CHG or CHGCAR file, not atomic information provided in the file.");
      this.data = [];
      return;
    }



    // Assume atomic units 
    var unittype = "bohr/hartree";
    var l_units = 1.889725992;
    var e_units = 0.036749309;

    // copied from $3Dmol.Parsers.vasp
    var convFactor = parseFloat(lines[1]);
    // This is how Vasp reads in the basis We need the l_units in order to
    // compute the volume of the cell. Afterwards to obtain the axis for the
    // voxels we have to remove this unit and divide by the number of voxels in
    // each dimension
    var v;
    v=lines[2].replace(/^\s+/, "").split(/\s+/);
    var xVec = new $3Dmol.Vector3(parseFloat(v[0]),parseFloat(v[1]),parseFloat(v[2])).multiplyScalar(convFactor*l_units);
    v=lines[3].replace(/^\s+/, "").split(/\s+/);
    var yVec = new $3Dmol.Vector3(parseFloat(v[0]),parseFloat(v[1]),parseFloat(v[2])).multiplyScalar(convFactor*l_units);
    v=lines[4].replace(/^\s+/, "").split(/\s+/);
    var zVec = new $3Dmol.Vector3(parseFloat(v[0]),parseFloat(v[1]),parseFloat(v[2])).multiplyScalar(convFactor*l_units);

    // correct volume for non-orthognal box (expansion by minors)
    var vol = xVec.x*(yVec.y*zVec.z - zVec.y*yVec.z) - yVec.x*(xVec.y*zVec.z - zVec.y*xVec.z) + zVec.x*(xVec.y*yVec.z - yVec.y*xVec.z);

    vol = Math.abs(vol)/(Math.pow(l_units,3));
    var vol_scale = 1.0/(vol); //This Only for CHGCAR files

    // We splice the structure information
    // 2 (header) + 3 (vectors) + 2 (atoms) + 1 (vaspMode) + natoms (coords) + 1 (blank line) 
    lines.splice(0,2+3+2+1+natoms+1);


    var lineArr = lines[0].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

    var nX = Math.abs(lineArr[0]);
    var nY = Math.abs(lineArr[1]);
    var nZ = Math.abs(lineArr[2]);

    var origin = this.origin = new $3Dmol.Vector3(0,0,0);

    this.size = {x:nX, y:nY, z:nZ};
    this.unit = new $3Dmol.Vector3(xVec.x, yVec.y, zVec.z);

    // resize the vectors accordingly
    xVec = xVec.multiplyScalar(1/(l_units*nX));
    yVec = yVec.multiplyScalar(1/(l_units*nY));
    zVec = zVec.multiplyScalar(1/(l_units*nZ));

    if (xVec.y != 0 || xVec.z != 0 || yVec.x != 0 || yVec.z != 0 || zVec.x != 0
            || zVec.y != 0) {
        //need a transformation matrix
        this.matrix =  new $3Dmol.Matrix4(xVec.x, yVec.x, zVec.x, 0, xVec.y, yVec.y, zVec.y, 0, xVec.z, yVec.z, zVec.z, 0, 0,0,0,1);
        //include translation in matrix
        this.matrix = this.matrix.multiplyMatrices(this.matrix, 
                new $3Dmol.Matrix4().makeTranslation(origin.x, origin.y, origin.z));
        //all translation and scaling done by matrix, so reset origin and unit
        this.origin = new $3Dmol.Vector3(0,0,0);
        this.unit = new $3Dmol.Vector3(1,1,1);
    }


    lines.splice(0,1); //Remove the dimension line 
    var raw = lines.join(" ");

    raw = raw.replace(/^\s+/,'');
    raw = raw.split(/[\s\r]+/);
    raw.splice(nX*nY*nZ+1);

    var preConvertedData = new Float32Array(raw); //We still have to format it to get the density

    for (var i = 0; i< preConvertedData.length; i++){
      preConvertedData[i] = preConvertedData[i]*vol_scale*e_units;
    }

    this.data = preConvertedData;

    //console.log(xVec);
    //console.log(yVec);
    //console.log(zVec);
    //console.log(this.unit);
    //console.log(this.origin);
    //console.log(this.matrix);
    //console.log(this.data);

};

// parse dx data - does not support all features of the file format
$3Dmol.VolumeData.prototype.dx = function(str) {
    var lines = str.split(/[\n\r]+/);
    var i, m;
    var recounts = /gridpositions\s+counts\s+(\d+)\s+(\d+)\s+(\d+)/;
    var reorig = /^origin\s+(\S+)\s+(\S+)\s+(\S+)/;
    var redelta = /^delta\s+(\S+)\s+(\S+)\s+(\S+)/;
    var follows = /data follows/;
        
    for(i = 0; i < lines.length; i++) {
        var line = lines[i];
        if((m = recounts.exec(line)) ) {
            var nX = parseInt(m[1]);
            var nY = parseInt(m[2]);
            var nZ = parseInt(m[3]);
            this.size = {x:nX, y:nY, z:nZ};
        }
        else if((m = redelta.exec(line))) {
            var xunit = parseFloat(m[1]);
            if(parseFloat(m[2]) != 0 || parseFloat(m[3]) != 0) {
                console.log("Non-orthogonal delta matrix not currently supported in dx format");
            }
            i += 1;
            line = lines[i];
            m = redelta.exec(line);
            if(m == null) {
                console.log("Parse error in dx delta matrix");
                return;
            }
            
            var yunit = parseFloat(m[2]);
            if(parseFloat(m[1]) != 0 || parseFloat(m[3]) != 0) {
                console.log("Non-orthogonal delta matrix not currently supported in dx format");
            }
            
            i += 1;
            line = lines[i];
            m = redelta.exec(line);
            if(m == null) {
                console.log("Parse error in dx delta matrix");
                return;
            }
            
            var zunit = parseFloat(m[3]);
            if(parseFloat(m[1]) != 0 || parseFloat(m[2]) != 0) {
                console.log("Non-orthogonal delta matrix not currently supported in dx format");
            }    
            this.unit = new $3Dmol.Vector3(xunit,yunit,zunit);        
        }
        else if((m = reorig.exec(line))) {
            var xorig = parseFloat(m[1]);
            var yorig = parseFloat(m[2]);
            var zorig = parseFloat(m[3]);
            this.origin = new $3Dmol.Vector3(xorig,yorig,zorig);
        } else if((m = follows.exec(line))) {
            break;
        }
    }
    i += 1;
    if(!this.size || !this.origin || !this.unit || !this.size) {
        console.log("Error parsing dx format");
        return;
    }
    var raw = lines.splice(i).join(" ");
    raw = raw.split(/[\s\r]+/);
    this.data = new Float32Array(raw);
}

// parse cube data
$3Dmol.VolumeData.prototype.cube = function(str) {
    var lines = str.replace(/^\s+/, "").split(/[\n\r]+/);

    if (lines.length < 6)
        return;

    var lineArr = lines[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

    var atomsnum = parseFloat(lineArr[0]); //includes sign, which indicates presence of oribital line in header
    var natoms = Math.abs(atomsnum);

    var origin = this.origin = new $3Dmol.Vector3(parseFloat(lineArr[1]),
            parseFloat(lineArr[2]), parseFloat(lineArr[3]));

    lineArr = lines[3].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

    // might have to convert from bohr units to angstroms
    // there is a great deal of confusion here:
    // n>0 means angstroms: http://www.gaussian.com/g_tech/g_ur/u_cubegen.htm
    // n<0 means angstroms: http://paulbourke.net/dataformats/cube/
    // always assume bohr: openbabel source code
    // always assume angstrom: http://www.ks.uiuc.edu/Research/vmd/plugins/molfile/cubeplugin.html
    // we are going to go with n<0 means angstrom - note this is just the first n
    var convFactor = (lineArr[0] > 0) ? 0.529177 : 1;
    origin.multiplyScalar(convFactor);

    var nX = Math.abs(lineArr[0]);
    var xVec = new $3Dmol.Vector3(parseFloat(lineArr[1]),
            parseFloat(lineArr[2]), parseFloat(lineArr[3]))
            .multiplyScalar(convFactor);

    lineArr = lines[4].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
    var nY = Math.abs(lineArr[0]);
    var yVec = new $3Dmol.Vector3(parseFloat(lineArr[1]),
            parseFloat(lineArr[2]), parseFloat(lineArr[3]))
            .multiplyScalar(convFactor);

    lineArr = lines[5].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
    var nZ = Math.abs(lineArr[0]);
    var zVec = new $3Dmol.Vector3(parseFloat(lineArr[1]),
            parseFloat(lineArr[2]), parseFloat(lineArr[3]))
            .multiplyScalar(convFactor);

    this.size = {x:nX, y:nY, z:nZ};
    this.unit = new $3Dmol.Vector3(xVec.x, yVec.y, zVec.z);
    
    if (xVec.y != 0 || xVec.z != 0 || yVec.x != 0 || yVec.z != 0 || zVec.x != 0
            || zVec.y != 0) {
        //need a transformation matrix
        this.matrix =  new $3Dmol.Matrix4(xVec.x, yVec.x, zVec.x, 0, xVec.y, yVec.y, zVec.y, 0, xVec.z, yVec.z, zVec.z, 0, 0,0,0,1);
        //include translation in matrix
        this.matrix = this.matrix.multiplyMatrices(this.matrix, 
                new $3Dmol.Matrix4().makeTranslation(origin.x, origin.y, origin.z));
        //all translation and scaling done by matrix, so reset origin and unit
        this.origin = new $3Dmol.Vector3(0,0,0);
        this.unit = new $3Dmol.Vector3(1,1,1);
    }
    
    var headerlines = 6;
    if(atomsnum < 0) headerlines++; //see: http://www.ks.uiuc.edu/Research/vmd/plugins/molfile/cubeplugin.html
    var raw = lines.splice(natoms + headerlines).join(" ");
    raw = raw.replace(/^\s+/,'');
    raw = raw.split(/[\s\r]+/);
    this.data = new Float32Array(raw);

};

//parse cp4 files
$3Dmol.VolumeData.prototype.ccp4 = function(bin) {

    // http://www.ccp4.ac.uk/html/maplib.html#description
    //code from ngl: https://github.com/arose/ngl/blob/master/js/ngl/parser.js
    var header = {};
    bin = new Int8Array(bin);
    var intView = new Int32Array( bin.buffer, 0, 56 );
    var floatView = new Float32Array( bin.buffer, 0, 56 );
    var dv = new DataView( bin.buffer );
    

    // 53  MAP         Character string 'MAP ' to identify file type
    header.MAP = String.fromCharCode(
        dv.getUint8( 52 * 4 ), dv.getUint8( 52 * 4 + 1 ),
        dv.getUint8( 52 * 4 + 2 ), dv.getUint8( 52 * 4 + 3 )
    );

    // 54  MACHST      Machine stamp indicating machine type which wrote file
    //                 17 and 17 for big-endian or 68 and 65 for little-endian
    header.MACHST = [ dv.getUint8( 53 * 4 ), dv.getUint8( 53 * 4 + 1 ) ];

    // swap byte order when big endian
    if( header.MACHST[ 0 ] === 17 && header.MACHST[ 1 ] === 17 ){
        var n = bin.byteLength;
        for( var i = 0; i < n; i+=4 ){
            dv.setFloat32( i, dv.getFloat32( i ), true );
        }
    }

    header.NX = intView[ 0 ];  // NC - columns (fastest changing)
    header.NY = intView[ 1 ];  // NR - rows
    header.NZ = intView[ 2 ];  // NS - sections (slowest changing)

    // mode
    //  0 image : signed 8-bit bytes range -128 to 127
    //  1 image : 16-bit halfwords
    //  2 image : 32-bit reals
    //  3 transform : complex 16-bit integers
    //  4 transform : complex 32-bit reals
    //  6 image : unsigned 16-bit range 0 to 65535
    // 16 image: unsigned char * 3 (for rgb data, non-standard)
    //
    // Note: Mode 2 is the normal mode used in the CCP4 programs.
    //       Other modes than 2 and 0 may NOT WORK
    header.MODE = intView[ 3 ];

    // start
    header.NXSTART = intView[ 4 ];  // NCSTART - first column
    header.NYSTART = intView[ 5 ];  // NRSTART - first row
    header.NZSTART = intView[ 6 ];  // NSSTART - first section

    // intervals
    header.MX = intView[ 7 ];  // intervals along x
    header.MY = intView[ 8 ];  // intervals along y
    header.MZ = intView[ 9 ];  // intervals along z

    // cell length (Angstroms in CCP4)
    header.xlen = floatView[ 10 ];
    header.ylen = floatView[ 11 ];
    header.zlen = floatView[ 12 ];

    // cell angle (Degrees)
    header.alpha = floatView[ 13 ];
    header.beta  = floatView[ 14 ];
    header.gamma = floatView[ 15 ];

    // axis correspondence (1,2,3 for X,Y,Z)
    header.MAPC = intView[ 16 ];  // column
    header.MAPR = intView[ 17 ];  // row
    header.MAPS = intView[ 18 ];  // section

    // density statistics
    header.DMIN  = floatView[ 19 ];
    header.DMAX  = floatView[ 20 ];
    header.DMEAN = floatView[ 21 ];

    // space group number 0 or 1 (default=0)
    header.ISPG = intView[ 22 ];

    // number of bytes used for symmetry data (0 or 80)
    header.NSYMBT = intView[ 23 ];

    // Flag for skew transformation, =0 none, =1 if foll
    header.LSKFLG = intView[ 24 ];

    // 26-34  SKWMAT  Skew matrix S (in order S11, S12, S13, S21 etc) if
    //                LSKFLG .ne. 0.
    // 35-37  SKWTRN  Skew translation t if LSKFLG != 0.
    //                Skew transformation is from standard orthogonal
    //                coordinate frame (as used for atoms) to orthogonal
    //                map frame, as Xo(map) = S * (Xo(atoms) - t)

    // 38      future use       (some of these are used by the MSUBSX routines
    //  .          "              in MAPBRICK, MAPCONT and FRODO)
    //  .          "   (all set to zero by default)
    //  .          "
    // 52          "

    // 50-52 origin in X,Y,Z used for transforms
    header.originX = floatView[ 49 ];
    header.originY = floatView[ 50 ];
    header.originZ = floatView[ 51 ];

    // 53  MAP         Character string 'MAP ' to identify file type
    // => see top of this parser

    // 54  MACHST      Machine stamp indicating machine type which wrote file
    // => see top of this parser

    // Rms deviation of map from mean density
    header.ARMS = floatView[ 54 ];

    // 56      NLABL           Number of labels being used
    // 57-256  LABEL(20,10)    10  80 character text labels (ie. A4 format)
    console.log("Map has min,mean,average,rmsddv: "+header.DMIN+","+header.DMAX+","+header.DMEAN+","+header.ARMS);

    //create transformation matrix, code mostly copied from ngl
    var h = header;
    var basisX = [
          h.xlen,
          0,
          0
      ];

      var basisY = [
          h.ylen * Math.cos( Math.PI / 180.0 * h.gamma ),
          h.ylen * Math.sin( Math.PI / 180.0 * h.gamma ),
          0
      ];

      var basisZ = [
          h.zlen * Math.cos( Math.PI / 180.0 * h.beta ),
          h.zlen * (
                  Math.cos( Math.PI / 180.0 * h.alpha )
                  - Math.cos( Math.PI / 180.0 * h.gamma )
                  * Math.cos( Math.PI / 180.0 * h.beta )
              ) / Math.sin( Math.PI / 180.0 * h.gamma ),
          0
      ];
      basisZ[ 2 ] = Math.sqrt(
          h.zlen * h.zlen * Math.sin( Math.PI / 180.0 * h.beta ) *
          Math.sin( Math.PI / 180.0 * h.beta ) - basisZ[ 1 ] * basisZ[ 1 ]
      );

      var basis = [ 0, basisX, basisY, basisZ ];
      var nxyz = [ 0, h.MX, h.MY, h.MZ ];
      var mapcrs = [ 0, h.MAPC, h.MAPR, h.MAPS ];

      this.matrix = new $3Dmol.Matrix4();

      this.matrix.set(

          basis[ mapcrs[1] ][0] / nxyz[ mapcrs[1] ],
          basis[ mapcrs[2] ][0] / nxyz[ mapcrs[2] ],
          basis[ mapcrs[3] ][0] / nxyz[ mapcrs[3] ],
          0,

          basis[ mapcrs[1] ][1] / nxyz[ mapcrs[1] ],
          basis[ mapcrs[2] ][1] / nxyz[ mapcrs[2] ],
          basis[ mapcrs[3] ][1] / nxyz[ mapcrs[3] ],
          0,

          basis[ mapcrs[1] ][2] / nxyz[ mapcrs[1] ],
          basis[ mapcrs[2] ][2] / nxyz[ mapcrs[2] ],
          basis[ mapcrs[3] ][2] / nxyz[ mapcrs[3] ],
          0,

          0, 0, 0, 1

      );
      //include translation in matrix
      this.matrix = this.matrix.multiplyMatrices(this.matrix, 
              new $3Dmol.Matrix4().makeTranslation(
                      h.NXSTART + h.originX,
                      h.NYSTART + h.originY,
                      h.NZSTART + h.originZ));
      //all translation and scaling done by matrix, so reset origin and unit
      this.origin = new $3Dmol.Vector3(0,0,0);
      this.unit = new $3Dmol.Vector3(1,1,1); 
      this.size = {x:header.NX, y:header.NY, z:header.NZ};
      var data = new Float32Array(bin.buffer, 1024 + header.NSYMBT);
      //data must by (slowest changing) x,y,z (fastest changing)

      var NX = header.NX, NY = header.NY, NZ = header.NZ;
      this.data = new Float32Array(NX*NY*NZ);
      for(var i = 0; i < NX; i++) {
          for(var j = 0; j < NY; j++) {
              for(var k = 0; k < NZ; k++) {
                  //should I be concerned that I'm not using mapc?
                  this.data[((i*NY)+j)*NZ+k] = data[((k*NY)+j)*NX+i];
              }
          }
      }

};
$3Dmol.VolumeData.prototype.ccp4.isbinary = true;
//Hackish way to create webworker (independent of $3Dmol namespace) within minified file
$3Dmol.workerString = function(){

    self.onmessage = function(oEvent) {
        var obj = oEvent.data;
        var type = obj.type;
        if (type < 0) // sending atom data, initialize
        {
            self.atomData = obj.atoms;
            self.volume = obj.volume;
            self.ps = new ProteinSurface();
        } else {
            var ps = self.ps;
            ps.initparm(obj.expandedExtent, (type == 1) ? false : true, self.volume);
            ps.fillvoxels(self.atomData, obj.extendedAtoms);
            ps.buildboundary();
            if (type === 4 || type === 2) {
                ps.fastdistancemap();
                ps.boundingatom(false);
                ps.fillvoxelswaals(self.atomData, obj.extendedAtoms);    
            }        
            ps.marchingcube(type);
            var VandF = ps.getFacesAndVertices(obj.atomsToShow);
            self.postMessage(VandF);
        }
    };
    
}.toString().replace(/(^.*?\{|\}$)/g, "");

// NOTE: variable replacement is simplified
// (See: http://stackoverflow.com/questions/1661197/what-characters-are-valid-for-javascript-variable-names)
$3Dmol.workerString += "; var ProteinSurface=" + $3Dmol.ProteinSurface.toString().replace(/[a-zA-Z_$]{1}[0-9a-zA-Z_$]*.MarchingCube./g, "MarchingCube.");
$3Dmol.workerString += ",MarchingCube=("+$3Dmol.MarchingCubeInitializer.toString() +")();";

$3Dmol.SurfaceWorker = window.URL ? window.URL.createObjectURL(new Blob([$3Dmol.workerString],{type: 'text/javascript'})) : {postMessage:function(){}};

$3Dmol['workerString'] = $3Dmol.workerString;
$3Dmol['SurfaceWorker'] = $3Dmol.SurfaceWorker;
