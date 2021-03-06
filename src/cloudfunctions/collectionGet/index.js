// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {

  /**
   * page: 第几页
   * num: 每页几条数据
   * condition： 查询条件，例如 { name: '李白' }
   */

  const {database, page, num, condition,orderByT,orderByO} = event
  console.log(event)

  try {
    return await db.collection(database)
                  .where(condition)
                  .skip(num * (page - 1))
                  .limit(num)
                  .get()
  } catch (err) {
    console.log(err)
  }
}
