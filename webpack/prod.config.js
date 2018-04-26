const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const customPath = path.join(__dirname, './customPublicPath');

module.exports = {
    mode: 'production',
    entry: {
        rhobapp: [customPath, path.join(__dirname, '../chrome/extension/rhobapp')],
        background: [customPath, path.join(__dirname, '../chrome/extension/background')],
        inject: [customPath, path.join(__dirname, '../chrome/extension/inject')]
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: './js/[name].bundle.js',
        chunkFilename: './js/[id].chunk.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    resolve: {
        extensions: ['*', '.js']
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['react-optimize']
            }
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [autoprefixer]
                    }
                }
            ]
        },{
            test: /\.(png|jp(e*)g|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8000, // Convert images < 8kb to base64 strings
                }
            }]
        }]
    }
};
