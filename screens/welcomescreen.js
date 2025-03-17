// import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import React from 'react'
// import { StatusBar } from 'expo-status-bar';


// export default function Welcomescreen({navigation}) {
  
//   return (
//     <SafeAreaView style={styles.safearea}>
//         <StatusBar style='dark'/>

//         <View style={styles.background}>
//             <Text style={styles.securepay_text}>SecurePay</Text>
//             <Image style={styles.welcomeImage} source={require('../assets/rb_5602.png')}/>
//         </View>

//         <View style={styles.centering}>
//           <TouchableOpacity onPress={()=> navigation.navigate('login')}>
//           <View style={styles.buttons}>
//               <Text style={styles.button_Txt}>Login</Text>
//           </View>  
//           </TouchableOpacity>
           

//           <View style={styles.login}>
//             <Text style={styles.login_Txt}>Don't have an account?</Text>
//           <TouchableOpacity onPress={()=> navigation.navigate('signup')}>
//             <Text style={styles.Log}>Sign Up</Text>
//           </TouchableOpacity>
//           </View> 
//         </View>
       
        
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//     safearea:{
//         flex: 1,
//         backgroundColor: "#EC8305",
//     },
//     background:{
//       marginTop:60,
//       justifyContent: "center",
//       alignItems:'center',
//     }, 
//     securepay_text:{
//         color:'white',
//        fontWeight:'bold',
//        fontSize:55,
//        marginTop:8,
//     },
//     welcomeImage:{
//         height:490,
//         width:490,
//         alignItems:'center',
//         resizeMode:'contain',
//     },
//     centering:{
//       justifyContent: "center",
//       alignItems:'center',
//     }, 
//    buttons:{
//       marginTop:50,
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
//    button_Txt:{
//     color:'white',
//     fontWeight:'bold',
//     fontSize:30,
//    },
//    login:{
//     marginTop:18,
//     flexDirection:'row',
//     justifyContent:'center',
//    },
//    Log:{
//     color:'white',
//     fontSize:18,
//     marginLeft:4,
//    },

//    login_Txt:{
//     fontWeight:'Bold',
//     fontSize:18,
//    },

// })

import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function Welcomescreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style='dark' />

      <View style={styles.background}>
        <Text style={styles.securepay_text}>SecurePay</Text>
        <Image
          style={styles.welcomeImage}
          source={require('../assets/rb_5602.png')}
          resizeMode="contain"
        />
      </View>

      <View style={styles.centering}>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <View style={styles.buttons}>
            <Text style={styles.button_Txt}>Login</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.login}>
          <Text style={styles.login_Txt}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.Log}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#EC8305",
  },
  background: {
    marginTop: "30rem",
    justifyContent: "center",
    alignItems: 'center',
  },
  securepay_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.12, // Responsive font size
    marginTop: height * 0.02, // Responsive margin
  },
  welcomeImage: {
    width: width * 0.9, // 90% of screen width
    height: height * 0.5, // 50% of screen height
    marginTop: height * 0.02, // Responsive margin
  },
  centering: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  buttons: {
    marginTop: height * 0.05, // Responsive margin
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#243642',
    borderRadius: 50,
    paddingVertical: height * 0.015, // Responsive padding
    paddingHorizontal: width * 0.1, // Responsive padding
    width: width * 0.8, // 80% of screen width
  },
  button_Txt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.08, // Responsive font size
  },
  login: {
    marginTop: height * 0.02, // Responsive margin
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Log: {
    color: 'white',
    fontSize: width * 0.04, // Responsive font size
    marginLeft: width * 0.02, // Responsive margin
  },
  login_Txt: {
    fontWeight: 'bold',
    fontSize: width * 0.04, // Responsive font size
  },
});