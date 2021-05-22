const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  // optional
  modifyVars: { '@primary-color': '#04f' },
  // optional
  lessVarsFilePath: './src/styles/variables.less',
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  module: {
    rules: [
     {
      test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|)$/i,
      use: [
        {
          loader: "file-loader",
        }
      ],
    },
    ]
  },

  // Other Config Here...

  webpack(config) {
    return config;
  },

  future: {
    // if you use webpack5
    webpack5: true,
  },
});