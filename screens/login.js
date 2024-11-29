import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function HomeScreen({navigation}) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async ()=>{
    if (email && password){
      try{
          await signInWithEmailAndPassword(auth, email, password)
      }catch(err){
        console.log('got an error message: ', err.message);
      }
    }
  }
    
  return (
    <View style= {styles.background}>
      <SafeAreaView style={styles.safearea}>
        
        <View style= {styles.backicon}>
        <TouchableOpacity onPress={() => navigation.navigate('welcomescreen')}>
          <Image style= {styles.icons} source={require("../assets/back.png")}/>
        </TouchableOpacity>
        </View>

        <View style={styles.picBackground}>
          <Image style={styles.iconImage} source={require("../assets/rb_1074.png")} />
        </View>
      </SafeAreaView>

      <View style={styles.lowerBackground}>
        <View style={styles.form}>
          <Text style={styles.txt}>Email Address</Text>
          <TextInput style={styles.txtInput} value={email}
          onChangeText={value => setEmail(value)}
           placeholder='Enter Email'/>
        </View>

        <View style={styles.form}>
          <Text style={styles.txt}>Password</Text>
          <TextInput style={styles.txtInput} secureTextEntry  value={password}
          onChangeText={value => setPassword(value)}
          placeholder='Enter Password'/>
        </View>

        <TouchableOpacity>
        <View style={styles.forgotview}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>
        </TouchableOpacity>

        <View style={styles.centering}>
          <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.buttons}>
              <Text style={styles.button_Txt}>Login</Text>
          </View>  
          </TouchableOpacity>
          <Text style={styles.OrTxt}>OR</Text>
        </View>

        <View style={styles.iconBackground}>
          <TouchableOpacity>
          <Image style={styles.iconPics} source={require("../assets/google_2504914.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image style={styles.iconPics} source={require("../assets/apple_831329.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image style={styles.iconPics} source={require("../assets/facebook_5968764.png")} />
          </TouchableOpacity>
        </View>

        <View style={styles.iconBackgroundz}>
            <Text style={styles.create_Txt}>Don't have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('signup')}>
            <Text style={styles.create}>Sign Up</Text>
          </TouchableOpacity>
          </View> 

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    backgroundColor:"#FEFAE0",
  },

  backicon:{
    marginTop:0,
    width:'20%',
  },
  icons:{
    height:40,
    width:40,
    marginTop:15,
    marginLeft:20,
  },
  picBackground:{
    justifyContent: "center",
    alignItems:'center',
  },

  iconImage:{
    height:250,
    width:250,
    alignItems:'center',
  },

  lowerBackground:{
    flex:1,
    backgroundColor:"white",
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
  },
  form:{
    marginTop:30,
    marginLeft:30,
  },
  txt:{
    fontSize:21,
    marginLeft:15,
  },
  txtInput:{
    backgroundColor:'#D8D8D8',
    padding:10, 
    borderRadius:15,
    fontSize:18,
    width:362,
    marginTop:4,
  },
  forgotPassword:{
    fontSize:15,
    color:'#F95454',
  },
  forgotview:{
    marginTop:20,
    marginLeft:271,
  },
  centering:{
    justifyContent: "center",
    alignItems:'center',
  },
  buttons:{
    marginTop:20,
    backgroundColor:'#F3C623',
    paddingTop:8,
    paddingBottom:8,
    paddingLeft:160,
    paddingRight:158,
    borderRadius:50,
  },
  button_Txt:{
    fontSize:18,
  },
  OrTxt:{
    marginTop:30,
    fontWeight:20,
  },
  iconBackground:{
    marginTop:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  iconBackgroundz:{
    marginTop:25,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  iconPics:{
    width:60,
    height:60,
  },
  create_Txt:{
    fontSize:18,
  },
  create:{
    marginLeft:5,
    fontSize:20,
    color:"#F95454",
  }
})