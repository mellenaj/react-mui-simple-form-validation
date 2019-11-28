// import webpack from 'webpack';
const path = require('path');
const webpack = require('webpack');

const { NODE_ENV } = process.env;

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
];

const filename = `react-mui-simple-form-validation${NODE_ENV === 'production' ? '.min' : ''}.js`;
module.exports =  {
  mode: NODE_ENV === 'production' ? 'production' : 'development',

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
     },
    ],
  },
  externals: [
   { react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
      umd: 'prop-types',
    },
  },
  /@material-ui\/core\/.*/,
  ],
  entry: [
    './src/index',
  ],

  optimization: {
    minimize: NODE_ENV === 'production',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    library: 'react-mui-simple-form-validation',
    libraryTarget: 'umd',
  },

  plugins,
};
