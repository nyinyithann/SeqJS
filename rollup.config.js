import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/main.js',
    plugins: [terser()],
    output: {
      file: 'build/umd/seq.js',
      format: 'umd',
      name: 'seq',
      esModule: false,
    },
  },
  {
    input: 'src/main.js',
    plugins: [terser()],
    output: {
      file: 'build/esm/seq.js',
      format: 'esm',
    },
  },
];
