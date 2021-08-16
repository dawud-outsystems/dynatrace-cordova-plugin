window.dtrum = window.dtrum || {
    actionName: function () { return void 0; },
    addActionProperties: function () { return void 0; },
    addEnterActionListener: function () { return void 0; },
    addLeaveActionListener: function () { return void 0; },
    addPageLeavingListener: function () { return void 0; },
    addVisitTimeoutListener: function () { return void 0; },
    beginUserInput: function () { },
    disable: function () { return void 0; },
    disablePersistentValues: function () { return void 0; },
    disableSessionReplay: function () { return void 0; },
    enable: function () { return void 0; },
    enablePersistentValues: function () { return void 0; },
    enableSessionReplay: function () { return void 0; },
    endSession: function () { return void 0; },
    endUserInput: function () { return void 0; },
    enterAction: function () { return -1; },
    enterXhrAction: function () { return -1; },
    enterXhrCallback: function () { return void 0; },
    getAndEvaluateMetaData: function () { return []; },
    identifyUser: function () { return void 0; },
    incrementOnLoadEndMarkers: function () { return void 0; },
    leaveAction: function () { return void 0; },
    leaveXhrAction: function () { return void 0; },
    leaveXhrCallback: function () { return void 0; },
    markAsErrorPage: function () { return false; },
    markXHRFailed: function () { return false; },
    now: function () { return -1; },
    registerPreDiffMethod: function () { return void 0; },
    removeEnterActionListener: function () { return void 0; },
    removeLeaveActionListener: function () { return void 0; },
    reportCustomError: function () { return void 0; },
    reportError: function () { return void 0; },
    sendSessionProperties: function () { return void 0; },
    sendSignal: function () { return void 0; },
    setAutomaticActionDetection: function () { return void 0; },
    setLoadEndManually: function () { return void 0; },
    signalLoadEnd: function () { return void 0; },
    signalOnLoadEnd: function () { return void 0; },
    signalOnLoadStart: function () { return void 0; },
    startThirdParty: function () { return void 0; },
    stopThirdParty: function () { return void 0; },
};
window.dtrum.endSession =
    function () {
        return window.dynatraceMobile.endVisit(this.success, this.error);
    };
window.dtrum.identifyUserNative =
function () {
    return window.dynatraceMobile.identifyUserNative(this.success, this.error);
};
