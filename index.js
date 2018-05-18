export default (interceptors = {}) => {
    const oldWx = {...wx};

    wx = new Proxy({}, {
        get(receiver, name) {
            if (name === 'request') {
                return receiver.request;
            }
            if (name === 'oldWx') {
                return oldWx;
            }
            if (name.includes('Sync')) {
                return oldWx[name];
            }
            return (params = {}) => new Promise(async (resolve, reject) => {
                let resFn = (res, cb) => {
                    cb(res);
                };
                if (interceptors[name]) {
                    const {request = () => params, response = obj => obj} = interceptors[name];
                    params = (await request(params)) || params;
                    resFn = async (res, cb) => {
                        res = (await response(res)) || res;
                        cb(res);
                    };
                }
                oldWx[name](Object.assign(params, {
                    success: res => resFn(res, resolve),
                    fail: res => resFn(res, reject),
                }));
            });
        },
    });

    wx.request = new Proxy(async (url, params = {}) => {
        if (interceptors.request) {
            const {request: {request = obj => obj}} = interceptors;
            params = (await request({...params, url})) || params;
        }
        return new Promise((resolve, reject) => {
            const {success = resolve, fail = reject} = params;
            async function resFn(res, cb) {
                const {statusCode} = res;
                const firstCode = +statusCode.toString().split('')[0];
                if (interceptors.request) {
                    const {request: {response = () => res}} = interceptors;
                    try {
                        res = (await response(res)) || res;
                    } catch (e) {
                        fail(e);
                    }
                }
                if (firstCode !== 2) {
                    fail(res);
                    return;
                }
                cb(res);
            }
            oldWx.request(Object.assign(params, {
                success: res => resFn(res, success),
                fail: res => resFn(res, fail),
            }));
        });
    }, {
        get(receiver, method) {
            return (url, params = {}) => {
                Object.assign(params, {
                    method,
                });
                return wx.request(url, params);
            };
        },
    });
};
