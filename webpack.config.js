const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [
        './client/src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-2'],
                        plugins: ["transform-object-rest-spread", "react-hot-loader/babel"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }]
            }            

        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'js/app.js',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./client/public/index.html",
            filename: "./index.html"
        })
    ]
};