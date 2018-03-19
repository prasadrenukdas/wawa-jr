package com.rnts3;

import android.support.annotation.Nullable;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
// the following line is present so that `react-native link` works correctly
// import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
            // the following line is present so that `react-native link` works correctly
            // new MainReactPackage(),
            new LinearGradientPackage()
        );
    }

    @Nullable
    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}
