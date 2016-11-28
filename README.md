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

# 数据库
  ## 说明
  `private.js` 描述的数据库登录信息, 被gitignore了, 结构如下
  ```js
  module.exports = {
    //本地数据库
    developmentDatabaseUri: 'mongodb://dev:123456@localhost:27017/dev',
    //线上数据库
    productionDatabaseUri:  'mongodb://user:pwd@host:27017/db'
  }
  ```
  可根据自己数据库信息作相应改变

  ## 数据库文档结构

  ```js
  //user文档
  {
      "_id" : ObjectId("581b268aabe3a64520405f7h"),
      "username" : "cheng",
      "password" : "123456",
      "join_time" : NumberLong(1478174346646),
      "nickname" : "程一凡",
      "sex" : "male",
      "intro" : "前端攻城狮, 偶尔玩玩Node.js的伪全栈",
      "avatar" : "http://www.yiifan.xyz/images/avatar.jpg",
      "avatar_type" : "url",
      "own_domain" : "localhost",
      "qq" : 648262030,
      "weibo" : "http://www.weibo.com/u/1655821812",
      "github" : "https://github.com/Mutefish0",
      "zhihu" : "https://www.zhihu.com/people/cheng-yf-21"
  }

  //article文档
  {
    "_id" : ObjectId("5839bd34c87f7b2f4ca46e43"),
    "title" : "Markdown 测试",
    "content" : "# hello wrold",
    "user" : "cheng",
    "date" : 1480262296621
}

  ```

  
