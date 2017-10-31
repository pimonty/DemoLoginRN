'use strict'
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

// import Firebase from 'firebase';
// let firebase = new Firebase();

import * as firebase from 'firebase';


// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAvjtVYOpnVjoURL_MWnIjKgspzNHEFX6Y",
  authDomain: "mylogin-9b91b.firebaseapp.com",
  databaseURL: "https://mylogin-9b91b.firebaseio.com",
  projectId: "mylogin-9b91b",
  storageBucket: "mylogin-9b91b.appspot.com",
  messagingSenderId: "722384392248"
};


//var firebase = 
firebase.initializeApp(firebaseConfig);

export default class Inputlogin extends Component {

  constructor(props) {
    super(props);

    console.log('wellcome loguear.js');
    this.state = {
      Eexito_login: false,
      Eexito_auth: false,
    };

    this.exito_login = false;
    this.existe_user = false;   
    this.max_logintentos = 3;
    this.logintentos=0;
    

  }


//No funciona: Es necesario control mediante 2 variables externas.
//BUG: Lanza todos los intentos en paralelo.
//Resuelto mediante Promesa
_UI_login_msg(intentos){
  console.log('INICIO _UI_login_msg() | intento:'+intentos);
  

  setTimeout(() => {   
    console.log('SEttime --  E N T R O');
    this.logintentos++;
    console.log('ESPERE 4SEG | intento:'+intentos+', this.logintentos:'+this.logintentos);
    
    if(!global.candado_logueando){ 
      

      //preguntar el estado de la consulta y el error devuelto si hubiera.
      if(this.exito_login ){
        console.log("Exito candado desbloqueado"); 
        this.props.funcEvent('El candado se ha desbloqueado, EXITO LOGIN TRUE.');                
      } else{
        //No permite ejecutar más mensajes de error.
        this.logintentos = this.max_logintentos +1;
        this.props.funcEvent('No ha sido posible:'+datalogin.error);    

      }
      
      return;
    }else{
      console.log('candado bloqueado todavía....');
    }
   
    console.log('SEttime -- S A L G O');
  }, 4000);   
  
  console.log('FINALIZA _UI_login_msg() | intentos'+ intentos);
}

//No funciona: Es necesario control mediante 2 variables externas.
//Resuelto mediante Promesa
espera_desbloqueo_candado(intentos){
  console.log('ENTRA espera_desbloqueo_candado');
  this.max_logintentos=intentos;
  this.logintentos=0;

  while(intentos>0){ 
   this._UI_login_msg(intentos-1);
   //this.prueba();
    --intentos;
  }
  
  console.log('SALE espera_desbloqueo_candado'); 
}






  _init_login() {
    console.log('WELLCOME LOGUEAR.JS');
    //User with active session at this moment
    //Si un usurio esta loguenadose, esta función espera hasta
    //que se determine que lo está, entonces esta responderá true.
    firebase.auth().onAuthStateChanged(function (user) {

      this.existe_user = true

      if (user) {
        console.log('(NO OK)Existe un usuario logueado, se marca para desloguear.');
        this.existe_user = true;
      } else {
        console.log('(OK) No existe un usuario activo.');
        this.existe_user = false;
      }
    });

    //PRUEBA: Doble comprobación, verifica que no exista otra cuenta activa en este momento    
    if (firebase.auth().currentUser) {
      // User is signed in.
      this.existe_user = true;
      
    } else {
      // No user is signed in.
      this.existe_user = false;
    }

    //Hay un usuario logueado y hay que desloguearlo.
    if (this.existe_user) {
      firebase.auth().signOut().then(function () {        
        console.log('Deslogueado con éxito el usuario anterior.');
      }, function (error) {
        console.error('Error. El usuario anterior sigue logueado.', error);
      });
    }

    if (this.exito_auth) {
      //
    }
    else { console.log('No hay usuario logueado, procede a autentificarse user:pass'); }


    //Asigna los datos introducidos por el usuario
    var email = this.props.user 
    var password = this.props.pass; 

    //Captura el código de error y mensaje de Firebase.
    var errorCode = false;
    var errorMensaje = false;


    //Función asíncrona de logueo en Firebase, se establece un candado global.
    global.candado_logueando = true 
    
    var logueado_con_exito=false;
    this.exito_login = false;

    //Authentification via email-pass
    //El Candado se trata dentro de la condición if (por ser asíncrona la ejecución).
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      
      console.log('Firebase auth THEN- Auténtificado con éxito.');
      global.candado_logueando = false; 
      logueado_con_exito=true;
     
      //NOTA: NO FUNCIONA NINGUNA NOTIFICACION EN PANTALLA EN ESTE PUNTO:
      // FALLA ALERT
      // FALLA this.props.funcion()

    }).catch(function (error) { 
      //Manejo de errores.       
      console.log('Firebase-auth.CATCH - ERROR CODE:'+error.code);
      
      switch(error.code){
        
        case 'auth/invalid-email':
        errorCode= true
        errorMensaje = 'Formato de email no válido.' 
        break;

        case 'auth/wrong-password':
        errorCode= true
        errorMensaje = 'Contraseña incorrecta.'  
        break;

        default:
        //Informar del error capturado
        console.log('Firebase auth CATCH - error no controlado con code:'+error.code+', y mensaje:'+error.message);

        //Ha capturado una excepción que nada tiene que ver con firebase
        errorCode= false
        errorMensaje = false        
        break;

      }

      //Error al loguearse, fin del logueado.
      logueado_con_exito=false
      global.candado_logueando = false; 
      
    });


    
    //NOTA PROMESA:
    //resolve: valor devuelto una vez resuelve la promesa.
    //reject: Evento de error devuelto.
    const p = new Promise((resolve,reject) =>{
      setTimeout(()=> {
        //Dentro de "n" segundos ejecuta este código
        if(logueado_con_exito){
          resolve(true);
        }else{
          resolve(false);
        }        
      },3000);
    });

  p.then(data => {
    if(data){
      this.props.funcEvent('Bienvenido/n Autorizado en Firebase.');
    }else{
      this.props.funcEvent(errorMensaje);
    }
  })

   
}//Fin

  
  //Invocación 1º cuando se crea el componente.
  componentDidMount() {
    console.log("Primera invocación al componente Loguear.js,ahora procederá a ser montado")
    this._init_login(); 
  }

  //Se invoca en la 2º y posteriores llamadas al componente cargado.
  componentWillReceiveProps(nextProps) {

    //BUG:
    //Al intentar el primer login todo bien. this.state.renderizer="objeto login"
    //El problema es al escribir posteriormente en el TextInput(user-pass), invoca al objeto login a través de
    //su método componentWillReceiveProps(). Tiene que renderizar sólo si se ha pulsado 
    //el botón Login (TouchableOpacity).
    //
    //Referencia: https://reactjs.org/docs/react-component.html#updating-componentwillreceiveprops


      console.log("Segundo y posteriores invocaciones al componente Loguear.js va a ser ACTUALIZADO."+ nextProps)
      this._init_login();     
    
  }

  //Se invoca justo antes de desmontar el componente.
  componentWillUnmount() {
    console.log("El componente Loguear.js va a ser desmontado.")

  }


  render() {
    var entra, falla;
    entra = <Text>Ha quedado logueado</Text>
    falla = <Text>Fallo en el login</Text>
    return (
      this.state.exito_login ? falla : entra
    );


  } //End render

} //End Class
