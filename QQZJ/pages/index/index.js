// pages/index/index.js
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data:{
    posts: null
  },
  onShow:function(){
    // 页面显示
    let that = this
      util.request({
        url: 'http://wx.romeo.wang/home/index/show',
        success: function(res){
          that.setData({
            posts: res.data
          })
        }
      })
  },
  showDetail:function(e){
    util.navigateTo({
      url:"/pages/post/post?id="+e.currentTarget.id
    })
  },
  like:function(e){
    let that = this
    let pid = e.currentTarget.id
    util.request({
      url: 'http://wx.romeo.wang/home/post/like',
      data: {"id": pid},
      success: function(res){
        // success
        if(res.data.err == 0){
          let posts = that.data.posts
          posts[pid].like = res.data.like
          posts[pid].star = res.data.star
          that.setData({
            posts: posts
          })
          wx.showToast({
            title: res.data.msg,
            icon: "success",
            mask: true,
            duration: 1000
          })
        }else{
          wx.showModal({
            title: "提示",
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  }
})