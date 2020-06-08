const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:3002/",
  },

  resolve: {
    extensions: [".jsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "widget",
      library: { type: "var", name: "widget" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./Widget": "./src/Widget",
      },
      shared: ["react"],
    }),
  ],
};
