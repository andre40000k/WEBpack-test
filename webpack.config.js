const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", // Для автообновления нужен режим разработки
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name].[contenthash][ext]",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
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
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true, // Уменьшаем HTML для production
      },
      inject: "body", // Скрипт будет вставлен в конец body
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
  ],
  devServer: {
    static: "./dist", // Папка с результатами сборки
    port: 8080, // Порт сервера
    open: true, // Открытие браузера при запуске
    hot: true, // Включение Hot Module Replacement (HMR)
    liveReload: true, // Включение автообновления страницы при изменении файлов
    watchFiles: {
      paths: ["src/**/*.html", "src/**/*.js", "src/**/*.css"], // Следим за изменениями в HTML, JS и CSS файлах
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all", // Разделение кода на чанки
    },
  },
};
