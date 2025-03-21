import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Animated,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

// Shared color palette
const theme = {
  primary: '#F3C623',      // Yellow/Gold
  secondary: '#243642',    // Dark Blue
  accent: '#EC8305',       // Orange
  background: '#FEFAE0',   // Light Cream
  text: '#333333',         // Dark Gray
  white: '#FFFFFF',
  error: '#F95454',        // Red
  success: '#4CAF50',      // Green
  disabled: 'rgba(0, 0, 0, 0.3)',
};

export default function Welcomescreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  // Create a rotating animation for the logo
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // First fade in and slide up the main content
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        // Subtle rotation of the logo
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ]),
      // Then fade in the buttons
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleNavigation = async (screen) => {
    // Button press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();

    setLoading(true);
    // Simulate loading for smoother transition
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={[styles.safearea, { backgroundColor: theme.accent }]}>
      <StatusBar style="light" />

      <Animated.View 
        style={[
          styles.background,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { rotate: spin }
            ]
          }
        ]}
      >
        <Text style={styles.securepay_text}>SecurePay</Text>
        <Text style={styles.tagline}>Fast, Secure, Reliable</Text>
        <Animated.Image
          style={[styles.welcomeImage, {
            transform: [{ scale: scaleAnim }]
          }]}
          source={require('../assets/rb_5602.png')}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View style={[styles.bottomContainer, { opacity: buttonOpacity }]}>
        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.disabledButton]}
          onPress={() => !loading && handleNavigation('login')}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.white} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.signupButton, loading && styles.disabledButton]}
          onPress={() => !loading && handleNavigation('signup')}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: height * 0.05,
  },
  securepay_text: {
    color: theme.white,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    fontSize: width * 0.12,
    marginTop: height * 0.02,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: width * 0.045,
    marginTop: height * 0.01,
    fontWeight: '500',
  },
  welcomeImage: {
    width: width * 0.9,
    height: height * 0.4,
    marginTop: height * 0.05,
  },
  bottomContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.05,
  },
  loginButton: {
    backgroundColor: theme.secondary,
    borderRadius: width * 0.08,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  loginButtonText: {
    color: theme.white,
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  signupButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: width * 0.08,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  signupButtonText: {
    color: theme.white,
    fontWeight: '600',
    fontSize: width * 0.045,
  },
  termsContainer: {
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  termsText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: width * 0.035,
    textAlign: 'center',
    lineHeight: width * 0.05,
  },
  termsLink: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});