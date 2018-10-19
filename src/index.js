/* eslint-disable no-extend-native,consistent-return */
if (!Promise.prototype.finally) {
    Promise.prototype.finally = callback => this.then(
        value => this.constructor.resolve(callback()).then(() => value),
        reason => this.constructor.resolve(callback()).then(() => { throw reason; }),
    );
}

export default (interceptors = {}, isReturn = false) => {
    const oldWx = {...wx};
    const newWx = {};

    const newRequest = async (url, params = {}) => {
        if (typeof url === 'object') {
            params = url;
            url = url.url;
        } else {
            params.url = url;
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
    };
    ['options', 'get', 'head', 'post', 'put', 'delete', 'trace', 'connect'].forEach((method) => {
        newRequest[method] = (url, params = {}) => {
            if (params.success || params.fail) {
                return oldWx.request(params);
            }
            Object.assign(params, {
                method,
            });
            return wx.request(url, params);
        };
    });

    Object.keys(oldWx).forEach((name) => {
        let newApi;
        if (name === 'request') {
            newApi = newRequest;
        } else if (name === 'old') {
            newApi = oldWx;
        } else {
            newApi = (...arg) => {
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
                const fnIsAsync = !(
                    (
                        oldWx.canIUse(`${name}.success`)
                        || (
                            !oldWx.canIUse(`${name}.return`) && oldWx.canIUse(`${name}.object`) && oldWx.canIUse(`${name}.callback`)
                        )
                        || name === 'checkSession'
                        || name === 'navigateBack'
                        || name === 'requestPayment'
                    )
                    || interceptors[name]
                );
                if (interceptors[name] && fnIsAsync) {
                    handleIntercept(true);
                    arg[0] = params;
                } else if (!fnIsAsync || interceptors[name]) {
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
        }
        newWx[name] = newApi;
    });

    if (isReturn) {
        return newWx;
    }
    wx = newWx;
};
