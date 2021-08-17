"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require('cordova/exec');
var emptyFunction = function () { };
var pluginId = module.id.slice(0, module.id.lastIndexOf('.'));
var MobileFirstRequestInterceptor = require(pluginId + '.mobile-first-network-interceptor').MobileFirstRequestInterceptor;
var NativeNetworkInterceptorUtils = require(pluginId + '.native-network-interceptor-utils').NativeNetworkInterceptorUtils;
module.exports = {
    endVisit: function (success, error) {
        success = success || emptyFunction;
        error = error || emptyFunction;
        exec(success, error, "DynatraceCordovaPlugin", "endVisit", []);
    },
    getMobileFirstNetworkInterceptor: function () {
        return MobileFirstRequestInterceptor;
    },
    getNativeNetworkInterceptorUtils: function () {
        return NativeNetworkInterceptorUtils;
    },
    getUserPrivacyOptions: function (success, error) {
        success = success || emptyFunction;
        error = error || emptyFunction;
        exec(success, error, "DynatraceCordovaPlugin", "getUserPrivacyOptions", []);
    },
    applyUserPrivacyOptions: function (dataCollectionLevel, crashReportingOptedIn, success, error) {
        if (crashReportingOptedIn != undefined && dataCollectionLevel != undefined) {
            success = success || emptyFunction;
            error = error || emptyFunction;
            var options = { dataCollectionLevel: dataCollectionLevel, crashReportingOptedIn: crashReportingOptedIn };
            exec(success, error, "DynatraceCordovaPlugin", "applyUserPrivacyOptions", [options]);
        }
        else if (error) {
            error("UserPrivacyOptions missing properties.");
        }
    },
    //DAWUD
    identifyUserNative: function (userId, success, error) {
        if (userId != undefined && userId != '') {
            success = success || emptyFunction;
            error = error || emptyFunction;
            var options = { userId: userId };
            alert('userId: ' + userId);
            exec(success, error, "DynatraceCordovaPlugin", "identifyUser", [options]);
            alert('success');
        }
        else if (error) {
            error("Parameter userId can't be blank or null.");
            alert('error');
        }
    }
};
