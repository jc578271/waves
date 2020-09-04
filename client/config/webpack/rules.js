const devMode = process.env.NODE_ENV !== 'production'

module.exports = [
    {
        test: /\.js$/,    
        exclude: /node_modules/,    
        use: {    
            loader: 'babel-loader'    
        }    
    },    
    {    
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    
        exclude: /node_modules/,    
        loader: 'file-loader'
    },    
    {    
        test: /\.(woff|woff2)$/,    
        exclude: /node_modules/,    
        loader: 'url-loader?prefix=font/&limit=5000&name=[hash].[ext]&outputPath=/fonts/'    
    },    
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    
        exclude: /node_modules/,    
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[hash].[ext]&outputPath=/fonts/'    
    },    
    {    
        test: /\.(png|jpe?g|gif|svg|webp|tiff)(\?.*)?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:'[name].[ext]',
                    outputPath: '/images/'
                }
            },
            { loader: 'img-loader' }
        ]
    }
];