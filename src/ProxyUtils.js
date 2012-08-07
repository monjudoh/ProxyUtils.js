/*
 * ProxyUtils.js
 *
 * https://github.com/monjudoh/ProxyUtils.js
 * version: 0.1
 *
 * Copyright (c) 2012 monjudoh
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
;(function(module,moduleName,global){
  // in AMD
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(function() {
      return module;
    });
  } else {
    // in a browser or Rhino
    global[moduleName] = module;
  }
})((function(global, undefined) {
  var ProxyUtils = {};
  /**
   *
   * @param target
   * @param {Array} readableKeys
   * @param {Array} writableKeys
   * @param {Array} executableMethodNames
   * @return {Object} proxy
   */
  ProxyUtils.createHiddingProxy = function createHiddingProxy(target,readableKeys,writableKeys,executableMethodNames) {
    readableKeys = readableKeys ? readableKeys : [];
    writableKeys = writableKeys ? writableKeys : [];
    executableMethodNames = executableMethodNames ? executableMethodNames : [];
    var proxy = {};
    readableKeys.forEach(function(key){
      Object.defineProperty(proxy,key,{
        get : function () {
          return target[key];
        },
        configurable:true
      })
    });
    writableKeys.forEach(function(key){
      Object.defineProperty(proxy,key,{
        set : function (val) {
          target[key] = val;
        }
      })
    });
    executableMethodNames.forEach(function(methodName){
      Object.defineProperty(proxy,methodName,{
        value : target[methodName].bind(target),
        writable : false
      });
    });
    return proxy;
  };
  return ProxyUtils;
})(this),'ProxyUtils',this);