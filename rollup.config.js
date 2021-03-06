import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    entry: "src/index.js",
    format: "iife",
    sourceMap: false,
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
        babel({
            presets: [
                "es2015-rollup",
                "es2016",
                "es2017"
            ],
            babelrc: false
        }),
    ],
    dest: "dist/cropper.js",
    moduleName: "Cropper"
};
