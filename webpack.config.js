'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'dist/index.html'
        }
    },

    devtool: 'source-map',

    entry: [
        'babel-polyfill',
        './static/app.js',
    ],

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist/',
        filename: 'app.js'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'API_URL': JSON.stringify(process.env.API_URL)
            }
        })
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'react',
                            ['env', {
                                'targets': {
                                    'browsers': ['last 2 versions']
                                },
                                'modules': false,
                            }],
                            'stage-2',
                        ]
                    }
                }
            }
        ]
    }
};