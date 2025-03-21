import { Animated } from 'react-native';
import { animations } from '../config/theme';

export const fadeIn = (value, duration = animations.transition.fade.duration) => {
  return Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
};

export const fadeOut = (value, duration = animations.transition.fade.duration) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};

export const slideIn = (value, duration = animations.transition.slide.duration) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};

export const slideOut = (value, duration = animations.transition.slide.duration) => {
  return Animated.timing(value, {
    toValue: 50,
    duration,
    useNativeDriver: true,
  });
};

export const pressAnimation = (scaleValue) => {
  return Animated.sequence([
    Animated.timing(scaleValue, {
      toValue: animations.button.scale,
      duration: animations.button.duration,
      useNativeDriver: true,
    }),
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: animations.button.duration,
      useNativeDriver: true,
    }),
  ]);
};

export const createRotationAnimation = (spinValue) => {
  return {
    transform: [
      {
        rotate: spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };
};

export const loadingTransition = async (callback) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      if (callback) {
        await callback();
      }
      resolve();
    }, animations.loading.duration);
  });
}; 