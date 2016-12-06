import { DeviceEventEmitter } from 'react-native';

class KeyEvent {
  static onKeyDownListener(cb) {
    KeyEvent.removeKeyDownListener();
    this.listenerKeyDown = DeviceEventEmitter.addListener('onKeyDown', cb);
  }

  static removeKeyDownListener() {
    if (this.listenerKeyDown) {
      this.listenerKeyDown.remove();
    }
  }

  static onKeyUpListener(cb) {
    KeyEvent.removeKeyUpListener();
    this.listenerKeyUp = DeviceEventEmitter.addListener('onKeyUp', cb);
  }

  static removeKeyUpListener() {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove();
    }
  }
}

export default KeyEvent;
