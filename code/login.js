'use strict'
import React,{ Component } from 'react';
import {TextInput, Text, View} from 'react-native';


export default class Inputforlogin extends Component {


    render() {
    return (
    <View>
    {/* // Soporta cualquier propiedad, por ejemplo:  multiline, numberOfLines por debajo... */}
    <TextInput {...this.props} editable={true} maxLength={40}/>
      
    </View>

);


} //End render

} //End Class
