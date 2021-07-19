const packages = require('./package.json');

export default {
  hash: true,
  publicPath: '/',
  entry: {
    app: "./src/index.js",
    vendor: Object.keys(packages.dependencies).filter(v => v !== 'mathjs')
  },
  html: {
   template: './src/index.ejs',
   inject: false,
   title: "挥霍马云爸爸的财富 | 富豪模拟器 | 买吧"
  },
  commons:[{
    name: 'vendor'
  }]
}
