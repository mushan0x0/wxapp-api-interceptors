# 微信小程序api拦截器

- 小程序api全Promise化
- 兼用小程序api的原本调用方式
- 和axiox一样的请求方式
- 小程序api自定义拦截调用参数和返回结果

## 快速开始

### 安装

```js
npm install wxapp-api-interceptors --save
```

### 使用

##### mpvue项目

```js
import wxApiInterceptors from 'wxapp-api-interceptors';

wxApiInterceptors(); // 必须在调用小程序api之前调用
```

##### 原生小程序项目

下载该项目，解压移动文件夹`dist`里`wxApiInterceptors.js`到你自己的项目，详见[示例](https://github.com/mushan0x0/wxapp-api-interceptors/tree/master/example/wxapp)。

```js
const wxApiInterceptors = require('./wxApiInterceptors');

wxApiInterceptors(); // 必须在调用小程序api之前调用
```

## 小程序api调用

不必传success，和fail参数。

##### 函数式异步调用方式：

```js
wx.login()
    .then(wx.getUserInfo)
    .then(({userInfo}) => {
        this.setData({userInfo});
    })
```

##### 也兼容原生的调用方式：

```js
wx.login({
    success: () => {
        wx.getUserInfo({
            success: ({userInfo) => {
                this.setData(userInfo);
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

## 默认拦截了request api，封装成了和axiox差不多的使用方式

调用`wx.request[method](url, [config])`发送axiox化的请求。

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

比如设置request api默认的host:

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
