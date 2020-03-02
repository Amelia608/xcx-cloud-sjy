//index.js
const utils=require('../../utils/index')
const app = getApp()
const db=wx.cloud.database()
Page({
  data: {
   list:[],
   date:utils.dateFormat(new Date(),'yyyy-MM-dd')
  },
  onLoad(){
    this.getList()
  },
  onShow(){
    this.getList()
  },
  getList(){
    db.collection('record').get().then(({data})=>{
      // console.log(data)
      this.setData({list:data})
    })
  },
  bindDateChange({detail}){
    this.setData({date:detail.value})
  }
})
