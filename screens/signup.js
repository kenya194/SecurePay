import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Animated,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { colors, typography, spacing, layout } from '../config/theme';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { fadeIn, slideIn, pressAnimation } from '../utils/animations';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      fadeIn(fadeAnim),
      slideIn(slideAnim),
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
            try {
                await createUserWithEmailAndPassword(auth, email, password);
      // Navigation will be handled by the auth state listener
            } catch (err) {
      let errorMessage = 'Failed to create account';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    // Implement social signup functionality
    Alert.alert('Coming Soon', `${provider} signup will be available soon!`);
  };

    return (
        <View style={styles.background}>
      <StatusBar style="dark" />
            <SafeAreaView style={styles.safearea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('welcomescreen')}
              style={styles.backButton}
            >
              <Image style={styles.backIcon} source={require("../assets/back.png")} />
                    </TouchableOpacity>
                </View>

          <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
            <Image 
              style={styles.logoImage} 
              source={require("../assets/rb_1074.png")} 
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View 
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.headerText}>Create Account</Text>
            <Text style={styles.subheaderText}>Sign up to get started</Text>

                <View style={styles.form}>
              <Input
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
                error={errors.password}
              />

              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
                autoCapitalize="none"
                error={errors.confirmPassword}
              />

              <Button
                title="Sign Up"
                onPress={handleSubmit}
                loading={loading}
                style={styles.signupButton}
              />

              <Text style={styles.orText}>OR</Text>

              <View style={styles.socialButtons}>
                <TouchableOpacity 
                  onPress={() => handleSocialSignup('Google')}
                  style={styles.socialButton}
                >
                  <Image 
                    style={styles.socialIcon} 
                    source={require("../assets/google_2504914.png")} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleSocialSignup('Apple')}
                  style={styles.socialButton}
                >
                  <Image 
                    style={styles.socialIcon} 
                    source={require("../assets/apple_831329.png")} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleSocialSignup('Facebook')}
                  style={styles.socialButton}
                >
                  <Image 
                    style={styles.socialIcon} 
                    source={require("../assets/facebook_5968764.png")} 
                  />
                    </TouchableOpacity>
                </View>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                  <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    backgroundColor: colors.background,
    },
    safearea: {
        flex: 1,
    },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  backButton: {
    width: width * 0.1,
        height: width * 0.1,
    justifyContent: 'center',
  },
  backIcon: {
    width: width * 0.08,
    height: width * 0.08,
  },
  logoContainer: {
        alignItems: 'center',
    marginVertical: spacing.xl,
  },
  logoImage: {
    width: width * 0.4,
    height: width * 0.4,
  },
  formContainer: {
        flex: 1,
    backgroundColor: colors.white,
        borderTopLeftRadius: width * 0.1,
        borderTopRightRadius: width * 0.1,
    padding: spacing.lg,
  },
  headerText: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subheaderText: {
    ...typography.body,
    textAlign: 'center',
    color: colors.text,
    opacity: 0.7,
    marginBottom: spacing.lg,
    },
    form: {
    marginTop: spacing.md,
  },
  signupButton: {
    marginBottom: spacing.md,
  },
  orText: {
    ...typography.body,
        textAlign: 'center',
    color: colors.text,
    marginVertical: spacing.md,
  },
  socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    marginBottom: spacing.lg,
  },
  socialButton: {
    padding: spacing.sm,
    },
  socialIcon: {
        width: width * 0.12,
        height: width * 0.12,
    },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    ...typography.body,
    color: colors.text,
  },
  loginLink: {
    ...typography.body,
    color: colors.error,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
});