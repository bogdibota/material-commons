import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';

import pkg from '../package.json';
import rollupConfig from '../rollup.config';

const toExample = `C:\\tmp\\dvkiin-material-common`;

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

export default {
  ...rollupConfig,
  output: [
    {
      file: `${ toExample }/${ pkg.main }`,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: `${ toExample }/${ pkg.module }`,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve({ extensions }),
    babel({
      extensions,
      configFile: './dev/.babelrc',
      include: [ 'src/**/*' ],
      exclude: 'node_modules/**',
    }),
    copy({
      targets: [
        { src: 'package.json', dest: toExample },
      ],
    }),
  ],
};
