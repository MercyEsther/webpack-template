var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: "eval-source-map",
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader"
          },{
            loader: "postcss-loader"
          }]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ],
  devServer: {
    contentBase: "./public",
    inline: true
  }
}
