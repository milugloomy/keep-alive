// Generated using webpack-cli https://github.com/webpack/webpack-cli
const isProduction = process.env.NODE_ENV === 'production';


const config = {
  entry: './src/index.ts',
  plugins: [
  ],
  experiments: {
    outputModule: true
  },
  output: {
    filename: '[name].js',
    library: {
      type: 'module'
    }
  },
  externals: {
    react: 'react'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...']
  },
  optimization: {
    minimize: false,
    // 拆包不生效
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 1,
    //   minSizeReduction: 0
    // }
  }

};

export default () => {
  if (isProduction) {
    config.mode = 'production';


  } else {
    config.mode = 'development';
  }
  return config;
};
