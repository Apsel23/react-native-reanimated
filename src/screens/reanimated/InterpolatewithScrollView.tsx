import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Page} from '../../components/Page';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

export default function InterpolatewithScrollView() {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    console.log(event.contentOffset.x);
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      //scrollEventThrottle is assigned 16 because we need to run the app in 60 fps
      //so every 16 ms we need to refresh the page
      scrollEventThrottle={16}
      horizontal
      style={styles.container}>
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
