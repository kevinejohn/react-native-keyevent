// A fake TVEventHandler stands in for Vega's, so the tests run without a device.
let mockHandlers = [];

jest.mock(
  'react-native',
  () => ({
    TVEventHandler: class {
      enable(component, callback) {
        this.callback = callback;
        mockHandlers.push(this);
      }
      disable() {
        mockHandlers = mockHandlers.filter((handler) => handler !== this);
      }
    },
  }),
  { virtual: true }
);

let KeyEvent;
beforeEach(() => {
  mockHandlers = [];
  jest.resetModules();
  KeyEvent = require('../index.kepler').default;
});

const press = (eventType, eventKeyAction) =>
  mockHandlers.forEach((handler) => handler.callback(null, { eventType, eventKeyAction }));

test('a remote key is sent as keyDown and keyUp with the Android key code', () => {
  const down = [];
  const up = [];
  KeyEvent.onKeyDownListener((event) => down.push(event));
  KeyEvent.onKeyUpListener((event) => up.push(event));

  press('right', 0);
  press('right', 1);

  expect(down).toEqual([
    { keyCode: 22, action: 0, pressedKey: '\u0000', eventType: 'right' },
  ]);
  expect(up).toEqual([
    { keyCode: 22, action: 1, pressedKey: '\u0000', eventType: 'right' },
  ]);
});

test.each([
  ['up', 19],
  ['down', 20],
  ['left', 21],
  ['right', 22],
  ['select', 23],
  ['back', 4],
  ['menu', 82],
  ['playpause', 85],
  ['skip_backward', 89],
  ['rewind', 89],
  ['skip_forward', 90],
  ['forward', 90],
])('%s has the Android key code %i', (eventType, keyCode) => {
  const down = [];
  KeyEvent.onKeyDownListener((event) => down.push(event.keyCode));
  press(eventType, 0);
  expect(down).toEqual([keyCode]);
});

test('digits carry their character, like on Android', () => {
  const down = [];
  KeyEvent.onKeyDownListener((event) => down.push([event.keyCode, event.pressedKey]));
  press('num_0', 0);
  press('num_9', 0);
  expect(down).toEqual([
    [7, '0'],
    [16, '9'],
  ]);
});

test('an event without eventKeyAction counts as a key press', () => {
  const down = [];
  KeyEvent.onKeyDownListener((event) => down.push(event.action));
  press('select', undefined);
  expect(down).toEqual([0]);
});

test('events that are not keys (focus, blur, unknown types, action -1) are not sent', () => {
  const seen = [];
  KeyEvent.onKeyDownListener((event) => seen.push(event));
  KeyEvent.onKeyUpListener((event) => seen.push(event));
  press('focus', undefined);
  press('blur', undefined);
  press('some_new_key', 0);
  press('up', -1);
  expect(seen).toEqual([]);
});

test('one handler while any listener is set, none after the last one is removed', () => {
  expect(mockHandlers).toHaveLength(0);
  KeyEvent.onKeyDownListener(() => {});
  KeyEvent.onKeyUpListener(() => {});
  expect(mockHandlers).toHaveLength(1);

  KeyEvent.removeKeyDownListener();
  expect(mockHandlers).toHaveLength(1);
  KeyEvent.removeKeyUpListener();
  expect(mockHandlers).toHaveLength(0);
});

test('a new listener replaces the previous one, as on Android', () => {
  const first = [];
  const second = [];
  KeyEvent.onKeyDownListener((event) => first.push(event.keyCode));
  KeyEvent.onKeyDownListener((event) => second.push(event.keyCode));
  press('up', 0);
  expect(first).toEqual([]);
  expect(second).toEqual([19]);
});

test('onKeyMultiple is accepted but never sent: Vega reports no repeat count', () => {
  const multiple = [];
  KeyEvent.onKeyMultipleListener((event) => multiple.push(event));
  press('up', 0);
  press('up', 0);
  expect(multiple).toEqual([]);
  KeyEvent.removeKeyMultipleListener();
  expect(mockHandlers).toHaveLength(0);
});
