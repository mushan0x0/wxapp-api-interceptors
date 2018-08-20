const wxApiInterceptors = require('./wxApiInterceptors');

const newWx = wxApiInterceptors({
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
}, true);

App({
    wx: newWx,
});
