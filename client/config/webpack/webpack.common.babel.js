import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import paths from './paths';
import rules from './rules';

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: paths.entryPath,
    module: {
        rules: [
            ...rules,
            {
                test: /\.css$/i,
                use: [
                    {loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader},
                    {loader: 'css-loader', options: {sourceMap: !devMode}}
                ]
            }
        ]
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.scss', '.css']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `/${paths.cssFolder}/[name].css`,
            chunkFilename: '[id].css',
        }),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new CopyWebpackPlugin([
            {
              from: 'public',
              ignore: ['index.html'],
            }
        ])
    ]
};