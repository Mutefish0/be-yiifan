let Article = require('../model/Article')

module.exports = {
  '/fetch-all-articles': _ => {
    return Article.findAll({}, {_id: 0})
  }
}
