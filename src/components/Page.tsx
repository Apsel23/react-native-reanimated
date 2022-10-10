import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {Extrapolate} from 'react-native-reanimated';

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;

const Page: React.FC<PageProps> = ({title, index, translateX}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP, //To fix the value between the rage even if the input range
      //goes beyond the defined value to make the UI defined
      // https://docs.swmansion.com/react-native-reanimated/docs/1.x.x/nodes/interpolate/
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  const tStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.EXTEND,
    );
    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{position: 'absolute'}, tStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)',
  },
  text: {
    fontSize: 70,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
  },
});
export {Page};
