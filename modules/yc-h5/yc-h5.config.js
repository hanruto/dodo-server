// 每小时超过20条会报错，30分钟发一次
module.exports = {
  warningLine: 20,
  sendInterval: 30 * 60 * 1000,
  statisticInterval: 60 * 60 * 1000,
  whiteList: ['/primary_account/commodity/getCommodityList', '/primary_account/passport/bindPhoneToPlatform']
}
