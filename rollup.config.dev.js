import copy from 'rollup-plugin-copy'
import pkg from './package.json'

import rollupConfig from './rollup.config';

// const toExample = `../frontend/node_modules/@dvkiin/material-commons`;
const toExample = `example/node_modules/@dvkiin/material-commons`;

export default {
  ...rollupConfig,
  output: [
    {
      file: `${toExample}/${pkg.main}`,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: `${toExample}/${pkg.module}`,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    ...rollupConfig.plugins,
    copy({
      targets: [
        { src: 'package.json', dest: toExample },
      ],
    }),
  ],
};
