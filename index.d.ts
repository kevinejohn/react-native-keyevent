declare module 'react-native-keyevent';

export type KeyEventProps = { keyCode: number; action: string; pressedKey: string; characters: string };

export function onKeyDownListener(keyEvent: any): void;
export function onKeyUpListener(keyEvent: any): void;
export function onKeyMultipleListener(keyEvent: any): void;

export function removeKeyDownListener(): void;
export function removeKeyUpListener(): void;
export function removeKeyMultipleListener(): void;
