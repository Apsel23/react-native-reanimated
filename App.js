/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SectionScreen from './src/screens/SectionScreen';
import AnimationPage from './src/screens/AnimationPage';
import Square from './src/screens/AnimationScreens/Square';
import ScreenOne from './src/screens/reanimated/ScreenOne';
import PanGestureHandlerScreen from './src/screens/reanimated/PanGestureHandlerScreen';
import InterpolatewithScrollView from './src/screens/reanimated/InterpolatewithScrollView';
import InterpolateColors from './src/screens/reanimated/InterpolateColors';
import PinchGestureHandler from './src/screens/reanimated/PinchGestureHandler';
import TapHandlerScreen from './src/screens/reanimated/TapHandlerScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return <TapHandlerScreen />;
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
