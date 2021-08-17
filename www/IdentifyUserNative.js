// Empty constructor
function IdentifyUserNative() {}

// The function that passes work along to native shells
// Message is a string, duration may be 'long' or 'short'
IdentifyUserNative.prototype.show = function(userId, successCallback, errorCallback) {
  var options = {};
  options.userId = userId;
  cordova.exec(successCallback, errorCallback, 'DynatraceCordovaPlugin', 'identifyUser', [options]);
}

// Installation constructor that binds IdentifyUserNative to window
IdentifyUserNative.install = function() {
  if (!window.plugins) {
    window.plugins = {};
  }
  window.plugins.identifyUserNative = new IdentifyUserNative();
  return window.plugins.identifyUserNative;
};
cordova.addConstructor(IdentifyUserNative.install);