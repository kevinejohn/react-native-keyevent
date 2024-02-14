declare module 'react-native-keyevent';

export type KeyEventProps = { action: number; keyCode: number; pressedKey: string; characters: string };

type eventListenerCallback = (keyEvent: KeyEventProps) => void;

export function onKeyDownListener(callback: eventListenerCallback): void;
export function onKeyUpListener(callback: eventListenerCallback): void;
export function onKeyMultipleListener(callback: eventListenerCallback): void;

export function removeKeyDownListener(): void;
export function removeKeyUpListener(): void;
export function removeKeyMultipleListener(): void;
