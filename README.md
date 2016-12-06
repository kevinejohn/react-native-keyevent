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
    import android.view.KeyEvent; // <--- import
    import com.github.kevinejohn.keyevent.KeyEventModule; // <--- import
    

    public class MainActivity extends ReactActivity {
      ......
      @Override  // <--- Add this method if you want to react to keyDown
      public boolean onKeyDown(int keyCode, KeyEvent event) {

        // A. Prevent multiple events on long button press
        //    In the default behavior multiple events are fired if a button
        //    is pressed for a while. You can prevent this behavior if you
        //    forward only the first event:
        //        if (event.getRepeatCount() == 0) {
        //            KeyEventModule.getInstance().onKeyDownEvent(keyCode);
        //        }
        //
        // B. If multiple Events shall be fired when the button is pressed
        //    for a while use this code:
        //        KeyEventModule.getInstance().onKeyDownEvent(keyCode);
        //
        // Using B.
        KeyEventModule.getInstance().onKeyDownEvent(keyCode);

        // There are 2 ways this can be done:
        //  1.  Override the default keyboard event behavior
        //    super.onKeyDown(keyCode, event);
        //    return true;

        //  2.  Keep default keyboard event behavior
        //    return super.onKeyDown(keyCode, event);

        // Using method #1 without blocking multiple
        super.onKeyDown(keyCode, event);
        return true;
      }

      @Override  // <--- Add this method if you want to react to keyUp
      public boolean onKeyUp(int keyCode, KeyEvent event) {
        KeyEventModule.getInstance().onKeyUpEvent(keyCode);

        // There are 2 ways this can be done:
        //  1.  Override the default keyboard event behavior
        //    super.onKeyUp(keyCode, event);
        //    return true;

        //  2.  Keep default keyboard event behavior
        //    return super.onKeyUp(keyCode, event);

        // Using method #1
        super.onKeyUp(keyCode, event);
        return true;
      }

      ......

    }
```

## Usage

Whenever you want to use it within React Native code now you can:

`import KeyEvent from 'react-native-keyevent';`

```javascript
  componentDidMount() {
    // if you want to react to keyDown
    KeyEvent.onKeyDownListener((keyCode) => {
      console.log(`Key code pressed: ${keyCode}`);
    });

    // if you want to react to keyUp
    KeyEvent.onKeyUpListener((keyCode) => {
      console.log(`Key code pressed: ${keyCode}`);
    });
  }

  componentWillUnmount() {
    // if you are listening to keyDown
    KeyEvent.removeKeyDownListener();

     // if you are listening to keyUp
    KeyEvent.removeKeyUpListener();
  }
```

## TODOS

- [ ] iOS Support
