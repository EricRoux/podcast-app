const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: "./src/app.ts",
    output: {
        filename: "bundle.[chunkhash].js",
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        port: 3000,
    },
    plugins: [
        new HTMLPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                },
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};