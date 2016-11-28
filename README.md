# be-yiifan
个人网站重构-后端部分

# 安装
  1. 克隆仓库 `git clone https://github.com/Mutefish0/be-yiifan`
  2. 安装 `npm install`

# 部署 (服务器端)
  1. 拉取更新 `git pull`
  2. 运行 `node server --production &`

# 开发 (本地)
  1. 克隆数据库到本地 `node cloneToDev`
  2. 运行 `node server --development`

# 说明
  `private.js` 描述的数据库信息，gitignore了，其结构如下
  ```js
  module.exports = {
    //本地数据库
    developmentDatabaseUri: 'mongodb://dev:123456@localhost:27017/dev',
    //线上数据库
    productionDatabaseUri:  'mongodb://user:pwd@host:27017/db'
  }
  ```
  可根据自己数据库信息作相应改变
