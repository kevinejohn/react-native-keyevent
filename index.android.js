import { DeviceEventEmitter } from 'react-native';

class KeyEvent {
  onKeyDownListener(cb) {
    this.removeKeyDownListener();
    this.listenerKeyDown = DeviceEventEmitter.addListener('onKeyDown', cb);
  }

  removeKeyDownListener() {
    if (this.listenerKeyDown) {
      this.listenerKeyDown.remove();
      this.listenerKeyDown = null;
    }
  }

  onKeyUpListener(cb) {
    this.removeKeyUpListener();
    this.listenerKeyUp = DeviceEventEmitter.addListener('onKeyUp', cb);
  }

  removeKeyUpListener() {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove();
      this.listenerKeyUp = null;
    }
  }

  onKeyMultipleListener(cb) {
    this.removeKeyMultipleListener();
    this.listenerKeyMultiple = DeviceEventEmitter.addListener('onKeyMultiple', cb);
  }

  removeKeyMultipleListener() {
    if (this.listenerKeyMultiple) {
      this.listenerKeyMultiple.remove();
      this.listenerKeyMultiple = null;
    }
  }
}

export default new KeyEvent();
