const wxApiInterceptors = require('./wxApiInterceptors');

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
