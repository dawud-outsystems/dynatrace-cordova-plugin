# Dynatrace Cordova plugin wrapper for OutSystems

This plugin is based on the code published by Dynatrace as an NPM package at [this location](https://www.npmjs.com/package/@dynatrace/cordova-plugin).
It gives you the ability to use the Dynatrace instrumentation in your hybrid application.

## Dynatrace Cordova plugin version

This is based on @dynatrace/cordova-plugin version 1.219.1.

## Agent Versions

This agent versions are configured in this plugin:

* iOS Agent: 8.219.1.1004
* Android Agent: 8.211.1.1010

## MABS Version
This plugin uses MABS version 7.

## How to Update this Wrapper

### Install the NPM and prepare folders
1. Create a new branch of the following repository and clone it into your PC: https://github.com/OutSystems/dynatrace-cordova-plugin
2. Create a new temp folder in another location
3. Run the following command inside your temp folder:
```npm i @dynatrace/cordoba-plugin```

4. Under your temp folder, go to *node_modules\@dynatrace\cordova-plugin* and delete all folders except the following ones: *other*, *scripts*, *Typings*
5. Rename folder script to *hooks*

### Copy files
1. Go to the folder for the repo you just cloned. Copy the folder *OutSystems* under folder *hooks*.
2. Go back to the folder *node_modules\@dynatrace\cordova-plugin\hooks* under your temp folder and paste the folder *OutSystems* there

### Add Hooks to plugin.xml
1. Go to the folder *node_modules\@dynatrace\cordova-plugin\hooks* under your temp folder and open file *plugin.xml* in a code editor
2. Replace the path containing folder *scripts* by *hooks* in the *hook* tags

Before
```
  <hook src="scripts/pluginAdd.js" type="before_plugin_add"/>
  <hook src="scripts/install.js" type="after_plugin_add"/>
  <hook src="scripts/uninstall.js" type="before_plugin_rm"/>
  <hook src="scripts/instrument.js" type="after_prepare"/>
  <hook src="scripts/close-log.js" type="after_build"/>
  <hook src="scripts/close-log.js" type="after_run"/>
```

After
```
  <hook src="hooks/pluginAdd.js" type="before_plugin_add"/>
  <hook src="hooks/install.js" type="after_plugin_add"/>
  <hook src="hooks/uninstall.js" type="before_plugin_rm"/>
  <hook src="hooks/instrument.js" type="after_prepare"/>
  <hook src="hooks/close-log.js" type="after_build"/>
  <hook src="hooks/close-log.js" type="after_run"/>
```
3. Add the following two lines to the *hook* section

```
  <hook src="hooks/Outsystems/npmInstall.js" type="before_plugin_install"/>
  <hook src="hooks/Outsystems/copyConfig.js" type="before_prepare"/>
```

### Add the new code to the repo
1. Go to your temp folder and copy the content of *node_modules\@dynatrace\cordova-plugin* into the folder where you cloned the *dynatrace-cordova-plugin* repo (except for file *README.md*)
2. Commit your changes to *origin*
3. Request a PR to merge your changes into *main*
