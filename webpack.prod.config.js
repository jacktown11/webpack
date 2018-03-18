const path = require('path'),
    htmlWP = require('html-webpack-plugin'),
    cleanWP = require('clean-webpack-plugin'),
    extractTextWP = require('extract-text-webpack-plugin'),
    uglifyjsWP = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/main.js',
        page1: './src/js/page1.js'
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'js/[name]-[chunkhash:8].build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: extractTextWP.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        browsers: ['last 5 versions']
                                    })
                                ]
                            }
                        }
                    ],
                    publicPath: 'css'
                })
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'img',
                            name: '[name]-[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new cleanWP('./dist',{
            root: __dirname,
            exclude: ['.git']
        }),
        new extractTextWP('css/[name]-[chunkhash:8].css'),
        new htmlWP({
            filename: 'index.html',
            template: './src/tpl/index.html',
            chunks: ['main'],
            minify: { collapseWhitespace: true }
        }),
        new htmlWP({
            filename: 'page1.html',
            template: './src/tpl/page1.html',
            chunks: ['page1'],
            minify: { collapseWhitespace: true }
        }),
        new uglifyjsWP()
    ]
};