import React, { useRef, useEffect } from 'react';
import { View, TextInput, Text, Animated, StyleSheet } from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';

export const Input = ({
  label,
  error,
  value,
  onChangeText,
  style,
  ...props
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      // Fade in error message
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Shake animation for error
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [error]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View
        style={[
          styles.inputContainer,
          error && styles.inputError,
          { transform: [{ translateX: shakeAnim }] },
          style,
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.disabled}
          {...props}
        />
      </Animated.View>
      {error && (
        <Animated.Text
          style={[
            styles.errorText,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {error}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.body,
    marginBottom: spacing.xs,
    color: colors.text,
  },
  inputContainer: {
    ...layout.input,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body.fontSize,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
}); 