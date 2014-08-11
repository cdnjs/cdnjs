
#include <stdlib.h>
#include <string.h>
#include <errno.h>

#include "node.h"
#include "node_buffer.h"
#include "nan.h"

#ifdef _WIN32
  #define __alignof__ __alignof
  #define snprintf(buf, bufSize, format, arg) _snprintf_s(buf, bufSize, _TRUNCATE, format, arg)
  #define strtoll _strtoi64
  #define strtoull _strtoui64
  #define PRId64 "lld"
  #define PRIu64 "llu"
#else
  #define __STDC_FORMAT_MACROS
  #include <inttypes.h>
#endif


using namespace v8;
using namespace node;

namespace {

// used by the Int64 functions to determine whether to return a Number
// or String based on whether or not a Number will lose precision.
// http://stackoverflow.com/q/307179/376773
#define JS_MAX_INT +9007199254740992LL
#define JS_MIN_INT -9007199254740992LL

// mirrors deps/v8/src/objects.h.
// we could use `node::Buffer::kMaxLength`, but it's not defined on node v0.6.x
static const unsigned int kMaxLength = 0x3fffffff;

/*
 * Returns the pointer address as a Number of the given Buffer instance.
 * It's recommended to use `hexAddress()` in most cases instead of this function.
 *
 * WARNING: a JavaScript Number cannot precisely store a full 64-bit memory
 * address, so there's a possibility of an inaccurate value being returned
 * on 64-bit systems.
 *
 * args[0] - Buffer - the Buffer instance get the memory address of
 * args[1] - Number - optional (0) - the offset of the Buffer start at
 */

NAN_METHOD(Address) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("address: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;
  uintptr_t intptr = (uintptr_t)ptr;
  Local<Number> rtn = NanNew(static_cast<double>(intptr));

  NanReturnValue(rtn);
}

/**
 * Returns the pointer address as a hexadecimal String. This function
 * is safe to use for displaying memory addresses, as compared to the
 * `address()` function which could overflow since it returns a Number.
 *
 * args[0] - Buffer - the Buffer instance get the memory address of
 * args[1] - Number - optional (0) - the offset of the Buffer start at
 */

NAN_METHOD(HexAddress) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("hexAddress: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;
  char strbuf[30]; /* should be plenty... */
  snprintf(strbuf, 30, "%p", ptr);

  Local<String> val;
  if (strbuf[0] == '0' && strbuf[1] == 'x') {
    /* strip the leading "0x" from the address */
    val = NanNew(strbuf + 2);
  } else {
    val = NanNew(strbuf);
  }

  NanReturnValue(val);
}

/*
 * Returns "true" if the given Buffer points to NULL, "false" otherwise.
 *
 * args[0] - Buffer - the Buffer instance to check for NULL
 * args[1] - Number - optional (0) - the offset of the Buffer start at
 */

NAN_METHOD(IsNull) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("isNull: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;
  Local<Value> rtn = NanNew(ptr == NULL);

  NanReturnValue(rtn);
}

/**
 * Returns the machine endianness as C String; either "BE" or "LE".
 */

const char *CheckEndianness() {
  int i = 1;
  bool is_bigendian = (*(char *)&i) == 0;
  if (is_bigendian) {
    return "BE";
  } else {
    return "LE";
  }
}

/*
 * A callback that should never be invoked since the NULL pointer
 * wrapper Buffer should never be collected
 */

void unref_null_cb(char *data, void *hint) {
  assert(0 && "NULL Buffer should never be garbage collected");
}

/*
 * Creates the "null_pointer_buffer" Buffer instance that points to NULL.
 * It has a length of 0 so that you don't accidentally try to deref the NULL
 * pointer in JS-land by doing something like: `ref.NULL[0]`.
 */

Local<Object> WrapNullPointer() {
  size_t buf_size = 0;
  char *ptr = reinterpret_cast<char *>(NULL);
  void *user_data = NULL;
  Local<Object> buf = NanNewBufferHandle(ptr, buf_size, unref_null_cb, user_data);
  return buf;
}

/*
 * Retreives a JS Object instance that was previously stored in
 * the given Buffer instance at the given offset.
 *
 * args[0] - Buffer - the "buf" Buffer instance to read from
 * args[1] - Number - the offset from the "buf" buffer's address to read from
 */

NAN_METHOD(ReadObject) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("readObject: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  if (ptr == NULL) {
    return NanThrowError("readObject: Cannot read from NULL pointer");
  }

