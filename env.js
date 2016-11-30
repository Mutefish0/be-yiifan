let environment
if(process.argv.indexOf('--development') > -1) environment = 'development'
else if(process.argv.indexOf('--production') > -1) environment = 'production'
else throw new Error('参数错误')

let priv = require('./private')

let exportObject = {
  development: {
    allowOrigin: ['http://localhost:8080','http://xhd:8080'],
    mapOriginToUser:{
      ['http://localhost:8080']: 'cheng',
      ['http://xhd:8080']: 'xhd'
    },
    databaseUri: priv.developmentDatabaseUri,
    port: 80
  },
  production: {
    allowOrigin: ['http://www.yiifan.xyz', 'http://yiifan.xyz'],
    mapOriginToUser:{
      ['http://www.yiifan.xyz']: 'cheng',
      ['http://yiifan.xyz']: 'cheng'
    },
    databaseUri: priv.productionDatabaseUri,
    port: 6483
  }
}

module.exports = exportObject[environment]
