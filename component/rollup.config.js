import { babel } from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: {
    file: "../index.js",
    format: "esm",
  },
  plugins: [babel({ babelHelpers: "bundled" })],
  // plugins: [babel({ presets: ["@babel/preset-react"] })],
};

/*

// rollup.config.js
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default {
  input: 'main.js',
  plugins: [babel({ presets: ['@babel/preset-react'] })],
  output: [
    {
      file: 'bundle.js',
      format: 'esm',
      plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })]
    }
  ]
};
*/
