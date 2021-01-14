import path from 'path'

// vue.config.js
module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  base: '/WeddingForm2/', //發佈對應路徑
  assetsDir: 'assets',
};
