//index.js
const app = getApp()
const db=wx.cloud.database()
Page({
  data: {
   list:[]
  },
  onLoad(){
    this.getList()
  },
  onShow(){
    this.getList()
  },
  getList(){
    db.collection('record').get().then(({data})=>{
      console.log(data)
      this.setData({list:data})
    })
  }


})
