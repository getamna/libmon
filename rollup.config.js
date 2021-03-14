// rollup.config.js
import resolve from "@rollup/plugin-node-resolve"
// install with: npm i -D rollup-plugin-commonjs
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import {
    terser
} from "rollup-plugin-terser"

export default {
    input: "./src/index.ts",
    output: {
        dir: "./dist",

        format: "iife",
    },
    plugins: [
        typescript({
            declarationDir: "./dist",
            declaration: true,
        }),
        resolve(),
        commonjs(),
        terser(),
    ],
}