#include <stdlib.h>
#include <string.h>
#include "v8.h"
#include "node.h"
#include "node_buffer.h"

using namespace v8;
using namespace node;

namespace {

/*
 * Test struct definition used in the test harness functions below.
 */

typedef struct box {
  int width;
  int height;
} _box;

/*
 * Accepts a struct by value, and returns a struct by value.
 */

box double_box(box input) {
  box rtn;
  // modify the input box, ensure on the JS side that it's not altered
  input.width *= 2;
  input.height *= 2;
  rtn.width = input.width;
  rtn.height = input.height;
  return rtn;
}

/*
 * Accepts a box struct pointer, and returns a struct by value.
 */

box double_box_ptr(box *input) {
  box rtn;
  // modify the input box, ensure on the JS side that IT IS altered
  input->width *= 2;
  input->height *= 2;
  rtn.width = input->width;
  rtn.height = input->height;
  return rtn;
}

/*
 * Accepts a struct by value, and returns an int.
 */

int area_box(box input) {
  return input.width * input.height;
}

/*
 * Accepts a box pointer and returns an int.
 */

int area_box_ptr(box *input) {
  return input->width * input->height;
}

/*
 * Creates a box and returns it by value.
 */

box create_box(int width, int height) {
  box rtn = { width, height };
  return rtn;
}

/*
 * Creates a box that has the sum of the width and height for its own values.
 */

box add_boxes(box boxes[], int num) {
  box rtn = { 0, 0 };
  box cur;
  for (int i = 0; i < num; i++) {
    cur = boxes[i];
    rtn.width += cur.width;
    rtn.height += cur.height;
  }
  return rtn;
}

/*
 * Reads "ints" from the "input" array until a NULL pointer is found.
 * Returns the number of elements in the array.
 */

int *int_array(int *input) {
  int *array = input;
  while (*array != -1){
    *array = *array * 2;
    array++;
  }
  return input;
}

/*
 * Tests for passing a Struct that contains Arrays inside of it.
 */

struct arst {
  int num;
  double array[20];
};

struct arst array_in_struct (struct arst input) {
  struct arst rtn;
  rtn.num = input.num * 2;
  for (int i = 0; i < 20; i++) {
    rtn.array[i] = input.array[i] * 3.14;
  }
  return rtn;
}

/*
 * Tests for C function pointers.
 */

typedef int (*my_callback)(int);

my_callback callback_func (my_callback cb) {
  return cb;
}

/*
 * Hard-coded `strtoul` binding, for the benchmarks.
 *
 * args[0] - the string number to convert to a real Number
 * args[1] - a "buffer" instance to write into (the "endptr")
 * args[2] - the base (0 means autodetect)
 */

Handle<Value> Strtoul(const Arguments &args) {
  HandleScope scope;
  char buf[128];
  int base;
  char **endptr;

  args[0]->ToString()->WriteUtf8(buf);

  Local<Value> endptr_arg = args[0];
  endptr = (char **)Buffer::Data(endptr_arg.As<Object>());

  base = args[2]->Int32Value();

  unsigned long val = strtoul(buf, endptr, base);

  return scope.Close(Integer::NewFromUnsigned(val));
}


// experiments for #72
typedef void (*cb)(void);

static cb callback = NULL;

Handle<Value> SetCb(const Arguments &args) {
  HandleScope scope;
  char *buf = Buffer::Data(args[0].As<Object>());
  callback = (cb)buf;
  return scope.Close(Undefined());
}

Handle<Value> CallCb(const Arguments &args) {
  if (callback == NULL) {
    return ThrowException(Exception::Error(String::New("you must call \"set_cb()\" first")));
  } else {
    callback();
  }
  return Undefined();
}

void AsyncCbCall(uv_work_t *req) {
  cb c = (cb)req->data;
  c();
}

void FinishAsyncCbCall(uv_work_t *req) {
  // nothing
  delete req;
}

Handle<Value> CallCbAsync(const Arguments &args) {
  if (callback == NULL) {
    return ThrowException(Exception::Error(String::New("you must call \"set_cb()\" first")));
  } else {
    uv_work_t *req = new uv_work_t;
    req->data = (void *)callback;
    uv_queue_work(uv_default_loop(), req, AsyncCbCall, (uv_after_work_cb)FinishAsyncCbCall);
  }
  return Undefined();
}


// Race condition in threaded callback invocation testing, see #153
void play_ping_pong (const char* (*callback) (const char*)) {
  const char * response;
  do {
    response = callback("ping");
  } while (strcmp(response, "pong") == 0);
}

void wrap_pointer_cb(char *data, void *hint) {
  //fprintf(stderr, "wrap_pointer_cb\n");
}

Handle<Object> WrapPointer(char *ptr) {
  void *user_data = NULL;
  size_t length = 0;
  Buffer *buf = Buffer::New(ptr, length, wrap_pointer_cb, user_data);
  return buf->handle_;
}

void Initialize(Handle<Object> target) {
  HandleScope scope;

#if WIN32
  // initialize "floating point support" on Windows?!?!
  // (this is some serious bullshit...)
  // http://support.microsoft.com/kb/37507
  float x = 2.3f;
#endif

  // atoi and abs here for testing purposes
  target->Set(String::NewSymbol("atoi"), WrapPointer((char *)atoi));

  // Windows has multiple `abs` signatures, so we need to manually disambiguate
  int (*absPtr)(int)(abs);
  target->Set(String::NewSymbol("abs"),  WrapPointer((char *)absPtr));

  // sprintf pointer; used in the varadic tests
  target->Set(String::NewSymbol("sprintf"),  WrapPointer((char *)sprintf));

  // hard-coded `strtoul` binding, for the benchmarks
  NODE_SET_METHOD(target, "strtoul", Strtoul);

  NODE_SET_METHOD(target, "set_cb", SetCb);
  NODE_SET_METHOD(target, "call_cb", CallCb);
  NODE_SET_METHOD(target, "call_cb_async", CallCbAsync);

  // also need to test these custom functions
  target->Set(String::NewSymbol("double_box"), WrapPointer((char *)double_box));
  target->Set(String::NewSymbol("double_box_ptr"), WrapPointer((char *)double_box_ptr));
  target->Set(String::NewSymbol("area_box"), WrapPointer((char *)area_box));
  target->Set(String::NewSymbol("area_box_ptr"), WrapPointer((char *)area_box_ptr));
  target->Set(String::NewSymbol("create_box"), WrapPointer((char *)create_box));
  target->Set(String::NewSymbol("add_boxes"), WrapPointer((char *)add_boxes));
  target->Set(String::NewSymbol("int_array"), WrapPointer((char *)int_array));
  target->Set(String::NewSymbol("array_in_struct"), WrapPointer((char *)array_in_struct));
  target->Set(String::NewSymbol("callback_func"), WrapPointer((char *)callback_func));
  target->Set(String::NewSymbol("play_ping_pong"), WrapPointer((char *)play_ping_pong));
}

} // anonymous namespace

NODE_MODULE(ffi_tests, Initialize);
