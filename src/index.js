export default (interceptors = {}) => {
    const oldWx = {...wx};

    wx = new Proxy({}, {
        get(receiver, name) {
            if (name === 'request') {
                return receiver.request;
            }
            if (name === 'old') {
                return oldWx;
            }
            return (...arg) => {
                let [params = {}] = arg;
                const handleIntercept = async (isAsync = false) => {
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
                if (interceptors[name] && (!oldWx.canIUse(`${name}.success`) && name !== 'showLoading')) {
                    handleIntercept(true);
                    arg[0] = params;
                } else if (
                    (oldWx.canIUse(`${name}.success` || name === 'showLoading'))
                    || interceptors[name]
                ) {
                    return new Promise(async (resolve, reject) => {
                        const {success = () => '', fail = () => ''} = params;
                        const resFn = await handleIntercept();
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
            const {success = () => '', fail = () => ''} = params;
            async function resFn(res, cb) {
                const {statusCode} = res;
                if (interceptors.request) {
                    const {request: {response = () => res}} = interceptors;
                    try {
                        res = (await response(res)) || res;
                    } catch (e) {
                        reject(e);
                        fail(e);
                    }
                }
                if (statusCode >= 400) {
                    reject(res);
                    fail(res);
                    return;
                }
                cb(res);
            }
            oldWx.request(Object.assign(params, {
                success: res => resFn(res, (newRes) => {
                    success(newRes);
                    resolve(newRes);
                }),
                fail: res => resFn(res, (newRes) => {
                    fail(newRes);
                    reject(newRes);
                }),
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
