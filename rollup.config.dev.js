import copy from 'rollup-plugin-copy';
import pkg from './package.json';

import rollupConfig from './rollup.config';
import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';

// const toExample = `../frontend/node_modules/@dvkiin/material-commons`;
const toExample = `example/node_modules/@dvkiin/material-commons`;

export default {
  ...rollupConfig,
  output: [
    {
      file: `${ toExample }/${ pkg.module }`,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    copy({
      targets: [
        { src: 'package.json', dest: toExample },
      ],
    }),
  ],
};
