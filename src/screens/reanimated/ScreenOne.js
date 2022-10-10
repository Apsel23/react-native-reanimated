import {StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const SIZE = 100.0;

//Inorder to use an function to specify the reanimated style value we cannot use normal function since 
//it will run in JS thread. So, to make it run in UI thread we need to specify the string
//'worklet'.
const handleRotation = progress => {
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
};

export default function ScreenOne() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [
        {scale: scale.value},
        {translateX: scale.value * 25},
        {
          rotate: handleRotation(progress),
        },
      ],
    };
  });
  console.log('hbsbcbsc', `${progress.value * 2 * Math.PI}rad`);
  progress.value = withRepeat(withTiming(0.5, {duration: 1000}), -1, true); //-1 for infinite repeat
  scale.value = withRepeat(withSpring(2, {duration: 1000}), 3, true); //true for reverse

  return (
    <View style={styles.container}>
      <StatusBar />
      <Animated.View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {height: SIZE, width: SIZE, backgroundColor: 'blue'},
          reanimatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
