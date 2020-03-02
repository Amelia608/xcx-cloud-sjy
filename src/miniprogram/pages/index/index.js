//index.js
const utils=require('../../utils/index')
const app = getApp()
const db=wx.cloud.database()
Page({
  data: {
   list:[],
   keyword:'',
   loading:false,
   date:utils.dateFormat(new Date(),'yyyy-MM-dd')
  },
  onLoad(){
    this.getList()
  },
  onShow(){
    this.getList()
  },
  getList(){
    wx.showLoading({
      title:'数据加载中...' ,
      mask: true
    });
    db.collection('record').get().then(({data})=>{
      // console.log(data)
      this.setData({list:data})
      wx.hideLoading()
    })
  },
  valueChange({detail,currentTarget}){
    this.setData({[currentTarget.dataset.txt]:detail.value})
  },
  search(){
    // console.log(1)
    this.getList()
  },
  clearInput(){
    this.setData({keyword:''})
  }
})
