const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugin,
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addBabelPlugin(['effector/babel-plugin']),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        // '@primary-color': '#ffdd2d',
        // '@link-color': '#333',
      },
    },
  }),
);
