//index.js
const utils = require("../../utils/index");
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    list: [],
    page: 1,
    num: 10,
    keyword: "",
    loading: false,
    date: utils.dateFormat(new Date(), "yyyy-MM-dd")
  },
  onLoad() {
    this.getList();
  },
  onShow() {
    this.getList();
  },
  getList() {
    let database = "record";
    let condition = {
      uname: {
        $regex: ".*" + this.data.keyword,
        $options: "i"
      }
    };

    let { list, page, num } = this.data;
    let that = this;

    this.setData({
      loading: true
    });
    // 模糊查询
    wx.cloud.callFunction({
        name: "collectionGet",
        data: {
          database,
          page,
          num,
          condition
        }
      }).then(res => {
        if (!res.result.data.length) {
          console.log(res)
          // 没搜索到
          that.setData({
            loading: false,
            isOver: true
          });
        } else {
          let res_data = res.result.data;
          list.push(...res_data);
          that.setData({
            list:res.result.data,
            loading: false
          });
        }
      })
      .catch(console.error);
  },
  bindconfirm() {
    this.getList();
  },
  valueChange({ detail, currentTarget }) {
    this.setData({ [currentTarget.dataset.txt]: detail.value });
    this.getList();
  },
  search() {
    // console.log(1)
    this.getList();
  },
  clearInput() {
    this.setData({ keyword: "" });
  }
});
