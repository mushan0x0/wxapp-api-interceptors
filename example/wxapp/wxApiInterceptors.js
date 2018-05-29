'use strict';

var regeneratorRuntime = require('./runtime');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
    var interceptors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var oldWx = _extends({}, wx);

    wx = new Proxy({}, {
        get: function get(receiver, name) {
            var _this = this;

            if (name === 'request') {
                return receiver.request;
            }
            return function () {
                for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                    arg[_key] = arguments[_key];
                }

                var _arg$ = arg[0],
                    params = _arg$ === undefined ? {} : _arg$;

                if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                    return new Promise(function () {
                        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
                            var resFn, _interceptors$name, _interceptors$name$re, request, _interceptors$name$re2, response, _params, _params$success, _success, _params$fail, _fail;

                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            resFn = function resFn(res, cb) {
                                                cb(res);
                                            };

                                            if (!interceptors[name]) {
                                                _context2.next = 16;
                                                break;
                                            }

                                            _interceptors$name = interceptors[name], _interceptors$name$re = _interceptors$name.request, request = _interceptors$name$re === undefined ? function () {
                                                return params;
                                            } : _interceptors$name$re, _interceptors$name$re2 = _interceptors$name.response, response = _interceptors$name$re2 === undefined ? function (obj) {
                                                return obj;
                                            } : _interceptors$name$re2;
                                            _context2.prev = 3;
                                            _context2.next = 6;
                                            return request(params);

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

                                                return function resFn(_x4, _x5) {
                                                    return _ref2.apply(this, arguments);
                                                };
                                            }();

                                        case 16:
                                            _params = params, _params$success = _params.success, _success = _params$success === undefined ? function () {
                                                return '';
                                            } : _params$success, _params$fail = _params.fail, _fail = _params$fail === undefined ? function () {
                                                return '';
                                            } : _params$fail;

                                            oldWx[name](Object.assign(params, {
                                                success: function success(res) {
                                                    return resFn(res, function (newRes) {
                                                        resolve(newRes);
                                                        _success(newRes);
                                                    });
                                                },
                                                fail: function fail(res) {
                                                    return resFn(res, function (newRes) {
                                                        reject(newRes);
                                                        _fail(newRes);
                                                    });
                                                }
                                            }));

                                        case 18:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, _this, [[3, 12]]);
                        }));

                        return function (_x2, _x3) {
                            return _ref.apply(this, arguments);
                        };
                    }());
                } else if (interceptors[name]) {
                    var _interceptors$name$re3 = interceptors[name].request,
                        request = _interceptors$name$re3 === undefined ? function () {
                            return params;
                        } : _interceptors$name$re3;

                    params = request(params) || params;
                    return oldWx[name](params);
                }
                return oldWx[name].apply(oldWx, arg);
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
                            if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
                                params = url;
                                url = url.url;
                            }

                            if (!interceptors.request) {
                                _context4.next = 15;
                                break;
                            }

                            _interceptors$request = interceptors.request.request, request = _interceptors$request === undefined ? function (obj) {
                                return obj;
                            } : _interceptors$request;
                            _context4.prev = 3;
                            _context4.next = 6;
                            return request(_extends({}, params, { url: url }));

                        case 6:
                            _context4.t0 = _context4.sent;

                            if (_context4.t0) {
                                _context4.next = 9;
                                break;
                            }

                            _context4.t0 = params;

                        case 9:
                            params = _context4.t0;
                            _context4.next = 15;
                            break;

                        case 12:
                            _context4.prev = 12;
                            _context4.t1 = _context4['catch'](3);
                            throw console.error(_context4.t1);

                        case 15:
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

                                                        _fail2(_context3.t1);

                                                    case 16:
                                                        if (!(firstCode !== 2)) {
                                                            _context3.next = 19;
                                                            break;
                                                        }

                                                        _fail2(res);
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

                                    return function resFn(_x8, _x9) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }();

                                var _params2 = params,
                                    _params2$success = _params2.success,
                                    _success2 = _params2$success === undefined ? resolve : _params2$success,
                                    _params2$fail = _params2.fail,
                                    _fail2 = _params2$fail === undefined ? reject : _params2$fail;

                                oldWx.request(Object.assign(params, {
                                    success: function success(res) {
                                        return resFn(res, _success2);
                                    },
                                    fail: function fail(res) {
                                        return resFn(res, _fail2);
                                    }
                                }));
                            }));

                        case 16:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined, [[3, 12]]);
        }));

        return function (_x6) {
            return _ref3.apply(this, arguments);
        };
    }(), {
        get: function get(receiver, method) {
            return function (url) {
                var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                if (params.success || params.fail) {
                    return oldWx.request(params);
                }
                Object.assign(params, {
                    method: method
                });
                return wx.request(url, params);
            };
        }
    });
};
