// import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native'
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from 'expo-status-bar';
// // import { useNavigation } from '@react-navigation/native';

// import React, { useState } from 'react'
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config/firebase';

// export default function SignUp({navigation}) {
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();

//     const handleSubmit = async ()=>{
//       if (email && password){
//         try{
//             await createUserWithEmailAndPassword(auth, email, password)
//         }catch(err){
//           console.log('got an error message: ', err.message);
//         }
//       }
//     }

//   return (
//     <View style= {styles.background}>
//       <SafeAreaView style={styles.safearea}>
        
//         <View style= {styles.backicon}>
//         <TouchableOpacity onPress={() => navigation.navigate('login')}>
//           <Image style= {styles.icons} source={require("../assets/back.png")}/>
//         </TouchableOpacity>
//         </View>

//         <View style={styles.picBackground}>
//           <Image style={styles.iconImage} source={require("../assets/rb_1074.png")} />
//         </View>
//       </SafeAreaView>

//       <View style={styles.lowerBackground}>
//         <View style={styles.form}>
//           <Text style={styles.txt}> First Name</Text>
//           <TextInput style={styles.txtInput}  placeholder='Enter First Name'/>
//         </View>
//         <View style={styles.form}>
//           <Text style={styles.txt}>Last Name</Text>
//           <TextInput style={styles.txtInput} placeholder='Enter Last Name'/>
//         </View>
//         <View style={styles.form}>
//           <Text style={styles.txt}>Email Address</Text>
//           <TextInput style={styles.txtInput} value={email}
//            onChangeText={value => setEmail(value)}
//             placeholder='Enter Email'/>
            
//         </View>
//         <View style={styles.form}>
//           <Text style={styles.txt}>Enter Password</Text>
//           <TextInput style={styles.txtInput} secureTextEntry value={password}
//            onChangeText={value => setPassword(value)} 
//            placeholder='Enter Password'/>
//         </View>
//         <View style={styles.form}>
//           <Text style={styles.txt}>Confirm Password</Text>
//           <TextInput style={styles.txtInput} secureTextEntry value={password} 
//           onChangeText={value => setPassword(value)} 
//           placeholder='Enter Password'/>
//         </View>

//         <View style={styles.centering}>
//           <TouchableOpacity onPress={handleSubmit}>
//           <View style={styles.buttons}>
//               <Text style={styles.button_Txt}> Create Account</Text>
//           </View>  
//           </TouchableOpacity>
//           <Text style={styles.OrTxt}>OR</Text>
//         </View>

//         <View style={styles.iconBackground}>
//           <TouchableOpacity>
//           <Image style={styles.iconPics} source={require("../assets/google_2504914.png")} />
//           </TouchableOpacity>
//           <TouchableOpacity>
//           <Image style={styles.iconPics} source={require("../assets/apple_831329.png")} />
//           </TouchableOpacity>
//           <TouchableOpacity>
//           <Image style={styles.iconPics} source={require("../assets/facebook_5968764.png")} />
//           </TouchableOpacity>
//         </View>

//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   background:{
//     flex:1,
//     backgroundColor:"#FEFAE0",
//   },

//   backicon:{
//     marginTop:0,
//     width:'20%',
//   },
//   icons:{
//     height:40,
//     width:40,
//     marginTop:15,
//     marginLeft:20,
//   },
//   picBackground:{
//     justifyContent: "center",
//     alignItems:'center',
//   },

//   iconImage:{
//     height:200,
//     width:200,
//     alignItems:'center',
//   },

//   lowerBackground:{
//     flex:1,
//     backgroundColor:"white",
//     borderTopLeftRadius:50,
//     borderTopRightRadius:50,
//   },
//   form:{
//     marginTop:10,
//     marginLeft:30,
//   },
//   txt:{
//     fontSize:18,
//     marginLeft:15,
//   },
//   txtInput:{
//     backgroundColor:'#D8D8D8',
//     padding:10, 
//     borderRadius:15,
//     fontSize:16,
//     width:362,
//     marginTop:4,
//   },
  
