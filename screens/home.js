import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Animated,
  Alert
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { colors, typography, spacing, layout } from '../config/theme';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { fadeIn, slideIn } from '../utils/animations';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [clientMobileNumber, setClientMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientMobileNumber, setRecipientMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      fadeIn(fadeAnim),
      slideIn(slideAnim)
    ]).start();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!clientMobileNumber) {
      newErrors.clientMobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(clientMobileNumber)) {
      newErrors.clientMobileNumber = 'Enter a valid 10-digit number';
    }

    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Enter a valid amount';
    }

    if (!recipientName) {
      newErrors.recipientName = 'Recipient name is required';
    }

    if (!recipientMobileNumber) {
      newErrors.recipientMobileNumber = 'Recipient mobile number is required';
    } else if (!/^[0-9]{10}$/.test(recipientMobileNumber)) {
      newErrors.recipientMobileNumber = 'Enter a valid 10-digit number';
    }

    if (clientMobileNumber === recipientMobileNumber) {
      newErrors.recipientMobileNumber = 'Sender and recipient numbers cannot be same';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert(
        'Success',
        `Payment of $${amount} sent to ${recipientName}`,
        [
          {
            text: 'View Receipt',
            onPress: () => navigation.navigate('receipt', {
              amount,
              recipientName,
              recipientMobileNumber,
              date: new Date().toISOString()
            })
          },
          { 
            text: 'Done',
            style: 'cancel',
            onPress: () => {
              // Clear form after successful transaction
              setAmount('');
              setRecipientName('');
              setRecipientMobileNumber('');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.headerText}>Send Money</Text>
            <Text style={styles.subheaderText}>Quick and secure payments</Text>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Your Details</Text>
              <Input
                label="Your Mobile Number"
                value={clientMobileNumber}
                onChangeText={setClientMobileNumber}
                keyboardType="phone-pad"
                maxLength={10}
                error={errors.clientMobileNumber}
                placeholder="Enter your mobile number"
              />
              <Input
                label="Amount to Send"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                maxLength={10}
                error={errors.amount}
                placeholder="Enter amount"
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Recipient Details</Text>
              <Input
                label="Recipient Name"
                value={recipientName}
                onChangeText={setRecipientName}
                error={errors.recipientName}
                placeholder="Enter recipient name"
                autoCapitalize="words"
              />
              <Input
                label="Recipient Mobile Number"
                value={recipientMobileNumber}
                onChangeText={setRecipientMobileNumber}
                keyboardType="phone-pad"
                maxLength={10}
                error={errors.recipientMobileNumber}
                placeholder="Enter recipient mobile number"
              />
            </View>

            <Button
              title="Send Money"
              onPress={handlePayment}
              loading={loading}
              style={styles.sendButton}
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    padding: spacing.md,
  },
  headerText: {
    ...typography.h2,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subheaderText: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
    opacity: 0.7,
  },
  card: {
    ...layout.card,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  sendButton: {
    marginTop: spacing.md,
  },
});
