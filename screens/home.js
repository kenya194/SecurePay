// import React, { useState }from 'react'
// import { StyleSheet, TextInput, View, Text, Button, Image,Alert, TouchableOpacity } from 'react-native'
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from 'expo-status-bar';
// import { useNavigation } from '@react-navigation/native';



// export default function Home({navigation}) {
//   const [clientMobileNumber, setClientMobileNumber] = useState('');
//   const [amount, setAmount] = useState('');
//   const [recipientName, setRecipientName] = useState('');
//   const [recipientMobileNumber, setRecipientMobileNumber] = useState('');
//   // const { initPaymentSheet, presentPaymentSheet } = useStripe();

//   const handlePayment = async () => {
//     // Here you would typically create a payment intent on your server
//     // and then initialize the payment sheet with the client secret.
//     // For demonstration, we will just show an alert.
//     Alert.alert('Payment Initiated', `Sending ${amount} to ${mobileNumber}`);
    
//     // Call your backend to create a payment intent and handle the payment
//   };
//   return (
//     <SafeAreaView style={styles.safeArea}>
     
//           <View style={styles.heading}>
//           <Text style={styles.return_text}>Initiate Transaction</Text>
//           </View>
   
//           <View style={styles.container}>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Client</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Your Mobile Number"
//           value={clientMobileNumber}
//           onChangeText={setClientMobileNumber}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Amount to Send"
//           value={amount}
//           onChangeText={setAmount}
//           keyboardType="numeric"
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Recipient Details</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Recipient Name"
//           value={recipientName}
//           onChangeText={setRecipientName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Recipient Mobile Number"
//           value={recipientMobileNumber}
//           onChangeText={setRecipientMobileNumber}
//         />
//       </View>
//              <View style={styles.buttons}>
//              <Button title="Send" onPress={handlePayment}/>
//             </View>  
            
//          </View>
    
//      </SafeAreaView>
// )
// }


//  const styles = StyleSheet.create({
//   safeArea:{
//     flex:1,
//     backgroundColor:"#E5E1DA",
//   },
  
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   section: {
//     marginBottom: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   buttons:{
//       marginTop:30,
//       alignContent:'center',
//       alignItems:'center',
//       backgroundColor:'#243642',
//       borderRadius:50,
//       paddingTop:10,
//       paddingBottom:10,
//       paddingLeft:40,
//       paddingRight:40,
//       width:'40%',
//    },
   
//   input: {
//     height: 50,
//     margin: 15,
//     borderWidth: 1,
//     padding: 10,
//     width: '80%',
//     borderRadius:50,
//   },
//   icons:{
//     height:40,
//     width:40,
//     marginTop:15,
//     marginLeft:10,
//   },
//   heading:{
//     alignContent:'center',
//     justifyContent:'center',
//   },
//   return_text:{
//     fontSize:27,
//     marginTop:'14',
//   },

//  })

import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button, Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [clientMobileNumber, setClientMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientMobileNumber, setRecipientMobileNumber] = useState('');

  const handlePayment = async () => {
    Alert.alert('Payment Initiated', `Sending ${amount} to ${recipientMobileNumber}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.heading}>
            <Text style={styles.return_text}>Initiate Transaction</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Client</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Mobile Number"
              value={clientMobileNumber}
              onChangeText={setClientMobileNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Amount to Send"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recipient Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Recipient Name"
              value={recipientName}
              onChangeText={setRecipientName}
            />
            <TextInput
              style={styles.input}
              placeholder="Recipient Mobile Number"
              value={recipientMobileNumber}
              onChangeText={setRecipientMobileNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.buttons}>
            <Button title="Send" onPress={handlePayment} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E5E1DA",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  return_text: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
  },
  section: {
    width: width * 0.9,
    marginBottom: height * 0.03,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.07,
    marginVertical: height * 0.01,
    borderWidth: 1,
    padding: width * 0.03,
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#FFF',
  },
  buttons: {
    marginTop: height * 0.03,
    width: width * 0.4,
    borderRadius: 25,
    overflow: 'hidden',
  },
});