//   centering:{
//     justifyContent: "center",
//     alignItems:'center',
//   },
//   buttons:{
//     marginTop:20,
//     backgroundColor:'#F3C623',
//     paddingTop:8,
//     paddingBottom:8,
//     paddingLeft:80,
//     paddingRight:80,
//     borderRadius:50,
//   },
//   button_Txt:{
//     fontSize:18,
//   },
//   OrTxt:{
//     marginTop:20,
//     fontWeight:'bold',
//   },
//   iconBackground:{
//     marginTop:20,
//     flexDirection:'row',
//     alignItems:'center',
//     justifyContent:'space-evenly',
//   },
//   iconPics:{
//     width:50,
//     height:50,
//   },
//   create_Txt:{
//     fontSize:18,
//   },
//   create:{
//     marginLeft:5,
//     fontSize:20,
//     color:"#F95454",
//   },
//   error: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 8,
//   },
// })
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const { width, height } = Dimensions.get('window');

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (err) {
                console.log('got an error message: ', err.message);
            }
        }
    };

    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.safearea}>
                <View style={styles.backicon}>
                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Image style={styles.icons} source={require("../assets/back.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.picBackground}>
                    <Image style={styles.iconImage} source={require("../assets/rb_1074.png")} />
                </View>
            </SafeAreaView>

            <View style={styles.lowerBackground}>
                <View style={styles.form}>
                    <Text style={styles.txt}>First Name</Text>
                    <TextInput style={styles.txtInput} placeholder='Enter First Name' />
                </View>
                <View style={styles.form}>
                    <Text style={styles.txt}>Last Name</Text>
                    <TextInput style={styles.txtInput} placeholder='Enter Last Name' />
                </View>
                <View style={styles.form}>
                    <Text style={styles.txt}>Email Address</Text>
                    <TextInput style={styles.txtInput} value={email}
                        onChangeText={value => setEmail(value)}
                        placeholder='Enter Email' />
                </View>
                <View style={styles.form}>
                    <Text style={styles.txt}>Enter Password</Text>
                    <TextInput style={styles.txtInput} secureTextEntry value={password}
                        onChangeText={value => setPassword(value)}
                        placeholder='Enter Password' />
                </View>
                <View style={styles.form}>
                    <Text style={styles.txt}>Confirm Password</Text>
                    <TextInput style={styles.txtInput} secureTextEntry value={password}
                        onChangeText={value => setPassword(value)}
                        placeholder='Enter Password' />
                </View>

                <View style={styles.centering}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.buttons}>
                            <Text style={styles.button_Txt}>Create Account</Text>
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#FEFAE0",
    },
    safearea: {
        flex: 1,
    },
    backicon: {
        marginTop: height * 0.02,
        width: '20%',
    },
    icons: {
        height: width * 0.1,
        width: width * 0.1,
        marginTop: height * 0.02,
        marginLeft: width * 0.05,
    },
    picBackground: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    iconImage: {
        height: height * 0.2,
        width: width * 0.5,
        resizeMode: 'contain',
    },
    lowerBackground: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: width * 0.1,
        borderTopRightRadius: width * 0.1,
        paddingTop: height * 0.03,
    },
    form: {
        marginTop: height * 0.02,
        marginLeft: width * 0.05,
    },
    txt: {
        fontSize: width * 0.04,
        marginLeft: width * 0.03,
    },
    txtInput: {
        backgroundColor: '#D8D8D8',
        padding: width * 0.03,
        borderRadius: width * 0.04,
        fontSize: width * 0.04,
        width: width * 0.9,
        marginTop: height * 0.01,
    },
    centering: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: height * 0.03,
    },
    buttons: {
        backgroundColor: '#F3C623',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.2,
        borderRadius: width * 0.1,
    },
    button_Txt: {
        fontSize: width * 0.04,
        textAlign: 'center',
    },
    OrTxt: {
        marginTop: height * 0.02,
        fontWeight: 'bold',
        fontSize: width * 0.04,
    },
    iconBackground: {
        marginTop: height * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    iconPics: {
        width: width * 0.12,
        height: width * 0.12,
    },
});