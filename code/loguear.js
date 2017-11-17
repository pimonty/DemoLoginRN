
// ATENCION: Utilizar el modo estricto provoca warning y errores durante el uso
//de variables this.Nvariable en cualquier método de cualquier clase 
//'use strict'

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

firebase.initializeApp(firebaseConfig);



export default class Inputlogin extends Component {

  

  constructor(props) {
    super(props);

    console.log('wellcome loguear.js');
    this.state = {
      Eexito_login: false,
      Eexito_auth: false,
      Ealt_exito_logueado: true,
    
    };

    console.log('-------CONTRUCTOR EJECUTADO -----');
    this.exito_login = false;
    this.existe_user = false;
    this.max_logintentos = 3;
    this.logintentos = 0;

    //NOTA IMPORTANTE: 
    //Si habitas 'use strict' provocará error ya que se considerará
    //de solo lectura. El propósito es que sea lectura/escritura entre todos
    //los métodos de la clase exclusivamente.
    this.alt_exito_logueado = false;

    //Captura el código de error y mensaje de Firebase.
    this.errorCode = '';
    this.errorMensaje = '';
    

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
// No permite ejecutar más mensajes de error.
        this.logintentos = this.max_logintentos +1;
        this.props.funcEvent('No ha sido posible:'+ global.datalogin.error);    

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

  while (intentos > 0) {
		this._UI_login_msg(intentos - 1);
		//this.prueba( ) ;
		--intentos;
	}
  
  console.log('SALE espera_desbloqueo_candado'); 
}


//Segundo método para esperar resolver el login asincronamente.
//Al llamarla no bloquea la ejecución del código principal.
  async Esperar_resolver_loguin(espera){
//  console.log(intentos);
//   while(intentos > 0){

//     if (this.alt_exito_logueado){
//       console.log('entró e intentos:' + intentos);
//       this.props.funcEvent('Bienvenido/n Autorizado en Firebase.');
//       //return;
//     }

//     // //await this.tiempo_de_espera(espera);
//     this.tiempo_de_espera(intentos);
    
//     console.log('intentos:' + intentos);
//     intentos = intentos - 1;
//   }

//   console.log('salió del while' + intentos);

//   this.props.funcEvent(msgerror);
//   return;

  console.log("dentro de Esperar resolver login....");
  return await this.tiempo_de_espera(espera);

}

  tiempo_de_espera(tespera){
  // return new Promise((resolve,reject)=>{ 
  //   setTimeout(function(){console.log('esperando...')},tespera)
  // });
    console.log("dentro de tiempo espera....");
  return new Promise((resolve, reject) => { 

  setTimeout(() => {
      //Dentro de "n" segundos ejecuta este código
    if (this.alt_exito_logueado) {
        resolve(true);
       console.log('logueado_con_exito TRUE');
      } else {
        
        resolve(false);
        console.log('logueado_con_exito FALSE' + ', candado:' + global.candado_logueando);
      }
    }, tespera);
    
  }  
  
  );

  }


  async mostrar_mensaje_login(tiempo) { 
    var prom; 
    for (var contador = 3; contador > 0; contador--) {
      prom = await this.comprobar_login(tiempo); 
      
      if (prom === true){
        //El candado está cerrado y hay éxito en el loguin.

        //Mostrar mensaje
        this.props.funcEvent('Promesa resuelta con candado desbloqueado y exito loguin.');
        //Devolver true por el acierto
        return true;

      } else {
        console.log('entro....MSG:' + this.errorMensaje);
        //Seguir esperando siempre que no haya error.
        if (this.errorMensaje != ''){
          //Hay un error, por eso no hay exito ni candado cerrado.
          this.props.funcEvent('Mensaje de error:' + this.errorMensaje);
          return false;
        }
      }

     }

     console.log('saliendo antes del return...'); 
     this.props.funcEvent('No hay respuesta del loguin. Error.Falta mostrar el error.');
     return false;
  }

