import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, layout, typography } from '../../config/theme';
import { pressAnimation } from '../../utils/animations';

export const Button = ({
  onPress,
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = async () => {
    if (loading || disabled) return;
    
    pressAnimation(scaleAnim).start();
    onPress && onPress();
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return layout.button.secondary;
      case 'outline':
        return layout.button.outline;
      default:
        return layout.button.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return colors.white;
      default:
        return colors.white;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={loading || disabled}
        style={[
          getButtonStyle(),
          (loading || disabled) && styles.disabled,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...typography.body,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.7,
  },
}); 