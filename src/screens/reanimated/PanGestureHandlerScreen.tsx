import {StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 1.8;
//To specify the type of translateX
type ContextType = {
  translateX: number;
  translateY: number;
};

export default function PanGestureHandlerScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    //context is an object whoch is provided by useAnimatedGestureHandler
    //for storing some value. Here we can make use of it to retain its previous X position
    onStart: (event, context) => {
      //When we start dragging the square it will access and store the translateX value
      //then we can make use of it in the onActive event
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      console.log('OnActiveEvent', event);
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: event => {
      console.log('OnEnsEvent', event);
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      console.log('distance', distance, CIRCLE_RADIUS);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        //To put the square to its original position when we release the square like a spring
        translateX.value = withTiming(0, {duration: 500});
        translateY.value = withTiming(0, {duration: 500});
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, rStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5)',
    borderRadius: 20,
  },
  circle: {
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0,0,256,0.5)',
    margin: 10,
  },
});
