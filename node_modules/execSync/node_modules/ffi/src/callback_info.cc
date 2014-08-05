
// Reference:
//   http://www.bufferoverflow.ch/cgi-bin/dwww/usr/share/doc/libffi5/html/The-Closure-API.html

#include <node_buffer.h>
#include <node_version.h>
#include "ffi.h"

pthread_t          CallbackInfo::g_mainthread;
pthread_mutex_t    CallbackInfo::g_queue_mutex;
std::queue<ThreadedCallbackInvokation *> CallbackInfo::g_queue;
uv_async_t         CallbackInfo::g_async;

/*
 * Called when the `ffi_closure *` pointer (actually the "code" pointer) get's
 * GC'd on the JavaScript side. In this case we have to unwrap the
 * `callback_info *` struct, dispose of the JS function Persistent reference,
 * then finally free the struct.
 */

void closure_pointer_cb(char *data, void *hint) {
  callback_info *info = reinterpret_cast<callback_info *>(hint);
  // dispose of the Persistent function reference
  info->function.Dispose();
  info->function.Clear();
  // now we can free the closure data
  ffi_closure_free(info);
}

/*
 * Invokes the JS callback function.
 */

void CallbackInfo::DispatchToV8(callback_info *info, void *retval, void **parameters, bool direct) {
  HandleScope scope;

  Handle<Value> argv[2];
  argv[0] = WrapPointer((char *)retval, info->resultSize);
  argv[1] = WrapPointer((char *)parameters, sizeof(char *) * info->argc);

  TryCatch try_catch;

  if (info->function.IsEmpty()) {
    // throw an error instead of segfaulting.
    // see: https://github.com/rbranson/node-ffi/issues/72
    ThrowException(Exception::Error(
          String::New("ffi fatal: callback has been garbage collected!")));
    return;
  } else {
    // invoke the registered callback function
    info->function->Call(Context::GetCurrent()->Global(), 2, argv);
  }

  if (try_catch.HasCaught()) {
    if (direct) {
      try_catch.ReThrow();
    } else {
      FatalException(try_catch);
    }
  }
}

void CallbackInfo::WatcherCallback(uv_async_t *w, int revents) {
  pthread_mutex_lock(&g_queue_mutex);

  while (!g_queue.empty()) {
    ThreadedCallbackInvokation *inv = g_queue.front();
    g_queue.pop();

    DispatchToV8(inv->m_cbinfo, inv->m_retval, inv->m_parameters, false);
    inv->SignalDoneExecuting();
  }

  pthread_mutex_unlock(&g_queue_mutex);
}

/*
 * Creates an `ffi_closure *` pointer around the given JS function. Returns the
 * executable C function pointer as a node Buffer instance.
 */

Handle<Value> CallbackInfo::Callback(const Arguments& args) {
  HandleScope scope;

  if (args.Length() != 4) {
    return ThrowException(String::New("Not enough arguments."));
  }

  // Args: cif pointer, JS function
  // TODO: Check args
  ffi_cif *cif = (ffi_cif *)Buffer::Data(args[0]->ToObject());
  size_t resultSize = args[1]->Int32Value();
  int argc = args[2]->Int32Value();
  Local<Function> callback = Local<Function>::Cast(args[3]);

  callback_info *info;
  ffi_status status;
  void *code;

  info = reinterpret_cast<callback_info *>(ffi_closure_alloc(sizeof(callback_info), &code));

  if (!info) {
    return ThrowException(String::New("ffi_closure_alloc() Returned Error"));
  }

  info->resultSize = resultSize;
  info->argc = argc;
  info->function = Persistent<Function>::New(callback);

  // store a reference to the callback function pointer
  // (not sure if this is actually needed...)
  info->code = code;

  //CallbackInfo *self = new CallbackInfo(callback, closure, code, argc);

  status = ffi_prep_closure_loc(
    (ffi_closure *)info,
    cif,
    Invoke,
    (void *)info,
    code
  );

  if (status != FFI_OK) {
    ffi_closure_free(info);
    // TODO: return the error code
    return ThrowException(String::New("ffi_prep_closure() Returned Error"));
  }

  Buffer *buf = Buffer::New((char *)code, sizeof(void *), closure_pointer_cb, info);
  return scope.Close(buf->handle_);
}

/*
 * This is the function that gets called when the C function pointer gets
 * executed.
 */

void CallbackInfo::Invoke(ffi_cif *cif, void *retval, void **parameters, void *user_data) {
  callback_info *info = reinterpret_cast<callback_info *>(user_data);

  // are we executing from another thread?
  if (pthread_equal(pthread_self(), g_mainthread)) {
    DispatchToV8(info, retval, parameters, true);
  } else {
    // hold the event loop open while this is executing
#if NODE_VERSION_AT_LEAST(0, 7, 9)
    uv_ref((uv_handle_t *)&g_async);
#else
    uv_ref(uv_default_loop());
#endif

    // create a temporary storage area for our invokation parameters
    ThreadedCallbackInvokation *inv = new ThreadedCallbackInvokation(info, retval, parameters);

    // push it to the queue -- threadsafe
    pthread_mutex_lock(&g_queue_mutex);
    g_queue.push(inv);
    pthread_mutex_unlock(&g_queue_mutex);

    // send a message to our main thread to wake up the WatchCallback loop
    uv_async_send(&g_async);

    // wait for signal from calling thread
    inv->WaitForExecution();

#if NODE_VERSION_AT_LEAST(0, 7, 9)
    uv_unref((uv_handle_t *)&g_async);
#else
    uv_unref(uv_default_loop());
#endif
    delete inv;
  }
}

/*
 * Init stuff.
 */

void CallbackInfo::Initialize(Handle<Object> target) {
  HandleScope scope;

  NODE_SET_METHOD(target, "Callback", Callback);

  // initialize our threaded invokation stuff
  g_mainthread = pthread_self();
  uv_async_init(uv_default_loop(), &g_async, CallbackInfo::WatcherCallback);
  pthread_mutex_init(&g_queue_mutex, NULL);

  // allow the event loop to exit while this is running
#if NODE_VERSION_AT_LEAST(0, 7, 9)
  uv_unref((uv_handle_t *)&g_async);
#else
  uv_unref(uv_default_loop());
#endif
}
