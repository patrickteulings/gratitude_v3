module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Gratitude',
    themeColor: '#013439',
    msTileColor: '#013439',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#013439',
    manifestOptions: {
      title: 'It\'s called Gratitude',
      name: 'Gratitude',
      shortName: 'Grattitude',
      startUrl: '.',
      display: 'standalone',
      themeColor: '182C34',
      backgroundColor: '#0F343C'
    },
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
