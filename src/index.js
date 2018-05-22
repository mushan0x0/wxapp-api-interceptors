export default (interceptors = {}) => {
    const oldWx = {...wx};

    wx = new Proxy({}, {
        get(receiver, name) {
            if (name === 'request') {
                return receiver.request;
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
                    try {
                        params = (await request(params)) || params;
                    } catch (e) {
                        throw console.error(e);
                    }
                    resFn = async (res, cb) => {
                        res = (await response(res)) || res;
                        cb(res);
                    };
                }
                const {success = () => '', fail = () => ''} = params;
                oldWx[name](Object.assign(params, {
                    success: res => resFn(res, (newRes) => {
                        resolve(newRes);
                        success(newRes);
                    }),
                    fail: res => resFn(res, (newRes) => {
                        reject(newRes);
                        fail(newRes);
                    }),
                }));
            });
        },
    });

    wx.request = new Proxy(async (url, params = {}) => {
        if (interceptors.request) {
            const {request: {request = obj => obj}} = interceptors;
            if (typeof url === 'object') {
                params = url;
                url = url.url;
            }
            try {
                params = (await request({...params, url})) || params;
            } catch (e) {
                throw console.error(e);
            }
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
                if (params.success || params.fail) {
                    return oldWx.request(params);
                }
                Object.assign(params, {
                    method,
                });
                return wx.request(url, params);
            };
        },
    });
};
