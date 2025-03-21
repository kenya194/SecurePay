import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  primary: '#F3C623',      // Yellow/Gold
  secondary: '#243642',    // Dark Blue
  accent: '#EC8305',       // Orange
  background: '#FEFAE0',   // Light Cream
  text: '#333333',         // Dark Gray
  white: '#FFFFFF',
  error: '#F95454',        // Red
  success: '#4CAF50',      // Green
  disabled: 'rgba(0, 0, 0, 0.3)',
  inputBg: '#F8F8F8',
  border: '#DDD',
};

export const typography = {
  h1: {
    fontSize: width * 0.12,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    color: colors.white,
  },
  h2: {
    fontSize: width * 0.08,
    fontWeight: '700',
    color: colors.text,
  },
  h3: {
    fontSize: width * 0.06,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: width * 0.045,
    color: colors.text,
  },
  caption: {
    fontSize: width * 0.035,
    color: colors.text,
  },
};

export const spacing = {
  xs: height * 0.01,
  sm: height * 0.02,
  md: height * 0.03,
  lg: height * 0.04,
  xl: height * 0.05,
};

export const layout = {
  screenPadding: {
    paddingHorizontal: width * 0.05,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: width * 0.05,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: height * 0.07,
    backgroundColor: colors.inputBg,
    borderRadius: width * 0.04,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    fontSize: width * 0.04,
  },
  button: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.sm,
      borderRadius: width * 0.08,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    secondary: {
      backgroundColor: colors.secondary,
      paddingVertical: spacing.sm,
      borderRadius: width * 0.08,
      alignItems: 'center',
    },
    outline: {
      backgroundColor: 'transparent',
      paddingVertical: spacing.sm,
      borderRadius: width * 0.08,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.white,
    },
  },
};

export const animations = {
  button: {
    scale: 0.95,
    duration: 100,
  },
  transition: {
    fade: {
      duration: 300,
    },
    slide: {
      duration: 300,
    },
  },
  loading: {
    duration: 800,
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
}; 