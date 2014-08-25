{
  'targets': [
    {
      'target_name': 'ffi_bindings',
      'sources': [
          'src/ffi.cc'
        , 'src/callback_info.cc'
        , 'src/threaded_callback_invokation.cc'
      ],
      'dependencies': [
        'deps/libffi/libffi.gyp:ffi'
      ],
      'conditions': [
        ['OS=="win"', {
          'dependencies': [
              'deps/dlfcn-win32/dlfcn.gyp:dlfcn'
            , 'deps/pthreads-win32/pthread.gyp:pthread'
          ]
        }],
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'MACOSX_DEPLOYMENT_TARGET': '10.5',
            'OTHER_CFLAGS': [
                '-ObjC++'
            ]
          },
          'libraries': [
              '-lobjc'
          ],
        }]
      ]
    }
  ]
}
