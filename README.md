# 微信小程序api拦截器

- 完美兼容原生小程序项目
- 完美兼用小程序api的原本调用方式，无痛迁移
- 小程序api全Promise化
- 和axios一样的请求方式
- 小程序api自定义拦截调用参数和返回结果
- 强大的async拦截

## 快速开始

### 安装

```js
npm install wxapp-api-interceptors --save
```

### 使用

##### mpvue等项目

```js
import wxApiInterceptors from 'wxapp-api-interceptors';

wxApiInterceptors(); // 必须在调用小程序api之前调用
```

##### 原生小程序项目

[下载](https://github.com/mushan0x0/wxapp-api-interceptors/archive/master.zip)该项目，解压移动文件夹`dist`里`wxApiInterceptors.js`和`runtime.js`文件到你自己的项目，详见[示例](https://github.com/mushan0x0/wxapp-api-interceptors/tree/master/example/wxapp)。

```js
const wxApiInterceptors = require('./wxApiInterceptors');

wxApiInterceptors(); // 必须在调用小程序api之前调用
```

## 小程序api调用

不必传success、complete和fail参数。

##### ⚠️注意：原生小程序项目不支持Promise.finally

##### 函数式异步调用方式：

```js
wx.showLoading({title: '登录中...'})
    .then(wx.login)
    .then(data => wx.request.post('/login', {data}))
    .then(() => wx.showToast({title: '登录成功'}))
    .catch(() => wx.showToast({title: '登录失败'}))
    .finally(wx.hideLoading);
```

##### 也兼容原生的调用方式（不便维护）：

```js
wx.showLoading({
    title: '登录中...',
    success: () => {
        wx.login({
            success: (data) => {
                wx.request({
                    url: '/login',
                    data,
                    success: () => wx.showToast({title: '登录成功'}),
                    fail: () => wx.showToast({title: '登录失败'}),
                    complete: wx.hideLoading,
                });
            },
        });
    },
});
```

## 自定义拦截器

使用方法及参数：`wxApiInterceptors({[api]: {[request](params):params, [response](res):res}})`

#### 比如拦截wx.showModal的confirmColor默认值为red，调用成功后并拦截调用成功返回的结果。
```js
wxApiInterceptors({
    showModal: {
        request(params) {
            if (params.confirmColor === undefined) {
                params.confirmColor = 'red';
            }
            return params;
        },
        response(res) {
            res = '调用成功';
            return res;
        },
    }
});

wx.showModal({title: '测试'})
    .then(console.log);
// 控制的输出：调用成功
```

## 默认拦截了request api，封装成了和axios差不多的使用方式

调用`wx.request[method](url, [config])`发送axios化的请求。

##### 默认`GET`请求

```js
wx.request('https://test.com/banner')
    .then(({data}) => {
        console.log(data);
    })
```

##### 其他请求方式

```js
wx.request.post('https://test.com', {data: {userName: 'test'}})
    .then(({data}) => {
        console.log(data);
    })
```

## 当然也可以再继续拦截request api

比如设置request api默认的host：

```js
wxApiInterceptors({
    request: {
        request(params) {
            const host = 'https://test.com'
            if (!/^(http|\/\/)/.test(params.url)) {
                params.url = host + params.url;
            }
            return params;
        },
    },
});
```

甚至可以拦截自己的业务状态码：

```js
wxApiInterceptors({
    request: {
        response(res) {
            const {data: {code}} = res;
            // 如果data里的code等于-1就响应为失败
            if (code === -1) {
                return Promise.reject(res);
            }
            return res;
        },
    },
});
```

## 强大的async拦截器

比如调用request api的时候都在header里带上本地储存的token，没有的话从服务器获取：

```js
wxApiInterceptors({
    request: {
        async request(params) {
            if (params.header === undefined) {
                params.header = {};
            }
            let token = wx.getStorageSync('token');
            if (!token) {
                ({data: token} = await wx.request('/getToken'));
                wx.setStorageSync('token', token);
            }
            params.header.token = token;
            return params;
        },
    },
});
```

原生小程序项目使用async需要特殊处理，请看[示例](https://github.com/mushan0x0/wxapp-api-interceptors/tree/master/example/wxapp)。
