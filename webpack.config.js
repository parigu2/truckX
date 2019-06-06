module.exports = {
    entry: ['@babel/polyfill','./client/index.js'],
    mode: 'development',
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    devtool: 'source-maps',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
      ]
    }
  }