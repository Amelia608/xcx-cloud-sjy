//index.js
const utils = require("../../utils/index");
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    keyword: "",
    list: [],
    page: 1,
    num: 10,
    loading: false,
    isOver: false,
    startDate:'2017-01-01',
    endDate:utils.dateFormat(new Date(), "yyyy-MM-dd"),
    date: utils.dateFormat(new Date(), "yyyy-MM-dd")
  },
  onLoad() {
    this.getList();
  },
  onShow() {

  },
  onReachBottom: function () {
    if (!this.data.loading) {
      this.getList()
    }
  },
  getList() {
    console.log(1)
    if (!this.data.isOver) {
      let { list, page, num } = this.data;
      let that = this;
      this.setData({
        loading: true
      });
      wx.cloud.callFunction({
          name: "collectionGet",
          data: {
            database: "record",
            page,
            num,
            condition:{
              uname: {
                $regex: ".*" + this.data.keyword,
                $options: "i"
              },
              createTime:{
                $regex: ".*" + this.data.date,
                $options: "i"
              }
            }
          }
        }).then(res => {
          if (!res.result.data.length) {
            that.setData({
              loading: false,
              isOver: true
            });
          } else {
            let res_data = res.result.data;
            list.push(...res_data);
            that.setData({
              list,
              page: page + 1,
              loading: false
            });
          }
        })
        .catch(console.error);
    }
  },
  bindconfirm() {
    this.getList();
  },
  valueChange({ detail, currentTarget }) {
    this.setData({ [currentTarget.dataset.txt]: detail.value });
    this.setData({
      isOver: false,
      list: [],
      page: 1
    })
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
