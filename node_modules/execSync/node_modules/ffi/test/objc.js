
var assert = require('assert');
var ref = require('ref');
var ffi = require('../');
var voidPtr = ref.refType(ref.types.void);

// these are "opaque" pointer types, so we only care about the memory addess,
// and not the contents (which are internal to Apple). Therefore we can typedef
// these opaque types to `void *` and it's essentially the same thing.
var id = voidPtr;
var SEL = voidPtr;
var Class = voidPtr;

if (ffi.HAS_OBJC) {

  describe('@try / @catch', function () {

    afterEach(gc);

    var objcLib = new ffi.Library('libobjc', {
      'objc_msgSend': [ id, [ id, SEL ] ],
      'objc_getClass': [ Class, [ 'string' ] ],
      'sel_registerName': [ SEL, [ 'string' ] ]
    });

    // create an NSAutoreleasePool instance
    var NSAutoreleasePool = objcLib.objc_getClass('NSAutoreleasePool');
    var sel_new = objcLib.sel_registerName('new');
    var pool = objcLib.objc_msgSend(NSAutoreleasePool, sel_new);

    it('should proxy @try/@catch to JavaScript via try/catch/throw', function () {
      var sel_retain = objcLib.sel_registerName('retain')
      try {
        objcLib.objc_msgSend(pool, sel_retain);
        assert(false); // unreachable
      } catch (e) {
        assert(e);
      }
    });

    it('should throw a Buffer instance when an exception happens', function () {
      var sel_retain = objcLib.sel_registerName('retain');
      try {
        objcLib.objc_msgSend(pool, sel_retain);
        assert(false); // unreachable
      } catch (e) {
        assert(Buffer.isBuffer(e));
        assert(!e.isNull());
        assert(e.address() > 0);
      }
    });

  });

}
