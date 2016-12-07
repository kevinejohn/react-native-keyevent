package com.github.kevinejohn.keyevent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by Kevin Johnson on 8/15/16.
 */
public class KeyEventModule extends ReactContextBaseJavaModule {
    private ReactContext mReactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter mJSModule = null;

    private static KeyEventModule instance = null;

    public static KeyEventModule initKeyEventModule(ReactApplicationContext reactContext) {
        instance = new KeyEventModule(reactContext);
        return instance;
    }

    public static KeyEventModule getInstance() {
        return instance;
    }

    public void onKeyDownEvent(int keyCode) {
        if (mJSModule == null) {
            mJSModule = mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        mJSModule.emit("onKeyDown", keyCode);
    };

    public void onKeyUpEvent(int keyCode) {
        if (mJSModule == null) {
            mJSModule = mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        mJSModule.emit("onKeyUp", keyCode);
    };

    protected KeyEventModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "KeyEventModule";
    }
}
