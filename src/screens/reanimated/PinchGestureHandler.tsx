import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import React from 'react';
import {
  PinchGestureHandler as PinchGestureHandlerAnimated,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';
import {useSharedValue} from 'react-native-reanimated';
import {useAnimatedStyle} from 'react-native-reanimated';
//useAnimatedGestureHandler can be used for pan gesture, pinch gesture and top gesture

const image =
  'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

//we are converting an normal component into animated component
const AnimatedImage = Animated.createAnimatedComponent(Image);

const {width, height} = Dimensions.get('screen');
export default function PinchGestureHandler() {
  const scale = useSharedValue(1);
  const focalPointX = useSharedValue(1);
  const focalPointY = useSharedValue(1);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      //   onStart: (event, context) => {
      //     //When we start dragging the square it will access and store the translateX value
      //     //then we can make use of it in the onActive event
      //     // context.scale = scale.value;
      //     // context.scale = scale.value;
      //     console.log('context', context);
      //   },
      onActive: (event, context) => {
        console.log('OnActivr', event);
        scale.value = event.scale;
        focalPointX.value = event.focalX;
        focalPointY.value = event.focalY;
      },
      onEnd: (event, context) => {
        console.log('OnEnd', event);
        scale.value = withTiming(1);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalPointX.value},
        {translateY: focalPointY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalPointX.value},
        {translateY: -focalPointY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  //To place the focal point at the place where we  need to zoon
  const rfocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalPointX.value},
        {translateY: focalPointY.value},
      ],
    };
  });
  return (
    <PinchGestureHandlerAnimated onGestureEvent={pinchHandler}>
      <Animated.View style={{flex: 1}}>
        <StatusBar />
        <AnimatedImage style={[{flex: 1}, rStyle]} source={{uri: image}} />
        <Animated.View style={[styles.focalpoint, rfocalPointStyle]} />
      </Animated.View>
    </PinchGestureHandlerAnimated>
  );
}

const styles = StyleSheet.create({
  focalpoint: {
    ...StyleSheet.absoluteFillObject,
    height: 20,
    width: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
