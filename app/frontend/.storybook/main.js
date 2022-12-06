const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  // Webサーバーで公開する静的ファイルを格納するディレクトリを指定する
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        // storybookにbaseURLはsrcディレクトリであることを読み込ませる
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ]
    // Webpackは本来JSしか使えないが、CSSや画像をJSのオブジェクトにしてWebpackで扱えるようにするのがローダー
    // ローダーなどのモジュールの設定をプロパティのリストに追加していく
    config.module.rules.push({
      // 正規表現で拡張子が.scssに該当するファイルである際にトランスパイルするプロパティ
      test: /\.scss$/,
      // 使用するローダーを指定するプロパティ
      use: [
        // バンドルされたCSSをHTMLでスタイルシートとして読み込ませるようにする
        'style-loader',
        {
          // cssファイルをCommonJSに変換する
          loader: 'css-loader',
          options: {
            modules: {
              // 一致する全てのファイルでCSSモジュールを有効にする
              auto: true,
            },
          },
        },
        // scssファイルをcssファイルにコンパイルする
        'sass-loader',
      ],
      // 指定されたディレクトリ内に存在する正規表現に該当したファイルをトランスパイルする
      include: path.resolve(__dirname, '../'),
    })
    return config
  },
  core: {
    builder: 'webpack5',
  },
}
