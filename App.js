import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, StatusBar  } from 'react-native';

import Inputlog from './code/login.js';
import Inputlogin from './code/loguear.js';


global.tam = Dimensions.get('window')
global.datalogin={user:'',pass:'',error:''};
global.candado_logueando=false;




var debug;

console.log(datalogin.user);


export default class App extends React.Component {
  //

  state_Dim=Dimensions.get('window');
  handler = dims => this.setState(dims);
  debug = 'chacho';

  constructor(props) {
    super(props);
    
    this.state= {user: '',
                  pass:'', 
                renderizer:'',}; 
    this.pintar;    
  }

  componentWillMount(){
    Dimensions.addEventListener('change',this.handler);
    console.log('componentWillMount');

  }

  componentWillUnmount(){
    //Important to stop the update of the state after unmount.

    Dimensions.removeEventListener('change', this.handler);
    console.log('componentWillUnmount');
  } 

  //El hijo envía mediante props info al padre.
  eventLogin(msg){
    alert(msg);
  }

  _onPressLoginButton(){    
    console.log('usuario:'+this.state.user); 
    console.log('password:'+this.state.pass);
    datalogin.user = this.state.user;
    datalogin.pass = this.state.pass;
    console.log('usuario:'+datalogin.user); 
    console.log('password:'+datalogin.pass);
      


    this.setState({
      renderizer: <Inputlogin funcEvent={this.eventLogin} user={datalogin.user} pass={datalogin.pass}></Inputlogin>,
    });

    
  }

  _onPressOutLoginButton(){
    console.log('Informo que se ha dejado de presionar el botón de login.')
  }
   

  render() {
    //Each render is calculated
    tam = Dimensions.get('window')
    const orientation = tam.height > tam.width ? "portrait" : "landscape";
    const BoolPortrait = tam.height > tam.width ? true : false;
    
    var test_pintar = <Text>|||||||||||||||||||||</Text>;

    
  
    //ATENCIÓN EJEMPLO DIDACTICO: CREA BUCLE INFINITO, MUCHO CUIDADO
    // this.setState({
    //   renderizer: '',
    // });

    return (
      // <KeyboardAvoidingView behavior='padding' style={styles.container} >
        <KeyboardAvoidingView behavior='padding' style= {BoolPortrait ? styles.containerPortrait : styles.containerLandscape} >

         {/* <Image style={styles.seccion1} source={require('./assert/pictures/fondologin.png')}/> */}

        <View style= {BoolPortrait ? styles.seccion1_p : styles.seccion1_l}>
          <Image
            style={BoolPortrait ? styles.piclogin_p : styles.piclogin_l}
            source= {require('./assert/pictures/Voyager2.png')}
          />

        </View>
        <View style={BoolPortrait ? styles.seccion2_p : styles.seccion2_l}>

          <StatusBar
            barStyle='light-content' />

            <Text style={styles.Texto_Titulo}>Conectar con Firebase ({orientation}) </Text>

          {/* Support any param to Inputext component */}
          <Text style={styles.Texto_UserPass}>Usuario: fj.proteus@gmail.com</Text>
          <Inputlog
            style={BoolPortrait ? styles.txtinput_p : styles.txtinput_l}
            placeholder='User'
            returnKeyType='next'
            multiline={false}
            // IOS onSubmitEditing={()=>this.passwordInput.focus()}
            keyboardType='email-address'
            autoCapitalize='none'
            //value = 'fj.proteus(@)gmail.com'
            autoCorrect={false}
            placeholderTextColor='rgba(155,155,145,0.7)'
            onChangeText={(user) => this.setState({user})}
            ref={(input) => datalogin.user = input} />
          <Text style={styles.Texto_UserPass}>Clave: contrasena</Text>
          <Inputlog
            style={BoolPortrait ? styles.txtinput_p : styles.txtinput_l}
            placeholder='Password'
            returnKeyType='go'
            placeholderTextColor='rgba(155,155,145,0.7)'
            //value= 'contrasena'
            onChangeText={(pass) => this.setState({pass})}
            ref={(input) => datalogin.pass = input}
            secureTextEntry/>

                   
          <TouchableOpacity style={styles.btnlogin} onPress={this._onPressLoginButton.bind(this)}  onPressOut={() => this.setState({renderizer: ''})}>
            <Text style={styles.btnlogintxt}>Login{this.state.prueba}</Text>
          </TouchableOpacity>
          
          
          <Text>{this.state.renderizer}</Text>
          

        </View>


      </KeyboardAvoidingView>

    );
  }

  //Function execute acction when press the login button. 
  //https://www.codesai.com/2017/01/es6-en-react-y-resolviendo-el-binding-del-this


}

const styles = StyleSheet.create({
  containerPortrait: {
    flex: 1,
     backgroundColor: '#151515',

    // alignItems: 'center',
    // justifyContent: 'center',
  },
  containerLandscape: {
    flex: 1, 
    flexDirection: 'row',
    backgroundColor: '#01DF3A'    
  },
  seccion1_p:{
    flex:43,
    // backgroundColor:'#f44',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seccion1_l:{
    flex:43,
    // backgroundColor:'#f44',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seccion2_p:{
    flex:32,
    // backgroundColor:'#49f',
    padding: 20
    // alignItems: 'center'
  },
  seccion2_l:{
    flex:32,
    // backgroundColor:'#49f',
    padding: 20
    // alignItems: 'center'
  },
  piclogin_p:{
    width:  200,//tam.width*0.7,
    height: 200 //tam.height*0.4
  },
  piclogin_l:{
    width: 200, //tam.height*0.7,
    height: 200  //tam.width*0.3
  },
  txtinput_p:{
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal:10
  },
  txtinput_l:{
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal:10
  },
  btnlogintxt:{
    backgroundColor:'#2E9AFE',
    paddingVertical:20,
    textAlign: 'center',
    fontWeight: '700'
  },
  btnlogin:{
    backgroundColor:'#2E9AFE',
    paddingVertical:10
  },
  Texto_UserPass:{
    backgroundColor:'#FEFAFE',    
    textAlign: 'center',
    fontWeight: '300'
  },
  Texto_Titulo:{
    backgroundColor:'#FFFFBB',    
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 20
  }

});
