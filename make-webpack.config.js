var PROJECT_ROOT = __dirname,
    p = require('path'),
    webpack = require('webpack');

module.exports = function(opt) {
    return {
        name: 'homm',

        entry: {
            'index': './src/main.js'
        },

        output: {
            path: p.join(PROJECT_ROOT, 'static'),
            filename: '[name].js',
            chunkFilename: '[chunkName].js',
            publicPath: 'static/'
        },

        resolve: {
            extensions: ['', '.js'],
            root: [
                PROJECT_ROOT
            ]
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    include: [
                        p.join(PROJECT_ROOT, 'src')
                    ],
                    exclude: /node_modules/
                }
            ]
        },

        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(true)
        ],

        devtool: 'sourcemap'
    };
};
