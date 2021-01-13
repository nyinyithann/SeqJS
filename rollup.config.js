import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/seq.js',
    plugins: [terser()],
    output: {
      file: 'build/umd/seq.core.js',
      format: 'umd',
      name: 'Seq',
      esModule: false,
    },
  },
  {
    input: 'src/seq.js',
    plugins: [terser()],
    output: {
      file: 'build/esm/seq.core.js',
      format: 'esm',
    },
  },
];
