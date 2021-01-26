module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Gratitude',
    themeColor: '#0F343C',
    msTileColor: '#0F343C',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#0F343C',
    manifestOptions: {
      name: 'Gratitude',
      shortName: 'Grattitude',
      startUrl: '.',
      display: 'standalone',
      themeColor: '182C34',
      backgroundColor: '#0F343C'
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: '_redirects'
    },
    manifestCrossorigin: 'anonymous'
  },

  css: {
    extract: true,
    sourceMap: true
  }
}
