"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBuildProperties = exports.setCliBuildArgs = void 0;
var nodePath = require("path");
var logger_1 = require("../logger");
var pathConstants = require("../pathsConstants");
var fileOperation = require("../fileOperationHelper");
function setCliBuildArgs(process) {
    var buildArgs = {};
    var commandArgs = process.argv.slice(2);
    var capacitorPlatformArg = process.env ? process.env.IONIC_CLI_HOOK_CTX_BUILD_PLATFORM : undefined;
    if (capacitorPlatformArg !== undefined) {
        buildArgs.capacitor = capacitorPlatformArg;
    }
    if (commandArgs.includes("android") || capacitorPlatformArg === "android") {
        buildArgs.android = true;
    }
    if (commandArgs.includes("ios") || capacitorPlatformArg === "ios") {
        buildArgs.ios = true;
    }
    return buildArgs;
}
exports.setCliBuildArgs = setCliBuildArgs;
function setBuildProperties(argv) {
    var buildProperties = {};
    buildProperties.isCapacitor = pathConstants.isCapacitorApp();
    buildProperties.pathToConfig = pathConstants.getConfigFilePath();
    if (argv.config !== undefined) {
        buildProperties.pathToConfig = argv.config;
    }
    if (argv.gradle !== undefined) {
        buildProperties.pathToGradle = nodePath.resolve(argv.gradle);
        buildProperties.androidAvailable = fileOperation.isPlatformAvailable(buildProperties.pathToGradle, "Android");
    }
    else {
        buildProperties.pathToGradle = buildProperties.isCapacitor ? pathConstants.getAndroidGradleFile(pathConstants.getAndroidPathCapacitor()) : pathConstants.getAndroidGradleFile(pathConstants.getAndroidPath());
        buildProperties.androidAvailable = buildProperties.isCapacitor ? fileOperation.isPlatformAvailable(pathConstants.getAndroidPathCapacitor(), "Android") : fileOperation.isPlatformAvailable(pathConstants.getAndroidPath(), "Android");
    }
    if (argv.plist !== undefined) {
        buildProperties.pathToPList = nodePath.resolve(argv.plist);
        buildProperties.iosAvailable = fileOperation.isPlatformAvailable(buildProperties.pathToPList, "iOS");
    }
    else {
        buildProperties.pathToPList = buildProperties.isCapacitor ? pathConstants.getIosPlistPathCapacitor() : buildProperties.pathToPList;
        buildProperties.iosAvailable = fileOperation.isPlatformAvailable(pathConstants.getIosPath(), "iOS");
    }
    if (argv.jsagent !== undefined) {
        try {
            logger_1.default.logMessageSync("Checking if JSAgent file exists ..", logger_1.default.INFO);
            buildProperties.pathToJsAgent = fileOperation.checkIfFileExistsSync(argv.jsagent);
            logger_1.default.logMessageSync("JSAgent found at: " + buildProperties.pathToJsAgent, logger_1.default.INFO);
        }
        catch (ex) {
            logger_1.default.logMessageSync("JSAgent not found: " + ex, logger_1.default.WARNING);
        }
    }
    buildProperties.pathToConfig = nodePath.resolve(buildProperties.pathToConfig);
    buildProperties.pathToGradle = nodePath.resolve(buildProperties.pathToGradle);
    return buildProperties;
}
exports.setBuildProperties = setBuildProperties;
