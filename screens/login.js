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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { colors, typography, spacing, layout } from '../config/theme';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { fadeIn, slideIn, pressAnimation } from '../utils/animations';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation will be handled by the auth state listener
    } catch (err) {
      let errorMessage = 'Failed to sign in';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login functionality
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
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
            <Text style={styles.headerText}>Welcome Back</Text>
            <Text style={styles.subheaderText}>Sign in to continue</Text>

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

              <TouchableOpacity 
                onPress={() => navigation.navigate('forgotpassword')}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button
                title="Login"
                onPress={handleSubmit}
                loading={loading}
                style={styles.loginButton}
              />

              <Text style={styles.orText}>OR</Text>

              <View style={styles.socialButtons}>
                <TouchableOpacity 
                  onPress={() => handleSocialLogin('Google')}
                  style={styles.socialButton}
                >
                  <Image 
                    style={styles.socialIcon} 
                    source={require("../assets/google_2504914.png")} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleSocialLogin('Apple')}
                  style={styles.socialButton}
                >
                  <Image 
                    style={styles.socialIcon} 
                    source={require("../assets/apple_831329.png")} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleSocialLogin('Facebook')}
                  style={styles.socialButton}
                >
                  <Image 
                    style={styles.socialIcon} 
                    source={require("../assets/facebook_5968764.png")} 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                  <Text style={styles.signupLink}>Sign Up</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
  },
  forgotPasswordText: {
    color: colors.error,
    ...typography.body,
  },
  loginButton: {
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    ...typography.body,
    color: colors.text,
  },
  signupLink: {
    ...typography.body,
    color: colors.error,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
});