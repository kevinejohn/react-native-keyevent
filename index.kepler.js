import { TVEventHandler } from 'react-native';

// Vega OS (Fire TV): the remote's keys come through TVEventHandler, so there is no native
// module and no MainActivity code to add. Events carry Android key codes, so code written
// for Android TV works unchanged.

// Vega HWEvent.eventType -> android.view.KeyEvent key code
const KEY_CODES = {
  back: 4,
  num_0: 7,
  num_1: 8,
  num_2: 9,
  num_3: 10,
  num_4: 11,
  num_5: 12,
  num_6: 13,
  num_7: 14,
  num_8: 15,
  num_9: 16,
  up: 19,
  down: 20,
  left: 21,
  right: 22,
  select: 23,
  enter: 66,
  menu: 82,
  playpause: 85,
  stop: 86,
  skip_backward: 89,
  rewind: 89,
  skip_forward: 90,
  forward: 90,
  play: 126,
  pause: 127,
  info: 165,
  channel_up: 166,
  channel_down: 167,
};

const ACTION_DOWN = 0;
const ACTION_UP = 1;

class KeyEvent {
  constructor() {
    this.listeners = { onKeyDown: null, onKeyUp: null, onKeyMultiple: null };
    this.handler = null;
  }

  onKeyDownListener(cb) {
    this.setListener('onKeyDown', cb);
  }

  removeKeyDownListener() {
    this.setListener('onKeyDown', null);
  }

  onKeyUpListener(cb) {
    this.setListener('onKeyUp', cb);
  }

  removeKeyUpListener() {
    this.setListener('onKeyUp', null);
  }

  // Accepted for the same API, never called: Vega reports no repeat count.
  onKeyMultipleListener(cb) {
    this.setListener('onKeyMultiple', cb);
  }

  removeKeyMultipleListener() {
    this.setListener('onKeyMultiple', null);
  }

  setListener(name, cb) {
    this.listeners[name] = cb;
    const listening = Object.values(this.listeners).some(Boolean);
    if (listening && !this.handler) {
      this.handler = new TVEventHandler();
      this.handler.enable(null, (component, event) => this.onHWEvent(event));
    } else if (!listening && this.handler) {
      this.handler.disable();
      this.handler = null;
    }
  }

  onHWEvent(event) {
    const keyCode = event && KEY_CODES[event.eventType];
    if (!keyCode) return; // focus, blur and keys Android has no code for

    // eventKeyAction: 0 pressed, 1 released, -1 not a key action; missing means pressed.
    const action = event.eventKeyAction === undefined ? ACTION_DOWN : event.eventKeyAction;
    const listener =
      action === ACTION_DOWN ? this.listeners.onKeyDown : action === ACTION_UP ? this.listeners.onKeyUp : null;
    if (!listener) return;

    const digit = /^num_(\d)$/.exec(event.eventType);
    listener({
      keyCode,
      action,
      // Android sends the key's character: the digit for number keys, '\u0000' for the rest.
      pressedKey: digit ? digit[1] : '\u0000',
      eventType: event.eventType,
    });
  }
}

export default new KeyEvent();
