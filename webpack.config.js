const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        pccli: './src/PC-cli/main.ts',
        telcli: './src/TEL-cli/main.ts',
        init: './src/init.ts'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: [path.resolve(__dirname, './artthe-backend')],
            include: [path.resolve(__dirname, 'src')],
        }],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        publicPath: 'public/js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './artthe-backend/public/js'),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],

    //     experiments: {
    //         topLevelAwait: true,
    //     },
};

// var configPublic = Object.assign({}, config, {
//     name: "configPublic",
//     entry: "./src/index.ts",
//     output: {
//         path: __dirname + "/public/js",
//         publicPath: "/",
//         filename: "js/app.public.min.js"
//     },
//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: "css/app.public.min.css"
//         })
//     ]
// });

// module.exports = {
//     mode: 'development',
//     entry: './src/index.ts',
//     module: {
//         rules: [{
//             test: /\.ts?$/,
//             use: 'ts-loader',
//             include: [path.resolve(__dirname, 'src')],
//         }],
//     },
//     resolve: {
//         extensions: ['.ts', '.js'],
//     },
//     output: {
//         publicPath: 'public/js',
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'public/js'),
//     },
// };