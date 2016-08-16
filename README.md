## react-native-keyevent
Capture external keyboard keys or remote control button events

[Learn about Android KeyEvent here](https://developer.android.com/reference/android/view/KeyEvent.html).


### Installation

#### via npm

Run `npm install react-native-keyevent --save`

### Linking (Android)

`react-native link react-native-keyevent`

> Note: You still must manually register module in MainActivity! (Instructions below under Configuration Android)


#### Linking Manually

**Android**

1. In `android/setting.gradle`

    ```
    ...
    include ':react-native-keyevent'
    project(':react-native-keyevent').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-keyevent/android')
    ```

2. In `android/app/build.gradle`

    ```
    ...
    dependencies {
        ...
        compile project(':react-native-keyevent')
    }
    ```

3. Register module (in MainApplication.java)

    ```
    import com.github.kevinejohn.keyevent.KeyEventPackage;  // <--- import

    public class MainApplication extends Application implements ReactApplication {
      ......

      @Override
      protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new KeyEventPackage()      <------- Add this
          );
      }

      ......

    }
    ```

### Configuration

#### Android

Implement onConfigurationChanged method in MainActivity.java

```
    import com.github.kevinejohn.keyevent.KeyEventModule; // <--- import

    public class MainActivity extends ReactActivity {
      ......
      @Override  // <--- Add this method
      public boolean onKeyDown(int keyCode, KeyEvent event) {
        KeyEventModule.getInstance().onKeyDownEvent(keyCode);

        // There are 2 ways this can be done:
        //  1.  Override the default keyboard event behavior
        //    super.onKeyDown(keyCode, event);
        //    return true; // Override default keyboard events

        //  2.  Keep default keyboard event behavior
        //    return super.onKeyDown(keyCode, event);

        // Using method #1
        super.onKeyDown(keyCode, event);
        return true; // Override default keyboard events
      }

      ......

    }
```

## Usage

Whenever you want to use it within React Native code now you can:

`import KeyEvent from 'react-native-keyevent';`

```javascript
  componentDidMount() {
    KeyEvent.onKeyDownListener((keyCode) => {
      console.log(`Key code pressed: ${keyCode}`);
    });
  }

  componentWillUnmount() {
    KeyEvent.removeKeyDownListener();
  }
```

## TODOS

- [ ] iOS Support
