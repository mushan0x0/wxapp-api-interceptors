'use strict';

var regeneratorRuntime = require('./runtime');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (!Promise.prototype.finally) {
    Promise.prototype.finally = function (callback) {
        var _this = this;

        return this.then(function (value) {
            return _this.constructor.resolve(callback()).then(function () {
                return value;
            });
        }, function (reason) {
            return _this.constructor.resolve(callback()).then(function () {
                throw reason;
            });
        });
    };
}
module.exports = function () {
    var interceptors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isReturn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var oldWx = _extends({}, wx);
    var newWx = {};

    var newRequest = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var _interceptors$request, request;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
                                params = url;
                                url = url.url;
                            } else {
                                params.url = url;
                            }

                            if (!interceptors.request) {
                                _context2.next = 15;
                                break;
                            }

                            _interceptors$request = interceptors.request.request, request = _interceptors$request === undefined ? function (obj) {
                                return obj;
                            } : _interceptors$request;
                            _context2.prev = 3;
                            _context2.next = 6;
                            return request(_extends({}, params, { url: url }));

                        case 6:
                            _context2.t0 = _context2.sent;

                            if (_context2.t0) {
                                _context2.next = 9;
                                break;
                            }

                            _context2.t0 = params;

                        case 9:
                            params = _context2.t0;
                            _context2.next = 15;
                            break;

                        case 12:
                            _context2.prev = 12;
                            _context2.t1 = _context2['catch'](3);
                            throw console.error(_context2.t1);

                        case 15:
                            return _context2.abrupt('return', new Promise(function (resolve, reject) {
                                var resFn = function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res, cb) {
                                        var _res, statusCode, _interceptors$request2, response;

                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _res = res, statusCode = _res.statusCode;

                                                        if (!interceptors.request) {
                                                            _context.next = 16;
                                                            break;
                                                        }

                                                        _interceptors$request2 = interceptors.request.response, response = _interceptors$request2 === undefined ? function () {
                                                            return res;
                                                        } : _interceptors$request2;
                                                        _context.prev = 3;
                                                        _context.next = 6;
                                                        return response(res);

                                                    case 6:
                                                        _context.t0 = _context.sent;

                                                        if (_context.t0) {
                                                            _context.next = 9;
                                                            break;
                                                        }

                                                        _context.t0 = res;

                                                    case 9:
                                                        res = _context.t0;
                                                        _context.next = 16;
                                                        break;

                                                    case 12:
                                                        _context.prev = 12;
                                                        _context.t1 = _context['catch'](3);

                                                        reject(_context.t1);
                                                        _fail(_context.t1);

                                                    case 16:
                                                        if (!(statusCode >= 400)) {
                                                            _context.next = 20;
                                                            break;
                                                        }

                                                        reject(res);
                                                        _fail(res);
                                                        return _context.abrupt('return');

                                                    case 20:
                                                        cb(res);

                                                    case 21:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this, [[3, 12]]);
                                    }));

                                    return function resFn(_x5, _x6) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }();

                                var _params = params,
                                    _params$success = _params.success,
                                    _success = _params$success === undefined ? function () {
                                        return '';
                                    } : _params$success,
                                    _params$fail = _params.fail,
                                    _fail = _params$fail === undefined ? function () {
                                        return '';
                                    } : _params$fail;

                                oldWx.request(Object.assign(params, {
                                    success: function success(res) {
                                        return resFn(res, function (newRes) {
                                            _success(newRes);
                                            resolve(newRes);
                                        });
                                    },
                                    fail: function fail(res) {
                                        return resFn(res, function (newRes) {
                                            _fail(newRes);
                                            reject(newRes);
                                        });
                                    }
                                }));
                            }));

                        case 16:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[3, 12]]);
        }));

        return function newRequest(_x3) {
            return _ref.apply(this, arguments);
        };
    }();
    ['options', 'get', 'head', 'post', 'put', 'delete', 'trace', 'connect'].forEach(function (method) {
        newRequest[method] = function (url) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (params.success || params.fail) {
                return oldWx.request(params);
            }
            Object.assign(params, {
                method: method
            });
            return wx.request(url, params);
        };
    });

    Object.keys(oldWx).forEach(function (name) {
        var newApi = void 0;
        if (name === 'request') {
            newApi = newRequest;
        } else if (name === 'old') {
            newApi = oldWx;
        } else {
            newApi = function newApi() {
                for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                    arg[_key] = arguments[_key];
                }

                var _arg$ = arg[0],
                    params = _arg$ === undefined ? {} : _arg$;

                var handleIntercept = function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                        var isAsync = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                        var resFn, _interceptors$name, _interceptors$name$re, request, _interceptors$name$re2, response;

                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        resFn = function resFn(res, cb) {
                                            cb(res);
                                        };

                                        if (!interceptors[name]) {
                                            _context4.next = 21;
                                            break;
                                        }

                                        _interceptors$name = interceptors[name], _interceptors$name$re = _interceptors$name.request, request = _interceptors$name$re === undefined ? function () {
                                            return params;
                                        } : _interceptors$name$re, _interceptors$name$re2 = _interceptors$name.response, response = _interceptors$name$re2 === undefined ? function (obj) {
                                            return obj;
                                        } : _interceptors$name$re2;
                                        _context4.prev = 3;

                                        if (!isAsync) {
                                            _context4.next = 8;
                                            break;
                                        }

                                        _context4.t1 = request(params);
                                        _context4.next = 11;
                                        break;

                                    case 8:
                                        _context4.next = 10;
                                        return request(params);

                                    case 10:
                                        _context4.t1 = _context4.sent;

                                    case 11:
                                        _context4.t0 = _context4.t1;

                                        if (_context4.t0) {
                                            _context4.next = 14;
                                            break;
                                        }

                                        _context4.t0 = params;

                                    case 14:
                                        params = _context4.t0;
                                        _context4.next = 20;
                                        break;

                                    case 17:
                                        _context4.prev = 17;
                                        _context4.t2 = _context4['catch'](3);
                                        throw console.error(_context4.t2);

                                    case 20:
                                        resFn = function () {
                                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(res, cb) {
                                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                    while (1) {
                                                        switch (_context3.prev = _context3.next) {
                                                            case 0:
                                                                if (!isAsync) {
                                                                    _context3.next = 4;
                                                                    break;
                                                                }

                                                                _context3.t1 = response(res);
                                                                _context3.next = 7;
                                                                break;

                                                            case 4:
                                                                _context3.next = 6;
                                                                return response(res);

                                                            case 6:
                                                                _context3.t1 = _context3.sent;

                                                            case 7:
                                                                _context3.t0 = _context3.t1;

                                                                if (_context3.t0) {
                                                                    _context3.next = 10;
                                                                    break;
                                                                }

                                                                _context3.t0 = res;

                                                            case 10:
                                                                res = _context3.t0;

                                                                cb(res);

                                                            case 12:
                                                            case 'end':
                                                                return _context3.stop();
                                                        }
                                                    }
                                                }, _callee3, undefined);
                                            }));

                                            return function resFn(_x9, _x10) {
                                                return _ref4.apply(this, arguments);
                                            };
                                        }();

                                    case 21:
                                        return _context4.abrupt('return', resFn);

                                    case 22:
                                    case 'end':
                                        return _context4.stop();
                                }
                            }
                        }, _callee4, undefined, [[3, 17]]);
                    }));

                    return function handleIntercept() {
                        return _ref3.apply(this, arguments);
                    };
                }();
                var fnIsAsync = !(oldWx.canIUse(name + '.success') || !oldWx.canIUse(name + '.return') && oldWx.canIUse(name + '.object') && oldWx.canIUse(name + '.callback') || name === 'checkSession' || interceptors[name]);
                if (interceptors[name] && fnIsAsync) {
                    handleIntercept(true);
                    arg[0] = params;
                } else if (!fnIsAsync || interceptors[name]) {
                    return new Promise(function () {
                        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
                            var _params2, _params2$success, _success2, _params2$fail, _fail2, resFn;

                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                    switch (_context5.prev = _context5.next) {
                                        case 0:
                                            _params2 = params, _params2$success = _params2.success, _success2 = _params2$success === undefined ? function () {
                                                return '';
                                            } : _params2$success, _params2$fail = _params2.fail, _fail2 = _params2$fail === undefined ? function () {
                                                return '';
                                            } : _params2$fail;
                                            _context5.next = 3;
                                            return handleIntercept();

                                        case 3:
                                            resFn = _context5.sent;

                                            oldWx[name](Object.assign(params, {
                                                success: function success(res) {
                                                    return resFn(res, function (newRes) {
                                                        resolve(newRes);
                                                        _success2(newRes);
                                                    });
                                                },
                                                fail: function fail(res) {
                                                    return resFn(res, function (newRes) {
                                                        reject(newRes);
                                                        _fail2(newRes);
                                                    });
                                                }
                                            }));

                                        case 5:
                                        case 'end':
                                            return _context5.stop();
                                    }
                                }
                            }, _callee5, undefined);
                        }));

                        return function (_x11, _x12) {
                            return _ref5.apply(this, arguments);
                        };
                    }());
                }
                return oldWx[name].apply(oldWx, arg);
            };
        }
        newWx[name] = newApi;
    });

    if (isReturn) {
        return newWx;
    }
    wx = newWx;
};
