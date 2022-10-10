import React, {useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function TapHandlerScreen() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const doubleTapRef = useRef();

  const rStyle = useAnimatedStyle(() => ({
    transform: [{scale: Math.max(scale.value, 0)}],
  }));

  const rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, [scale]);

  const onSingleTap = useCallback(() => {
    // opacity.value = withTiming(0, undefined, isFinished => {
    //   if (isFinished) {
    //     opacity.value = withDelay(500, withTiming(1));
    //   }
    // });
    opacity.value = withSequence(withSpring(1), withDelay(500, withSpring(0)));
  }, [opacity]);

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}>
          <Animated.View>
            <ImageBackground
              source={require('../../assets/insta.jpg')}
              style={styles.image}>
              <AnimatedImage
                source={require('../../assets/like.png')}
                style={[styles.image, rStyle]}
                resizeMode={'center'}
              />
            </ImageBackground>
            <Animated.Text style={[styles.turtles, rTextStyle]}>
              🐢🐢🐢🐢
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
}

const {width: SIZE} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.35,
    shadowRadius: 35,
  },
  turtles: {fontSize: 40, textAlign: 'center', marginTop: 30},
});
