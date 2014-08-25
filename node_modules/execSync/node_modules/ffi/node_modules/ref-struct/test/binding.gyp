{
  'targets': [
    {
      'target_name': 'struct_tests',
      'sources': [ 'struct_tests.cc' ],
      'include_dirs': [
        '<!(node -e "require(\'nan\')")'
      ],
    }
  ]
}
