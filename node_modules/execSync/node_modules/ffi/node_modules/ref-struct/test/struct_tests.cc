#include <stdlib.h>
#include "nan.h"

#ifdef _WIN32
  #define __alignof__ __alignof
#endif

using namespace node;

namespace {

typedef struct _test1 {
  int a;
  int b;
  double c;
} test1;

typedef struct _test2 {
  int a;
  double b;
  int c;
} test2;

typedef struct _test3 {
  double a;
  int b;
  int c;
} test3;

typedef struct _test4 {
  double a;
  double b;
  int c;
} test4;

typedef struct _test5 {
  int a;
  double b;
  double c;
} test5;

typedef struct _test6 {
  char a;
  short b;
  int c;
} test6;

typedef struct _test7 {
  int a;
  short b;
  char c;
} test7;

typedef struct _test8 {
  int a;
  short b;
  char c;
  char d;
} test8;

typedef struct _test9 {
  int a;
  short b;
  char c;
  char d;
  char e;
} test9;

typedef struct _test10 {
  test1 a;
  char b;
} test10;

// this one simulates the `ffi_type` struct
typedef struct _test11 {
  size_t a;
  unsigned short b;
  unsigned short c;
  struct _test11 **d;
} test11;

typedef struct _test12 {
  char *a;
  int b;
} test12;

typedef struct _test13 {
  char a;
  char b[2];
} test13;

typedef struct _test14 {
  char a;
  char b[2];
  short c;
  char d;
} test14;

typedef struct _test15 {
  test1 a;
  test1 b;
} test15;

typedef struct _test16 {
  double a[10];
  char b[3];
  int c[6];
} test16;

typedef struct _test17 {
  char a[3];
} test17;

typedef struct _test18 {
  test17 a[100];
} test18;

/* test19 example is from libdespotify
 * See: https://github.com/TooTallNate/ref-struct/issues/1
 */

#define STRING_LENGTH 256
typedef struct _test19 {
  bool has_meta_data;
  bool playable;
  bool geo_restricted;
  unsigned char track_id[33];
  unsigned char file_id[41];
  unsigned int file_bitrate;
  unsigned char album_id[33];
  unsigned char cover_id[41];
  unsigned char *key;

  char *allowed;
  char *forbidden;

  char title[STRING_LENGTH];
  struct artist* artist;
  char album[STRING_LENGTH];
  int length;
  int tracknumber;
  int year;
  float popularity;
  struct _test19 *next; /* in case of multiple tracks
                          in an album or playlist struct */
} test19;

void Initialize(v8::Handle<v8::Object> target) {
  NanScope();

  target->Set(NanNew<v8::String>("test1 sizeof"), NanNew<v8::Number>(sizeof(test1)));
  target->Set(NanNew<v8::String>("test1 alignof"), NanNew<v8::Number>(__alignof__(test1)));
  target->Set(NanNew<v8::String>("test1 offsetof a"), NanNew<v8::Number>(offsetof(test1, a)));
  target->Set(NanNew<v8::String>("test1 offsetof b"), NanNew<v8::Number>(offsetof(test1, b)));
  target->Set(NanNew<v8::String>("test1 offsetof c"), NanNew<v8::Number>(offsetof(test1, c)));

  target->Set(NanNew<v8::String>("test2 sizeof"), NanNew<v8::Number>(sizeof(test2)));
  target->Set(NanNew<v8::String>("test2 alignof"), NanNew<v8::Number>(__alignof__(test2)));
  target->Set(NanNew<v8::String>("test2 offsetof a"), NanNew<v8::Number>(offsetof(test2, a)));
  target->Set(NanNew<v8::String>("test2 offsetof b"), NanNew<v8::Number>(offsetof(test2, b)));
  target->Set(NanNew<v8::String>("test2 offsetof c"), NanNew<v8::Number>(offsetof(test2, c)));

  target->Set(NanNew<v8::String>("test3 sizeof"), NanNew<v8::Number>(sizeof(test3)));
  target->Set(NanNew<v8::String>("test3 alignof"), NanNew<v8::Number>(__alignof__(test3)));
  target->Set(NanNew<v8::String>("test3 offsetof a"), NanNew<v8::Number>(offsetof(test3, a)));
  target->Set(NanNew<v8::String>("test3 offsetof b"), NanNew<v8::Number>(offsetof(test3, b)));
  target->Set(NanNew<v8::String>("test3 offsetof c"), NanNew<v8::Number>(offsetof(test3, c)));

  target->Set(NanNew<v8::String>("test4 sizeof"), NanNew<v8::Number>(sizeof(test4)));
  target->Set(NanNew<v8::String>("test4 alignof"), NanNew<v8::Number>(__alignof__(test4)));
  target->Set(NanNew<v8::String>("test4 offsetof a"), NanNew<v8::Number>(offsetof(test4, a)));
  target->Set(NanNew<v8::String>("test4 offsetof b"), NanNew<v8::Number>(offsetof(test4, b)));
  target->Set(NanNew<v8::String>("test4 offsetof c"), NanNew<v8::Number>(offsetof(test4, c)));

  target->Set(NanNew<v8::String>("test5 sizeof"), NanNew<v8::Number>(sizeof(test5)));
  target->Set(NanNew<v8::String>("test5 alignof"), NanNew<v8::Number>(__alignof__(test5)));
  target->Set(NanNew<v8::String>("test5 offsetof a"), NanNew<v8::Number>(offsetof(test5, a)));
  target->Set(NanNew<v8::String>("test5 offsetof b"), NanNew<v8::Number>(offsetof(test5, b)));
  target->Set(NanNew<v8::String>("test5 offsetof c"), NanNew<v8::Number>(offsetof(test5, c)));

  target->Set(NanNew<v8::String>("test6 sizeof"), NanNew<v8::Number>(sizeof(test6)));
  target->Set(NanNew<v8::String>("test6 alignof"), NanNew<v8::Number>(__alignof__(test6)));
  target->Set(NanNew<v8::String>("test6 offsetof a"), NanNew<v8::Number>(offsetof(test6, a)));
  target->Set(NanNew<v8::String>("test6 offsetof b"), NanNew<v8::Number>(offsetof(test6, b)));
  target->Set(NanNew<v8::String>("test6 offsetof c"), NanNew<v8::Number>(offsetof(test6, c)));

  target->Set(NanNew<v8::String>("test7 sizeof"), NanNew<v8::Number>(sizeof(test7)));
  target->Set(NanNew<v8::String>("test7 alignof"), NanNew<v8::Number>(__alignof__(test7)));
  target->Set(NanNew<v8::String>("test7 offsetof a"), NanNew<v8::Number>(offsetof(test7, a)));
  target->Set(NanNew<v8::String>("test7 offsetof b"), NanNew<v8::Number>(offsetof(test7, b)));
  target->Set(NanNew<v8::String>("test7 offsetof c"), NanNew<v8::Number>(offsetof(test7, c)));

  target->Set(NanNew<v8::String>("test8 sizeof"), NanNew<v8::Number>(sizeof(test8)));
  target->Set(NanNew<v8::String>("test8 alignof"), NanNew<v8::Number>(__alignof__(test8)));
  target->Set(NanNew<v8::String>("test8 offsetof a"), NanNew<v8::Number>(offsetof(test8, a)));
  target->Set(NanNew<v8::String>("test8 offsetof b"), NanNew<v8::Number>(offsetof(test8, b)));
  target->Set(NanNew<v8::String>("test8 offsetof c"), NanNew<v8::Number>(offsetof(test8, c)));
  target->Set(NanNew<v8::String>("test8 offsetof d"), NanNew<v8::Number>(offsetof(test8, d)));

  target->Set(NanNew<v8::String>("test9 sizeof"), NanNew<v8::Number>(sizeof(test9)));
  target->Set(NanNew<v8::String>("test9 alignof"), NanNew<v8::Number>(__alignof__(test9)));
  target->Set(NanNew<v8::String>("test9 offsetof a"), NanNew<v8::Number>(offsetof(test9, a)));
  target->Set(NanNew<v8::String>("test9 offsetof b"), NanNew<v8::Number>(offsetof(test9, b)));
  target->Set(NanNew<v8::String>("test9 offsetof c"), NanNew<v8::Number>(offsetof(test9, c)));
  target->Set(NanNew<v8::String>("test9 offsetof d"), NanNew<v8::Number>(offsetof(test9, d)));
  target->Set(NanNew<v8::String>("test9 offsetof e"), NanNew<v8::Number>(offsetof(test9, e)));

  target->Set(NanNew<v8::String>("test10 sizeof"), NanNew<v8::Number>(sizeof(test10)));
  target->Set(NanNew<v8::String>("test10 alignof"), NanNew<v8::Number>(__alignof__(test10)));
  target->Set(NanNew<v8::String>("test10 offsetof a"), NanNew<v8::Number>(offsetof(test10, a)));
  target->Set(NanNew<v8::String>("test10 offsetof b"), NanNew<v8::Number>(offsetof(test10, b)));

  target->Set(NanNew<v8::String>("test11 sizeof"), NanNew<v8::Number>(sizeof(test11)));
  target->Set(NanNew<v8::String>("test11 alignof"), NanNew<v8::Number>(__alignof__(test11)));
  target->Set(NanNew<v8::String>("test11 offsetof a"), NanNew<v8::Number>(offsetof(test11, a)));
  target->Set(NanNew<v8::String>("test11 offsetof b"), NanNew<v8::Number>(offsetof(test11, b)));
  target->Set(NanNew<v8::String>("test11 offsetof c"), NanNew<v8::Number>(offsetof(test11, c)));
  target->Set(NanNew<v8::String>("test11 offsetof d"), NanNew<v8::Number>(offsetof(test11, d)));

  target->Set(NanNew<v8::String>("test12 sizeof"), NanNew<v8::Number>(sizeof(test12)));
  target->Set(NanNew<v8::String>("test12 alignof"), NanNew<v8::Number>(__alignof__(test12)));
  target->Set(NanNew<v8::String>("test12 offsetof a"), NanNew<v8::Number>(offsetof(test12, a)));
  target->Set(NanNew<v8::String>("test12 offsetof b"), NanNew<v8::Number>(offsetof(test12, b)));

  target->Set(NanNew<v8::String>("test13 sizeof"), NanNew<v8::Number>(sizeof(test13)));
  target->Set(NanNew<v8::String>("test13 alignof"), NanNew<v8::Number>(__alignof__(test13)));
  target->Set(NanNew<v8::String>("test13 offsetof a"), NanNew<v8::Number>(offsetof(test13, a)));
  target->Set(NanNew<v8::String>("test13 offsetof b"), NanNew<v8::Number>(offsetof(test13, b)));

  target->Set(NanNew<v8::String>("test14 sizeof"), NanNew<v8::Number>(sizeof(test14)));
  target->Set(NanNew<v8::String>("test14 alignof"), NanNew<v8::Number>(__alignof__(test14)));
  target->Set(NanNew<v8::String>("test14 offsetof a"), NanNew<v8::Number>(offsetof(test14, a)));
  target->Set(NanNew<v8::String>("test14 offsetof b"), NanNew<v8::Number>(offsetof(test14, b)));
  target->Set(NanNew<v8::String>("test14 offsetof c"), NanNew<v8::Number>(offsetof(test14, c)));
  target->Set(NanNew<v8::String>("test14 offsetof d"), NanNew<v8::Number>(offsetof(test14, d)));

  target->Set(NanNew<v8::String>("test15 sizeof"), NanNew<v8::Number>(sizeof(test15)));
  target->Set(NanNew<v8::String>("test15 alignof"), NanNew<v8::Number>(__alignof__(test15)));
  target->Set(NanNew<v8::String>("test15 offsetof a"), NanNew<v8::Number>(offsetof(test15, a)));
  target->Set(NanNew<v8::String>("test15 offsetof b"), NanNew<v8::Number>(offsetof(test15, b)));

  target->Set(NanNew<v8::String>("test16 sizeof"), NanNew<v8::Number>(sizeof(test16)));
  target->Set(NanNew<v8::String>("test16 alignof"), NanNew<v8::Number>(__alignof__(test16)));
  target->Set(NanNew<v8::String>("test16 offsetof a"), NanNew<v8::Number>(offsetof(test16, a)));
  target->Set(NanNew<v8::String>("test16 offsetof b"), NanNew<v8::Number>(offsetof(test16, b)));
  target->Set(NanNew<v8::String>("test16 offsetof c"), NanNew<v8::Number>(offsetof(test16, c)));

  target->Set(NanNew<v8::String>("test17 sizeof"), NanNew<v8::Number>(sizeof(test17)));
  target->Set(NanNew<v8::String>("test17 alignof"), NanNew<v8::Number>(__alignof__(test17)));
  target->Set(NanNew<v8::String>("test17 offsetof a"), NanNew<v8::Number>(offsetof(test17, a)));

  target->Set(NanNew<v8::String>("test18 sizeof"), NanNew<v8::Number>(sizeof(test18)));
  target->Set(NanNew<v8::String>("test18 alignof"), NanNew<v8::Number>(__alignof__(test18)));
  target->Set(NanNew<v8::String>("test18 offsetof a"), NanNew<v8::Number>(offsetof(test18, a)));

  target->Set(NanNew<v8::String>("test19 sizeof"), NanNew<v8::Number>(sizeof(test19)));
  target->Set(NanNew<v8::String>("test19 alignof"), NanNew<v8::Number>(__alignof__(test19)));
  target->Set(NanNew<v8::String>("test19 offsetof has_meta_data"), NanNew<v8::Number>(offsetof(test19, has_meta_data)));
  target->Set(NanNew<v8::String>("test19 offsetof playable"), NanNew<v8::Number>(offsetof(test19, playable)));
  target->Set(NanNew<v8::String>("test19 offsetof geo_restricted"), NanNew<v8::Number>(offsetof(test19, geo_restricted)));
  target->Set(NanNew<v8::String>("test19 offsetof track_id"), NanNew<v8::Number>(offsetof(test19, track_id)));
  target->Set(NanNew<v8::String>("test19 offsetof file_id"), NanNew<v8::Number>(offsetof(test19, file_id)));
  target->Set(NanNew<v8::String>("test19 offsetof file_bitrate"), NanNew<v8::Number>(offsetof(test19, file_bitrate)));
  target->Set(NanNew<v8::String>("test19 offsetof album_id"), NanNew<v8::Number>(offsetof(test19, album_id)));
  target->Set(NanNew<v8::String>("test19 offsetof cover_id"), NanNew<v8::Number>(offsetof(test19, cover_id)));
  target->Set(NanNew<v8::String>("test19 offsetof key"), NanNew<v8::Number>(offsetof(test19, key)));
  target->Set(NanNew<v8::String>("test19 offsetof allowed"), NanNew<v8::Number>(offsetof(test19, allowed)));
  target->Set(NanNew<v8::String>("test19 offsetof forbidden"), NanNew<v8::Number>(offsetof(test19, forbidden)));
  target->Set(NanNew<v8::String>("test19 offsetof title"), NanNew<v8::Number>(offsetof(test19, title)));
  target->Set(NanNew<v8::String>("test19 offsetof artist"), NanNew<v8::Number>(offsetof(test19, artist)));
  target->Set(NanNew<v8::String>("test19 offsetof album"), NanNew<v8::Number>(offsetof(test19, album)));
  target->Set(NanNew<v8::String>("test19 offsetof length"), NanNew<v8::Number>(offsetof(test19, length)));
  target->Set(NanNew<v8::String>("test19 offsetof tracknumber"), NanNew<v8::Number>(offsetof(test19, tracknumber)));
  target->Set(NanNew<v8::String>("test19 offsetof year"), NanNew<v8::Number>(offsetof(test19, year)));
  target->Set(NanNew<v8::String>("test19 offsetof popularity"), NanNew<v8::Number>(offsetof(test19, popularity)));
  target->Set(NanNew<v8::String>("test19 offsetof next"), NanNew<v8::Number>(offsetof(test19, next)));

}

} // anonymous namespace

NODE_MODULE(struct_tests, Initialize);
