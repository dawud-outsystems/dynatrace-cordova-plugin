"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeNetworkInterceptorUtils = void 0;
exports.NativeNetworkInterceptorUtils = {
    getHeadersForNativeRequest: getHeadersForNativeRequest,
    enterNativeRequestAction: enterNativeRequestAction,
    leaveNativeRequestAction: leaveNativeRequestAction
};
function getHeadersForNativeRequest(actionId) {
    var headers = {};
    if (!dT_) {
        console.log("Missing Dynatrace Javascript Agent API!");
        return headers;
    }
    headers["x-dynatrace"] = "";
    headers["x-dtc"] = getDTC(actionId);
    return headers;
}
function getDTC(actionId) {
    var referer = dT_.gAR(actionId);
    if (referer == "") {
        referer = location.href;
    }
    return "sn=\"" + getCookieValue("dtCookie") + "\", pc=\"" + getCookieValue("dtPC") + "\", v=\"" + getCookieValue("rxVisitor") + "\", r=\"" + referer + "\", adk=\"" + getCookieValue("dtAdk") + "\"";
}
function getCookieValue(cookieName) {
    var b = document.cookie.match('(^|[^;]+)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
function enterNativeRequestAction(url, webRequestFrameworkName, actionNameFallback) {
    if (!dtrum) {
        console.log("Missing Dynatrace Javascript Agent API!");
        return -1;
    }
    if (!webRequestFrameworkName) {
        webRequestFrameworkName = "Native Web Request";
    }
    if (!actionNameFallback) {
        actionNameFallback = "Request to: " + url;
    }
    var actionId = dtrum.enterXhrAction(webRequestFrameworkName, 3, url);
    if (actionId == 0) {
        actionId = dtrum.enterAction(actionNameFallback);
    }
    return actionId;
}
function leaveNativeRequestAction(actionId) {
    if (!dtrum) {
        console.log("Missing Dynatrace Javascript Agent API!");
    }
    else {
        dtrum.leaveAction(actionId);
    }
}
