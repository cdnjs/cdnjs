/*!
 * MD5 WebAssembly
 * https://github.com/briantbutton/md5-wasm
 * (c) 2020 Brian Todd Button
 * Released under the MIT license
 */


// *-*=*  *=*-* *-*=*  *=*-* *-*=*  *=*-* *-*=*  *=*-* *-*=*  *=*-* *-*=*  *=*-*
// This contains two functions designed to achieve the same thing
//   -> A WebAssembly function for larger files 
//   -> A JavaScript function for the others
// 
(function() {

  const atb             = typeof atob === "function" ? atob : typeof Buffer === "function" ? nodeATOB : identity,
        wasmB64         = atb("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"),
        wasm            = WebAssembly && atb !== identity ? str2AB(wasmB64).buffer : false,
        crypt           = makeCrypt(),
        biteSize        = 240*16*16,
        bounder         = Math.floor(biteSize*16*1.066666667),
        upperLimit      = 268435456-65536,
        parmTypeErrStr  = "Parameter must be Buffer, ArrayBuffer or Uint8Array",
        tooBigErrStr    = "Parameter exceeds max size of 255.9 Mbytes";

  if ( !wasm ) {
    console.log("WebAssembly not available or WASM module could not be decoded; md5WASM will fall back to JavaScript")
  }
  // ^>
  if ( typeof module === 'object' && module.exports ) {
    module.exports      = md5WASM
  }
  if ( typeof define === 'function' && define.amd ) {
    define ( 'md5WASM' , [], function() { return md5WASM } )
  }
  if ( typeof window !== "undefined" ) {
    window.md5WASM      = md5WASM
  }
  // <^

  return md5WASM;

  //  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
  // This returns a Promise with resolves to the checksum
  function md5WASM(data){
    var   mem,memView,importObj,imports,len,buff,result,endTime,initial;
    const md5JS         = makeMD5JS(),
          md5WA         = makeMD5WA(),
          returnObj     = {},
          startTime     = new Date().getTime(),
          log           = console.log;

    return new Promise(function(resolve,reject){

      //  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   
      // Sift the incoming parameter and the environment
      // If we are good, set buff
      if ( data && typeof data === "object" ) {
        if ( typeof Buffer === "function" && data.constructor === Buffer ) {
          buff          = data
        }else{
          if ( data.constructor === Uint8Array || data.constructor === ArrayBuffer ) {
            buff        = data.constructor === ArrayBuffer ? new Uint8Array ( data ) : data
          }else{
            reject(new TypeError(parmTypeErrStr))
          }
        }
      }else{
        reject(new TypeError(parmTypeErrStr))
      }

      //  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  
      // Make some choices based on the size of the incoming data
      //   ~ Use WebAssembly or just JavaScript
      //   ~ If Webassemly, allocate appropriate memory
      // 
      if ( buff ) {
        len             = buff.length;
        initial         = webAssemblyPages(len);
        if ( wasm && len > bounder ) {
          if( len > upperLimit ) {
            reject(new Error(tooBigErrStr))
          }else{
            mem         = new WebAssembly.Memory({initial});
            memView     = new Uint32Array(mem.buffer);
            imports     = {mem,log};
            importObj   = {imports};
            WebAssembly.instantiate(wasm,importObj).then(giterdone)
          }
        }else{
          finish(md5JS(buff))
        }
      }
      function giterdone(obj){
        finish(md5WA(buff,obj.instance.exports,memView))
      }
      function finish(result){
        endTime           = new Date().getTime();
        resolve(result,endTime-startTime);
      }
    })
  }

  function makeMD5WA(){
    var   loop,loops;
    var   getA,setA,getB,setB,getC,setC,getD,setD,getX,setX,memView;

    var md5WA           = function (message) {
      var m00,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,m13,m14,m15,aa,bb,cc,dd,m,k;
      var qwerty        = new Date().getTime();
      var md5Used       = 0;

      var a             =  1732584193,
          b             = -271733879,
          c             = -1732584194,
          d             =  271733878,
          i             =  0,
          l             = message.length*8,len;

      len               = bytesToWordsNewer(message,memView);
      memView[l >>> 5] |= 0x80 << (l % 32);
      memView[(((l + 64) >>> 9) << 4) + 14] = l;
      len               = (((l + 64) >>> 9) << 4) + 15;
      m                 = memView

      // console.log("first loop took "+((new Date().getTime())-qwerty)+"ms");

      while ( i < len ) {
        if(len>i+bounder){
          setA(a);
          setB(b);
          setC(c);
          setD(d);
          loops(biteSize);
          i             = i + biteSize*16;
          a             = getA();
          b             = getB();
          c             = getC();
          d             = getD();
          md5Used++ 
        }else{
          aa            = a;
          bb            = b;
          cc            = c;
          dd            = d;
          m00           =  m[i+ 0] >>> 0;
          m01           =  m[i+ 1] >>> 0;
          m02           =  m[i+ 2] >>> 0;
          m03           =  m[i+ 3] >>> 0;
          m04           =  m[i+ 4] >>> 0;
          m05           =  m[i+ 5] >>> 0;
          m06           =  m[i+ 6] >>> 0;
          m07           =  m[i+ 7] >>> 0;
          m08           =  m[i+ 8] >>> 0;
          m09           =  m[i+ 9] >>> 0;
          m10           =  m[i+10] >>> 0;
          m11           =  m[i+11] >>> 0;
          m12           =  m[i+12] >>> 0;
          m13           =  m[i+13] >>> 0;
          m14           =  m[i+14] >>> 0;
          m15           =  m[i+15] >>> 0;

          a             = ____( 7, 25, a + ( b & c | ~b & d ) + m00 - 680876936) + b ;
          d             = ____(12, 20, d + ( a & b | ~a & c ) + m01 - 389564586) + a ;
          c             = ____(17, 15, c + ( d & a | ~d & b ) + m02 + 606105819) + d ;
          b             = ____(22, 10, b + ( c & d | ~c & a ) + m03 - 1044525330) + c ;
          a             = ____( 7, 25, a + ( b & c | ~b & d ) + m04 - 176418897) + b ;
          d             = ____(12, 20, d + ( a & b | ~a & c ) + m05 + 1200080426) + a ;
          c             = ____(17, 15, c + ( d & a | ~d & b ) + m06 - 1473231341) + d ;
          b             = ____(22, 10, b + ( c & d | ~c & a ) + m07 - 45705983) + c ;
          a             = ____( 7, 25, a + ( b & c | ~b & d ) + m08 + 1770035416) + b ;
          d             = ____(12, 20, d + ( a & b | ~a & c ) + m09 - 1958414417) + a ;
          c             = ____(17, 15, c + ( d & a | ~d & b ) + m10 - 42063) + d ;
          b             = ____(22, 10, b + ( c & d | ~c & a ) + m11 - 1990404162) + c ;
          a             = ____( 7, 25, a + ( b & c | ~b & d ) + m12 + 1804603682) + b ;
          d             = ____(12, 20, d + ( a & b | ~a & c ) + m13 - 40341101) + a ;
          c             = ____(17, 15, c + ( d & a | ~d & b ) + m14 - 1502002290) + d ;
          b             = ____(22, 10, b + ( c & d | ~c & a ) + m15 + 1236535329) + c ;

          a             = ____( 5, 27, a + ( b & d | c & ~d ) + m01 - 165796510) + b ;
          d             = ____( 9, 23, d + ( a & c | b & ~c ) + m06 - 1069501632) + a ;
          c             = ____(14, 18, c + ( d & b | a & ~b ) + m11 + 643717713) + d ;
          b             = ____(20, 12, b + ( c & a | d & ~a ) + m00 - 373897302) + c ;
          a             = ____( 5, 27, a + ( b & d | c & ~d ) + m05 - 701558691) + b ;
          d             = ____( 9, 23, d + ( a & c | b & ~c ) + m10 + 38016083) + a ;
          c             = ____(14, 18, c + ( d & b | a & ~b ) + m15 - 660478335) + d ;
          b             = ____(20, 12, b + ( c & a | d & ~a ) + m04 - 405537848) + c ;
          a             = ____( 5, 27, a + ( b & d | c & ~d ) + m09 + 568446438) + b ;
          d             = ____( 9, 23, d + ( a & c | b & ~c ) + m14 - 1019803690) + a ;
          c             = ____(14, 18, c + ( d & b | a & ~b ) + m03 - 187363961) + d ;
          b             = ____(20, 12, b + ( c & a | d & ~a ) + m08 + 1163531501) + c ;
          a             = ____( 5, 27, a + ( b & d | c & ~d ) + m13 - 1444681467) + b ;
          d             = ____( 9, 23, d + ( a & c | b & ~c ) + m02 - 51403784) + a ;
          c             = ____(14, 18, c + ( d & b | a & ~b ) + m07 + 1735328473) + d ;
          b             = ____(20, 12, b + ( c & a | d & ~a ) + m12 - 1926607734) + c ;

          a             = ____( 4, 28, a + (b ^ c ^ d) + m05 - 378558) + b ;
          d             = ____(11, 21, d + (a ^ b ^ c) + m08 - 2022574463) + a ;
          c             = ____(16, 16, c + (d ^ a ^ b) + m11 + 1839030562) + d ;
          b             = ____(23,  9, b + (c ^ d ^ a) + m14 - 35309556) + c ;
          a             = ____( 4, 28, a + (b ^ c ^ d) + m01 - 1530992060) + b ;
          d             = ____(11, 21, d + (a ^ b ^ c) + m04 + 1272893353) + a ;
          c             = ____(16, 16, c + (d ^ a ^ b) + m07 - 155497632) + d ;
          b             = ____(23,  9, b + (c ^ d ^ a) + m10 - 1094730640) + c ;
          a             = ____( 4, 28, a + (b ^ c ^ d) + m13 + 681279174) + b ;
          d             = ____(11, 21, d + (a ^ b ^ c) + m00 - 358537222) + a ;
          c             = ____(16, 16, c + (d ^ a ^ b) + m03 - 722521979) + d ;
          b             = ____(23,  9, b + (c ^ d ^ a) + m06 + 76029189) + c ;
          a             = ____( 4, 28, a + (b ^ c ^ d) + m09 - 640364487) + b ;
          d             = ____(11, 21, d + (a ^ b ^ c) + m12 - 421815835) + a ;
          c             = ____(16, 16, c + (d ^ a ^ b) + m15 + 530742520) + d ;
          b             = ____(23,  9, b + (c ^ d ^ a) + m02 - 995338651) + c ;

          a             = ____( 6, 26, a + (c ^ (b | ~d)) + m00 - 198630844) + b ;
          d             = ____(10, 22, d + (b ^ (a | ~c)) + m07 + 1126891415) + a ;
          c             = ____(15, 17, c + (a ^ (d | ~b)) + m14 - 1416354905) + d ;
          b             = ____(21, 11, b + (d ^ (c | ~a)) + m05 - 57434055) + c ;
          a             = ____( 6, 26, a + (c ^ (b | ~d)) + m12 + 1700485571) + b ;
          d             = ____(10, 22, d + (b ^ (a | ~c)) + m03 - 1894986606) + a ;
          c             = ____(15, 17, c + (a ^ (d | ~b)) + m10 - 1051523) + d ;
          b             = ____(21, 11, b + (d ^ (c | ~a)) + m01 - 2054922799) + c ;
          a             = ____( 6, 26, a + (c ^ (b | ~d)) + m08 + 1873313359) + b ;
          d             = ____(10, 22, d + (b ^ (a | ~c)) + m15 - 30611744) + a ;
          c             = ____(15, 17, c + (a ^ (d | ~b)) + m06 - 1560198380) + d ;
          b             = ____(21, 11, b + (d ^ (c | ~a)) + m13 + 1309151649) + c ;
          a             = ____( 6, 26, a + (c ^ (b | ~d)) + m04 - 145523070) + b ;
          d             = ____(10, 22, d + (b ^ (a | ~c)) + m11 - 1120210379) + a ;
          c             = ____(15, 17, c + (a ^ (d | ~b)) + m02 + 718787259) + d ;
          b             = ____(21, 11, b + (d ^ (c | ~a)) + m09 - 343485551) + c ;

          i             = i + 16;
          a = (a + aa) >>> 0;
          b = (b + bb) >>> 0;
          c = (c + cc) >>> 0;
          d = (d + dd) >>> 0;
        }
      }

      // console.log("md5WA, elapsed="+((new Date().getTime())-qwerty)+(md5Used?", WebAssembly called "+md5Used+" times":", WebAssembly not called"));

      return crypt.endian([a, b, c, d]);

      function ____(s,t,n){ return ( ( n << s ) | ( n >>> t ) ) }

      // Convert a byte array to big-endian 32-bit words
      function bytesToWordsNewer(bytes,words) {
        var i           = -1,
            l           = Math.floor((bytes.length-1)/4),
            j           = 0,b0,b1,b2,b3;
        while(l-8>i++){
          j             = i<<2;
          words[i]      = (bytes[j+0]) | (bytes[j+1]<<8) | (bytes[j+2]<<16) | (bytes[j+3]<<24)
        }
        i--;
        while(l>i++){
          j             = i<<2;
          b0            = typeof bytes[j+0] === "undefined" ? 0 : bytes[j+0];
          b1            = typeof bytes[j+1] === "undefined" ? 0 : bytes[j+1];
          b2            = typeof bytes[j+2] === "undefined" ? 0 : bytes[j+2];
          b3            = typeof bytes[j+3] === "undefined" ? 0 : bytes[j+3];
          words[i]      = b0 | b1<<8 | b2<<16 | b3<<24
        }
        return l+1;
      }
    };

    return function (message,exports,mView,options) {
      var digestbytes;
      loops             = exports.loops;
      loop              = exports.loop;
      getA              = exports.getA;
      getB              = exports.getB;
      getC              = exports.getC;
      getD              = exports.getD;
      getX              = exports.getX;
      setA              = exports.setA;
      setB              = exports.setB;
      setC              = exports.setC;
      setD              = exports.setD;
      setX              = exports.setX;
      memView           = mView;
      digestbytes       = crypt.wordsToBytes(md5WA(message));
      return options&&options.asBytes?digestbytes:crypt.bytesToHex(digestbytes)
    }
  }

  function makeMD5JS(){

    var md5JS         = function (message, options) {
      var m00,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,m13,m14,m15,aa,bb,cc,dd,m;
      var qwerty      = new Date().getTime();

      // console.log("md5 start");

      var a           =  1732584193,
          b           = -271733879,
          c           = -1732584194,
          d           =  271733878,
          l           = message.length * 8;

      m               = crypt.bytesToWords(message);

      // Swap endian
      for (var j = 0; j < m.length; j++) {
        m[j] = ((m[j] <<  8) | (m[j] >>> 24)) & 0x00FF00FF | ((m[j] << 24) | (m[j] >>>  8)) & 0xFF00FF00;
      }

      // Padding
      m[l >>> 5] |= 0x80 << (l % 32);
      m[(((l + 64) >>> 9) << 4) + 14] = l;

      for (var i = 0; i < m.length ; i += 16) {
        aa            = a;
        bb            = b;
        cc            = c;
        dd            = d;
        m00           = m[i+ 0] >>> 0;
        m01           = m[i+ 1] >>> 0;
        m02           = m[i+ 2] >>> 0;
        m03           = m[i+ 3] >>> 0;
        m04           = m[i+ 4] >>> 0;
        m05           = m[i+ 5] >>> 0;
        m06           = m[i+ 6] >>> 0;
        m07           = m[i+ 7] >>> 0;
        m08           = m[i+ 8] >>> 0;
        m09           = m[i+ 9] >>> 0;
        m10           = m[i+10] >>> 0;
        m11           = m[i+11] >>> 0;
        m12           = m[i+12] >>> 0;
        m13           = m[i+13] >>> 0;
        m14           = m[i+14] >>> 0;
        m15           = m[i+15] >>> 0;

        a             = ____( 7, 25, a + ( b & c | ~b & d ) + m00 - 680876936) + b ;
        d             = ____(12, 20, d + ( a & b | ~a & c ) + m01 - 389564586) + a ;
        c             = ____(17, 15, c + ( d & a | ~d & b ) + m02 + 606105819) + d ;
        b             = ____(22, 10, b + ( c & d | ~c & a ) + m03 - 1044525330) + c ;
        a             = ____( 7, 25, a + ( b & c | ~b & d ) + m04 - 176418897) + b ;
        d             = ____(12, 20, d + ( a & b | ~a & c ) + m05 + 1200080426) + a ;
        c             = ____(17, 15, c + ( d & a | ~d & b ) + m06 - 1473231341) + d ;
        b             = ____(22, 10, b + ( c & d | ~c & a ) + m07 - 45705983) + c ;
        a             = ____( 7, 25, a + ( b & c | ~b & d ) + m08 + 1770035416) + b ;
        d             = ____(12, 20, d + ( a & b | ~a & c ) + m09 - 1958414417) + a ;
        c             = ____(17, 15, c + ( d & a | ~d & b ) + m10 - 42063) + d ;
        b             = ____(22, 10, b + ( c & d | ~c & a ) + m11 - 1990404162) + c ;
        a             = ____( 7, 25, a + ( b & c | ~b & d ) + m12 + 1804603682) + b ;
        d             = ____(12, 20, d + ( a & b | ~a & c ) + m13 - 40341101) + a ;
        c             = ____(17, 15, c + ( d & a | ~d & b ) + m14 - 1502002290) + d ;
        b             = ____(22, 10, b + ( c & d | ~c & a ) + m15 + 1236535329) + c ;

        a             = ____( 5, 27, a + ( b & d | c & ~d ) + m01 - 165796510) + b ;
        d             = ____( 9, 23, d + ( a & c | b & ~c ) + m06 - 1069501632) + a ;
        c             = ____(14, 18, c + ( d & b | a & ~b ) + m11 + 643717713) + d ;
        b             = ____(20, 12, b + ( c & a | d & ~a ) + m00 - 373897302) + c ;
        a             = ____( 5, 27, a + ( b & d | c & ~d ) + m05 - 701558691) + b ;
        d             = ____( 9, 23, d + ( a & c | b & ~c ) + m10 + 38016083) + a ;
        c             = ____(14, 18, c + ( d & b | a & ~b ) + m15 - 660478335) + d ;
        b             = ____(20, 12, b + ( c & a | d & ~a ) + m04 - 405537848) + c ;
        a             = ____( 5, 27, a + ( b & d | c & ~d ) + m09 + 568446438) + b ;
        d             = ____( 9, 23, d + ( a & c | b & ~c ) + m14 - 1019803690) + a ;
        c             = ____(14, 18, c + ( d & b | a & ~b ) + m03 - 187363961) + d ;
        b             = ____(20, 12, b + ( c & a | d & ~a ) + m08 + 1163531501) + c ;
        a             = ____( 5, 27, a + ( b & d | c & ~d ) + m13 - 1444681467) + b ;
        d             = ____( 9, 23, d + ( a & c | b & ~c ) + m02 - 51403784) + a ;
        c             = ____(14, 18, c + ( d & b | a & ~b ) + m07 + 1735328473) + d ;
        b             = ____(20, 12, b + ( c & a | d & ~a ) + m12 - 1926607734) + c ;

        a             = ____( 4, 28, a + (b ^ c ^ d) + m05 - 378558) + b ;
        d             = ____(11, 21, d + (a ^ b ^ c) + m08 - 2022574463) + a ;
        c             = ____(16, 16, c + (d ^ a ^ b) + m11 + 1839030562) + d ;
        b             = ____(23,  9, b + (c ^ d ^ a) + m14 - 35309556) + c ;
        a             = ____( 4, 28, a + (b ^ c ^ d) + m01 - 1530992060) + b ;
        d             = ____(11, 21, d + (a ^ b ^ c) + m04 + 1272893353) + a ;
        c             = ____(16, 16, c + (d ^ a ^ b) + m07 - 155497632) + d ;
        b             = ____(23,  9, b + (c ^ d ^ a) + m10 - 1094730640) + c ;
        a             = ____( 4, 28, a + (b ^ c ^ d) + m13 + 681279174) + b ;
        d             = ____(11, 21, d + (a ^ b ^ c) + m00 - 358537222) + a ;
        c             = ____(16, 16, c + (d ^ a ^ b) + m03 - 722521979) + d ;
        b             = ____(23,  9, b + (c ^ d ^ a) + m06 + 76029189) + c ;
        a             = ____( 4, 28, a + (b ^ c ^ d) + m09 - 640364487) + b ;
        d             = ____(11, 21, d + (a ^ b ^ c) + m12 - 421815835) + a ;
        c             = ____(16, 16, c + (d ^ a ^ b) + m15 + 530742520) + d ;
        b             = ____(23,  9, b + (c ^ d ^ a) + m02 - 995338651) + c ;

        a             = ____( 6, 26, a + (c ^ (b | ~d)) + m00 - 198630844) + b ;
        d             = ____(10, 22, d + (b ^ (a | ~c)) + m07 + 1126891415) + a ;
        c             = ____(15, 17, c + (a ^ (d | ~b)) + m14 - 1416354905) + d ;
        b             = ____(21, 11, b + (d ^ (c | ~a)) + m05 - 57434055) + c ;
        a             = ____( 6, 26, a + (c ^ (b | ~d)) + m12 + 1700485571) + b ;
        d             = ____(10, 22, d + (b ^ (a | ~c)) + m03 - 1894986606) + a ;
        c             = ____(15, 17, c + (a ^ (d | ~b)) + m10 - 1051523) + d ;
        b             = ____(21, 11, b + (d ^ (c | ~a)) + m01 - 2054922799) + c ;
        a             = ____( 6, 26, a + (c ^ (b | ~d)) + m08 + 1873313359) + b ;
        d             = ____(10, 22, d + (b ^ (a | ~c)) + m15 - 30611744) + a ;
        c             = ____(15, 17, c + (a ^ (d | ~b)) + m06 - 1560198380) + d ;
        b             = ____(21, 11, b + (d ^ (c | ~a)) + m13 + 1309151649) + c ;
        a             = ____( 6, 26, a + (c ^ (b | ~d)) + m04 - 145523070) + b ;
        d             = ____(10, 22, d + (b ^ (a | ~c)) + m11 - 1120210379) + a ;
        c             = ____(15, 17, c + (a ^ (d | ~b)) + m02 + 718787259) + d ;
        b             = ____(21, 11, b + (d ^ (c | ~a)) + m09 - 343485551) + c ;

        a = (a + aa) >>> 0;
        b = (b + bb) >>> 0;
        c = (c + cc) >>> 0;
        d = (d + dd) >>> 0;
      }

      // console.log("md5JS, elapsed="+((new Date().getTime())-qwerty));

      return crypt.endian([a, b, c, d]);

      function ____(s,t,n){ return ( ( n << s ) | ( n >>> t ) ) }
    };

    return function (message, options) {
      var digestbytes = crypt.wordsToBytes(md5JS(message, options));
      return options&&options.asBytes?digestbytes:crypt.bytesToHex(digestbytes)
    }
  }
  function str2AB(str) {
    var l,buff,buffView,i=-1;
    l                 = str.length-1;
    buff              = new ArrayBuffer(str.length);
    buffView          = new Uint8Array(buff);
    while(l>i++){
      buffView[i]     = str.charCodeAt(i)
    }
    return buffView
  }
  function nodeATOB(str){
    return Buffer.from(str,"base64").toString("binary")
  }
  function identity(x){
    return x
  }
  function webAssemblyPages(len){
    return len>32000000?len>64000000?len>128000000?4096:2048:1024:512
  }

  function makeCrypt() {
    var base64map  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    return {
      rotl: function(n, b) {
        return (n << b) | (n >>> (32 - b));
      },

      endian: function(n) {
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
        }
        for (var i = 0; i < n.length; i++)
          n[i] = crypt.endian(n[i]);
        return n;
      },

      bytesToWords: function(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
          words[b >>> 5] |= bytes[i] << (24 - b % 32);
        return words;
      },

      wordsToBytes: function(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8)
          bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
        return bytes;
      },

      bytesToHex: function(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join('');
      }
    }
  }
})()