  Persistent<Object>* prtn = reinterpret_cast<Persistent<Object>*>(ptr);
  Local<Value> rtn = NanNew(*prtn);
  NanReturnValue(rtn);
}

/*
 * Callback function for when the weak persistent object from WriteObject
 * gets garbage collected. We just have to dispose of our weak reference now.
 */

NAN_WEAK_CALLBACK(write_object_cb) {
  //fprintf(stderr, "write_object_cb\n");
  //NanDisposePersistent(data.GetValue());
}

/*
 * Writes a Persistent reference to given Object to the given Buffer
 * instance and offset.
 *
 * args[0] - Buffer - the "buf" Buffer instance to write to
 * args[1] - Number - the offset from the "buf" buffer's address to write to
 * args[2] - Object - the "obj" Object which will have a new Persistent reference
 *                    created for the obj, who'se memory address will be written
 * args[3] - Boolean - `false` by default. if `true` is passed in then a
 *                    persistent reference will be written to the Buffer instance.
 *                    A weak reference gets written by default.
 */

NAN_METHOD(WriteObject) {
  NanScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("writeObject: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  Persistent<Object>* pptr = reinterpret_cast<Persistent<Object>*>(ptr);
  Local<Object> val = args[2].As<Object>();

  bool persistent = args[3]->BooleanValue();
  if (persistent) {
    NanAssignPersistent(*pptr, val);
  } else {
    void *user_data = NULL;
    _NanWeakCallbackInfo<Object, void>* info = NanMakeWeakPersistent(val, user_data, &write_object_cb);
    memcpy(pptr, &info->persistent, sizeof(Persistent<Object>));
  }

  NanReturnUndefined();
}

/*
 * Callback function for when the SlowBuffer created from ReadPointer gets
 * garbage collected. We don't have to do anything; Node frees the Buffer for us.
 */

void read_pointer_cb(char *data, void *hint) {
  //fprintf(stderr, "read_pointer_cb\n");
}

/*
 * Reads the memory address of the given "buf" pointer Buffer at the specified
 * offset, and returns a new SlowBuffer instance from the memory address stored.
 *
 * args[0] - Buffer - the "buf" Buffer instance to read from
 * args[1] - Number - the offset from the "buf" buffer's address to read from
 * args[2] - Number - the length in bytes of the returned SlowBuffer instance
 */

NAN_METHOD(ReadPointer) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("readPointer: Buffer instance expected as first argument");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;
  size_t size = args[2]->Uint32Value();

  if (ptr == NULL) {
    return NanThrowError("readPointer: Cannot read from NULL pointer");
  }

  char *val = *reinterpret_cast<char **>(ptr);
  void *user_data = NULL;
  Local<Object> rtn_buf = NanNewBufferHandle(val, size, read_pointer_cb, user_data);
  NanReturnValue(rtn_buf);
}

/*
 * Writes the memory address of the "input" buffer (and optional offset) to the
 * specified "buf" buffer and offset. Essentially making "buf" hold a reference
 * to the "input" Buffer.
 *
 * args[0] - Buffer - the "buf" Buffer instance to write to
 * args[1] - Number - the offset from the "buf" buffer's address to write to
 * args[2] - Buffer - the "input" Buffer whose memory address will be written
 */

