import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';

function Square() {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    //with timing and spring
    // Animated.timing(progress, {toValue: 1, useNativeDriver: true}).start(); //useSharedValue(0)
    // Animated.spring(scale, {toValue: 2, useNativeDriver: true}).start();

    //To loop the animations
    Animated.loop(
      //parallel is used to run two animation simultaneously
      Animated.parallel([
        //Sequence will execute the animation one by one
        Animated.sequence([
          Animated.timing(progress, {toValue: 1, useNativeDriver: true}),
          //For reversing the animation
          Animated.timing(progress, {toValue: 0.5, useNativeDriver: true}),
        ]),
        Animated.sequence([
          Animated.timing(scale, {toValue: 2, useNativeDriver: true}),
          Animated.timing(scale, {toValue: 1, useNativeDriver: true}),
        ]),
      ]),
      {iterations: 3}, //For iterating the animations (count)
    ).start();
  }, [progress, scale]);

  console.log('Math.PI', Math.PI);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            borderRadius: /*progress.value * SIZE/2 */ progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [SIZE / 4, SIZE / 2],
            }),
            opacity: progress,
            transform: [
              {scale},
              {
                rotate: /*progress.value * 2 * Math.PI */ progress.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: ['180deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
}
const SIZE = 100.0;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5)',
  },
});
export default Square;
