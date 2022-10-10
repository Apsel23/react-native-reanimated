import {Switch, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {interpolateColor, withTiming} from 'react-native-reanimated';
import {useAnimatedStyle} from 'react-native-reanimated';
import {useDerivedValue} from 'react-native-reanimated';

const Colors = {
  dark: {
    backgroundColor: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    backgroundColor: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256,0.2)',
  false: 'rgba(0,0,0,1)',
};

//we can specify the type of the theme here
type Theme = 'light' | 'dark';

export default function InterpolateColors() {
  const [theme, setTheme] = useState<Theme>('light');
  //   const progress = useSharedValue(1);

  //   useDerivedValue helps us get an derived value based on other shared values or
  // some computation. But it acts as an shared value
  const progress = useDerivedValue(
    () => (theme === 'dark' ? withTiming(1) : withTiming(0)),
    [theme],
  );
  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.backgroundColor, Colors.dark.backgroundColor],
    );
    return {
      backgroundColor,
    };
  });
  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );
    return {
      backgroundColor,
    };
  });
  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );
    return {
      color,
    };
  });
  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>THEME</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggled => setTheme(toggled ? 'dark' : 'light')}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor="violet"
        />
      </Animated.View>
    </Animated.View>
  );
}

const SIZE = Dimensions.get('window').width * 0.7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    height: SIZE,
    width: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8, //for android to show the shadow we need to use elevation
  },
  text: {
    fontSize: 70,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 14,
    marginBottom: 35,
  },
});
