import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/js/tempus-dominus.ts',
  output: {
    dir: 'dist/js',
    format: 'umd',
    name: 'tempusDominus',
    sourcemap: true,
    globals: {
      '@popperjs/core': 'Popper',
    },
  },
  external: ['@popperjs/core'],
  plugins: [typescript()],
};
