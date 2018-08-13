var regeneratorRuntime = require('../runtime'); // 需要用到async的地方都要引入这个文件，同时需要打开es6转es5

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
      await wx.showModal({title: '测试'})
          .then(console.log)
          .finally(() => {
              console.log('finally')
          });
      console.log('结束');
      console.log(wx.createAnimation());
      wx.checkSession().then(console.log);
  },
});