  comprobar_login(espera) {
    return new Promise((resolve) => { setTimeout(() => {

            console.log('código timeout, espera:' + espera);

            if ((this.alt_exito_logueado) && (!global.candado_logueando)){
                resolve(true) 
            } else {            
              resolve(false);
            }

      }, 3500); });

    }


    
  _init_login() {
    
    console.log('WELLCOME LOGUEAR.JS');
    //User with active session at this moment

    //Si un usurio esta loguenadose, esta función espera hasta
    //que se determine que lo está, entonces esta responderá true.



    //NOTA WARNING MOLESTO:
    //Indica que possible promesa no se maneje correctamente. Barra amariilla indicando
    //ID:0,1,2,3....en la pantalla del móvil. Se trata de asignar un valor booleano a 
    // una variable "this." del constructor. Hay que sustituirlo por let "NombreVar" dentro
    //de la función.

     this.existe_user = true;
     let testerwarning = true;
    
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('(NO OK)Existe un usuario logueado, se marca para desloguear.');
         this.existe_user = true;
      } else {
        console.log('(OK) No existe un usuario activo.');
        this.existe_user = false;
        testerwarning = false;
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

    console.log(email + ':' + password);

    // //Captura el código de error y mensaje de Firebase.
    this.errorCode = '';
    this.errorMensaje = '';
    var borrame = '';


    //Función asíncrona de logueo en Firebase, se establece un candado global.
    global.candado_logueando = true 
    
    var logueado_con_exito=false;
    this.exito_login = false;

    console.log('----------------------------------------------DEBUG*****');

    //Authentification via email-pass
    //El Candado se trata dentro de la condición if (por ser asíncrona la ejecución).
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      
      console.log('Firebase auth THEN- Auténtificado con éxito.');
      global.candado_logueando = false; 
      logueado_con_exito=true;

      //variable para probar resolver el loguin asincronamente.
      //this.setState({alt_exito_logueado:true});
      this.alt_exito_logueado = true;
     
      //NOTA: NO FUNCIONA NINGUNA NOTIFICACION EN PANTALLA EN ESTE PUNTO:
      // FALLA ALERT
      // FALLA this.props.funcion()

    }).catch((error) => { 
      //Manejo de errores.       
      console.log('Firebase-auth.CATCH - ERROR CODE:'+error.code);
      borrame = 'tengo un error de prueba';
      
      switch(error.code){
        
        case 'auth/invalid-email':
        this.errorCode= true
        this.errorMensaje = 'Formato de email no válido.' 
        break;

        case 'auth/wrong-password':
        this.errorCode= true
        this.errorMensaje = 'Contraseña incorrecta.'  
        break;

        default:
        //Informar del error capturado
        console.log('Firebase auth CATCH - error no controlado con code:'+error.code+', y mensaje:'+error.message);

        //Ha capturado una excepción que nada tiene que ver con firebase
        this.errorCode= 'Excepción';
        this.errorMensaje = 'Excepción';       
        break;

      }
      
     

      //Error al loguearse, fin del logueado.
      logueado_con_exito=false
      
      //variable para probar resolver el loguin asincronamente.
      //this.setState({ alt_exito_logueado : false });
      this.alt_exito_logueado = false;

      global.candado_logueando = false; 

      // NOTA IMPORTANTE: 
      // MUCHO CUIDADO NO COLOCAR EN CATCH "function(error)" ya que no permite
      // guardar en variables ni llamar a funciones. Hay que indicar "(error) =>"
      // this.borrame_marcarerror();
     
      
    });

    

//Opciones para consultar la resolución del login:
//Valor 1: Funciona correctamente
//Valor 2: ....

  var opcion_resolver_login = 3;

  switch (opcion_resolver_login){
    case 1:{

      //*************PRUEBA1****(resolver loguin asincronamente)*************

      //NOTA PROMESA:
      //resolve: valor devuelto una vez resuelve la promesa.
      //reject: Evento de error devuelto.
      const p = new Promise((resolve, reject) => {
        setTimeout(() => {
          //Dentro de "n" segundos ejecuta este código
          if (logueado_con_exito) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, 3000);
      });

      p.then(data => {
        if (data) {
          this.props.funcEvent('Bienvenido/n Autorizado en Firebase.');
        } else {
          this.props.funcEvent(errorMensaje);
        }
      })



      break;
    }
    case 2:{

      //*************PRUEBA2**(resolver loguin asincronamente)***************

      //NOTA ALTERNATIVA: Lanzar función asincrona, en su interior con espera sincrona hasta
      //ejecutar su código.
     
      for (var contador = 4; contador > 0; contador--) {
        console.log("FOR contador :" + contador);
        const p = this.Esperar_resolver_loguin(5000); //Tiempo + this.alt_exito_logueado
              
        p.then((respuesta_promesa)=>{
          if((respuesta_promesa)  && ( !global.candado_logueando) ){
                alert('acierto' + respuesta_promesa + 'contador:' + contador);
              }else{
                console.log('FALLO: respuesta promesa:' + respuesta_promesa +', global.candado.logueando:' + global.candado_loguenado);
              }
              
            })

      }   
     
      break;
    }    

    case 3:{

      //Caso donde lanza una función asíncrona desde este hilo principal.

      this.mostrar_mensaje_login(2000);    


      break;
    }
    default:{
      console.log('Loguear.js: ERROR_DEV -> No ha indicado como resolver la consulta del LOGIN');
    }


  }


   
}//Fin

  
  //Invocación 1º cuando se crea el componente.
  componentDidMount() {
    console.log("Primera invocación al componente Loguear.js,ahora procederá a ser montado")
    this._init_login(); 
  }

  //Se invoca en la 2º y posteriores llamadas al componente cargado.
  componentWillReceiveProps(nextProps) {

    //(SOLVED: en el Onchange de los InputLog se hacía un setState)
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
