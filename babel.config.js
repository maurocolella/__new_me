module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    plugins: [
      'react-hot-loader/babel',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import'
    ]
  };
};
