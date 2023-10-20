import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
export default {
  input: "src/deps.js",
  output: {
    file: "dist/deps.js",
    format: "esm",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
  ],
};
