import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import { StatusBar } from 'expo-status-bar';


export default function Welcomescreen({navigation}) {
  
  return (
    <SafeAreaView style={styles.safearea}>
        <StatusBar style='dark'/>

        <View style={styles.background}>
            <Text style={styles.securepay_text}>SecurePay</Text>
            <Image style={styles.welcomeImage} source={require('../assets/rb_5602.png')}/>
        </View>

        <View style={styles.centering}>
          <TouchableOpacity onPress={()=> navigation.navigate('login')}>
          <View style={styles.buttons}>
              <Text style={styles.button_Txt}>Login</Text>
          </View>  
          </TouchableOpacity>
           

          <View style={styles.login}>
            <Text style={styles.login_Txt}>Don't have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('signup')}>
            <Text style={styles.Log}>Sign Up</Text>
          </TouchableOpacity>
          </View> 
        </View>
       
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safearea:{
        flex: 1,
        backgroundColor: "#EC8305",
    },
    background:{
      marginTop:60,
      justifyContent: "center",
      alignItems:'center',
    }, 
    securepay_text:{
        color:'white',
       fontWeight:'bold',
       fontSize:55,
       marginTop:8,
    },
    welcomeImage:{
        height:490,
        width:490,
        alignItems:'center',
        resizeMode:'contain',
    },
    centering:{
      justifyContent: "center",
      alignItems:'center',
    }, 
   buttons:{
      marginTop:50,
      alignContent:'center',
      alignItems:'center',
      backgroundColor:'#243642',
      borderRadius:50,
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:40,
      paddingRight:40,
      width:'40%',
   },
   button_Txt:{
    color:'white',
    fontWeight:'bold',
    fontSize:30,
   },
   login:{
    marginTop:18,
    flexDirection:'row',
    justifyContent:'center',
   },
   Log:{
    color:'white',
    fontSize:18,
    marginLeft:4,
   },

   login_Txt:{
    fontWeight:'Bold',
    fontSize:18,
   },

})