NAN_METHOD(WritePointer) {
  NanScope();

  Local<Value> buf = args[0];
  Local<Value> input = args[2];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("writePointer: Buffer instance expected as first argument");
  }
  if (!(input->IsNull() || Buffer::HasInstance(input))) {
    return NanThrowTypeError("writePointer: Buffer instance expected as third argument");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  if (input->IsNull()) {
    *reinterpret_cast<char **>(ptr) = NULL;
  } else {
    char *input_ptr = Buffer::Data(input.As<Object>());
    *reinterpret_cast<char **>(ptr) = input_ptr;
  }

  NanReturnUndefined();
}

/*
 * Reads a machine-endian int64_t from the given Buffer at the given offset.
 *
 * args[0] - Buffer - the "buf" Buffer instance to read from
 * args[1] - Number - the offset from the "buf" buffer's address to read from
 */

NAN_METHOD(ReadInt64) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("readInt64: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  if (ptr == NULL) {
    return NanThrowTypeError("readInt64: Cannot read from NULL pointer");
  }

  int64_t val = *reinterpret_cast<int64_t *>(ptr);

  Local<Value> rtn;
  if (val < JS_MIN_INT || val > JS_MAX_INT) {
    // return a String
    char strbuf[128];
    snprintf(strbuf, 128, "%" PRId64, val);
    rtn = NanNew<v8::String>(strbuf);
  } else {
    // return a Number
    rtn = NanNew<v8::Number>(static_cast<double>(val));
  }

  NanReturnValue(rtn);
}

/*
 * Writes the input Number/String int64 value as a machine-endian int64_t to
 * the given Buffer at the given offset.
 *
 * args[0] - Buffer - the "buf" Buffer instance to write to
 * args[1] - Number - the offset from the "buf" buffer's address to write to
 * args[2] - String/Number - the "input" String or Number which will be written
 */

NAN_METHOD(WriteInt64) {
  NanScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("writeInt64: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  Local<Value> in = args[2];
  int64_t val;
  if (in->IsNumber()) {
    val = in->IntegerValue();
  } else if (in->IsString()) {
    // Have to do this because strtoll doesn't set errno to 0 on success :(
    errno = 0;
    String::Utf8Value str(in);
    val = strtoll(*str, NULL, 10);
    // TODO: better error handling; check errno
  } else {
    return NanThrowTypeError("writeInt64: Number/String 64-bit value required");
  }

  *reinterpret_cast<int64_t *>(ptr) = val;

  NanReturnUndefined();
}

/*
 * Reads a machine-endian uint64_t from the given Buffer at the given offset.
 *
 * args[0] - Buffer - the "buf" Buffer instance to read from
 * args[1] - Number - the offset from the "buf" buffer's address to read from
 */

NAN_METHOD(ReadUInt64) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("readUInt64: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  if (ptr == NULL) {
    return NanThrowTypeError("readUInt64: Cannot read from NULL pointer");
  }

  uint64_t val = *reinterpret_cast<uint64_t *>(ptr);

  Local<Value> rtn;
  if (val > JS_MAX_INT) {
    // return a String
    char strbuf[128];
    snprintf(strbuf, 128, "%" PRIu64, val);
    rtn = NanNew<v8::String>(strbuf);
  } else {
    // return a Number
    rtn = NanNew<v8::Number>(static_cast<double>(val));
  }

  NanReturnValue(rtn);
}

/*
 * Writes the input Number/String uint64 value as a machine-endian uint64_t to
 * the given Buffer at the given offset.
 *
 * args[0] - Buffer - the "buf" Buffer instance to write to
 * args[1] - Number - the offset from the "buf" buffer's address to write to
 * args[2] - String/Number - the "input" String or Number which will be written
 */

