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

  onLoad: function() {},
  bindKeyInput({ currentTarget, detail }) {
    let key = currentTarget.dataset.key;
    let value = detail.value;
    this.setData({
      [key]: value
    });
  },
  adduser(){
    return new Promise((resolve,reject)=>{
      wx.cloud.callFunction({
        name: "collectionAdd",
        data: {
          database: "user",
          data: {
            uname: this.data.uname,
            phone: this.data.phone,
          }
        }
      }).then(() => {
        resolve()
      });
    })
   
  },
  addData(){
    return new Promise((resolve,reject)=>{
      wx.cloud.callFunction({
        name: "collectionAdd",
        data: {
          database: "record",
          data: {
            uname: this.data.uname,
            phone: this.data.phone,
            total: this.data.total,
            createTime: this.data.date,
            remarks: this.data.remarks
          }
        }
      }).then(() => {
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
        resolve()
      });
    })
   
  },
  submit() {
    let arr = ["uname", "phone", "total", "date"];
    for (var i = 0; i < arr.length; i++) {
      if (!this.data[arr[i]]) {
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
    wx.cloud.callFunction({
      name:'collectionGet',
      data:{
        database: "user",
        page:1,
        num:10,
        condition:{
          phone: this.data.phone,
        }
      }
    }).then(res=>{
      console.log(res)
      let data=res.result.data
      let userinfo=data.length?data[0]:{}
      if(userinfo.uname!==this.data.uname){
        wx.showToast({
          title: "姓名与手机号与之前录入信息不符",
          icon: "none",
          image: "",
          duration: 1500,
          mask: true
        });
        return
      }
      this.addData()
      this.adduser()
    })
    
  }
});
