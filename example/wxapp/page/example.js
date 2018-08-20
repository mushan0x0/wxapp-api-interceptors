var regeneratorRuntime = require('../runtime'); // 需要用到async的地方都要引入这个文件，同时需要打开es6转es5

Page({
    data: {
        richText: '<h1>Hello world!</h1>'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        await wx.newWx.showModal({title: '测试'})
            .then(console.log)
            .finally(() => {
                console.log('finally')
            });
        console.log('结束');
        console.log(wx.newWx.createAnimation());
        wx.newWx.checkSession().then(console.log);
    },
});