NAN_METHOD(WriteUInt64) {
  NanScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("writeUInt64: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  Local<Value> in = args[2];
  uint64_t val;
  if (in->IsNumber()) {
    val = in->IntegerValue();
  } else if (in->IsString()) {
    // Have to do this because strtoull doesn't set errno to 0 on success :(
    errno = 0;
    String::Utf8Value str(in);
    val = strtoull(*str, NULL, 10);
    // TODO: better error handling; check errno
  } else {
    return NanThrowTypeError("writeUInt64: Number/String 64-bit value required");
  }

  *reinterpret_cast<uint64_t *>(ptr) = val;

  NanReturnUndefined();
}

/*
 * Reads a Utf8 C String from the given pointer at the given offset (or 0).
 * I didn't want to add this function but it ends up being necessary for reading
 * past a 0 or 1 length Buffer's boundary in node-ffi :\
 *
 * args[0] - Buffer - the "buf" Buffer instance to read from
 * args[1] - Number - the offset from the "buf" buffer's address to read from
 */

NAN_METHOD(ReadCString) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("readCString: Buffer instance expected");
  }

  int64_t offset = args[1]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  if (ptr == NULL) {
    return NanThrowError("readCString: Cannot read from NULL pointer");
  }

  Local<Value> rtn = NanNew<v8::String>(ptr);
  NanReturnValue(rtn);
}

/*
 * Returns a new Buffer instance that has the same memory address
 * as the given buffer, but with the specified size.
 *
 * args[0] - Buffer - the "buf" Buffer instance to read the address from
 * args[1] - Number - the size in bytes that the returned Buffer should be
 * args[2] - Number - the offset from the "buf" buffer's address to read from
 */

NAN_METHOD(ReinterpretBuffer) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("reinterpret: Buffer instance expected");
  }

  int64_t offset = args[2]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  if (ptr == NULL) {
    return NanThrowError("reinterpret: Cannot reinterpret from NULL pointer");
  }

  size_t size = args[1]->Uint32Value();

  Local<Object> rtn = NanNewBufferHandle(ptr, size, read_pointer_cb, NULL);
  NanReturnValue(rtn);
}

/*
 * Returns a new Buffer instance that has the same memory address
 * as the given buffer, but with a length up to the first aligned set of values of
 * 0 in a row for the given length.
 *
 * args[0] - Buffer - the "buf" Buffer instance to read the address from
 * args[1] - Number - the number of sequential 0-byte values that need to be read
 * args[2] - Number - the offset from the "buf" buffer's address to read from
 */

NAN_METHOD(ReinterpretBufferUntilZeros) {
  NanEscapableScope();

  Local<Value> buf = args[0];
  if (!Buffer::HasInstance(buf)) {
    return NanThrowTypeError("reinterpretUntilZeros: Buffer instance expected");
  }

  int64_t offset = args[2]->IntegerValue();
  char *ptr = Buffer::Data(buf.As<Object>()) + offset;

  if (ptr == NULL) {
    return NanThrowError("reinterpretUntilZeros: Cannot reinterpret from NULL pointer");
  }

  uint32_t numZeros = args[1]->Uint32Value();
  uint32_t i = 0;
  size_t size = 0;
  bool end = false;

  while (!end && size < kMaxLength) {
    end = true;
    for (i = 0; i < numZeros; i++) {
      if (ptr[size + i] != 0) {
        end = false;
        break;
      }
    }
    if (!end) {
      size += numZeros;
    }
  }

  Local<Object> rtn = NanNewBufferHandle(ptr, size, read_pointer_cb, NULL);

  NanReturnValue(rtn);
}


} // anonymous namespace

