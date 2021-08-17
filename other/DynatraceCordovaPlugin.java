package com.dynatrace.cordova.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import android.widget.Toast;

import com.dynatrace.android.agent.Dynatrace;
import com.dynatrace.android.agent.conf.DataCollectionLevel;
import com.dynatrace.android.agent.conf.UserPrivacyOptions;

public class DynatraceCordovaPlugin extends CordovaPlugin {

  public static final String ACTION_UEM_END_SESSION = "endVisit";
  public static final String ACTION_UEM_GET_USERPRIVACYOPTIONS = "getUserPrivacyOptions";
  public static final String ACTION_UEM_APPLY_USERPRIVACYOPTIONS = "applyUserPrivacyOptions";
  public static final String ACTION_UEM_IDENTIFY_USER = "identifyUser";

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    try {
      if (action.equals(ACTION_UEM_END_SESSION)) {
        Dynatrace.endVisit();
        callbackContext.success();
        return true;
      } else if (action.equals(ACTION_UEM_GET_USERPRIVACYOPTIONS)) {
        UserPrivacyOptions options = Dynatrace.getUserPrivacyOptions();

        JSONObject optionsJsonObj = new JSONObject();
        optionsJsonObj.put("dataCollectionLevel", options.getDataCollectionLevel().ordinal());
        optionsJsonObj.put("crashReportingOptedIn", Boolean.valueOf(options.isCrashReportingOptedIn()));

        callbackContext.success(optionsJsonObj);
        return true;
      } else if (action.equals(ACTION_UEM_APPLY_USERPRIVACYOPTIONS)) {
        UserPrivacyOptions.Builder optionsBuilder = UserPrivacyOptions.builder();
        optionsBuilder.withDataCollectionLevel(DataCollectionLevel.values()[(args.getJSONObject(0).getInt("_dataCollectionLevel"))]);
        optionsBuilder.withCrashReportingOptedIn(args.getJSONObject(0).getBoolean("_crashReportingOptedIn"));

        Dynatrace.applyUserPrivacyOptions(optionsBuilder.build());
        callbackContext.success("Privacy settings updated!");

        return true;
        //DAWUD
      } else if (action.equals(ACTION_UEM_IDENTIFY_USER)) {
        // String message = args.getJSONObject(0).getString("_userId");

        Toast toastTemp = Toast.makeText(cordova.getActivity(), "Toast Test", Toast.LENGTH_LONG);
        // Display toast
        toastTemp.show();

        Toast toast = Toast.makeText(cordova.getActivity(), args.getJSONObject(0).getString("_userId"), Toast.LENGTH_LONG);
        // Display toast
        toast.show();

        Dynatrace.identifyUser(args.getJSONObject(0).getString("_userId"));
        callbackContext.success("UserId: " + args.getJSONObject(0).getString("_userId"));
        return true;
      }
    } catch(Exception e) {
      System.err.println("Exception: " + e.getMessage());
      callbackContext.error(e.getMessage());
      return false;
    }
    return false;
  }

  // public boolean identifyUser(String userId) {
  //   try {
  //     if(userId != null && !userId.trim().isEmpty()) {
  //       Dynatrace.identifyUser(userId);
  //     }
  //     return false;
  //   } catch(Exception e) {
  //     System.err.println("Exception: " + e.getMessage());
  //     callbackContext.error(e.getMessage());
  //     return false;
  //   }
  //   return false;
  // }
  

}