import { DeviceEventEmitter } from 'react-native';

class KeyEvent {
  static onKeyDownListener(cb) {
    KeyEvent.removeKeyDownListener();
    this.listener = DeviceEventEmitter.addListener('onKeyDown', cb);
  }

  static removeKeyDownListener() {
    if (this.listener) {
      this.listener.remove();
    }
  }
}

export default KeyEvent;
