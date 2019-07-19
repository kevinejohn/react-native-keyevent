
#ifndef RNKeyEvent_h
#define RNKeyEvent_h

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNKeyEvent : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic) BOOL hasListeners;

+ (id)allocWithZone:(NSZone *)zone;

+ (id)getSingletonInstance;

- (BOOL)isListening;

- (NSString *)getKeys;

- (void)sendKeyEvent:(NSString *)keyString;

@end
  
#endif /* RNKeyEvent_h */