void init (Handle<Object> target) {
  NanScope();

  // "sizeof" map
  Local<Object> smap = NanNew<v8::Object>();
  // fixed sizes
  smap->Set(NanNew<v8::String>("int8"),      NanNew<v8::Integer>(sizeof(int8_t)));
  smap->Set(NanNew<v8::String>("uint8"),     NanNew<v8::Integer>(sizeof(uint8_t)));
  smap->Set(NanNew<v8::String>("int16"),     NanNew<v8::Integer>(sizeof(int16_t)));
  smap->Set(NanNew<v8::String>("uint16"),    NanNew<v8::Integer>(sizeof(uint16_t)));
  smap->Set(NanNew<v8::String>("int32"),     NanNew<v8::Integer>(sizeof(int32_t)));
  smap->Set(NanNew<v8::String>("uint32"),    NanNew<v8::Integer>(sizeof(uint32_t)));
  smap->Set(NanNew<v8::String>("int64"),     NanNew<v8::Integer>(sizeof(int64_t)));
  smap->Set(NanNew<v8::String>("uint64"),    NanNew<v8::Integer>(sizeof(uint64_t)));
  smap->Set(NanNew<v8::String>("float"),     NanNew<v8::Integer>(sizeof(float)));
  smap->Set(NanNew<v8::String>("double"),    NanNew<v8::Integer>(sizeof(double)));
  // (potentially) variable sizes
  smap->Set(NanNew<v8::String>("bool"),      NanNew<v8::Integer>(sizeof(bool)));
  smap->Set(NanNew<v8::String>("byte"),      NanNew<v8::Integer>(sizeof(unsigned char)));
  smap->Set(NanNew<v8::String>("char"),      NanNew<v8::Integer>(sizeof(char)));
  smap->Set(NanNew<v8::String>("uchar"),     NanNew<v8::Integer>(sizeof(unsigned char)));
  smap->Set(NanNew<v8::String>("short"),     NanNew<v8::Integer>(sizeof(short)));
  smap->Set(NanNew<v8::String>("ushort"),    NanNew<v8::Integer>(sizeof(unsigned short)));
  smap->Set(NanNew<v8::String>("int"),       NanNew<v8::Integer>(sizeof(int)));
  smap->Set(NanNew<v8::String>("uint"),      NanNew<v8::Integer>(sizeof(unsigned int)));
  smap->Set(NanNew<v8::String>("long"),      NanNew<v8::Integer>(sizeof(long)));
  smap->Set(NanNew<v8::String>("ulong"),     NanNew<v8::Integer>(sizeof(unsigned long)));
  smap->Set(NanNew<v8::String>("longlong"),  NanNew<v8::Integer>(sizeof(long long)));
  smap->Set(NanNew<v8::String>("ulonglong"), NanNew<v8::Integer>(sizeof(unsigned long long)));
  smap->Set(NanNew<v8::String>("pointer"),   NanNew<v8::Integer>(sizeof(char *)));
  smap->Set(NanNew<v8::String>("size_t"),    NanNew<v8::Integer>(sizeof(size_t)));
  // size of a Persistent handle to a JS object
  smap->Set(NanNew<v8::String>("Object"),    NanNew<v8::Integer>(sizeof(Persistent<Object>)));

  // "alignof" map
  Local<Object> amap = NanNew<v8::Object>();
  struct int8_s { int8_t a; };
  amap->Set(NanNew<v8::String>("int8"),      NanNew<v8::Integer>(__alignof__(struct int8_s)));
  struct uint8_s { uint8_t a; };
  amap->Set(NanNew<v8::String>("uint8"),     NanNew<v8::Integer>(__alignof__(struct uint8_s)));
  struct int16_s { int16_t a; };
  amap->Set(NanNew<v8::String>("int16"),     NanNew<v8::Integer>(__alignof__(struct int16_s)));
  struct uint16_s { uint16_t a; };
  amap->Set(NanNew<v8::String>("uint16"),    NanNew<v8::Integer>(__alignof__(struct uint16_s)));
  struct int32_s { int32_t a; };
  amap->Set(NanNew<v8::String>("int32"),     NanNew<v8::Integer>(__alignof__(struct int32_s)));
  struct uint32_s { uint32_t a; };
  amap->Set(NanNew<v8::String>("uint32"),    NanNew<v8::Integer>(__alignof__(struct uint32_s)));
  struct int64_s { int64_t a; };
  amap->Set(NanNew<v8::String>("int64"),     NanNew<v8::Integer>(__alignof__(struct int64_s)));
  struct uint64_s { uint64_t a; };
  amap->Set(NanNew<v8::String>("uint64"),    NanNew<v8::Integer>(__alignof__(struct uint64_s)));
  struct float_s { float a; };
  amap->Set(NanNew<v8::String>("float"),     NanNew<v8::Integer>(__alignof__(struct float_s)));
  struct double_s { double a; };
  amap->Set(NanNew<v8::String>("double"),    NanNew<v8::Integer>(__alignof__(struct double_s)));
  struct bool_s { bool a; };
  amap->Set(NanNew<v8::String>("bool"),      NanNew<v8::Integer>(__alignof__(struct bool_s)));
  struct char_s { char a; };
  amap->Set(NanNew<v8::String>("char"),      NanNew<v8::Integer>(__alignof__(struct char_s)));
  struct uchar_s { unsigned char a; };
  amap->Set(NanNew<v8::String>("uchar"),     NanNew<v8::Integer>(__alignof__(struct uchar_s)));
  struct short_s { short a; };
  amap->Set(NanNew<v8::String>("short"),     NanNew<v8::Integer>(__alignof__(struct short_s)));
  struct ushort_s { unsigned short a; };
  amap->Set(NanNew<v8::String>("ushort"),    NanNew<v8::Integer>(__alignof__(struct ushort_s)));
  struct int_s { int a; };
  amap->Set(NanNew<v8::String>("int"),       NanNew<v8::Integer>(__alignof__(struct int_s)));
  struct uint_s { unsigned int a; };
  amap->Set(NanNew<v8::String>("uint"),      NanNew<v8::Integer>(__alignof__(struct uint_s)));
  struct long_s { long a; };
  amap->Set(NanNew<v8::String>("long"),      NanNew<v8::Integer>(__alignof__(struct long_s)));
  struct ulong_s { unsigned long a; };
  amap->Set(NanNew<v8::String>("ulong"),     NanNew<v8::Integer>(__alignof__(struct ulong_s)));
  struct longlong_s { long long a; };
  amap->Set(NanNew<v8::String>("longlong"),  NanNew<v8::Integer>(__alignof__(struct longlong_s)));
  struct ulonglong_s { unsigned long long a; };
  amap->Set(NanNew<v8::String>("ulonglong"), NanNew<v8::Integer>(__alignof__(struct ulonglong_s)));
  struct pointer_s { char *a; };
  amap->Set(NanNew<v8::String>("pointer"),   NanNew<v8::Integer>(__alignof__(struct pointer_s)));
  struct size_t_s { size_t a; };
  amap->Set(NanNew<v8::String>("size_t"),    NanNew<v8::Integer>(__alignof__(struct size_t_s)));
  struct Object_s { Persistent<Object> a; };
  amap->Set(NanNew<v8::String>("Object"),    NanNew<v8::Integer>(__alignof__(struct Object_s)));

  // exports
  target->Set(NanNew<v8::String>("sizeof"), smap);
  target->Set(NanNew<v8::String>("alignof"), amap);
  target->Set(NanNew<v8::String>("endianness"), NanNew<v8::String>(CheckEndianness()), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
  target->Set(NanNew<v8::String>("NULL"), WrapNullPointer(), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
  NODE_SET_METHOD(target, "address", Address);
  NODE_SET_METHOD(target, "hexAddress", HexAddress);
  NODE_SET_METHOD(target, "isNull", IsNull);
  NODE_SET_METHOD(target, "readObject", ReadObject);
  NODE_SET_METHOD(target, "writeObject", WriteObject);
  NODE_SET_METHOD(target, "readPointer", ReadPointer);
  NODE_SET_METHOD(target, "writePointer", WritePointer);
  NODE_SET_METHOD(target, "readInt64", ReadInt64);
  NODE_SET_METHOD(target, "writeInt64", WriteInt64);
  NODE_SET_METHOD(target, "readUInt64", ReadUInt64);
  NODE_SET_METHOD(target, "writeUInt64", WriteUInt64);
  NODE_SET_METHOD(target, "readCString", ReadCString);
  NODE_SET_METHOD(target, "reinterpret", ReinterpretBuffer);
  NODE_SET_METHOD(target, "reinterpretUntilZeros", ReinterpretBufferUntilZeros);
}
NODE_MODULE(binding, init);
