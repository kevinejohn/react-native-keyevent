import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native';

class KeyEvent {
  onKeyDownListener(cb) {
    this.removeKeyDownListener();
    if (Platform.OS === "ios") {
      let keyEvent = new NativeEventEmitter(NativeModules.RNKeyEvent);
      this.listenerKeyDown = keyEvent.addListener('onKeyDown', cb);
    } else {
      this.listenerKeyDown = DeviceEventEmitter.addListener('onKeyDown', cb);
    }
  }

  removeKeyDownListener() {
    if (this.listenerKeyDown) {
      this.listenerKeyDown.remove();
      this.listenerKeyDown = null;
    }
  }

  onKeyUpListener(cb) {
    this.removeKeyUpListener();
    if (Platform.OS === "ios") {
      let keyEvent = new NativeEventEmitter(NativeModules.RNKeyEvent);
      this.listenerKeyUp = keyEvent.addListener('onKeyUp', cb);
    } else {
      this.listenerKeyUp = DeviceEventEmitter.addListener('onKeyUp', cb);
    }
  }

  removeKeyUpListener() {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove();
      this.listenerKeyUp = null;
    }
  }

  onKeyMultipleListener(cb) {
    this.removeKeyMultipleListener();
    if (Platform.OS === "ios") {
      let keyEvent = new NativeEventEmitter(NativeModules.RNKeyEvent);
      this.listenerKeyMultiple = keyEvent.addListener('onKeyMultiple', cb);
    } else {
      this.listenerKeyMultiple = DeviceEventEmitter.addListener('onKeyMultiple', cb);
    }
  }

  removeKeyMultipleListener() {
    if (this.listenerKeyMultiple) {
      this.listenerKeyMultiple.remove();
      this.listenerKeyMultiple = null;
    }
  }
}

export default new KeyEvent();
