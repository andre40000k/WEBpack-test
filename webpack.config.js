const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name].[contenthash][ext]",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
      },
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new WebpackBundleAnalyzer({
      analyzerMode: "static",
      openAnalyzer: true,
    }),
    // new ESLintPlugin({
    //   extensions: ["ts", "js"],
    //   overrideConfigFile: path.resolve(__dirname, "eslint.config.js"),
    // }),
  ],
  stats: {
    children: true,
  },
  devServer: {
    static: "./dist",
    port: 8080,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: ["src/**/*"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
