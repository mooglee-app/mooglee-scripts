module.exports = {
  presets: [[
    '@babel/preset-env',
    {
      modules: 'commonjs',
    },
  ], '@babel/preset-react'],
  plugins: [
    'babel-plugin-transform-react-jsx',
    'babel-plugin-transform-react-constant-elements',
    'babel-plugin-transform-dev-warning',
    'babel-plugin-optimize-clsx',
    '@babel/plugin-transform-object-assign',
    ['@babel/plugin-transform-runtime', { useESModules: false }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
  ],
};
