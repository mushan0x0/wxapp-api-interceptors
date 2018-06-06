export default (interceptors = {}) => {
    const oldWx = {...wx};

    wx = new Proxy({}, {
        get(receiver, name) {
            if (name === 'request') {
                return receiver.request;
            }
            return (...arg) => {
                let [params = {}] = arg;
                const handleInterceptors = async (isAsync = false) => {
                    let resFn = (res, cb) => {
                        cb(res);
                    };
                    if (interceptors[name]) {
                        const {request = () => params, response = obj => obj} = interceptors[name];
                        try {
                            params = (isAsync ? request(params) : (await request(params))) || params;
                        } catch (e) {
                            throw console.error(e);
                        }
                        resFn = async (res, cb) => {
                            res = (isAsync ? response(res) : (await response(res))) || res;
                            cb(res);
                        };
                    }
                    return resFn;
                };
                if (interceptors[name] && !oldWx.canIUse(`${name}.success`)) {
                    handleInterceptors(true);
                } else if ((typeof params === 'object' && oldWx.canIUse(`${name}.success`)) || interceptors[name]) {
                    return new Promise(async (resolve, reject) => {
                        const {success = () => '', fail = () => ''} = params;
                        const resFn = await handleInterceptors();
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
                }
                return oldWx[name](...arg);
            };
        },
    });

    wx.request = new Proxy(async (url, params = {}) => {
        if (typeof url === 'object') {
            params = url;
            url = url.url;
        }
        if (interceptors.request) {
            const {request: {request = obj => obj}} = interceptors;
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
                if (interceptors.request) {
                    const {request: {response = () => res}} = interceptors;
                    try {
                        res = (await response(res)) || res;
                    } catch (e) {
                        fail(e);
                    }
                }
                if (statusCode >= 400) {
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
