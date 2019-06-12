
#import <Foundation/Foundation.h>
#import "RNKeyEvent.h"

NSString* const onKeyUpEvent = @"onKeyUp";

@implementation RNKeyEvent

#pragma mark - RNKeyEvent implementation

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
    static RNKeyEvent *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

+ (id)getSingletonInstance {
    static RNKeyEvent *sharedRNKeyEvent = nil;
    if (sharedRNKeyEvent == nil) {
        sharedRNKeyEvent = [[self alloc] init];
    }
    return sharedRNKeyEvent;
}

- (BOOL)isListening {
    return self.hasListeners;
}

- (NSString *)getKeys {
    return @"1,2,3,4,5,6,7,8,9,0,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
}

- (void)sendKeyEvent:(NSString *)keyString {
    if (self.hasListeners && self.bridge) {
        [super sendEventWithName:onKeyUpEvent body:@{@"pressedKey": keyString}];
    }
}

#pragma mark - Exported to JavaScript methods

#pragma mark - RCTEventEmitter implementation

- (NSArray<NSString *> *)supportedEvents {
    return @[onKeyUpEvent];
}

// Note: startObserving will be called when this module's first listener is added.
- (void)startObserving {
    self.hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Note: stopObserving will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving {
    self.hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

@end

