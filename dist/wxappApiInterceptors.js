var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

export default (interceptors = {}) => {
  const oldWx = _extends({}, wx);

  wx = new Proxy(
    {},
    {
      get(receiver, name) {
        if (name === "request") {
          return receiver.request;
        }
        if (name === "oldWx") {
          return oldWx;
        }
        if (name.includes("Sync")) {
          return oldWx[name];
        }
        return (params = {}) =>
          new Promise(
            (() => {
              var _ref = _asyncToGenerator(function*(resolve, reject) {
                let resFn = function(res, cb) {
                  cb(res);
                };
                if (interceptors[name]) {
                  const {
                    request = function() {
                      return params;
                    },
                    response = function(obj) {
                      return obj;
                    }
                  } = interceptors[name];
                  params = (yield request(params)) || params;
                  resFn = (() => {
                    var _ref2 = _asyncToGenerator(function*(res, cb) {
                      res = (yield response(res)) || res;
                      cb(res);
                    });

                    return function resFn(_x3, _x4) {
                      return _ref2.apply(this, arguments);
                    };
                  })();
                }
                oldWx[name](
                  Object.assign(params, {
                    success: function(res) {
                      return resFn(res, resolve);
                    },
                    fail: function(res) {
                      return resFn(res, reject);
                    }
                  })
                );
              });

              return function(_x, _x2) {
                return _ref.apply(this, arguments);
              };
            })()
          );
      }
    }
  );

  wx.request = new Proxy(
    (() => {
      var _ref3 = _asyncToGenerator(function*(url, params = {}) {
        if (interceptors.request) {
          const {
            request: {
              request = function(obj) {
                return obj;
              }
            }
          } = interceptors;
          params = (yield request(_extends({}, params, { url }))) || params;
        }
        return new Promise(function(resolve, reject) {
          let resFn = (() => {
            var _ref4 = _asyncToGenerator(function*(res, cb) {
              const { statusCode } = res;
              const firstCode = +statusCode.toString().split("")[0];
              if (interceptors.request) {
                const {
                  request: {
                    response = function() {
                      return res;
                    }
                  }
                } = interceptors;
                try {
                  res = (yield response(res)) || res;
                } catch (e) {
                  fail(e);
                }
              }
              if (firstCode !== 2) {
                fail(res);
                return;
              }
              cb(res);
            });

            return function resFn(_x6, _x7) {
              return _ref4.apply(this, arguments);
            };
          })();

          const { success = resolve, fail = reject } = params;

          oldWx.request(
            Object.assign(params, {
              success: function(res) {
                return resFn(res, success);
              },
              fail: function(res) {
                return resFn(res, fail);
              }
            })
          );
        });
      });

      return function(_x5) {
        return _ref3.apply(this, arguments);
      };
    })(),
    {
      get(receiver, method) {
        return (url, params = {}) => {
          Object.assign(params, {
            method
          });
          return wx.request(url, params);
        };
      }
    }
  );
};
