// 云函数入口文件
const cloud = require("wx-server-sdk");
cloud.init();
const db = cloud.database();
exports.main = async (event, context) => {
  const { database, data } = event;
  console.log(event);
  try {
    return await db.collection(database).add({ data });
  } catch (err) {
    console.log(err);
  }
};
