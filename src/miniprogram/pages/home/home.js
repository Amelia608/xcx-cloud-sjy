//index.js
const app = getApp();
const utils = require("../../utils/index");
const db = wx.cloud.database();
Page({
  data: {
    avatarUrl: "./user-unlogin.png",
    userInfo: {},
    uname: "",
    phone: "",
    total: "",
    remarks: "",
    enddata: utils.dateFormat(new Date(), "yyyy-MM-dd"),
    date: utils.dateFormat(new Date(), "yyyy-MM-dd")
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: "../chooseLib/chooseLib"
      });
      return;
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              });
            }
          });
        }
      }
    });
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
  },
  bindKeyInput({ currentTarget, detail }) {
    let key = currentTarget.dataset.key;
    let value = detail.value;
    this.setData({
      [key]: value
    });
  },
  submit() {
    let arr = ["uname", "phone", , "total", "date"];
    for (var i = 0; i < arr.length; i++) {
      if (!this.data[arr[i]]) {
        wx.showToast({
          title: "*为必填项",
          icon: "none",
          image: "",
          duration: 1500,
          mask: false,
          success: result => {},
          fail: () => {},
          complete: () => {}
        });
        return;
      }
    }
    let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: "手机号不正确",
        icon: "none",
        image: "",
        duration: 1500,
        mask: false,
        success: result => {},
        fail: () => {},
        complete: () => {}
      });
      return;
    }
    wx.showLoading({
      title: "数据提交中"
    });
    db.collection("record")
      .add({
        data: {
          uname: this.data.uname,
          phone: this.data.phone,
          total: this.data.total,
          createTime: this.data.date,
          remarks: this.data.remarks
        }
      })
      .then(() => {
        wx.hideLoading();
        wx.showToast({
          title: "新增成功",
          icon: "none",
          image: "",
          duration: 1500,
          mask: false,
          success: result => {},
          fail: () => {},
          complete: () => {}
        });
        this.setData({
          uname: "",
          phone: "",
          total: "",
          date: utils.dateFormat(new Date(), "yyyy-MM-dd"),
          remarks: ""
        });
      });
  }
});
