'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
    var interceptors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var oldWx = _extends({}, wx);

    wx = new Proxy({}, {
        get: function get(receiver, name) {
            var _this = this;

            if (name === 'request') {
                return receiver.request;
            }
            if (name === 'oldWx') {
                return oldWx;
            }
            if (name.includes('Sync')) {
                return oldWx[name];
            }
            return function () {
                var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return new Promise(function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
                        var resFn, _interceptors$name, _interceptors$name$re, request, _interceptors$name$re2, response;

                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        resFn = function resFn(res, cb) {
                                            cb(res);
                                        };

                                        if (!interceptors[name]) {
                                            _context2.next = 10;
                                            break;
                                        }

                                        _interceptors$name = interceptors[name], _interceptors$name$re = _interceptors$name.request, request = _interceptors$name$re === undefined ? function () {
                                            return params;
                                        } : _interceptors$name$re, _interceptors$name$re2 = _interceptors$name.response, response = _interceptors$name$re2 === undefined ? function (obj) {
                                            return obj;
                                        } : _interceptors$name$re2;
                                        _context2.next = 5;
                                        return request(params);

                                    case 5:
                                        _context2.t0 = _context2.sent;

                                        if (_context2.t0) {
                                            _context2.next = 8;
                                            break;
                                        }

                                        _context2.t0 = params;

                                    case 8:
                                        params = _context2.t0;

                                        resFn = function () {
                                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res, cb) {
                                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                                    while (1) {
                                                        switch (_context.prev = _context.next) {
                                                            case 0:
                                                                _context.next = 2;
                                                                return response(res);

                                                            case 2:
                                                                _context.t0 = _context.sent;

                                                                if (_context.t0) {
                                                                    _context.next = 5;
                                                                    break;
                                                                }

                                                                _context.t0 = res;

                                                            case 5:
                                                                res = _context.t0;

                                                                cb(res);

                                                            case 7:
                                                            case 'end':
                                                                return _context.stop();
                                                        }
                                                    }
                                                }, _callee, _this);
                                            }));

                                            return function resFn(_x5, _x6) {
                                                return _ref2.apply(this, arguments);
                                            };
                                        }();

                                    case 10:
                                        oldWx[name](Object.assign(params, {
                                            success: function success(res) {
                                                return resFn(res, resolve);
                                            },
                                            fail: function fail(res) {
                                                return resFn(res, reject);
                                            }
                                        }));

                                    case 11:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, _this);
                    }));

                    return function (_x3, _x4) {
                        return _ref.apply(this, arguments);
                    };
                }());
            };
        }
    });

    wx.request = new Proxy(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var _interceptors$request, request;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (!interceptors.request) {
                                _context4.next = 8;
                                break;
                            }

                            _interceptors$request = interceptors.request.request, request = _interceptors$request === undefined ? function (obj) {
                                return obj;
                            } : _interceptors$request;
                            _context4.next = 4;
                            return request(_extends({}, params, { url: url }));

                        case 4:
                            _context4.t0 = _context4.sent;

                            if (_context4.t0) {
                                _context4.next = 7;
                                break;
                            }

                            _context4.t0 = params;

                        case 7:
                            params = _context4.t0;

                        case 8:
                            return _context4.abrupt('return', new Promise(function (resolve, reject) {
                                var resFn = function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(res, cb) {
                                        var _res, statusCode, firstCode, _interceptors$request2, response;

                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _res = res, statusCode = _res.statusCode;
                                                        firstCode = +statusCode.toString().split('')[0];

                                                        if (!interceptors.request) {
                                                            _context3.next = 16;
                                                            break;
                                                        }

                                                        _interceptors$request2 = interceptors.request.response, response = _interceptors$request2 === undefined ? function () {
                                                            return res;
                                                        } : _interceptors$request2;
                                                        _context3.prev = 4;
                                                        _context3.next = 7;
                                                        return response(res);

                                                    case 7:
                                                        _context3.t0 = _context3.sent;

                                                        if (_context3.t0) {
                                                            _context3.next = 10;
                                                            break;
                                                        }

                                                        _context3.t0 = res;

                                                    case 10:
                                                        res = _context3.t0;
                                                        _context3.next = 16;
                                                        break;

                                                    case 13:
                                                        _context3.prev = 13;
                                                        _context3.t1 = _context3['catch'](4);

                                                        _fail(_context3.t1);

                                                    case 16:
                                                        if (!(firstCode !== 2)) {
                                                            _context3.next = 19;
                                                            break;
                                                        }

                                                        _fail(res);
                                                        return _context3.abrupt('return');

                                                    case 19:
                                                        cb(res);

                                                    case 20:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, this, [[4, 13]]);
                                    }));

                                    return function resFn(_x9, _x10) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }();

                                var _params = params,
                                    _params$success = _params.success,
                                    _success = _params$success === undefined ? resolve : _params$success,
                                    _params$fail = _params.fail,
                                    _fail = _params$fail === undefined ? reject : _params$fail;

                                oldWx.request(Object.assign(params, {
                                    success: function success(res) {
                                        return resFn(res, _success);
                                    },
                                    fail: function fail(res) {
                                        return resFn(res, _fail);
                                    }
                                }));
                            }));

                        case 9:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function (_x7) {
            return _ref3.apply(this, arguments);
        };
    }(), {
        get: function get(receiver, method) {
            return function (url) {
                var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                Object.assign(params, {
                    method: method
                });
                return wx.request(url, params);
            };
        }
    });
};
