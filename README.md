# 微信小程序api拦截器

- 小程序api全Promise化
- 兼用小程序api的原本调用方式
- 和axiox一样的请求方式
- 小程序api自定义拦截调用参数和返回结果

## ⚠️注意：

1.需要关掉项目的es6转es5开关

## 快速开始

### 安装

```js
npm install wxapp-api-interceptors --save
```

### 使用

#### mpvue项目

编辑src/main.js文件：
```js
import wxApiInterceptors from 'wxapp-api-interceptors';

wxApiInterceptors(); // 必须在调用小程序api之前调用
```

## 小程序api调用

不必传success，和fail参数。

##### 原生代码：

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

##### 使用后：

```js
wx.login()
    .then(wx.getUserInfo)
    .then(({userInfo}) => {
        this.setData({userInfo});
    })
```

## 自定义拦截器

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
