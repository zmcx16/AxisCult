module.exports = {
    entry:[
        './app/main.js'
    ],
    output: {
        path: __dirname + '/assets/',
        publicPath: "/assets/",
        filename: '[name].bundle.js'
    },
    resolve:{},
    module: {
        loaders: [
            /*{
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },*/{
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: __dirname + '/app/'
            },
            { test: /\.jsx?$/, loaders: ['babel','jsx?harmony']}
        ]
    },
    plugins:[]
};