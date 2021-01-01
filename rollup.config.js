import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/main.js',
    plugins: [terser()],
    output: {
      file: 'build/umd/seqjaz.js',
      format: 'umd',
      name: 'seqjaz',
      esModule: false,
    },
  },
  {
    input: 'src/main.js',
    plugins: [terser()],
    output: {
      file: 'build/esm/seqjaz.js',
      format: 'esm',
    },
  },
];
