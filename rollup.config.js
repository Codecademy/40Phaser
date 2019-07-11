import url from "rollup-plugin-url";
import nodeResolve from "rollup-plugin-node-resolve";
import serve from "rollup-plugin-serve";

export default {
    input: "src/index.js",
    output: [
        {
            file: "dist/index.js",
            format: "esm",
        },
    ],
    plugins: [
        process.env.ROLLUP_SERVE &&
            serve({
                contentBase: "",
                // Path to fallback page
                historyApiFallback: "/public/index.html",
            }),
        nodeResolve(),
        url({
            limit: 0, // copy all files
            publicPath: "/dist/",
            // include: ["**/*.svg"], // defaults to .svg, .png, .jpg and .gif files
        }),
    ],
};
