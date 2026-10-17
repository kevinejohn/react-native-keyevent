declare module 'react-native-keyevent';

export type KeyEventProps = {
  action: number;
  keyCode: number;
  pressedKey: string;
  characters: string;
  /** Vega OS only: the key's name from TVEventHandler, for example 'right' or 'playpause'. */
  eventType?: string;
};

export function onKeyDownListener(keyEvent: any): void;
export function onKeyUpListener(keyEvent: any): void;
export function onKeyMultipleListener(keyEvent: any): void;

export function removeKeyDownListener(): void;
export function removeKeyUpListener(): void;
export function removeKeyMultipleListener(): void;
