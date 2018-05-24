Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      wx.showModal({title: '测试'})
          .then(console.log)
  },
});
