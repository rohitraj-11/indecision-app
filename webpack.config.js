//entry -> output

const path = require('path');

console.log(path.join(__dirname, 'public'));

module.exports = {
    // webpack stuffs
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'), // cos absolute path is needed
        filename: 'bundle.js'
    },
    // babel stuffs
    module: { 
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, 
        // { // css rules
        //     test: /\.css$/, 
        //     use: [  // use helps in creating array of loader
        //         'style-loader',
        //         'css-loader'
        //     ]
        // }, 
        { // scss rules
            test: /\.s?css$/, // yhis regular exp looks for css and scss files
            use: [  // use helps in creating array of loader
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    // sourcemap stuffs
    devtool: 'cheap-module-eval-source-map',
    // dev-server which is similar to live-server stuff
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};


