import React from 'react'
import {StyleSheet, Text, TextInput , View , Image , Dimensions, TouchableOpacity, KeyboardAvoidingView, StatusBar  } from 'react-native'

import Inputlog from './code/login.js';
import Inputlogin from './code/loguear.js';


global.tam = Dimensions.get('window')
global.datalogin={user:'',pass:'',error:'',loading:false};
global.candado_logueando=false;



var debug;

console.log(global.datalogin.user);


export default class App extends React.Component {
  //

  state_Dim = Dimensions.get('window');
  handler = dims => this.setState(dims);
  debug = 'chacho';

  constructor(props) {
    super(props);
    
    this.state= {user: '',
                  pass:'', 
                renderizer:'',}; 
    this.pintar; 
    this.msg_loading = <Text>Loading...</Text>   
    
    console.log('Constructor inicializa localuser y locapass');
    this.localuser='';
    this.localpass='';

    this.test_pintar = '';
    
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
    console.log('usuario:' + this.localuser); 
    console.log('password:' + this.localpass);
    global.datalogin.user = this.localuser;
    global.datalogin.pass = this.localpass;
    console.log('usuario:' + global.datalogin.user); 
    console.log('password:' + global.datalogin.pass);

    
    //NOTA: PAra mostrar un mensaje de LOADING... después de pulsar el botón hasta
    //que muestre el mensaje con la respuesta, se realiza de la siguiente manera:
    //1) pasar por "props" el state del componente padre.
    //2) Asignar en un state local del hijo el state del padre.
    //3) Colocar el setState donde muestra el Loading y otro mensaje de cierre.
    this.test_pintar = <Inputlogin funcEvent={this.eventLogin} user={global.datalogin.user} pass={global.datalogin.pass} loading={this.state.msg_loading}/>;

    // Al pusar tiene que renderizar la respuesta minimo un setState
    this.setState({
      msg_loading: ''
    });
  

  }

  _onPressOutLoginButton(){
    console.log('Informo que se ha dejado de presionar el botón de login.')
  }
  
  _clear(){
    console.log('limpieza del login renderizado ');
    this.test_pintar = '';
  }

  render() {
    //Each render is calculated
    let tam = Dimensions.get('window')
    const orientation = tam.height > tam.width ? "portrait" : "landscape";
    const BoolPortrait = tam.height > tam.width ? true : false;
    
    console.log("debug info: Actualiza el render..");

    // this.test_pintar = '';
    
  
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

           //NOTA IMPORTANTE: Cualquier setState para cualquier variable
           //Implica refrescar el render, NUNCA coloques setState en un ONCHANGE como este caso.
           //onChangeText={(user) => setState(user)}
           //aunque nunca "user" se usara en el render, si que lo refrescaba, cuidado.

            onChangeText={(user) => { console.log('onChangeUser:' + user); this.localuser = user;}}
            ref={(input) => datalogin.user = input} />
          <Text style={styles.Texto_UserPass}>Clave: contrasena</Text>
          <Inputlog
            style={BoolPortrait ? styles.txtinput_p : styles.txtinput_l}
            placeholder='Password'
            returnKeyType='go'
            placeholderTextColor='rgba(155,155,145,0.7)'
            //value= 'contrasena'
            onChangeText={(pass) => { console.log('onChangePass:' + pass); this.localpass = pass;}}
            ref={(input) => datalogin.pass = input}
            secureTextEntry/>

          
          {<Text style={ BoolPortrait ? styles.Msg_respuesta_p : styles.Msg_respuesta_l}>{this.test_pintar}</Text>} 

          <TouchableOpacity style={styles.btnlogin} onPress={() => { this._onPressLoginButton();  console.log('Presionado BtnLogin');  }} onPressOut={() => { console.log('Liberado BtnLogin');}}> 
            <Text style={styles.btnlogintxt}>Login test{this.state.prueba}</Text>
          </TouchableOpacity>
                 
                   
         
         {this._clear()}
        
         

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
    flex:33,
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
  },
  Msg_respuesta_p: {
    backgroundColor: '#151515',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 20
  },
  Msg_respuesta_l: {
    backgroundColor: '#01DF3A',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 20
  }

});
